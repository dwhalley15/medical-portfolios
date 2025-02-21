/**
 * @file Sign In Page Component
 * @description This page allows users to sign in to their Medical Portfolios account using OAuth providers.
 *              If a user is already authenticated, they are redirected to the dashboard.
 */

"use server";

import { redirect } from "next/navigation";
import { auth } from "@/services/auth/auth";
import OAuthBtn from "@/components/dashboard/auth/oAuthBtn";
import { Metadata } from "next";
import LogoBtn from "@/components/dashboard/navigation/logoBtn";

/**
 * Generates metadata for the sign-in page.
 * @returns {Promise<Metadata>} Metadata object containing title and description for SEO purposes.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign in | Medical Portfolios",
    description:
      "Sign in to your Medical Portfolios account to access your professional portfolio and connect with patients.",
  };
}

/**
 * Sign In Page Component
 * @returns {JSX.Element} A page containing sign-in options with OAuth authentication.
 */
export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="page-container">
        <section className="home-page-container">
          <LogoBtn />
          <div className="container">
            <h1 className="blue">{`Sign In`}</h1>
            <OAuthBtn provider="google" text="Sign in with Google" />
            <OAuthBtn provider="facebook" text="Sign in with Facebook" />
            <OAuthBtn provider="twitter" text="Sign in with Twitter" />
          </div>
        </section>
      </main>
    </>
  );
}
