/**
 * @file This is the search page component. It contains the search form and search results components.
 * @description The search page component is responsible for rendering the search form and search results components.
 */

import SearchForm from "@/components/dashboard/search/SearchForm";
import SearchResults from "@/components/dashboard/search/SearchResults";
import { Metadata } from "next";

/**
 * This function generates the metadata for the search page. 
 * @returns {Promise<Metadata>} The metadata for the search page.
 */
export async function generateMetadata(): Promise<Metadata> {
    return {
      title: "Search | Medical Portfolios",
      description:
        "Search for a medical professional by name or speciality on Medical Portfolios.",
    };
  }

/**
 * This is the search page component. It contains the search form and search results components.
 * @param {Object} searchParams - The search parameters.
 * @returns {JSX.Element} The search page component.
 */  
export default async function Search({
    searchParams,
}: {
    searchParams: Promise <{
        text: string;
        speciality: string;
    }>;
}) {

    const resolvedSearchParams = await searchParams;
    const searchText = resolvedSearchParams?.text?.trim() || "";
    const searchSpeciality = resolvedSearchParams?.speciality?.trim() || "";

  return (
    <main className="search-page-container">
      <section className="search-container">
        <h1 className="blue bottom-border">{"Search"}</h1>
        <h2 className="blue">{"Our medical professional portfolios"}</h2>
        <p className="blue">{"Search for a medical professional by name or speciality"}</p>
        <SearchForm />
        {(searchText || searchSpeciality) && (
          <SearchResults text={searchText} speciality={searchSpeciality} />
        )}
      </section>
    </main>
  );
}
