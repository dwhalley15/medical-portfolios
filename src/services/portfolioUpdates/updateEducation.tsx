/**
 * @file This is the update education service.
 * @description This file defines the service that updates the education details in the database.
 */

"use server";

import { updateEducation } from "../db/db";

/**
 * This function updates the education details in the database.
 * @param formData The form data containing the education details.
 * @param userID The ID of the user.
 * @returns A promise that contains a boolean indicating the success status and an optional array of errors.
 */
export async function UpdateEducation(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const theme = formData.get("theme") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string);
  const educationRaw = formData.get("education");

  let education = [];
  if (educationRaw) {
    try {
      education = JSON.parse(educationRaw as string);
    } catch (error) {
      return { success: false, errors: ["Invalid education data format."] };
    }
  }

  const educationData = {
    theme: theme,
    title: title,
    description: description,
    order: order,
    education: education,
  };

  try {
    const result = await updateEducation(userID, JSON.stringify(educationData));

    if (!result) {
      return {
        success: false,
        errors: ["Error updating education details."],
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error updating education details."] };
  }

  return { success: true };
}
