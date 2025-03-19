/**
 * @file This file defines the service for sending a contact email.
 * @description This file contains the service for sending a contact email.
 */

"use server";

import { getUserEmail } from "../db/db";
import { sendEmail } from "./email";

/**
 * This function sends a contact email.
 * @param {FormData} formData - The form data to send the email.
 * @param {number} userID - The user ID to send the email to.
 * @returns {Promise<{ success: boolean; errors?: string[] }>} The success status of the send.
 */
export async function SendContactEmail(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const subject = "Contact Form Submission";
  let recipientEmail = "";
  let recipientName = "";
  const body = `<p>Email: ${email}</p> 
                <p>Message: ${message}<p>`;

  try {
    const emailResult = await getUserEmail(userID);
    if (emailResult === null) {
      return { success: false, errors: ["User email not found."] };
    }
    recipientEmail = emailResult.email;
    recipientName = emailResult.name;

    const email = {
      sender: {
        name: "medical-portfolios",
        address: "no-reply@medical-portfolios.me",
      },
      recipient: { name: recipientName, address: recipientEmail },
      subject: subject,
      message: body,
    };

    const result = await sendEmail(email);
    if (!result) {
      return { success: false, errors: ["Failed to send."] };
    }
  } catch (error) {
    return { success: false, errors: ["Failed to send."] };
  }

  return { success: true };
}
