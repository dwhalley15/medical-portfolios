/**
 * @file Authentication Actions
 * @description This file defines server-side authentication functions for signing in with
 *              various OAuth providers and logging out. These functions facilitate user
 *              authentication and session management.
 */

"use server";

import { signIn, signOut } from "../../../services/auth/auth";

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
