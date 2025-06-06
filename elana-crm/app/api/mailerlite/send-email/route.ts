import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  const API_KEY = process.env.MAILERLITE_TOKEN;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "MailerLite API key is missing." },
      { status: 500 }
    );
  }

  try {
    const clientsToEmail = await prisma.client.findMany({
      where: {
        id_expiry_date: { lte: new Date() },
        emailedExpiredId: false,
      },
      select: {
        eurosys_id: true, 
        email: true,
        name: true,
      },
    });

    if (clientsToEmail.length === 0) {
      return NextResponse.json({
        message: "No expired clients to email.",
      });
    }

    const groupRes = await fetch(
      "https://connect.mailerlite.com/api/groups",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Expired ID Notification - ${new Date().toISOString()}`,
        }),
      }
    );

    if (!groupRes.ok) {
      const errorData = await groupRes.json();
      return NextResponse.json(
        { error: "Failed to create group", details: errorData },
        { status: groupRes.status }
      );
    }

    const groupData = await groupRes.json();
    const groupId = groupData.data?.id;

    if (!groupId) {
      return NextResponse.json(
        { error: "Group ID missing from response" },
        { status: 500 }
      );
    }

    for (const client of clientsToEmail) {
      const subscriberRes = await fetch(
        `https://connect.mailerlite.com/api/subscribers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: client.email,
            groups: [groupId],
            status: "active",
            fields: {
              name: client.name,
            },
          }),
        }
      );

      if (!subscriberRes.ok) {
        const errorData = await subscriberRes.json();
        console.error(
          `Failed to add subscriber ${client.email}:`,
          errorData
        );

      }
    }


    const campaignData = {
      name: `ID expiry notification - ${new Date().toLocaleDateString()}`,
      type: "regular",
      groups: [groupId],
      emails: [
        {
          subject: "Your ID has expired",
          from_name: "Clouddo",
          from: "dev@clouddo.eu",
          content:
            `
  <p>Здравейте,</p>
  <p>Бихме искали да Ви уведомим, че документът, който сте предоставили в нашата система, е с изтекъл срок на валидност. Молим да го обновите възможно най-скоро, за да избегнете евентуални неудобства.</p>
  <p>Ако имате нужда от съдействие или допълнителна информация, не се колебайте да се свържете с нас.</p>
  <p>С уважение,<br />Екипът на Клауду</p>
`,
        },
      ],
    };

    const campaignRes = await fetch(
      "https://connect.mailerlite.com/api/campaigns",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(campaignData),
      }
    );

    if (!campaignRes.ok) {
      const errorData = await campaignRes.json();
      return NextResponse.json(
        { error: "Failed to create campaign", details: errorData },
        { status: campaignRes.status }
      );
    }

    const campaignJson = await campaignRes.json();
    const campaignId = campaignJson.data?.id;

    if (!campaignId) {
      return NextResponse.json(
        { error: "Campaign ID missing from response" },
        { status: 500 }
      );
    }

    const scheduleRes = await fetch(
      `https://connect.mailerlite.com/api/campaigns/${campaignId}/schedule`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery: "instant",
        }),
      }
    );

    if (!scheduleRes.ok) {
      const error = await scheduleRes.json();
      return NextResponse.json(
        { error: "Failed to schedule campaign", details: error },
        { status: scheduleRes.status }
      );
    }

    await Promise.all(
      clientsToEmail.map((client) =>
      prisma.client.update({
      where: { eurosys_id: client.eurosys_id },
      data: { emailedExpiredId: true },
    })
    )
    );

    return NextResponse.json({
      message: "Subscribers added, campaign created and sent successfully",
      campaignId,
      emailedCount: clientsToEmail.length,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Unexpected error", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
