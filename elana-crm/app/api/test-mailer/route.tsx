import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendExpiredIdEmail } from "@/lib/mailerLite";

export async function GET() {
  return await testMailer();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  return await testMailer(email);
}

async function testMailer(specificEmail?: string) {
  try {
    // Get or create a test client
    let testClient = await prisma.client.findFirst({
      where: {
        ...(specificEmail ? { email: specificEmail } : {}),
        id_expiry_date: {
          lte: new Date(),
        },
      },
    });

    // If no client found with expired ID, create one
    if (!testClient) {
      const testEmail = specificEmail || "boyadzhiev.martin@gmail.com";
      testClient = await prisma.client.upsert({
        where: { email: testEmail },
        update: {
          id_expiry_date: new Date(2020, 0, 1), // Set to an expired date
        },
        create: {
          email: testEmail,
          first_name: "Test",
          last_name: "User",
          id_expiry_date: new Date(2020, 0, 1), // Set to an expired date
          status: "ACTIVE",
        },
      });
    }

    console.log("Test client:", testClient);

    // Try to send the email
    const result = await sendExpiredIdEmail(testClient);

    return NextResponse.json({
      message: "Test email sent successfully",
      client: {
        email: testClient.email,
        name: testClient.first_name,
      },
      mailerLiteResult: result,
    });
  } catch (error) {
    console.error("Detailed test error:", error);
    return NextResponse.json(
      {
        error: "Failed to send test email",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
