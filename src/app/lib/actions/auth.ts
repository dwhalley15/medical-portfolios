/**
 * @file Authentication Actions
 * @description This file defines server-side authentication functions for signing in with
 *              various OAuth providers and logging out. These functions facilitate user
 *              authentication and session management.
 */

"use server";

import { signIn, signOut } from "../../../services/auth/auth";
import { createUser, checkUserByEmail } from "../../../services/db/db";
import bcrypt from "bcryptjs";

/**
 * Signs in the user using GitHub authentication and redirects them to the dashboard.
 * @returns {Promise<void>} A promise that resolves after authentication.
 */
export const githubLogin = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

/**
 * Signs in the user using Google authentication and redirects them to the dashboard.
 * @returns {Promise<void>} A promise that resolves after authentication.
 */
export const googleLogin = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};

/**
 * Signs in the user using Facebook authentication and redirects them to the dashboard.
 * @returns {Promise<void>} A promise that resolves after authentication.
 */
export const facebookLogin = async () => {
  await signIn("facebook", { redirectTo: "/dashboard" });
};

/**
 * Signs in the user using Twitter authentication and redirects them to the dashboard.
 * @returns {Promise<void>} A promise that resolves after authentication.
 */
export const twitterLogin = async () => {
  await signIn("twitter", { redirectTo: "/dashboard" });
};

/**
 * Logs out the user and redirects them to the home page.
 * @returns {Promise<void>} A promise that resolves after the user is signed out.
 */
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const credentialsLogin = async (credentials: FormData) => {
  try {
    const result: { error?: string } = await signIn(
      "credentials",
      credentials,
      { redirectTo: "/dashboard" }
    );

    if (result?.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." };
  }
};

export const signUp = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("password-confirm") as string;

  const errors: string[] = [];

  if (
    !title ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    errors.push("All fields are required.");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Invalid email address.");
  }

  const existingUser = await checkUserByEmail(email);
  if (existingUser) {
    errors.push("Email address is already in use.");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  const passwordStrengthRegEx =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~-]).{8,}$/;
  if (!passwordStrengthRegEx.test(password)) {
    errors.push(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character."
    );
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${title} ${firstName} ${lastName}`;
    const user = await createUser(email, hashedPassword, fullName);

    if (!user) {
      return { success: false, errors: ["User creation failed."] };
    }

    return { success: true, redirectTo: "/dashboard" };
  } catch (error) {
    return {
      success: false,
      errors: ["An unexpected error occurred. Please try again."],
    };
  }
};
