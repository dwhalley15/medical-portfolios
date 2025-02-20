/**
 * @file Auth API Route Handler
 * @description This file exports authentication request handlers for GET and POST requests.
 *              These handlers manage authentication-related operations such as login and session validation.
 */

import { handlers } from "@/services/auth/auth";

/**
 * Exports authentication handlers for GET and POST requests.
 * These handlers are provided by the authentication service and are used to process authentication-related requests.
 */
export const { GET, POST } = handlers;
