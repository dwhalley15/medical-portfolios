/**
 * @file Update footer service.
 * @description This file defines the service for updating the footer.
 */

"use server";

import { updateFooter } from "../db/db";

/**
 * This function updates the footer.
 * @param {FormData} formData - The form data to update the footer.
 * @param {number} userID - The user ID to update the footer for.
 * @returns {Promise<{ success: boolean; errors?: string[] }>} The success status of the update.
 */
export async function UpdateFooter(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const theme = formData.get("theme") as string;
  const socialsRaw = formData.get("socials");

  let socials = [];
  if (socialsRaw) {
    try {
      socials = JSON.parse(socialsRaw as string);
    } catch (error) {
      return { success: false, errors: ["Invalid social media data format."] };
    }
  }

  const footerData = {
    theme: theme,
    socials: socials,
  };

  try {
    const result = await updateFooter(userID, JSON.stringify(footerData));

    if (!result) {
      return { success: false, errors: ["Error updating footer details."] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error updating footer details."] };
  }

  return { success: true };
}
