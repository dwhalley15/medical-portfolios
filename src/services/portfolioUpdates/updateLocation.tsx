/**
 * @file This file defines the location section of the portfolio.
 * @description This file contains the location section of the portfolio. It includes the location title, description, and a list of locations. Each location includes the title, address, city, state, zip, country, phone, email, and website. The section is editable and includes an editor and a remover.
 */

"use server";

import { updateLocation } from "../db/db";

/**
 * This function updates the location section of the portfolio.
 * @param {FormData} formData - The form data.
 * @param {number} userID - The ID of the user.
 * @returns {Promise<{ success: boolean; errors?: string[] }>} The success status and errors if any.
 */
export async function UpdateLocation(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const theme = formData.get("theme") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string);

  const locationRaw = formData.get("location");

  let location = [];
  if (locationRaw) {
    try {
      location = JSON.parse(locationRaw as string);
    } catch (error) {
      return { success: false, errors: ["Invalid location data format."] };
    }
  }

  const locationData = {
    theme: theme,
    title: title,
    description: description,
    order: order,
    location: location,
  };

  try {
    const result = await updateLocation(userID, JSON.stringify(locationData));

    if (!result) {
      return {
        success: false,
        errors: ["Error updating location details."],
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error updating location details."] };
  }

  return { success: true };
}
