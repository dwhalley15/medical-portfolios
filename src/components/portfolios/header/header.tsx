/** 
 * @file This is the header component.
 *  @description This component displays the header for the portfolio page.
*/

import Image from "next/image";

type HeaderProps = {
  data: HeaderData;
  editable: boolean;
};

type HeaderData = {
  theme: string;
  image: string;
  name: string;
  description: string;
};

/**
 * This function returns the header component.
 * @param {HeaderProps} data - The data for the header component.
 * @returns {JSX.Element} The header component.
 */
export default function Header({ data, editable }: HeaderProps) {
  return (
    <section id="home" className={`header-container theme-${data.theme}`}>
      <div className="portolio-image-container">
        <Image
          className="portfolio-image"
          src={data.image}
          alt={data.name}
          width={400}
          height={400}
          priority
          quality={100}
        />
      </div>
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </div>
    </section>
  );
}
