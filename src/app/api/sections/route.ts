/**
 * @file This is the API route for fetching sections to append to a portfolio.
 * @description This API route fetches the sections available to append to a portfolio based on the user ID provided in the query parameters.
 */

import { NextResponse } from "next/server";
import { getSections } from "@/services/db/db";

/**
 * This function handles the GET request to fetch sections.
 * @param {Request} req - The request object.
 * @returns {Promise<NextResponse>} The response object containing the sections.
 */
export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  
  const referer = req.headers.get("referer");
  if (!referer || !referer.startsWith(process.env.PUBLIC_URL!)) {
    return NextResponse.json({ error: "Invalid referer" }, { status: 403 });
  }

  const userId = Number(searchParams.get("userId"));

  if (!userId) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  const sections = await getSections(userId);
  return NextResponse.json({ sections });
}
