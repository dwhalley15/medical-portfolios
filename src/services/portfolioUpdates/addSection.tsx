/**
 * @file Add section service.
 * @description This file defines the service for adding a section to the portfolio.
 */

"use server";

import {
  insertSection,
  getNavigationData,
  updateNavigationData,
} from "../db/db";

/**
 * This function adds a section to the portfolio.
 * @param {FormData} formData - The form data to add the section.
 * @param {number} userID - The user ID to add the section for.
 * @returns {Promise<{ success: boolean; errors?: string[] }>} The success status of the add.
 */
export async function AddSection(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const section = formData.get("section") as string;

  const currentNavData = await getNavigationData(userID);

  let data: string | object = {};

  let navigationData: string | object = {};

  let newNavItem = { name: "", link: "" };

  switch (section) {
    case "specialities":
      data = JSON.stringify({
        order: 0,
        title: "Specialities",
        description: "Add your specialities",
        theme: "default",
        specialities: [
          {
            title: "",
            description: "",
            icon: "",
          },
        ],
      });
      newNavItem = { name: "Specialities", link: "specialities" };
      break;
    case "education":
      data = JSON.stringify({
        order: 0,
        title: "Education",
        description: "Add your education",
        theme: "default",
        education: [
          {
            title: "",
            location: "",
            description: "",
            startDate: null,
            endDate: null,
          },
        ],
      });
      newNavItem = { name: "Education", link: "education" };
      break;
    case "location":
      data = JSON.stringify({
        order: 0,
        title: "Location",
        description: "Add your location(s)",
        theme: "default",
        location: [
          {
            title: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            email: "",
            website: "",
          },
        ],
      });
      newNavItem = { name: "Location", link: "location" };
      break;
    case "contact":
      data = JSON.stringify({
        order: 0,
        title: "Contact",
        description: "Add your contact information",
        theme: "default",
        contact: {
          email: "",
          phone: "",
          locationLat: "",
          locationLong: "",
          message: "",
        },
      });
      newNavItem = { name: "Contact", link: "contact" };
      break;
    default:
      return { success: false, errors: ["Invalid section."] };
  }

  try {
    const result = await insertSection(userID, section, data);

    if (!result) {
      return { success: false, errors: ["Error adding section."] };
    }

    const updatedNavItems = [...currentNavData.navItems, newNavItem];

    navigationData = JSON.stringify({
      ...currentNavData,
      navItems: updatedNavItems,
    });

    const navUpdate = await updateNavigationData(userID, navigationData);

    if (!navUpdate) {
      return { success: false, errors: ["Error updating navigation."] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error adding section."] };
  }

  return { success: true };
}
