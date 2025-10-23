import type { Metadata } from "next";
import Footer from "@/components/dashboard/footer/footer";
import Navbar from "@/components/dashboard/navigation/navbar";

export const metadata: Metadata = {
  title:
    "Build Your Medical Portfolio | Connect with Patients and Expand Your Reach",
  description:
    "Create a professional medical portfolio and connect with patients through a user-friendly platform. Build your profile, share your experience, and expand your reach in the medical field.",
};

export default function NotFoundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
