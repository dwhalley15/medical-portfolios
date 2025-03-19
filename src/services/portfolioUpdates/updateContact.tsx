/**
 * @file This file defines the service for updating contact details.
 * @description This file contains the service for updating contact details.
 */

"use server";

import { updateContact } from "../db/db";

/**
 * This function updates the contact details.
 * @param {FormData} formData - The form data to update the contact details.
 * @param {number} userID - The user ID to update the contact details for.
 * @returns {Promise<{ success: boolean; errors?: string[] }>} The success status of the update.
 */
export async function UpdateContact(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const theme = formData.get("theme") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string);
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const locationLat = formData.get("locationLat") as string;
  const locationLong = formData.get("locationLong") as string;
  const message = formData.get("message") as string;

  const contactData = {
    theme: theme,
    title: title,
    description: description,
    order: order,
    contact: {
      email: email,
      phone: phone,
      locationLat: locationLat,
      locationLong: locationLong,
      message: message,
    },
  };

  try {
    const result = await updateContact(userID, JSON.stringify(contactData));

    if (!result) {
      return {
        success: false,
        errors: ["Error updating contact details."],
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error updating contact details."] };
  }

  return { success: true };
}
