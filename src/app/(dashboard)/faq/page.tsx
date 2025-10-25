import { Metadata } from "next";
import Accordion from "@/components/dashboard/accordion/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Medical Portfolios",
  description:
    "Find answers to common questions about Medical Portfolios, including features, pricing, and support. Our FAQ section is designed to help medical professionals navigate our platform with ease.",
};

export default async function FAQ() {
    return(
        <main className="text-page-container">
            <h1 className="blue bottom-border">{"Frequently Asked Questions"}</h1>
            <section className="half-width-container">
                <Accordion 
                    title="How do I create a portfolio?"
                    content="To create a portfolio, log in to your account and navigate to the 'Portfolio' section. From there, you can add new items, and customize your portfolio to showcase your skills and experiences."
                />
                <Accordion 
                    title="What features are included in the free plan?"
                    content="The free plan includes basic portfolio creation and customization options, access to a limited number of templates, and the ability to share your portfolio with others. For more advanced features, consider upgrading to a premium plan."
                />
                <Accordion
                    title="Who can use Medical Portfolios?"
                    content="Medical Portfolios is designed for all medical professionals, including students, trainees, junior doctors, consultants, and specialists. Whether you're just starting your medical career or are an established practitioner, our platform helps you showcase your expertise and connect with patients."
                />
                <Accordion
                    title="How can patients find me on the platform?"
                    content="Patients can discover specialists based on symptoms and location. When you complete your profile with your specialties, services, and location, you become visible to patients searching for the care you provide. This helps connect you with those who need your expertise most."
                />
                <Accordion
                    title="Is my data secure on Medical Portfolios?"
                    content="Yes, we take data security very seriously. All information is stored securely with industry-standard encryption. Your professional information is kept confidential, and you have full control over what information is visible to patients and peers."
                />
                <Accordion
                    title="Can I update my portfolio after creating it?"
                    content="Absolutely! Your portfolio is designed to grow with your career. You can easily update qualifications, log new experiences, add continuing professional development (CPD) activities, and modify your services at any time through your dashboard."
                />
                <Accordion
                    title="Can other medical professionals view my portfolio?"
                    content="Yes, you can choose to make your portfolio visible to peers within the medical community. This enables professional networking, collaboration opportunities, and sharing of expertise among colleagues while maintaining appropriate privacy controls."
                />
                <Accordion
                    title="What type of content can I add to my portfolio?"
                    content="You can add a wide range of professional content including your qualifications, clinical experience, specialties, services offered, publications, research, presentations, awards, professional memberships, and any other achievements that showcase your medical expertise."
                />
                <Accordion
                    title="Is there a mobile app available?"
                    content="Currently, Medical Portfolios is accessible through any web browser on desktop, tablet, or mobile devices. Our responsive design ensures you can manage your portfolio on the go from any device with an internet connection."
                />
                <Accordion
                    title="How do I make my portfolio stand out?"
                    content="Complete all sections of your profile thoroughly, including a professional photo, detailed experience descriptions, and specific services offered. Regular updates, showcasing unique qualifications, and highlighting patient-centered care approaches help your portfolio stand out to potential patients."
                />
                <Accordion
                    title="What if I need help using the platform?"
                    content="We offer comprehensive support through our help center, email support, and detailed guides. Premium members receive priority support. You can also find tutorials and tips throughout the platform to help you maximize your portfolio's effectiveness."
                />
            </section>
        </main>
    );
}