/**
 * @file Navigation component.
 * @description This component displays the navigation bar for the portfolio template.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import NavigationEditor from "@/components/dashboard/editors/navEditor";
import IconSelector from "@/services/iconSelector/iconSelector";

type NavigationProps = {
  userId: number;
  data: NavigationData;
  editable: boolean;
};

type NavigationData = {
  theme: string;
  icon: string;
  navItems: NavItem[];
};

type NavItem = {
  name: string;
  link: string;
};

/**
 * This function returns the navigation component.
 * @param {NavigationProps} data - The data for the navigation component.
 * @returns {JSX.Element} The navigation component.
 */
export default function Navigation({
  userId,
  data,
  editable,
}: NavigationProps) {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLinkClick = () => {
    setMenuActive(false);
  };

  return (
    <nav className={`navbar-container theme-${data.theme}`}>
      <Link href={`#${data.navItems[0].link}`}>
        <FontAwesomeIcon
          icon={IconSelector(data.icon)}
          className="navigation-icon"
          size="4x"
        />
      </Link>
      <FontAwesomeIcon
        icon={menuActive ? faX : faBars}
        size="3x"
        onClick={toggleMenu}
        className={`menu-icon ${menuActive ? "active" : ""}`}
      />
      <ul className={`navbar-items-container ${menuActive ? "active" : ""}`}>
        {data.navItems.map((item, index) => (
          <li key={index} className="navbar-item-container">
            <Link onClick={handleLinkClick} href={`#${item.link}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {editable && (
        <NavigationEditor userIdProp={userId} themeProp={data.theme} iconProp={data.icon}/>
      )}
    </nav>
  );
}
