/**
 * @file Logo Button Component
 * @description A client-side component that renders the Medical Portfolio logo
 *              as a clickable button linking to the home page.
 */

import Link from "next/link";
import Image from "next/image";

/**
 * LogoBtn Component
 * @description Displays the Medical Portfolio logo, which serves as a navigation button
 *              redirecting users to the home page when clicked.
 * @returns {JSX.Element} A clickable logo component linking to the home page.
 */
export default function LogoBtn() {
  return (
    <div className="image-container left-border">
      <Link href="/" aria-label="Go to Home page" role="button">
        <Image
          className="home-page-logo"
          src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-high-resolution-logo-transparent-ubKJM3sDU8cuICdOw8O3I5u8xuCdx9.png"
          alt="Medical portfolio logo"
          width={400}
          height={400}
          priority
          quality={100}
        />
      </Link>
    </div>
  );
}
