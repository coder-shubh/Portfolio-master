import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="portfolio-footer">
      <p>
        Designed & built by <strong>Shubham Kumar Singh</strong>
        {" · "}
        <a href="https://github.com/coder-shubh" target="_blank" rel="noreferrer">GitHub</a>
        {" · "}
        <a href="https://www.linkedin.com/in/shubham-singh-503589203" target="_blank" rel="noreferrer">LinkedIn</a>
        {" · "}
        <a href="https://www.instagram.com/theks_shubham" target="_blank" rel="noreferrer">Instagram</a>
      </p>
      <p style={{ marginTop: "0.5rem" }}>© {year} coder-shubh. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
