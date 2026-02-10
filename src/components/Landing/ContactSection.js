import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import ParticleBackground from "../ParticleBackground";

function ContactSection() {
  const ref = useScrollReveal();

  return (
    <section className="portfolio-section contact-section" id="contact" ref={ref}>
      <div className="section-particle-bg">
        <ParticleBackground intensity={0.2} particleCount={80} />
      </div>
      <div className="contact-inner chapter-section" style={{ padding: "0 2rem" }}>
        <span className="chapter-num reveal">06 — Contact</span>
        <h2 className="section-title reveal reveal-delay-1">
          Let's <span className="gradient-text">connect</span>
        </h2>
        <p
          className="reveal reveal-delay-2"
          style={{ color: "var(--muted-soft)", marginBottom: 0 }}
        >
          Open to new opportunities and collaborations. Reach out.
        </p>
        {/* Replace href with your real email, e.g. mailto:yourname@gmail.com */}
        <a
          href="shubhamsingh00222.ss@gmail.com"
          className="contact-email reveal reveal-delay-3"
        >
          Get in touch via email
        </a>
        <div className="contact-social reveal reveal-delay-3">
          <a href="https://github.com/coder-shubh" target="_blank" rel="noreferrer" aria-label="GitHub">
            <AiFillGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-singh-503589203"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/theks_shubham"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
