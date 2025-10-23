/**
 * @file Root Layout Component
 * @description This is the root layout for the entire application. It wraps all pages.
 */
import { Funnel_Display } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/global-styles.css";
import "../styles/container-styles.css";
import "../styles/image-styles.css";
import "../styles/border-styles.css";
import "../styles/text-styles.css";
import "../styles/button-styles.css";
import "../styles/colour-styles.css";
import "../styles/theme-styles.css";

const funnel = Funnel_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={funnel.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}