/**
 * @file Sign Up Page Component
 * @description This page allows users to sign up for a Medical Portfolios account using OAuth providers.
 *              If a user is already authenticated, they are redirected to the dashboard.
 */

"use server";

import { redirect } from "next/navigation";
import { auth } from "@/services/auth/auth";
import OAuthBtn from "@/components/dashboard/auth/oAuthBtn";
import { Metadata } from "next";
import LogoBtn from "@/components/dashboard/navigation/logoBtn";

/**
 * Generates metadata for the sign-up page.
 * @returns {Promise<Metadata>} Metadata object containing title and description for SEO purposes.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign up | Medical Portfolios",
    description:
      "Sign up for a Medical Portfolios account to create your professional portfolio and connect with patients.",
  };
}

/**
 * Sign Up Page Component
 * @returns {JSX.Element} A page containing sign-up options with OAuth authentication.
 */
export default async function Signup() {
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
            <h1 className="blue">{`Sign Up`}</h1>
            <OAuthBtn provider="google" text="Sign up with Google" />
            <OAuthBtn provider="facebook" text="Sign up with Facebook" />
          </div>
        </section>
      </main>
    </>
  );
}
