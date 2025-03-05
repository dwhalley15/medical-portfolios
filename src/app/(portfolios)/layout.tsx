import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/global-styles.css";
import "../../styles/container-styles.css";
import "../../styles/image-styles.css";
import "../../styles/border-styles.css";
import "../../styles/text-styles.css";
import "../../styles/button-styles.css";
import "../../styles/colour-styles.css";
import "../../styles/button-styles.css";
import "../../styles/theme-styles.css";

config.autoAddCss = false;

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">{children}</html>;
}
