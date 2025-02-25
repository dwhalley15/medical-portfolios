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
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
            <h1 className="blue bottom-border">{`Sign Up`}</h1>
            <OAuthBtn provider="google" text="Sign up with Google" />
            <OAuthBtn provider="facebook" text="Sign up with Facebook" />
            <div className="divider-container">
              <hr className="divider-line grey" />
              <span className="normal-text grey">{"Or sign up manually"}</span>
              <hr className="divider-line grey" />
            </div>
            <Link
              className="btn blue-background white btn-width shadow-border btn-text"
              href="/signup/manually"
              role="button"
              aria-label="Sign up manually"
            >
              {"Sign Up Manually"}
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
