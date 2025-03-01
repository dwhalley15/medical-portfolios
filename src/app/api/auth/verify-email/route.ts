/**
 * @file Email Verification Handler
 * @description Handles email verification by checking the verification token,
 *              updating the user's email verification status, and redirecting them.
 */

import { Pool } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

/**
 * Verifies an email using a token, updates the user's verification status,
 * and redirects them to the dashboard.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} A response indicating success or failure.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const result = await pool.query(
    "SELECT identifier FROM verification_token WHERE token = $1 AND expires > NOW()",
    [token]
  );

  if (result.rowCount === 0) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const email = result.rows[0].identifier;

  await pool.query(
    `UPDATE users SET "emailVerified" = NOW() WHERE email = $1`,
    [email]
  );

  await pool.query("DELETE FROM verification_token WHERE identifier = $1", [
    email,
  ]);

  return NextResponse.redirect(`${process.env.PUBLIC_URL}/dashboard`);
}
