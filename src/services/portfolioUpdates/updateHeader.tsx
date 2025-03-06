"use server";

import { put } from "@vercel/blob";
import { updateHeader } from "../db/db";

export async function UpdateHeader(
  formData: FormData,
  userID: number
): Promise<{ success: boolean; errors?: string[] }> {
  const data = {
    theme: formData.get("theme") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    originalImage: formData.get("original-image") as string,
    file: formData.get("image") as File,
  };

  let imageUrl = data.originalImage;

  if (data.file !== null) {
    const uniqueFileName = data.file.name + Date.now();
    try {
      const { url } = await put(uniqueFileName, data.file, {
        access: "public",
      });

      if (url !== null) {
        imageUrl = url;
      }
    } catch (error) {
      console.log(error);
      return { success: false, errors: ["Error uploading image."] };
    }
  }

  const headerData = {
    theme: data.theme,
    name: data.name,
    image: imageUrl,
    description: data.description,
  };

  try {
    const result = await updateHeader(userID, JSON.stringify(headerData));

    if (!result) {
      return { success: false, errors: ["Error updating header details."] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Error updating header details."] };
  }

  return { success: true };
}
