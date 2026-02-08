import { useState, useEffect } from "react";

const SECTION_IDS = ["home", "about", "experience", "projects", "contact"];

export function useActiveSection() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current = "home";
      for (const el of sections) {
        if (el && el.offsetTop <= scrollY) current = el.id;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return activeId;
}
