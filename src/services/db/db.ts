import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export async function checkUser(email: string, password: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM "users" WHERE email = ${email} LIMIT 1;
    `;

    if (!rows.length) return null;

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    return user;
  } catch (error) {
    console.error("Error checking user:", error);
    return null;
  }
}

export async function checkUserByEmail(email: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM "users" WHERE email = ${email} LIMIT 1;
    `;
    return rows[0];
  } catch (error) {
    console.error("Error checking user by email:", error);
    return null;
  }
}

export async function createUser(
  email: string,
  hashedPassword: string,
  fullName: string
) {
  try {
    const { rows } = await sql`
      INSERT INTO "users" (email, password, name) 
      VALUES (${email}, ${hashedPassword}, ${fullName}) 
      RETURNING *;
    `;
    return rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
