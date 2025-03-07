/**
 * @file Authentication Configuration
 * @description This file sets up authentication using NextAuth with multiple providers, including GitHub, Google, Facebook, Twitter, and email/password credentials.
 *              It defines authentication handlers, JWT callbacks, session management, and integrates with a PostgreSQL database using an adapter.
 */

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";
import { checkUser } from "../db/db";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";

/**
 * Initializes NextAuth authentication with various providers and database adapter.
 *
 * @returns {Object} NextAuth authentication configuration including providers, session management, and JWT handling.
 */
export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  const adapter = PostgresAdapter(pool);
  return {
    adapter,
    providers: [
      /**
       * Configures email/password authentication.
       *
       * @returns {Object|null} Returns authenticated user object if credentials are valid, otherwise null.
       */
      Credentials({
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          if (!email || !password) {
            return { error: "Email and password are required" };
          }
          const user = await checkUser(email, password!);

          if (!user) {
            return { error: "Invalid credentials" };
          }

          return user;
        },
      }),
      GitHubProvider({
        clientId: process.env.AUTH_GITHUB_ID!,
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
      }),
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
      FacebookProvider({
        clientId: process.env.AUTH_FACEBOOK_ID!,
        clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
      }),
      TwitterProvider({
        clientId: process.env.AUTH_X_ID!,
        clientSecret: process.env.AUTH_X_SECRET!,
      }),
    ],
    callbacks: {
      /**
       * Customizes JWT handling for credential-based authentication.
       *
       * @param {Object} params - The JWT parameters including token and account information.
       * @returns {Object} The updated token.
       */
      async jwt({ token, account }) {
        if (account?.provider === "credentials") {
          token.credentials = true;
        }
        return token;
      },
    },

    jwt: {
      /**
       * Handles JWT encoding, creating custom session tokens for credential-based authentication.
       *
       * @param {Object} params - Parameters containing the JWT token and session details.
       * @returns {Promise<string>} The encoded JWT token or custom session token.
       */
      encode: async function (params) {
        if (params.token?.credentials) {
          const sessionToken = uuid();

          if (!params.token.sub) {
            throw new Error("No user ID found in token");
          }

          const createdSession = await adapter?.createSession?.({
            sessionToken: sessionToken,
            userId: params.token.sub,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });

          if (!createdSession) {
            throw new Error("Session creation failed");
          }

          return sessionToken;
        }

        return encode(params);
      },
    },
  };
});
