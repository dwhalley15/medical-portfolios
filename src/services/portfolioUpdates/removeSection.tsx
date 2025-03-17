/**
 * @file Remove section service.
 * @description This file defines the service for removing a section from the portfolio.
 */

"use server";

import {
  getNavigationData,
  updateNavigationData,
  removeSection,
} from "../db/db";

/**
 * This function removes a section from the portfolio.
 * @param {FormData} formData - The form data to remove the section.
 * @param {number} userID - The user ID to remove the section for.
 * @returns {Promise<{ success: boolean; errors?: string[] }>} The success status of the remove.
 */
export async function RemoveSection(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const section = formData.get("section") as string;

  try {
    const currentNavData = await getNavigationData(userID);
    const result = await removeSection(userID, section);
    if (!result.success) {
      return { success: false, errors: ["Error removing section."] };
    }

    const parsedNavData =
      typeof currentNavData === "string"
        ? JSON.parse(currentNavData)
        : currentNavData;

    const updatedNavItems = parsedNavData.navItems.filter(
      (item: { link: string }) => item.link !== section
    );

    const updatedNavigationData = JSON.stringify({
      ...parsedNavData,
      navItems: updatedNavItems,
    });

    const navUpdate = await updateNavigationData(userID, updatedNavigationData);

    if (!navUpdate) {
      return { success: false, errors: ["Error updating navigation data."] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error removing section."] };
  }

  return { success: true };
}
