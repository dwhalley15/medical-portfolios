"use server";

import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/services/auth/auth";
import GoogleSignInBtn from "@/components/dashboard/auth/googleSignInBtn";
import FacebookSignInBtn from "@/components/dashboard/auth/facebookSignInBtn";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign in | Medical Portfolios",
    description:
      "Sign in to your Medical Portfolios account to access your professional portfolio and connect with patients.",
  };
}

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="page-container">
        <section className="home-page-container">
          <div className="image-container left-border">
            <Link href="/">
              <Image
                className="home-page-logo"
                src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-high-resolution-logo-transparent-ubKJM3sDU8cuICdOw8O3I5u8xuCdx9.png"
                alt="Medical portfolio logo in high resolution with a transparent background"
                width={400}
                height={400}
                priority
                quality={100}
              />
            </Link>
          </div>
          <div className="container">
            <h1 className="blue">{`Sign In`}</h1>
            <GoogleSignInBtn />
            <FacebookSignInBtn />
          </div>
        </section>
      </main>
    </>
  );
}
