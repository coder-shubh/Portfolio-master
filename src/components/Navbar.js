import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useActiveSection } from "../hooks/useActiveSection";

const RESUME_PDF_URL = `${process.env.PUBLIC_URL || ""}/Resume.pdf`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { to: "#home", label: "Home" },
    { to: "#about", label: "About" },
    { to: "#experience", label: "Experience" },
    { to: "#projects", label: "Projects" },
    { to: "#contact", label: "Contact" },
  ];

  const handleNavClick = (e, linkTo) => {
    e.preventDefault();
    closeMobile();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(linkTo)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.querySelector(linkTo)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`portfolio-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          Shubham<span>.</span>
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-drawer ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
          <div
            className="navbar-drawer-backdrop"
            onClick={closeMobile}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                closeMobile();
              }
            }}
            aria-label="Close menu"
            role="button"
            tabIndex={mobileOpen ? 0 : -1}
          />
          <div className="navbar-drawer-panel">
            <button
              type="button"
              className="navbar-drawer-close"
              aria-label="Close menu"
              onClick={closeMobile}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <ul className="navbar-links">
              {navLinks.map((link) => {
                const sectionId = link.to.slice(1);
                return (
                  <li key={link.to}>
                    <a
                      href={link.to}
                      onClick={(e) => handleNavClick(e, link.to)}
                      className={activeSection === sectionId ? "nav-link-active" : ""}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="navbar-cta"
                  onClick={closeMobile}
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
