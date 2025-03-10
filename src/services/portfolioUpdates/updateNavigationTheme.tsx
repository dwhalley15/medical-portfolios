/**
 * @file Update navigation theme service.
 * @description This file defines the service for updating the navigation theme.
 */

"use server";

import { updateNavigationTheme, getNavigationData } from "../db/db";

/**
 * This function updates the navigation theme.
 * @param {FormData} formData - The form data to update the navigation theme.
 * @param {number} userID - The user ID to update the navigation theme for.
 * @returns {Promise<{ success: boolean; errors?: string[] }>} The success status of the update.
 */
export async function UpdateNavigationTheme(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const data = {
    theme: formData.get("theme") as string,
    icon: formData.get("icon") as string,
  };

  const currentData = await getNavigationData(userID);

  const navigationData = {
    theme: data.theme,
    icon: data.icon,
    navItems: currentData.navItems,
  };

  try {
    const result = await updateNavigationTheme(
      userID,
      JSON.stringify(navigationData)
    );

    if (!result) {
      return { success: false, errors: ["Error updating navigation details."] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error updating navigation details."] };
  }

  return { success: true };
}
