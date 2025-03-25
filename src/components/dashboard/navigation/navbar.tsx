import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="main-navbar-container blue-background white">
      <div className="navbar-logo-container white-background">
        <Link href="/" aria-label="Go to Home page" role="button">
          <Image
            className="footer-logo"
            src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-logo-small-0tjxIFdCiUAkdsYhbjASAnqVExAR0j.png"
            alt="Medical portfolio logo"
            width={400}
            height={400}
            priority
            quality={100}
          />
        </Link>
      </div>
      <ul className="main-navbar-items-container">
        <li>
          <Link
            href="/"
            aria-label="Go to Home page"
            role="button"
            className="link-text white"
          >
            {"Professionals"}
          </Link>
        </li>

        <li>
          <Link
            href="/search"
            aria-label="Go to Home page"
            role="button"
            className="link-text white"
          >
            {"Patients"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
