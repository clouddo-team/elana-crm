import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const API_KEY = process.env.MAILERLITE_TOKEN;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "MailerLite API key is missing." },
      { status: 500 }
    );
  }

  const { email } = await req.json();
  const groupId = "153555924407027612";

  if (!email) {
    return NextResponse.json(
      { error: "Missing email address." },
      { status: 400 }
    );
  }

  try {
    const data = {
      email: email,
      groups: [groupId],
      fields: {
        name: "Default Name",
      },
      status: "active",
    };

    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Request failed", details: errorData },
        { status: response.status }
      );
    }

    const subscriberData = await response.json();
    return NextResponse.json({
      message: "Subscriber added successfully",
      subscriber: subscriberData,
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
