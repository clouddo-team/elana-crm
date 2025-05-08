// import { client } from "@prisma/client";

// const MAILERLITE_TOKEN = process.env.MAILERLITE_TOKEN;
// const GROUP_ID = process.env.MAILERLITE_GROUP_ID;
// const SENDER_EMAIL = process.env.MAILERLITE_SENDER_EMAIL || "dev@clouddo.eu";
// const SENDER_NAME = process.env.MAILERLITE_SENDER_NAME || "Elana CRM";

// export async function listTemplates() {
//   if (!MAILERLITE_TOKEN) {
//     throw new Error("MailerLite token is missing");
//   }

//   try {
//     const response = await fetch("https://connect.mailerlite.com/api/templates", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${MAILERLITE_TOKEN}`,
//       },
//     });

//     const responseText = await response.text();
//     console.log("Templates API Response:", responseText);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch templates: ${responseText}`);
//     }

//     return JSON.parse(responseText);
//   } catch (error) {
//     console.error("Error fetching templates:", error);
//     if (error instanceof Error) {
//       throw new Error(`Failed to fetch templates: ${error.message}`);
//     }
//     throw error;
//   }
// }

// export async function sendExpiredIdEmail(client: client) {
//   if (!MAILERLITE_TOKEN || !GROUP_ID) {
//     throw new Error("MailerLite configuration is missing");
//   }

//   try {
//     console.log("Starting email process...");
//     console.log("MailerLite Token:", MAILERLITE_TOKEN ? "Present" : "Missing");
//     console.log("Group ID:", GROUP_ID ? "Present" : "Missing");

//     // First, create or update the subscriber
//     console.log("Creating/updating subscriber...");
//     const subscriberResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${MAILERLITE_TOKEN}`,
//       },
//       body: JSON.stringify({
//         email: client.email,
//         fields: {
//           name: client.first_name,
//           last_name: client.last_name,
//           id_expiry_date: client.id_expiry_date.toISOString(),
//         },
//         groups: [GROUP_ID],
//         status: "active"
//       }),
//     });

//     const subscriberResponseText = await subscriberResponse.text();
//     console.log("Subscriber API Response:", subscriberResponseText);

//     if (!subscriberResponse.ok) {
//       throw new Error(`Failed to add subscriber: ${subscriberResponseText}`);
//     }

//     const subscriberData = JSON.parse(subscriberResponseText);

//     const campaignResponse = await fetch("https://connect.mailerlite.com/api/campaigns", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${MAILERLITE_TOKEN}`,
//       },
//       body: JSON.stringify({
//         type: "regular",
//         name: `Expired ID Notification - ${client.first_name} ${client.last_name}`,
//         subject: "Your ID has expired",
//         groups: [GROUP_ID],
//         from: SENDER_EMAIL,
//         from_name: SENDER_NAME,
//         template_id: process.env.MAILERLITE_TEMPLATE_ID,
//         variables: {
//           first_name: client.first_name,
//           last_name: client.last_name,
//           expiry_date: client.id_expiry_date.toLocaleDateString()
//         }
//       }),
//     });

//     const campaignResponseText = await campaignResponse.text();
//     console.log("Campaign API Response:", campaignResponseText);

//     if (!campaignResponse.ok) {
//       throw new Error(`Failed to create campaign: ${campaignResponseText}`);
//     }

//     const campaignData = JSON.parse(campaignResponseText);

//     // Send the campaign
//     console.log("Sending campaign...");
//     const sendResponse = await fetch(`https://connect.mailerlite.com/api/campaigns/${campaignData.data.id}/send`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${MAILERLITE_TOKEN}`,
//       }
//     });

//     const sendResponseText = await sendResponse.text();
//     console.log("Send API Response:", sendResponseText);

//     if (!sendResponse.ok) {
//       throw new Error(`Failed to send campaign: ${sendResponseText}`);
//     }

//     return {
//       subscriber: subscriberData,
//       campaign: campaignData
//     };
//   } catch (error) {
//     console.error("Detailed error in email process:", error);
//     if (error instanceof Error) {
//       throw new Error(`Email process failed: ${error.message}`);
//     }
//     throw error;
//   }
// } 

import { client } from "@prisma/client";

const MAILERLITE_TOKEN = process.env.MAILERLITE_TOKEN;
const GROUP_ID = process.env.MAILERLITE_GROUP_ID;
const SENDER_EMAIL = process.env.MAILERLITE_SENDER_EMAIL || "dev@clouddo.eu";
const SENDER_NAME = process.env.MAILERLITE_SENDER_NAME || "Elana CRM";
const TEMPLATE_ID = process.env.MAILERLITE_TEMPLATE_ID;

export async function sendExpiredIdEmail(client: client) {
  if (!MAILERLITE_TOKEN || !GROUP_ID || !TEMPLATE_ID) {
    throw new Error("MailerLite configuration is missing");
  }

  try {
    console.log("Starting email process...");

    // Step 1: Add or update subscriber
    const subscriberResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_TOKEN}`,
      },
      body: JSON.stringify({
        email: client.email,
        fields: {
          name: client.first_name,
          last_name: client.last_name,
          id_expiry_date: client.id_expiry_date.toISOString(),
        },
        groups: [GROUP_ID],
        status: "active"
      }),
    });

    const subscriberResponseText = await subscriberResponse.text();
    console.log("Subscriber API Response:", subscriberResponseText);

    if (!subscriberResponse.ok) {
      throw new Error(`Failed to add subscriber: ${subscriberResponseText}`);
    }

    const subscriberData = JSON.parse(subscriberResponseText);

    // Step 2: Create campaign (targeting the group, not individual emails)
    const campaignResponse = await fetch("https://connect.mailerlite.com/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_TOKEN}`,
      },
      body: JSON.stringify({
        type: "regular",
        name: `Expired ID Notification - ${client.first_name} ${client.last_name}`,
        subject: "Your ID has expired",
        from: SENDER_EMAIL,
        from_name: SENDER_NAME,
        groups: [GROUP_ID],
        template_id: TEMPLATE_ID,
        variables: {
          first_name: client.first_name,
          last_name: client.last_name,
          expiry_date: client.id_expiry_date.toLocaleDateString()
        }
      }),
    });

    const campaignResponseText = await campaignResponse.text();
    console.log("Campaign API Response:", campaignResponseText);

    if (!campaignResponse.ok) {
      throw new Error(`Failed to create campaign: ${campaignResponseText}`);
    }

    const campaignData = JSON.parse(campaignResponseText);

    // Step 3: Send the campaign
    const sendResponse = await fetch(`https://connect.mailerlite.com/api/campaigns/${campaignData.data.id}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_TOKEN}`,
      }
    });

    const sendResponseText = await sendResponse.text();
    console.log("Send API Response:", sendResponseText);

    if (!sendResponse.ok) {
      throw new Error(`Failed to send campaign: ${sendResponseText}`);
    }

    return {
      subscriber: subscriberData,
      campaign: campaignData
    };
  } catch (error) {
    console.error("Detailed error in email process:", error);
    if (error instanceof Error) {
      throw new Error(`Email process failed: ${error.message}`);
    }
    throw error;
  }
}
