import React from "react";
import { useLocation } from "react-router-dom";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function SectionIndicator({ activeId }) {
  const location = useLocation();

  if (location.pathname !== "/") return null;

  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="section-indicator" aria-label="Page sections">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`section-indicator-dot ${activeId === id ? "active" : ""}`}
          onClick={() => handleClick(id)}
          aria-label={`Go to ${label}`}
          aria-current={activeId === id ? "true" : undefined}
        >
          <span className="section-indicator-tooltip">{label}</span>
        </button>
      ))}
    </aside>
  );
}

export default SectionIndicator;
