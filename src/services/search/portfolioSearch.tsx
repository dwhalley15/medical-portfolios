/**
 * @file This is the portfolio search service. It contains the search functionality for portfolios.
 * @description The portfolio search service is responsible for searching portfolios based on text and speciality.
 */

import stringSimilarity from "string-similarity";
import { getAllPortfolios } from "../db/db";

type Speciality = {
  title: string;
  description: string;
  icon: string;
};

const specialitySynonyms: { [key: string]: string[] } = {
  cardiology: ["cardiovascular disease prevention", "heart", "cardiac"],
  "internal medicine": ["adult care", "general medicine", "physician"],
  diabetes: ["diabetes & hypertension management", "chronic disease"],
  hypertension: ["diabetes & hypertension management", "blood pressure"],
  geriatrics: ["geriatric medicine", "elderly care", "senior care"],
  "preventive care": ["preventive care & wellness", "health screenings"],
  "chronic disease": ["chronic disease management", "long-term care"],
  "primary care": ["family medicine", "general practitioner"],
  pediatrics: ["child care", "children", "infants"],
  "obstetrics-gynecology": ["ob-gynecology", "obstetrics", "gynecology"],
  oncology: ["cancer care", "tumor", "malignancy"],
  radiology: ["imaging", "x-ray", "ultrasound"],
  "surgery-general": ["general surgery", "surgical care", "operation"],
  urology: ["urinary tract", "kidney", "bladder"],
  orthopedics: ["bone", "joint", "muscle"],
  otolaryngology: ["ear, nose, throat", "ENT", "head and neck"],
  ophthalmology: ["eye care", "vision", "eye disease"],
  neurology: ["brain", "nervous system", "neurological disorder"],
  psychiatry: ["mental health", "psychological care", "mind"],
  dermatology: ["skin care", "skin disease", "dermatologist"],
  endocrinology: ["hormone", "endocrine system", "metabolism"],
  gastroenterology: ["digestive system", "stomach", "intestine"],
  hematology: ["blood", "blood disease", "blood disorder"],
  "infectious-disease": ["infection", "infectious disease", "virus"],
  nephrology: ["kidney", "renal", "kidney disease"],
  pulmonology: ["lung", "respiratory", "breathing"],
  rheumatology: ["joint disease", "autoimmune", "arthritis"],
};

/**
 * This function searches portfolios based on text and speciality.
 * @param {string} text - The search text.
 * @param {string} speciality - The search speciality.
 * @returns {Promise<Array>} The search results.
 */
export default async function PortfolioSearch(
  text: string,
  speciality: string
) {
  const portfolios = await getAllPortfolios();

  if (!portfolios || portfolios.length === 0) {
    return null;
  }

  const searchTerm = text?.toLowerCase().trim().replace(/\s+/g, " ") || "";
  const searchSpeciality = speciality?.toLowerCase().trim() || "";

  const searchResults = portfolios
    .map((portfolio) => {
      const portfolioName = portfolio.header.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

      const portfolioSpecialities = portfolio.specialities?.specialities || [];

      const matchesName = searchTerm
        ? searchTerm.split(" ").every((word) => portfolioName.includes(word))
        : true;

      let bestMatchScore = 0;
      const matchesSpeciality = searchSpeciality
        ? portfolioSpecialities.some((specialityItem: Speciality) => {
            const specialityTitle = specialityItem.title
              .toLowerCase()
              .trim()
              .replace(/\s+/g, " ");

            let similarity = stringSimilarity.compareTwoStrings(
              specialityTitle,
              searchSpeciality
            );

            const synonyms = specialitySynonyms[searchSpeciality] || [];
            for (const synonym of synonyms) {
              const synonymSimilarity = stringSimilarity.compareTwoStrings(
                specialityTitle,
                synonym
              );
              if (synonymSimilarity > similarity) {
                similarity = synonymSimilarity;
              }
            }

            if (similarity > bestMatchScore) {
              bestMatchScore = similarity;
            }
            return similarity >= 0.4;
          })
        : true;

      return {
        portfolio,
        score: bestMatchScore,
        matchesName,
        matchesSpeciality,
      };
    })

    .filter(
      ({ matchesName, matchesSpeciality }) => matchesName && matchesSpeciality
    )
    .sort((a, b) => b.score - a.score)
    .map(({ portfolio }) => ({
      name: portfolio.header.name,
      url: portfolio.url,
      image: portfolio.header.image,
      description: portfolio.header.description,
    }));

  return searchResults;
}
