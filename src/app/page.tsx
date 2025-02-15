import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  return (
    <main className="page-container">
      <section className="home-page-container">
        <div className="image-container left-border">
          <Link href="/">
            <Image
              className="home-page-logo"
              src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-high-resolution-logo-transparent-ubKJM3sDU8cuICdOw8O3I5u8xuCdx9.png"
              alt="Medical portfolio logo in high resolution with a transparent background"
              width={400}
              height={400}
              priority
              quality={100}
            />
          </Link>
        </div>
        <div className="container">
          <h1 className="blue">
            {
              "Build Your Professional Medical Portfolio and Connect with Patients"
            }
          </h1>
          <p className="blue">
            {
              "Create a personalized profile to showcase your medical expertise, experience, and services. Join a community of professionals dedicated to advancing healthcare and connecting with patients."
            }
          </p>
          <div className="button-container">
            <Link
              className="btn shadow-border blue-background btn-text white"
              href="/login"
              aria-label="Go to Login page"
              role="button"
            >
              {"Login"} <FontAwesomeIcon icon={faRightToBracket} />
            </Link>
            <Link
              className="btn shadow-border blue-background btn-text white"
              href="/signup"
              aria-label="Go to Sign Up page"
              role="button"
            >
              {"Sign Up"} <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
