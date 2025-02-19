"use server";

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign up | Medical Portfolios",
    description:
      "Sign up for a Medical Portfolios account to create your professional portfolio and connect with patients.",
  };
}

export default async function Signup() {
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
            <h1 className="blue">{`Sign Up`}</h1>
            <p className="blue">
              {"This is a placeholder for the signup page."}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
