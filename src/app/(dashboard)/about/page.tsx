/**
 * @file About Page Component
 * @description This page provides an overview of the Medical Portfolios platform, its purpose, and the university project behind its development.
 */

import type { Metadata } from "next";

/**
 * Generates metadata for the about page.
 * @returns {Promise<Metadata>} Metadata object containing title and description for SEO purposes.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | Medical Portfolios",
    description:
      "Learn more about the Medical Portfolios platform, its purpose, and the university project behind its development.",
  };
}

/**
 * About Page Component
 * @returns {JSX.Element} A page displaying information about the Medical Portfolios platform and its development.
 */
export default async function AboutPage() {
  return (
    <main className="text-page-container">
      <section>
        <h1 className="blue bottom-border">{`About`}</h1>
        <h2 className="blue">{`Empowering Medical Professionals`}</h2>
        <p className="blue">
          {`Welcome to our Medical Portfolio platform, designed to empower medical professionals by providing an intuitive space to showcase their expertise, achievements, and career journey. Our platform allows doctors, nurses, and healthcare practitioners to create personalized portfolios that highlight their skills, certifications, and clinical experience. This tool is especially useful for demonstrating competencies during career progression and revalidation.`}
        </p>
        <h2 className="blue">{`Addressing Gaps in Medical E-Portfolios`}</h2>
        <p className="blue">
          {`In addition to being a valuable resource for medical professionals, this platform is also part of an ongoing university project aimed at exploring innovative ways to streamline medical e-portfolios. Our goal is to address existing gaps in traditional portfolio systems, such as limited flexibility and lack of user-centric design, by offering a more modern and efficient solution.`}
        </p>
        <h2 className="blue">{`A University Project with Real-World Impact`}</h2>
        <p className="blue">
          {`By combining academic research with real-world application, this project aims to create a platform that not only meets the professional needs of healthcare providers but also contributes to advancements in digital portfolio management within the medical field.`}
        </p>
        <h2 className="blue">{`Join Us in Building the Future of Medical Portfolios`}</h2>
        <p className="blue">
          {`We invite medical professionals, students, and industry experts to join us on this journey of innovation and collaboration. Together, we can shape the future of medical portfolios and create a more efficient, user-friendly, and impactful tool for healthcare professionals worldwide.`}
        </p>
      </section>
    </main>
  );
}
