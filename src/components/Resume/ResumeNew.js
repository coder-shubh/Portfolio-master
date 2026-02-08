import React from "react";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";

// Use PDF from public folder to avoid webpack processing it (prevents Node/memfs crash on Resume route)
const PDF_URL = `${process.env.PUBLIC_URL || ""}/Resume.pdf`;
// Hide PDF viewer toolbar and sidebar so only the resume content is visible
const PDF_EMBED_URL = `${PDF_URL}#toolbar=0&navpanes=0`;

function ResumeNew() {
  return (
    <div className="resume-section resume-section-full">
      <Particle />
      <div className="resume-cta-wrap">
        <a
          href={PDF_URL}
          target="_blank"
          rel="noreferrer"
          className="hero-btn hero-btn-primary"
          style={{ textDecoration: "none" }}
        >
          <AiOutlineDownload /> Download CV
        </a>
      </div>
      <div className="resume-pdf-wrap">
        <iframe
          src={PDF_EMBED_URL}
          title="Resume"
          className="resume-pdf-iframe"
        />
      </div>
      <div className="resume-cta-wrap resume-cta-bottom">
        <a
          href={PDF_URL}
          target="_blank"
          rel="noreferrer"
          className="hero-btn hero-btn-primary"
          style={{ textDecoration: "none" }}
        >
          <AiOutlineDownload /> Download CV
        </a>
      </div>
    </div>
  );
}

export default ResumeNew;
