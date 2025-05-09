import { NextResponse } from "next/server";

export async function POST() {
  const API_KEY = process.env.MAILERLITE_TOKEN;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "MailerLite API key is missing." },
      { status: 500 }
    );
  }

  const campaignData = {
    name: "ID expiry",
    type: "regular",
    emails: [
      {
        subject: "Your ID has expired",
        from_name: "Clouddo",
        from: "dev@clouddo.eu",
        content: "<h1>Hello, please renew your ID</h1>",
      },
    ],
    groups: ["153555924407027612"],
  };

  try {
    const response = await fetch(
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

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Request failed", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      message: "Campaign created successfully",
      campaign: data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Request error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Request error", details: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
