/**
 * @file Help Page Component
 * @description This page provides information on how to use the Medical Portfolios platform and its features.
 */

import type { Metadata } from "next";

/**
 * Generates metadata for the help page.
 * @returns {Promise<Metadata>} Metadata object containing title and description for SEO purposes.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Help | Medical Portfolios",
    description:
      "Learn how to use the Medical Portfolios platform and its features.",
  };
}

/**
 * Help Page Component
 * @returns {JSX.Element} A page providing information on how to use the Medical Portfolios platform and its features.
 */
export default async function HelpPage() {
  return (
      <main className="text-page-container">
        <section>
          <h1 className="blue bottom-border">{`Help`}</h1>
          <h2 className="blue">{`Getting Started`}</h2>
        <p className="blue">
          {`To begin using the Medical Portfolios platform, sign up and create your account. Once registered, you can start building your professional portfolio.`}
        </p>

        <h2 className="blue">{`Editing Your Portfolio`}</h2>
        <p className="blue">
          {`After signing in, navigate to your dashboard where you find you portfolio. Once here you can add different sections to your portfolio. These sections may include your education, specialities, and more.`}
        </p>

        <h2 className="blue">{`Updating Portfolio Details`}</h2>
        <p className="blue">
          {`To edit or update existing information, simply click on the section you want to modify, make the necessary changes, and save your updates.`}
        </p>

        <h2 className="blue">{`Need More Assistance?`}</h2>
        <p className="blue">
          {`If you encounter any issues or have questions, visit our FAQ section or contact our support team for further assistance.`}
        </p>
        </section>
      </main>
  );
}
