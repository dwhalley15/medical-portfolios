/**
 * @file Portfolio Button
 * @description This file defines a button component for navigating to a user's portfolio.
 */

import Link from "next/link";
import Image from "next/image";

type PortfolioBtnProps = {
  portfolioUrl: string | null;
};

/**
 * @function PortfolioBtn
 * @description A button component for navigating to a user's portfolio.
 * @param {PortfolioBtnProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function PortfolioBtn({ portfolioUrl }: PortfolioBtnProps) {

  if(!portfolioUrl) {
    return null;
  }

  return (
    <Link
      href={`/portfolios/${portfolioUrl}`}
      aria-label="Go to Portfolio page"
      role="button"
    >
      <Image
        src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/stethascope-JosqpnjSpMuNJlFlsJFAocilefG2PQ.jpg"
        alt="An Image of a Stethascope"
        className="shadow-border"
        width={400}
        height={400}
        priority
        quality={100}
      />
    </Link>
  );
}
