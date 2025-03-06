"use server";

import { revalidatePath } from "next/cache";

export default async function RevalidatePage(path: string) {
  revalidatePath(path);
}
