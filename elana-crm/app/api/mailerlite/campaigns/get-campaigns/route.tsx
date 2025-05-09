import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.MAILERLITE_TOKEN;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "MailerLite API key is missing." },
      { status: 500 }
    );
  }

  try {
    // Send GET request to MailerLite API to get all campaigns
    const response = await fetch(
      "https://connect.mailerlite.com/api/campaigns",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
      message: "Campaigns fetched successfully",
      campaigns: data,
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
