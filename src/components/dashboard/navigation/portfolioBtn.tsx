/**
* @file Portfolio Button
* @description This file defines a button component for navigating to a user's portfolio.
*/

"use client";

import { getPortfolioUrl } from "@/services/db/db";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type PortfolioBtnProps = {
  id: number;
};

/**
 * @function PortfolioBtn
 * @description A button component for navigating to a user's portfolio.
 * @param {PortfolioBtnProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function PortfolioBtn({ id }: PortfolioBtnProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    getPortfolioUrl(id).then((url) => setUrl(url));
  }, [id]);

  return (
    <Link
      href={`/portfolios/${url}`}
      aria-label="Go to Portfolio page"
      role="button"
    >
      <Image
        src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/stethascope-JosqpnjSpMuNJlFlsJFAocilefG2PQ.jpg"
        alt="An Image of a Stethascope"
        width={400}
        height={400}
        priority
        quality={100}
      />
    </Link>
  );
}
