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
import type { Metadata } from "next";
import { headers } from "next/headers";
import { generateMetaDescription } from "@/services/metadata/generateMetaDescription";

type Social = {
  name: string;
  link: string;
};

/**
 * This function generates the metadata for the portfolio page.
 * @param {string} params.name - The name of the portfolio.
 * @returns {Metadata} The metadata for the portfolio page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const portfolioData = await getPortfolioData(resolvedParams.name);
  if (!portfolioData) {
    return {
      title: "Not Found | Medical Portfolio's",
      description: "This portfolio does not exist.",
    };
  }

  const acceptedLanguages = (await headers()).get("accept-language") || "en-UK";
  const userLocale = acceptedLanguages.split(",")[0].replace("-", "_");

  const metaDescription = await generateMetaDescription({
    header: portfolioData.header,
    specialities: portfolioData.specialities,
    education: portfolioData.education,
    location: portfolioData.location,
    contact: portfolioData.contact,
    footer: portfolioData.footer,
  });

  return {
    title: `${portfolioData.header.name} | Portfolio | Medical Portfolio's`,
    description: metaDescription,
    alternates: {
      canonical: `https://medical-portfolios.vercel.app/portfolios/${resolvedParams.name}`,
    },
    openGraph: {
      type: "website",
      title: `${portfolioData.header.name} | Portfolio | Medical Portfolio's`,
      description: metaDescription,
      locale: userLocale || "en_UK",
      url: `https://medical-portfolios.vercel.app/portfolios/${resolvedParams.name}`,
      siteName: "Medical Portfolio's",
      images: [
        {
          url: portfolioData.header.image,
          width: 800,
          height: 600,
          alt: `${portfolioData.header.name} | Portfolio | Medical Portfolio's`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${portfolioData.header.name} | Portfolio | Medical Portfolio's`,
      description: metaDescription,
      images: [portfolioData.header.image],
    },
  };
}

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

  const socials: Social[] = portfolioData.footer?.socials || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.header.name,
    description: portfolioData.header.description,
    url: `https://medical-portfolios.vercel.app/portfolios/${resolvedParams.name}`,
    sameAs: socials.map((social) => social.link),
    image: {
      "@type": "ImageObject",
      url: portfolioData.header.image,
      width: 800,
      height: 600,
    },
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </body>
  );
}
