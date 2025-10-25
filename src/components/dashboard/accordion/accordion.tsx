"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface AccordionProps {
  title: string;
  content: string;
}

export default function Accordion({ title, content }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button
        className={`accordion-button blue-background white shadow-border ${
          isOpen ? "open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="btn-text">{title}</h2>
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>
        <div
          className="accordion-content"
          style={{
            maxHeight: isOpen ? "500px" : "0",
            transition: "all 0.3s ease-in-out",
            marginTop: isOpen ? "1rem" : "0",
            padding: isOpen ? "1rem" : "0",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <p className="blue">{content}</p>
        </div>
    </div>
  );
}
