import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  return (
    <main className="page-container">
      <section className="home-page-container">
        <div className="image-container left-border">
          <Link href="/">
            <Image
              className="home-page-logo"
              src="https://frw6rziicw61rtm1.public.blob.vercel-storage.com/medical-portfolios-high-resolution-logo-transparent-ubKJM3sDU8cuICdOw8O3I5u8xuCdx9.png"
              alt="The medical portfolio's logo in high resolution and transparent background format"
              width={400}
              height={400}
              priority
              quality={100}
            />
          </Link>
        </div>
        <div className="container">
          <p className="blue">
            {
              "A platform for medical professionals to showcase their work and connect with others in the field."
            }
          </p>
          <div className="container">
            <Link className="btn shadow-border blue-background btn-text white" href="/login">Login <FontAwesomeIcon icon={faRightToBracket}/></Link>
            <Link className="btn shadow-border blue-background btn-text white" href="/signup">Sign Up <FontAwesomeIcon icon={faUserPlus}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
