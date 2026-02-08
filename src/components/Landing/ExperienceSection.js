import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const EXPERIENCES = [
  {
    company: "EY GDS (Ernst & Young)",
    role: "Senior Software Engineer",
    duration: "Apr 2024 – Present",
    points: [
      "Leading development of complex mobile apps for iOS and Android.",
      "Architecting scalable solutions with React Native and Flutter.",
      "Collaborating with UX/UI designers for intuitive interfaces.",
      "Mentoring junior developers and conducting code reviews.",
    ],
  },
  {
    company: "Digimonk Technologies Pvt Ltd.",
    role: "Software Engineer",
    duration: "Aug 2023 – Mar 2024",
    points: [
      "Built high-performance mobile apps using Kotlin, Swift, and cross-platform frameworks.",
      "Integrated APIs and third-party services for enhanced functionality.",
      "Drove testing and debugging for seamless user experience.",
    ],
  },
  {
    company: "Mavesys Infosoft Pvt Ltd.",
    role: "Software Engineer",
    duration: "Dec 2022 – Aug 2023",
    points: [
      "Developed native iOS and Android apps with Swift and Java/Kotlin.",
      "Created responsive layouts for various devices and screen sizes.",
      "Integrated backend services and managed application state.",
    ],
  }
];

function ExperienceSection() {
  const ref = useScrollReveal();

  return (
    <section className="portfolio-section about-section" id="experience" ref={ref}>
      <div className="chapter-section" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <span className="chapter-num reveal">03 — Career</span>
        <h2 className="section-title reveal reveal-delay-1">
          Work <span className="gradient-text">experience</span>
        </h2>
        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.company}
              className={`timeline-item reveal reveal-delay-${Math.min(i + 1, 3)}`}
            >
              <div className="timeline-card">
                <div className="timeline-company">{exp.company}</div>
                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-duration">{exp.duration}</div>
                <ul className="timeline-desc">
                  {exp.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
