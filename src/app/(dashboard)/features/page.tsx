import Content from "@/components/dashboard/content/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Medical Portfolios",
  description:
    "Discover the powerful features of Medical Portfolios, designed to help medical professionals create and showcase their expertise with ease. From customizable profiles to secure data handling, explore how our platform can enhance your professional presence online.",
};

export default async function Features() {
    return(
        <main className="text-page-container">
            <h1 className="blue bottom-border">{"Features"}</h1>
            <Content
                Title="Comprehensive Profile Creation"
                Text="Easily create and customize your medical portfolio with sections for qualifications, experience, specialties, and patient testimonials."
                ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/doctor-on-laptop.jpg"
                ImageAlt="Illustration of a doctor creating a professional profile on a laptop"
                ImageLeft={false}
                LinkUrl="/signup"
                LinkText="Join Now"
            />

            <Content
                Title="Secure Data Handling"
                Text="Your privacy is our priority. We implement robust security measures to protect your personal and professional information."
                ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/cyber-security.jpg"
                ImageAlt="Illustration of secure data handling with a lock and shield"
                ImageLeft={true}
                LinkUrl="/privacy-policy"
                LinkText="Learn More"
            />

            <Content
                Title="User-Friendly Interface"
                Text="Our intuitive platform allows you to build and manage your portfolio effortlessly, with a focus on user-friendly features and easy navigation."
                ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/doctor-in-practice.jpg"
                ImageAlt="Illustration of a user-friendly interface with a person using a tablet"
                ImageLeft={false}
                LinkUrl="/signup"
                LinkText="Join Now"
            />

            <Content
                Title="AI Powered SEO Optimization"
                Text="Enhance your online visibility with AI-driven SEO tools that help your portfolio reach a wider audience of potential patients and collaborators."
                ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/seo-performance.jpg"
                ImageAlt="Illustration of AI powered SEO optimization with graphs and charts"
                ImageLeft={true}
                LinkUrl="/signup"
                LinkText="Discover SEO Tools"
            />
        </main>
    );
}