import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface ContentProps {
  Title?: string;
  Text?: string;
  ImageSrc?: string;
  ImageAlt?: string;
  ImageLeft: boolean;
  LinkUrl?: string;
  LinkText?: string;
}

export default function Content({
  Title,
  Text,
  ImageSrc,
  ImageAlt,
  LinkUrl,
  LinkText,
  ImageLeft,
}: ContentProps) {
  return (
    <>
      <section className="content-container">
        <div className="content-text-container middle">
          {Title && <h2 className="blue">{Title}</h2>}
          {Text && <p className="blue">{Text}</p>}
          {LinkUrl && LinkText && (
            <div className="button-container">
                <Link href={LinkUrl} className="btn blue-background btn-text white shadow-border">          
                {LinkText}
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                </Link>
            </div>
        )}
        </div>
        {ImageSrc && ImageAlt && (
        <div className={`image-container ${ImageLeft ? "left" : "right"}`}>
          <Image
            src={ImageSrc}
            alt={ImageAlt}
            width={640}
            height={427}
            loading="lazy"
            quality={100}
            className="portfolio-image"
          />
        </div>
        )}
      </section>
    </>
  );
}
