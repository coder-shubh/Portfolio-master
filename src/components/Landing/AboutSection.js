import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import laptopImg from "../../Assets/about.png";
import ParticleBackground from "../ParticleBackground";

function AboutSection() {
  const ref = useScrollReveal();
  const [statsInView, statsRef] = useInView(0.3);
  const years = useCountUp(3, 1800, statsInView);
  const projects = useCountUp(10, 1800, statsInView);
  const companies = useCountUp(4, 1800, statsInView);

  return (
    <section className="portfolio-section about-section" id="about" ref={ref}>
      <div className="section-particle-bg">
        <ParticleBackground intensity={0.15} particleCount={100} />
      </div>
      <div className="about-grid chapter-section">
        <div>
          <span className="chapter-num reveal">01 — About</span>
          <h2 className="section-title reveal reveal-delay-1">
            Know who <span className="gradient-text">I am</span>
          </h2>
          <div className="about-card reveal reveal-delay-2">
            <p>
              I'm <strong style={{ color: "var(--accent)" }}>Shubham Kumar Singh</strong> from{" "}
              <strong style={{ color: "var(--accent)" }}>Greater Noida, India</strong>. Senior
              Mobile Application Developer at{" "}
              <strong style={{ color: "var(--accent)" }}>INVIA Pvt Ltd</strong> with 3+
              years of hands-on experience building apps for iOS and Android.
            </p>
            <p>
              I specialize in <strong style={{ color: "var(--white)" }}>React Native</strong>,{" "}
              <strong style={{ color: "var(--white)" }}>Flutter</strong>,{" "}
              <strong style={{ color: "var(--white)" }}>Android</strong>, and{" "}
              <strong style={{ color: "var(--white)" }}>iOS</strong>—turning ideas into intuitive,
              performant mobile products.
            </p>
            <ul className="about-activities">
              <li>Playing Games</li>
              <li>Reading Tech Blogs</li>
              <li>Travelling</li>
            </ul>
            <p className="about-quote">
              "Strive to build things that make a difference!" — Shubham
            </p>
          </div>
          <div className="stats-row reveal reveal-delay-3" ref={statsRef}>
            <div className="stat-item">
              <div className="stat-value">{years}+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{projects}+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{companies}</div>
              <div className="stat-label">Companies</div>
            </div>
          </div>
        </div>
        <div className="about-img-wrap reveal reveal-delay-2">
          <img src={laptopImg} alt="About Shubham" />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
