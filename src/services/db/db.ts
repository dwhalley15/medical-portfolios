/**
 * @file Database Operations
 * @description This file contains database functions for user authentication and verification, including user lookup, creation,
 *              password management, and email verification.
 */

import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

/**
 * Checks if a user exists by email and verifies the password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} The user object if authentication is successful, otherwise null.
 */
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

/**
 * Checks if a user exists by email.
 * @param {string} email - The user's email address.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
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

/**
 * Creates a new user in the database.
 * @param {string} email - The user's email address.
 * @param {string} hashedPassword - The hashed password.
 * @param {string} fullName - The full name of the user.
 * @returns {Promise<Object|null>} The newly created user object, otherwise null.
 */
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

/**
 * Stores an email verification token in the database.
 * @param {string} email - The email to be verified.
 * @param {Date} expires - The expiration date of the token.
 * @param {string} token - The generated verification token.
 * @returns {Promise<boolean>} True if the token was created successfully, otherwise false.
 */
export async function createVerificationToken(
  email: string,
  expires: Date,
  token: string
) {
  try {
    const { rows } = await sql`
      INSERT INTO "verification_token" (identifier, expires, token) 
      VALUES (${email}, ${expires.toISOString()}, ${token}) 
      RETURNING *;
    `;
    if (rows.length !== 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Checks if a user is registered using an OAuth provider.
 * @param {string} email - The user's email address.
 * @returns {Promise<boolean>} True if the user is an OAuth user, otherwise false.
 */
export async function isOAuthUser(email: string) {
  try {
    const userResult = await sql`
      SELECT "id" FROM "users" WHERE "email" = ${email} LIMIT 1;
    `;

    if (userResult.rows.length === 0) {
      console.error("No user found with this email.");
      return false;
    }

    const userId = userResult.rows[0].id;

    const accountResult = await sql`
      SELECT EXISTS (
        SELECT 1 FROM "accounts" WHERE "userId" = ${userId} LIMIT 1
      ) AS "isOAuthUser";
    `;

    return accountResult.rows[0].isOAuthUser;
  } catch (error) {
    console.error("Error checking if user is OAuth user:", error);
    return false;
  }
}

/**
 * Checks if a user's email has been verified.
 * @param {string} email - The user's email address.
 * @returns {Promise<boolean>} True if the email is verified, otherwise false.
 */
export async function emailVerifiedCheck(email: string) {
  try {
    const { rows } = await sql`
      SELECT "emailVerified"
      FROM "users"
      WHERE "email" = ${email}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      console.error("No user found with this email.");
      return false;
    }

    return !!rows[0].emailVerified;
  } catch (error) {
    console.error("Error checking email verified:", error);
    return false;
  }
}

/**
 * Verifies if a token is valid and has not expired.
 * @param {string} token - The verification token.
 * @returns {Promise<Object|null>} The verification token object if valid, otherwise null.
 */
export async function verifyToken(token: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM "verification_token" 
      WHERE token = ${token} 
      AND "expires" > NOW() 
      LIMIT 1;
    `;
    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

/**
 * Updates a user's password and removes any associated verification token.
 * @param {string} email - The user's email address.
 * @param {string} password - The new hashed password.
 * @returns {Promise<Object|null>} The updated user object, otherwise null.
 */
export async function changePassword(email: string, password: string) {
  try {
    const { rows } = await sql`
      UPDATE "users"
      SET password = ${password}
      WHERE email = ${email}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return null;
    }

    const deleteToken = await sql`
      DELETE FROM "verification_token"
      WHERE identifier = ${email};
    `;

    if (deleteToken.rowCount === 0) {
      console.error("Error deleting token.");
    }

    return rows[0];
  } catch (error) {
    console.error("Error changing password:", error);
    return null;
  }
}
