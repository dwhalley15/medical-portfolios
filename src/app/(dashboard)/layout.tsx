/**
 * @file Dashboard Layout Component
 * @description This component provides the layout for the dashboard pages, including the navigation bar and footer.
 */

import type { Metadata } from "next";
import Footer from "@/components/dashboard/footer/footer";
import Navbar from "@/components/dashboard/navigation/navbar";

/**
 * This function generates the metadata for the dashboard layout.
 * @returns {Metadata} The metadata for the dashboard layout.
 */
export const metadata: Metadata = {
  title:
    "Build Your Medical Portfolio | Connect with Patients and Expand Your Reach",
  description:
    "Create a professional medical portfolio, showcase your expertise, and connect with patients through an intuitive platform designed for healthcare professionals.",
  alternates: {
    canonical: `https://medical-portfolios.vercel.app/`,
  },
  openGraph: {
    title:
      "Build Your Medical Portfolio | Connect with Patients and Expand Your Reach",
    description:
      "Create a professional medical portfolio, showcase your expertise, and connect with patients through an intuitive platform designed for healthcare professionals.",
    url: `https://medical-portfolios.vercel.app`,
    type: "website",
    locale: "en_UK",
    siteName: "Medical Portfolio's",
    images: [
      {
        url: "https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-high-resolution-logo-transparent-ubKJM3sDU8cuICdOw8O3I5u8xuCdx9.png",
        width: 800,
        height: 600,
        alt: "Medical Portfolio's Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Build Your Medical Portfolio | Connect with Patients and Expand Your Reach",
    description:
      "Create a professional medical portfolio, showcase your expertise, and connect with patients through an intuitive platform designed for healthcare professionals.",
    images: [
      "https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-high-resolution-logo-transparent-ubKJM3sDU8cuICdOw8O3I5u8xuCdx9.png",
    ],
  },
};

/**
 * Dashboard Layout Component
 * @param {React.ReactNode} children - The children components to render.
 * @returns {JSX.Element} The dashboard layout component.
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Medical Portfolio's",
    description:
      "Create a professional medical portfolio, showcase your expertise, and connect with patients through an intuitive platform designed for healthcare professionals.",
    url: `https://medical-portfolios.vercel.app`,
    image: {
      "@type": "ImageObject",
      url: "https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-high-resolution-logo-transparent-ubKJM3sDU8cuICdOw8O3I5u8xuCdx9.png",
      width: 800,
      height: 600,
    },
  };

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
