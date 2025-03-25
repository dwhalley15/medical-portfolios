/**
 * @file This is the search results component. It contains the search results for the search page.
 * @description The search results component is responsible for rendering the search results for the search page.
 */

import PortfolioSearch from "@/services/search/portfolioSearch";
import Link from "next/link";
import Image from "next/image";

type SearchResultsProps = {
  text: string;
  speciality: string;
};

/**
 * This function renders the search results for the search page.
 * @param {Object} searchParams - The search parameters.
 * @returns {JSX.Element} The search results component.
 */
export default async function SearchResults({
  text,
  speciality,
}: SearchResultsProps) {
  const searchResults = await PortfolioSearch(text, speciality);
  if (!searchResults || searchResults.length === 0) {
    return <p className="blue">{"No results found"}</p>;
  }

  /**
   * This function truncates the description of a portfolio.
   * @param description - The description of the portfolio.
   * @returns {JSX.Element} The truncated description.
   */
  const truncatedDescription = (description: string) => {
    const MAX_LENGTH = 200;
    if (description.length > MAX_LENGTH) {
      return (
        <>
          {description.substring(0, MAX_LENGTH)}
          <strong className="blue">{"...click to read more"}</strong>
        </>
      );
    }
    return description;
  };

  return (
    <>
      <h2 className="blue bottom-border" id="search-results">
        {"Search Results"}
      </h2>
      <div className="portfolio-card-list-container">
        {searchResults.map((portfolio, index) => (
          <Link
            href={`portfolios/${portfolio.url}`}
            key={index}
            className="portfolio-card-container shadow-border portfolio-card-text"
          >
            <Image
              src={portfolio.image}
              alt={portfolio.name}
              width={200}
              height={200}
              className="portfolio-card-image"
              quality={100}
              priority
            />
            <div>
              <h3 className="blue portfolio-card-title">{portfolio.name}</h3>
              <p className="blue">
                {truncatedDescription(portfolio.description)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
