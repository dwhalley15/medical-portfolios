"use server";

import { updateSpecialities } from "../db/db";

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
