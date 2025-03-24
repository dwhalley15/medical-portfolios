/**
 * @file Portfolio Button
 * @description This file defines a button component for navigating to a user's portfolio.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

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
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  if (!portfolioUrl) {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_PUBLIC_URL;

  /**
   * @function handleCopy
   * @description Copies the portfolio link to the user's clipboard.
   * @returns {void}
   */
  const handleCopy = () => {
    navigator.clipboard
      .writeText(`${url}/portfolios/${portfolioUrl}`)
      .then(() => setCopySuccess("Link copied to clipboard!"))
      .catch(() => setCopySuccess("Failed to copy link."));
  };

  return (
    <div className="container">
      <Link
        href={`/portfolios/${portfolioUrl}`}
        aria-label="Go to Portfolio page"
        role="button"
        className="link-text blue"
        target="_blank"
        rel="noopener noreferrer"
      >
        {`Click here to visit your portfolio page`}
      </Link>
      <div className="container btn-width">
        <button
          onClick={handleCopy}
          aria-label="Copy portfolio link"
          className="btn shadow-border blue-background btn-text white"
        >
          {"Copy Link"}
          <FontAwesomeIcon icon={faCopy} aria-hidden="true" />
        </button>

        {copySuccess && <span className="blue normal-text">{copySuccess}</span>}

        <div className="button-container">
          <span className="blue normal-text">{"Share on:"}</span>

          <FacebookShareButton
            url={`${url}/portfolios/${portfolioUrl}`}
            htmlTitle="Check out my portfolio!"
            title="Check out my portfolio!"
            hashtag="#medicalportfolios"
            className="share-btn facebook-icon-color"
          >
            <FontAwesomeIcon icon={faFacebook} aria-hidden="true" />
          </FacebookShareButton>

          <TwitterShareButton
            url={`${url}/portfolios/${portfolioUrl}`}
            htmlTitle="Check out my portfolio!"
            title="Check out my portfolio!"
            className="share-btn"
          >
            <FontAwesomeIcon icon={faXTwitter} aria-hidden="true" />
          </TwitterShareButton>

          <LinkedinShareButton
            url={`${url}/portfolios/${portfolioUrl}`}
            htmlTitle="Check out my portfolio!"
            title="Check out my portfolio!"
            summary="Check out my portfolio!"
            source={`${url}/portfolios/${portfolioUrl}`}
            className="share-btn facebook-icon-color"
          >
            <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
}
