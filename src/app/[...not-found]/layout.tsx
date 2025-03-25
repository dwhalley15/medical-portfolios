import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/global-styles.css";
import "../../styles/container-styles.css";
import "../../styles/image-styles.css";
import "../../styles/border-styles.css";
import "../../styles/text-styles.css";
import "../../styles/button-styles.css";
import "../../styles/colour-styles.css";
import "../../styles/button-styles.css";
import Footer from "@/components/dashboard/footer/footer";
import Navbar from "@/components/dashboard/navigation/navbar";

const funnel = Funnel_Display({
  weight: "400",
  subsets: ["latin"],
});

config.autoAddCss = false;

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
    <html lang="en">
      <body className={`${funnel.className}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
