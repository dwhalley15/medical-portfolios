/**
 * @file Database Operations
 * @description This file contains database functions for user authentication and verification, including user lookup, creation,
 *              password management, and email verification.
 */

"use server";

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

/**
 * Creates a new portfolio for a user.
 * @param {number} id - The user's ID.
 * @param {string} name - The user's name.
 * @returns {Promise<Object|null>} The newly created portfolio object, otherwise null.
 */
export async function createPortfolio(id: number, name: string) {
  try {
    const { rows } = await sql`
    SELECT * FROM "portfolios" WHERE "userId" = ${id} LIMIT 1;
    `;
    if (rows.length === 0) {
      const url = createUrl(name, id.toString());
      const defaultNavigation = JSON.stringify({
        theme: "default",
        icon: "stethoscope",
        navItems: [
          {
            name: "Home",
            link: "home",
          },
        ],
      });

      const defaultHeader = JSON.stringify({
        theme: "default-inverted",
        name: name,
        image:
          "https://frw6rziicw61rtm1.public.blob.vercel-storage.com/no-image-ySSvzAYRUnBr4NO4QjRzeR0mtOtQ1f.png",
        description: "Welcome to my portfolio",
      });

      const defaultFooter = JSON.stringify({
        theme: "default",
        socials: [
          {
            name: "facebook",
            link: "https://www.facebook.com/",
          },
          {
            name: "twitter",
            link: "https://www.twitter.com/",
          },
        ],
      });

      const { rows } = await sql`
      INSERT INTO "portfolios" ("userId", "url", "navigation", "header", "footer") VALUES (${id}, ${url}, ${defaultNavigation}, ${defaultHeader}, ${defaultFooter}) ON CONFLICT ("userId") DO NOTHING RETURNING *;
      `;
      return rows[0];
    }
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return null;
  }
}

/**
 * Gets the OAuth provider for a user.
 * @param {number} id - The user's ID.
 * @returns {Promise<string|null>} The OAuth provider, otherwise null.
 */
export async function getProvider(id: number) {
  try {
    const { rows } = await sql`
      SELECT "provider" FROM "accounts" WHERE "userId" = ${id} LIMIT 1;
    `;
    if (rows.length === 0) {
      return null;
    }
    return rows[0].provider;
  } catch (error) {
    console.error("Error getting provider:", error);
    return null;
  }
}

/**
 * Creates a URL slug from a user's name.
 * @param {string|null|undefined} name - The user's name.
 * @param {string} id - The user's ID.
 * @returns {string} The generated URL slug.
 */
const createUrl = (name: string | null | undefined, id: string): string => {
  if (!name) return "";

  return (
    name
      .toLowerCase()
      .replace(/[^a-z\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    id
  );
};

/**
 * Updates a user's personal details.
 * @param {FormData} formData - The form data to be updated.
 * @returns {Promise<string[]>} An array of errors, if any.
 */
export async function updatePersonalDetails(
  formData: FormData
): Promise<{ success: boolean; errors?: string[] }> {
  try {
    const title = formData.get("title") as string;
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;

    if (!firstName || !lastName || !email) {
      return { success: false, errors: ["All fields are required."] };
    }

    const name = `${title} ${firstName} ${lastName}`.trim();

    const { rows } = await sql`
      UPDATE "users"
      SET name = ${name}
      WHERE email = ${email}
      RETURNING id;
    `;

    if (rows.length === 0) {
      return { success: false, errors: ["Error updating personal details."] };
    }

    const userId = rows[0].id;
    const url = createUrl(name, userId.toString());

    await sql`
      UPDATE "portfolios"
      SET url = ${url}
      WHERE "userId" = ${userId};`;

    return { success: true };
  } catch (error) {
    const err = error as any;
    console.error("SQL Error:", err.message || err);
    return { success: false, errors: [err.message || "Database error"] };
  }
}

/**
 * Gets the portfolio URL for a user.
 * @param {number} id - The user's ID.
 * @returns {Promise<string|null>} The portfolio URL, otherwise null.
 */
export async function getPortfolioUrl(id: number) {
  try {
    const { rows } = await sql`
      SELECT "url" FROM "portfolios" WHERE "userId" = ${id} LIMIT 1;
    `;
    if (rows.length === 0) {
      return null;
    }
    return rows[0].url;
  } catch (error) {
    console.error("Error getting portfolio URL:", error);
    return null;
  }
}

/**
 * Gets the portfolio data for a user.
 * @param {string} name - The user's name.
 * @returns {Promise<Object|null>} The portfolio data, otherwise null.
 */
export async function getPortfolioData(name: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM "portfolios" WHERE "url" = ${name} LIMIT 1;
    `;
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error("Error getting portfolio data:", error);
    return null;
  }
}

/**
 * Updates the header data for a user.
 * @param {number} userId - The user's ID.
 * @param {string} data - The header data.
 * @returns {Promise<Object|null>} The updated header data, otherwise null.
 */
export async function updateHeader(userId: number, data: string) {
  try {
    const { rows } = await sql`
      UPDATE "portfolios"
      SET header = ${data}
      WHERE "userId" = ${userId}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating header:", error);
    return null;
  }
}

/**
 * Gets the navigation data for a user.
 * @param {number} userId - The user's ID.
 * @returns {Promise<string|null>} The navigation data, otherwise null.
 */
export async function getNavigationData(userId: number) {
  try {
    const { rows } = await sql`
      SELECT navigation FROM "portfolios" WHERE "userId" = ${userId} LIMIT 1;
    `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0].navigation;
  } catch (error) {
    console.error("Error getting navigation data:", error);
    return null;
  }
}

/**
 * Updates the navigation theme for a user.
 * @param {number} userId - The user's ID.
 * @param {string} data - The navigation data.
 * @returns {Promise<Object|null>} The updated navigation data, otherwise null.
 */
export async function updateNavigationTheme(userId: number, data: string) {
  try {
    const { rows } = await sql`
      UPDATE "portfolios"
      SET navigation = ${data}
      WHERE "userId" = ${userId}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating navigation theme:", error);
    return null;
  }
}

/**
 * Updates the footer data for a user.
 * @param {number} userId - The user's ID.
 * @param {string} data - The footer data.
 * @returns {Promise<Object|null>} The updated footer data, otherwise null.
 */
export async function updateFooter(userId: number, data: string) {
  try {
    const { rows } = await sql`
      UPDATE "portfolios"
      SET footer = ${data}
      WHERE "userId" = ${userId}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating footer:", error);
    return null;
  }
}

/**
 * Updates the specialities data for a user.
 * @param {number} userId - The user's ID.
 * @param {string} data - The specialities data.
 * @returns {Promise<Object|null>} The updated specialities data, otherwise null.
 */
export async function updateSpecialities(userId: number, data: string) {
  try {
    const { rows } = await sql`
      UPDATE "portfolios"
      SET specialities = ${data}
      WHERE "userId" = ${userId}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating specialities:", error);
    return null;
  }
}

/**
 * Gets the section data for a user.
 * @param {number} userId - The user's ID.
 * @returns {Promise<string|null>} The section data, otherwise null.
 */
export async function getSections(userId: number) {
  try {
    const { rows } = await sql`
      SELECT "specialities", "education", "location" FROM "portfolios" WHERE "userId" = ${userId};
    `;

    if (rows.length === 0) {
      return [];
    }

    return rows.map((row) => ({
      specialities: row.specialities !== null,
      education: row.education !== null,
      location: row.location !== null,
    }));
  } catch (error) {
    console.error("Error getting sections:", error);
    return [];
  }
}

/**
 * Inserts a section for a user.
 * @param {number} userId - The user's ID.
 * @param {string} section - The section name.
 * @param {string} data - The section data.
 * @returns {Promise<Object|null>} The updated portfolio data, otherwise null.
 */
export async function insertSection(
  userId: number,
  section: string,
  data: string
) {
  try {
    const query = `
      UPDATE "portfolios"
      SET "${section}" = $1
      WHERE "userId" = $2
      RETURNING *;
    `;

    const { rows } = await sql.query(query, [data, userId]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error inserting section:", error);
    return null;
  }
}

/**
 * Updates a navigation for a user.
 * @param {number} userId - The user's ID.
 * @param {string} data - The section data.
 * @returns {Promise<Object|null>} The updated navigation data, otherwise null.
 */
export async function updateNavigationData(userId: number, data: string) {
  try {
    const { rows } = await sql`
        UPDATE "portfolios"
        SET "navigation" = ${data}
        WHERE "userId" = ${userId}
        RETURNING *;
      `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating navigation", error);
    return null;
  }
}

/**
 * Updates the education data for a user.
 * @param {number} userId - The user's ID.
 * @param {string} data - The education data.
 * @returns {Promise<Object|null>} The updated education data, otherwise null.
 */
export async function updateEducation(userId: number, data: string) {
  try {
    const { rows } = await sql`
      UPDATE "portfolios"
      SET education = ${data}
      WHERE "userId" = ${userId}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating education:", error);
    return null;
  }
}

/**
 * Removes a section for a user.
 * @param {number} userId - The user's ID.
 * @param {string} section - The section name.
 * @returns {Promise<Object|null>} The updated portfolio data, otherwise null.
 */
export async function removeSection(userId: number, section: string) {
  try {
    const query = `
      UPDATE "portfolios"
      SET "${section}" = NULL
      WHERE "userId" = $1
      RETURNING *;
    `;

    const { rows } = await sql.query(query, [userId]);

    if (rows.length === 0) {
      return { success: false, errors: ["Section not found."] };
    }

    return { success: true };
  } catch (error) {
    console.error("Error removing section:", error);
    return { success: false, errors: ["Database error."] };
  }
}

/**
 * Updates the location data for a user.
 * @param {number} userId - The user's ID.
 * @param {string} data - The location data.
 * @returns {Promise<Object|null>} The updated location data, otherwise null.
 */
export async function updateLocation(userId: number, data: string) {
  try {
    const { rows } = await sql`
      UPDATE "portfolios"
      SET location = ${data}
      WHERE "userId" = ${userId}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating location:", error);
    return null;
  }
}
