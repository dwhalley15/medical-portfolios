/**
 * @file This is the metadata service.
 * @description This service generates the meta description for the portfolio page.
 */

import { Configuration, OpenAIApi } from "openai";

type MetaDescriptionData = {
  header: HeaderData;
  specialities: SpecialitiesData | null;
  education: EducationData | null;
  location: LocationData | null;
  contact: ContactData | null;
  footer: FooterData | null;
};

type HeaderData = {
  image: string;
  name: string;
  description: string;
};

type SpecialitiesData = {
  title: string;
  description: string;
  specialities: Speciality[];
};

type Speciality = {
  title: string;
  description: string;
};

type EducationData = {
  title: string;
  description: string;
  education: Education[];
};

type Education = {
  title: string;
  location: string;
  description: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
};

type LocationData = {
  title: string;
  description: string;
  location: Location[];
};

type Location = {
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  website: string;
};

type ContactData = {
  title: string;
  description: string;
  contact: Contact;
};

type Contact = {
  email: string;
  phone: string;
  locationLat: string;
  locationLong: string;
  message: string;
};

type FooterData = {
  socials: Social[];
};

type Social = {
  name: string;
  link: string;
};

/**
 * This function generates the meta description for the portfolio page.
 * @param {MetaDescriptionData} data - The portfolio data.
 * @returns {Promise<string>} The generated meta description.
 */
export async function generateMetaDescription({
  header,
  specialities,
  education,
  location,
  contact,
  footer,
}: MetaDescriptionData) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY!,
  });
  const openai = new OpenAIApi(configuration);
  const metaData = `
    Name: ${header.name}
    Description: ${header.description}

    ${
      specialities
        ? `Specialities: ${specialities.specialities
            .map((s) => `${s.title} - ${s.description}`)
            .join(", ")}`
        : ""
    }

    ${
      education
        ? `Education: ${education.education
            .map(
              (e) =>
                `${e.title} at ${e.location} (${e.startDate || "N/A"} - ${
                  e.endDate || "Present"
                })`
            )
            .join(", ")}`
        : ""
    }

    ${
      location
        ? `Location: ${location.location
            .map((l) => `${l.city}, ${l.state}, ${l.country}`)
            .join(", ")}`
        : ""
    }

    ${
      contact
        ? `Contact: ${contact.contact.email}, ${contact.contact.phone}`
        : ""
    }
    
    ${
      footer
        ? `Socials: ${footer.socials
            .map((s) => `${s.name} (${s.link})`)
            .join(", ")}`
        : ""
    }
  `.trim();

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in SEO. Generate a concise and engaging meta description from the given portfolio data. It must be **exactly 160 characters or fewer**. Do NOT exceed this limit. If necessary, truncate or rephrase the text to fit within 160 characters.",
        },
        {
          role: "user",
          content: `Here is the data:\n${metaData}`,
        },
      ],
      max_tokens: 60,
      temperature: 0.7,
    });

    const generatedDescription =
      response.data?.choices?.[0]?.message?.content?.trim() ??
      header.description;

    return generatedDescription.length > 160
      ? generatedDescription.slice(0, 157) + "..."
      : generatedDescription;
  } catch (error) {
    console.error("Error generating meta description:", error);
    return header.description;
  }
}
