/**
 * @file updateSpecialities.tsx
 * @description This file contains the function that updates the specialities details in the database.
 */

"use server";

import { updateSpecialities } from "../db/db";

/**
 * This function updates the specialities details in the database.
 * @param formData The form data containing the specialities details.
 * @param userID The ID of the user.
 * @returns A promise that contains a boolean indicating the success status and an optional array of errors.
 */
export async function UpdateSpecialities(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const theme = formData.get("theme") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string);
  const specialitiesRaw = formData.get("specialities");

  let specialities = [];
  if (specialitiesRaw) {
    try {
      specialities = JSON.parse(specialitiesRaw as string);
    } catch (error) {
      return { success: false, errors: ["Invalid specialities data format."] };
    }
  }

  const specialitiesData = {
    theme: theme,
    title: title,
    description: description,
    order: order,
    specialities: specialities,
  };

  try {
    const result = await updateSpecialities(
      userID,
      JSON.stringify(specialitiesData)
    );

    if (!result) {
      return {
        success: false,
        errors: ["Error updating specialities details."],
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error updating specialities details."] };
  }

  return { success: true };
}
