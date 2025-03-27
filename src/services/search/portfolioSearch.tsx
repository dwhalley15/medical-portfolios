/**
 * @file This is the portfolio search service. It contains the search functionality for portfolios.
 * @description The portfolio search service is responsible for searching portfolios based on search text.
 */

import stringSimilarity from "string-similarity";
import { getAllPortfolios } from "../db/db";

type Speciality = {
  title: string;
  description: string;
  icon: string;
};

const synonymMap: { [key: string]: string[] } = {
  pediatrics: ["child care", "children", "infants", "adolescent medicine"],
  geriatrics: ["elderly care", "senior care", "aging"],
  cardiology: ["heart", "cardiac", "cardiovascular disease"],
  orthopedics: ["bone", "joint", "musculoskeletal", "knee replacement"],
  psychiatry: ["mental health", "counseling", "psychological care"],
  dermatology: ["skin care", "skin disease", "rashes"],
  oncology: ["cancer care", "tumor", "malignancy"],
  urology: ["urinary tract", "bladder", "kidney"],
  endocrinology: ["hormone", "diabetes management", "metabolism"],
  pulmonology: ["lung", "respiratory", "breathing"],
  gastroenterology: ["stomach", "intestine", "digestive system"],
  rheumatology: ["joint disease", "arthritis", "autoimmune"],
  nephrology: ["kidney", "renal", "kidney disease"],
  radiology: ["imaging", "x-ray", "ultrasound"],
  surgery: ["operation", "surgical care", "minimally invasive surgery"],
  trauma: ["fracture care", "injury", "emergency"],
  sports: ["sports medicine", "athlete care", "injury prevention"],
  diabetes: ["chronic disease management", "blood sugar", "insulin"],
  hypertension: ["blood pressure", "heart health", "chronic disease"],
};

/**
 * This function searches portfolios based on search text.
 * @param {string} text - The search text.
 * @returns {Promise<any>} The search results.
 */
export default async function PortfolioSearch(
  text: string,
  page: number = 1,
  pageSize: number = 2
) {
  const portfolios = await getAllPortfolios();

  if (!portfolios || portfolios.length === 0) {
    return null;
  }

  const searchTerm = text?.toLowerCase().trim().replace(/\s+/g, " ") || "";

  // Step 1: Exact matches (searching by name and speciality)
  const exactMatches = portfolios.filter((portfolio) => {
    const portfolioName = portfolio.header.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
    const portfolioSpecialities = portfolio.specialities?.specialities || [];

    const isExactNameMatch = portfolioName.includes(searchTerm);

    const isExactSpecialityMatch = portfolioSpecialities.some(
      (specialityItem: any) =>
        specialityItem.title.toLowerCase().includes(searchTerm)
    );

    return isExactNameMatch || isExactSpecialityMatch;
  });

  if (exactMatches.length > 0) {
    return exactMatches.map((portfolio) => ({
      name: portfolio.header.name,
      url: portfolio.url,
      image: portfolio.header.image,
      description: portfolio.header.description,
    }));
  }

  // Step 2: Exact synonym matches (search term matches synonyms)
  const exactSynonymMatches = portfolios.filter((portfolio) => {
    const portfolioSpecialities = portfolio.specialities?.specialities || [];

    const isExactSynonymMatch = portfolioSpecialities.some(
      (specialityItem: any) =>
        Object.keys(synonymMap).some((speciality) => {
          return (
            specialityItem.title.toLowerCase().includes(speciality) &&
            synonymMap[speciality].includes(searchTerm)
          );
        })
    );

    return isExactSynonymMatch;
  });

  if (exactSynonymMatches.length > 0) {
    return exactSynonymMatches.map((portfolio) => ({
      name: portfolio.header.name,
      url: portfolio.url,
      image: portfolio.header.image,
      description: portfolio.header.description,
    }));
  }

  // Step 3: Fuzzy matching (only for relevant specialties)
  const searchResults = portfolios
    .map((portfolio) => {
      const portfolioSpecialities = portfolio.specialities?.specialities || [];

      const allWords = portfolioSpecialities.flatMap(
        (specialityItem: Speciality) =>
          specialityItem.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ")
            .split(" ")
      );

      const synonymMatchScore = portfolioSpecialities.some(
        (specialityItem: any) =>
          Object.keys(synonymMap).some((speciality) => {
            if (specialityItem.title.toLowerCase().includes(speciality)) {
              return synonymMap[speciality].some(
                (synonym) =>
                  stringSimilarity.compareTwoStrings(
                    specialityItem.title.toLowerCase(),
                    synonym
                  ) > 0.9 || synonym.includes(searchTerm)
              );
            }
            return false;
          })
      )
        ? 1.0
        : 0.0;

      const matchesSearch = searchTerm
        .split(" ")
        .every((word) =>
          allWords.some(
            (portfolioWord: any) =>
              portfolioWord === word ||
              Object.keys(synonymMap).some((speciality) =>
                synonymMap[speciality].some(
                  (synonym) =>
                    stringSimilarity.compareTwoStrings(portfolioWord, synonym) >
                    0.7
                )
              )
          )
        );

      return {
        portfolio,
        score: synonymMatchScore,
        matchesSearch,
      };
    })
    .filter(({ matchesSearch }) => matchesSearch)
    .sort((a, b) => b.score - a.score)
    .map(({ portfolio }) => ({
      name: portfolio.header.name,
      url: portfolio.url,
      image: portfolio.header.image,
      description: portfolio.header.description,
    }));

  const totalResults = searchResults.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = searchResults.slice(startIndex, endIndex);

  return {
    results: paginatedResults,
    totalResults,
  };
}
