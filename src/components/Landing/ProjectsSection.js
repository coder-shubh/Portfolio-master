import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ParticleBackground from "../ParticleBackground";

// Add playStoreLink / appStoreLink for direct app links. Leave null to use store search by app name.
const PROJECTS = [
  {
    title: "Grannd Store",
    description: "E-commerce app: Android Studio → Native Android. Products, secure payments, seller features.",
    img: "https://play-lh.googleusercontent.com/QoVo-CSb9RA-GY-5Y-2iEbNgSVRDNN6GKOAZQ-7_JDpZ6ptJj6MYFyarNl772KT_ljM=w5120-h2880-rw",
    demoLink: null,
    ghLink: null,
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.form.mavesys.granndstore', // e.g. "https://play.google.com/store/apps/details?id=com.yourapp"
    appStoreLink: null,
  },
  {
    title: "AIS eBiz KYC",
    description: "Get a complete overview of your AIS Business KYC (Know Your Customer) account, including active, recent, and historical verifications.Biometric verification, Liveness and Face Match technology is used to eliminate fake identities and deepfakes.",
    img: "https://play-lh.googleusercontent.com/RxkuAO3H1nM2_3B3n90gd44QqmpDCQSzJ0Yow-flLKGLtVod-UWEPtqWw3PkgrAK6w=w5120-h2880-rw",
    demoLink: null,
    ghLink: null,
    playStoreLink: 'https://play.google.com/store/search?q=ais+ebiz+kyc&c=apps',
    appStoreLink: "https://apps.apple.com/us/app/ais-ebiz-kyc/id6499111441",
  },
  {
    title: "DSLSA-SAMARPAN",
    description: "Attendance tracking with location & picture verification for businesses and schools.",
    img: "https://play-lh.googleusercontent.com/cV0-jvZzTgH6vDGnOZ5nsdLsP_3n9MBOwxnFXFMzmtEbPoLG05gecmS9l2CxI0Ry0SY=w5120-h2880-rw",
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=com.delhi.samarpan",
    appStoreLink: null,
  },
  {
    title: "Optus My Fleet Manager",
    description: "Get a full overview for all of your Optus Enterprise mobile services: KEEP AN EYE ON YOUR USAGE, See how much data you’ve recently used, Check your allowances, Track your calls and messages (SMS/MMS)",
    img: "https://play-lh.googleusercontent.com/a_Oi9nz461BCZveMRD04DpIsSg6OaHn2GgPvK89llSJjMB4FwTLvUCoYMtpKiNYl7DA=w5120-h2880-rw",
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=au.com.optus.mfm",
    appStoreLink: "https://apps.apple.com/us/app/optus-my-fleet-manager/id1533362811",
  },
  {
    title: "Plexys",
    description: "Pain management: track levels, tests, health graphs. Privacy-first, your data in your control.",
    img: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource122/v4/39/30/74/393074bc-5473-5af0-eb4d-c9e5c1e4eaa6/cc0d036a-caff-496b-8a6f-7fdd6c9b4576_IMG_0037.png/460x998bb.webp",
    demoLink: null,
    ghLink: null,
    playStoreLink: null,
    appStoreLink: "https://apps.apple.com/us/app/plexys/id6478015586",
  },
  {
    title: "Atta (Enterprise)",
    description: "BBL Digital Wallet with robust auth. Secure transactions and personal data.",
    img: "https://play-lh.googleusercontent.com/-3u393HH11gIQoOZfXAzWh0D6CF_K7jf5YrZAs8IHZCwCINw3wsdrmqGwlwUi02-DVI=w5120-h2880-rw",
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=com.bangkokbank.atta&hl=en_IN",
    appStoreLink: "https://apps.apple.com/th/app/atta/id1528297380",
  },
];

const PLAY_STORE_SEARCH = "https://play.google.com/store/search?q=";

function ProjectsSection() {
  const ref = useScrollReveal();

  return (
    <section className="portfolio-section" id="projects" ref={ref}>
      <div className="section-particle-bg">
        <ParticleBackground intensity={0.12} particleCount={60} />
      </div>
      <div className="chapter-section" style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 2rem" }}>
        <span className="chapter-num reveal">04 — Portfolio</span>
        <h2 className="section-title reveal reveal-delay-1">
          Selected <span className="gradient-text">projects</span>
        </h2>
        <p
          style={{ color: "var(--muted-soft)", marginBottom: "2.5rem", maxWidth: "560px" }}
          className="reveal reveal-delay-2"
        >
          Apps I've built or shipped — from e‑commerce and booking to health and learning.
        </p>
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className={`project-card-cinematic reveal reveal-delay-${Math.min((i % 3) + 1, 3)}`}
            >
              <img src={project.img} alt="" />
              <div className="project-card-cinematic-overlay">
                <h3 className="project-card-cinematic-title">{project.title}</h3>
                <p className="project-card-cinematic-desc">{project.description}</p>
                <div className="project-card-cinematic-links">
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="project-link-btn">
                      Demo
                    </a>
                  )}
                  {project.ghLink && (
                    <a href={project.ghLink} target="_blank" rel="noreferrer" className="project-link-gh">
                      GitHub
                    </a>
                  )}
                  {!project.demoLink && !project.ghLink && (project.playStoreLink || project.appStoreLink) && (
                    <>
                      {project.playStoreLink && (
                        <a href={project.playStoreLink} target="_blank" rel="noreferrer" className="project-link-btn" aria-label="View on Play Store">
                          View on Play Store
                        </a>
                      )}
                      {project.appStoreLink && (
                        <a href={project.appStoreLink} target="_blank" rel="noreferrer" className="project-link-btn project-link-appstore" aria-label="View on App Store">
                          View on App Store
                        </a>
                      )}
                    </>
                  )}
                  {!project.demoLink && !project.ghLink && !project.playStoreLink && !project.appStoreLink && (
                    <a
                      href={`${PLAY_STORE_SEARCH}${encodeURIComponent(project.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                      aria-label="Search app on Play Store"
                    >
                      View app
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
