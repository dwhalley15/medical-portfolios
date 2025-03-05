/** 
 * @file This is the portfolio page.
 * @description This page displays the portfolio page.
*/

import { getPortfolioData } from "../../../../services/db/db";
import NotFound from "../not-found/page";
import { auth } from "@/services/auth/auth";
import Navigation from "../../../../components/portfolios/navigation/navigation";
import Header from "../../../../components/portfolios/header/header";
import Footer from "../../../../components/portfolios/footer/footer";

/**
 * This function returns the portfolio page.
 * @param {string} params.name - The name of the portfolio.
 * @returns {JSX.Element} The portfolio page.
 */
export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = await params;
  let signedIn = false;

  const portfolioData = await getPortfolioData(resolvedParams.name);

  const session = await auth();

  if (session && portfolioData) {
    signedIn = session.user?.id == portfolioData.userId;
  }

  if (!portfolioData) {
    return <NotFound />;
  }

  return (
    <body>
      <Navigation data={portfolioData.navigation} editable={signedIn} />
      <main className="portfolio-page-container">
        <Header data={portfolioData.header} editable={signedIn} />
      </main>
      <Footer data={portfolioData.footer} editable={signedIn} />
    </body>
  );
}
