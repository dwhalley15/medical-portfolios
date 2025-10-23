/**
 * @file Home Page Component
 * @description This is the main landing page for the platform. It provides an overview
 *              of the platform's purpose and includes navigation links for user authentication.
 */

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import LogoBtn from "@/components/dashboard/navigation/logoBtn";
import Content from "@/components/dashboard/content/content";

/**
 * Home Page Component
 * @returns {JSX.Element} The main landing page with a logo, description, and login/signup buttons.
 */
export default async function Home() {
  return (
    <>
      <main className="page-container">
        <section className="home-page-container">
          <LogoBtn />
          <div className="container">
            <h1 className="blue">
              {
                "Build Your Professional Medical Portfolio and Connect with Patients"
              }
            </h1>
            <p className="blue">
              {
                "Create a personalised profile to showcase your medical expertise, experience, and services. Join a community of professionals dedicated to advancing healthcare and connecting with patients."
              }
            </p>
            <div className="button-container">
              <Link
                className="btn shadow-border blue-background btn-text white"
                href="/signin"
                aria-label="Go to Sign in page"
                role="button"
              >
                {"Sign In"} <FontAwesomeIcon icon={faUser} aria-hidden="true" />
              </Link>
              <Link
                className="btn shadow-border blue-background btn-text white"
                href="/signup"
                aria-label="Go to Sign Up page"
                role="button"
              >
                {"Sign Up"}{" "}
                <FontAwesomeIcon icon={faUserPlus} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <Content
          Title="Empower Your Medical Career"
          Text="Build a professional online presence that reflects your experience, expertise, and dedication to patient care. Whether you're a student, trainee, or specialist, your portfolio grows with you."
          ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/doctor-in-practice.jpg"
          ImageAlt="Illustration of a doctor building an online career portfolio"
          ImageLeft={false}
          LinkUrl="/signup"
          LinkText="Create Your Portfolio"
        />

        <Content
          Title="Organize Your Professional Journey"
          Text="Easily update qualifications, log experiences, and document your continuing professional development. Our intuitive tools make managing your portfolio effortless and secure."
          ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/doctor-on-laptop.jpg"
          ImageAlt="Illustration of a doctor managing professional records on a dashboard"
          ImageLeft={true}
          LinkUrl="/features"
          LinkText="Explore Features"
        />

        <Content
          Title="Connect with Patients and Peers"
          Text="Make your expertise visible to those who need it most. Patients can discover specialists based on symptoms and location, while peers can view and collaborate on professional growth."
          ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/patients-in-waiting-room.jpg"
          ImageAlt="Illustration of a doctor connecting with a patient online"
          ImageLeft={false}
          LinkUrl="/search"
          LinkText="Find Professionals"
        />
        <Content
          Title="Start Showcasing Your Expertise Today"
          Text="Join a growing community of medical professionals shaping the future of online healthcare representation. Your portfolio is your digital identity — make it stand out."
          ImageSrc="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/group-of-doctors.jpg"
          ImageAlt="Illustration of a doctor joining an online community"
          ImageLeft={true}
          LinkUrl="/signup"
          LinkText="Join Now"
        />
      </main>
    </>
  );
}
