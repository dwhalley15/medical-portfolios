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
import SectionAppender from "@/components/dashboard/editors/sectionAppender";
import Specialities from "@/components/portfolios/specialities/specialities";
import Education from "@/components/portfolios/education/education";
import Location from "@/components/portfolios/location/location";
import Contact from "@/components/portfolios/contact/contact";

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
  let userId = null;

  const portfolioData = await getPortfolioData(resolvedParams.name);

  const session = await auth();

  if (session && portfolioData) {
    signedIn = session.user?.id == portfolioData.userId;
    userId = Number(session.user?.id);
  }

  if (!portfolioData) {
    return <NotFound />;
  }

  return (
    <body>
      <Navigation
        userId={userId!}
        data={portfolioData.navigation}
        editable={signedIn}
      />
      <main className="portfolio-page-container">
        <Header
          data={portfolioData.header}
          editable={signedIn}
          userId={userId!}
        />
        {[
          portfolioData.specialities && {
            component: Specialities,
            data: portfolioData.specialities,
          },
          portfolioData.education && {
            component: Education,
            data: portfolioData.education,
          },
          portfolioData.location && {
            component: Location,
            data: portfolioData.location,
          },
          portfolioData.contact && {
            component: Contact,
            data: portfolioData.contact,
          },
        ]
          .filter(Boolean)
          .sort((a, b) => a!.data.order - b!.data.order)
          .map(({ component: Component, data }) => (
            <Component
              key={data.order}
              data={data}
              editable={signedIn}
              userId={userId!}
            />
          ))}
      </main>
      {signedIn ? (
        <div className="section-appender-container">
          <SectionAppender userIdProp={userId!} />
        </div>
      ) : null}
      <Footer
        userId={userId!}
        data={portfolioData.footer}
        editable={signedIn}
      />
    </body>
  );
}
