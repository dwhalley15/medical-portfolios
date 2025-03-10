/** 
 * @file Revalidate page service.
 * @description This file defines the service for revalidating a page.
*/

"use server";

import { revalidatePath } from "next/cache";

/**
 * This function revalidates a page.
 * @param {string} path - The path to revalidate.
 * @returns {Promise<void>} Nothing.
 */
export default async function RevalidatePage(path: string) {
  revalidatePath(path);
}
