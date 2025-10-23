"use client";

import { useRouter } from "next/navigation";

interface SearchSuggestionsProps {
  className?: string;
}

const suggestions = [
  { category: "Specialties", items: ["Cardiology", "Dermatology", "Orthopedics", "Pediatrics"] },
  { category: "Common Ailments", items: ["Diabetes", "Hypertension", "Arthritis", "Asthma"] },
  { category: "Procedures", items: ["Joint Replacement", "Skin Treatment", "Heart Surgery", "Physical Therapy"] },
];

export default function SearchSuggestions({ className = "" }: SearchSuggestionsProps) {
  const router = useRouter();

  const handleSuggestionClick = (term: string) => {
    router.push(`/search?text=${encodeURIComponent(term)}`);
  };

  return (
    <div className="container">
      <h2 className="blue">
        {"Popular Searches"}
      </h2>
      
      <div>
        {suggestions.map((group) => (
          <div key={group.category}>
            <h3 className="blue">{group.category}</h3>
            <div className="button-container">
              {group.items.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSuggestionClick(item)}
                  className="btn blue-background btn-text white shadow-border"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}