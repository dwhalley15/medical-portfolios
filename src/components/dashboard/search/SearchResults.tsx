/**
 * @file This is the search results component. It contains the search results for the search page.
 * @description The search results component is responsible for rendering the search results for the search page.
 */

"use client";

import { useState, useEffect } from "react";
import PortfolioSearch from "@/services/search/portfolioSearch";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type SearchResultsProps = {
  text: string;
  page: number;
};

/**
 * This function renders the search results for the search page.
 * @param {Object} searchParams - The search parameters.
 * @returns {JSX.Element} The search results component.
 */
export default function SearchResults({
  text,
  page,
}: SearchResultsProps) {
  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pageSize = 5; 

  /**
   * This function fetches the search results based on the search text and page number.
   * @returns {void}
   */
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const response = await PortfolioSearch(text, page, pageSize);
      if (response && Array.isArray(response)) {
        setResults(response);
        setTotalResults(response.length);
      } else if (response && response.results && response.totalResults) {
        setResults(response.results);
        setTotalResults(response.totalResults);
      } else {
        setResults([]);
        setTotalResults(0);
      }
      setLoading(false);
    };
    fetchResults();
  }, [text, page]);

  if (loading) {
    return <p className="blue">{"Loading..."}</p>;
  }

  if (!results || results.length === 0) {
    return <p className="blue">{"No results found"}</p>;
  }

  const totalPages = Math.ceil(totalResults / pageSize);

  /**
   * This function handles the page change.
   * @param newPage - The new page number.
   * @returns {void}
   */
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`?text=${text}&page=${newPage}`);
    }
  };

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
        {results.map((portfolio, index) => (
          <Link
            href={`portfolios/${portfolio.url}`}
            key={index}
            className="portfolio-card-container shadow-border portfolio-card-text"
            target="_blank"
            rel="noopener noreferrer"
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

      {totalPages > 1 && (
        <div className="pagination-container">

          {page > 1 && (
            <button
              className="pagination-button blue"
              onClick={() => handlePageChange(page - 1)}
              role="button"
              aria-label="Previous page"
            >
              <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
            </button>
          )}

          <span className="normal-text blue">
            {`Page ${page} of ${totalPages}`}
          </span>

          {page < totalPages && (
            <button
              className="pagination-button blue"
              onClick={() => handlePageChange(page + 1)}
              role="button"
              aria-label="Next page"
            >
              <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
