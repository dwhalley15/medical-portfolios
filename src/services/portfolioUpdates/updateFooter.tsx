"use server";

import { updateFooter } from "../db/db";

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
