/**
 * @file Sign-Up Page Component
 * @description This page allows users to sign up for a Medical Portfolios account manually.
 *              If the user is already authenticated, they are redirected to the dashboard.
 */

"use server";

import { redirect } from "next/navigation";
import { auth } from "@/services/auth/auth";
import { Metadata } from "next";
import SignUpForm from "@/components/dashboard/auth/signUpForm";

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
 * Sign-Up Page Component
 * @returns {JSX.Element} A page for new users to manually sign up for Medical Portfolios.
 */
export default async function SignupManually() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="page-container">
        <section className="container">
          <h1 className="blue bottom-border align-center">{"Sign Up"}</h1>
          <SignUpForm />
        </section>
      </main>
    </>
  );
}
