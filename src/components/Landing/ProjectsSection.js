import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ParticleBackground from "../ParticleBackground";
import { FaApple, FaGooglePlay, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const PROJECTS = [
  {
    title: "Feel Good Contacts",
    description: "UK's leading contact lens retailer app — browse, order, and manage contact lenses and eye care products with ease.",
    img: "https://play-lh.googleusercontent.com/X5utisb9ZUj4FOb9dG0z74ZHTcsJW9KIw-O-_fhcHnrz4XR8alv8yB5VKquvU8Asofs",
    tags: ["React Native", "iOS", "Android"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=app.feelgoodcontacts.com.feelgoodcontact",
    appStoreLink: "https://apps.apple.com/in/app/feel-good-contacts/id1191834493",
  },
  {
    title: "Azubi Regional",
    description: "Vocational training platform connecting apprentices and companies across regions — job listings, applications, and career guidance in one app.",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/dc/cb/ce/dccbcef5-d2ea-f42a-78f2-50797b4b737a/AppIcon-0-0-1x_U007emarketing-0-5-0-85-220.png/1200x630wa.jpg",
    tags: ["React Native", "iOS", "Android"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=com.fachzubi&hl=en_IN",
    appStoreLink: "https://apps.apple.com/us/app/azubi-regional/id6670475080",
  },
  {
    title: "Grannd Store",
    description: "E-commerce app built in Android Studio then migrated to Native Android. Products, secure payments, and seller features.",
    img: "https://play-lh.googleusercontent.com/QoVo-CSb9RA-GY-5Y-2iEbNgSVRDNN6GKOAZQ-7_JDpZ6ptJj6MYFyarNl772KT_ljM=w5120-h2880-rw",
    tags: ["Native Android", "E-Commerce"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=com.form.mavesys.granndstore",
    appStoreLink: null,
  },
  {
    title: "AIS eBiz KYC",
    description: "Business KYC with biometric verification, liveness detection, and face match to eliminate fake identities.",
    img: "https://play-lh.googleusercontent.com/RxkuAO3H1nM2_3B3n90gd44QqmpDCQSzJ0Yow-flLKGLtVod-UWEPtqWw3PkgrAK6w=w5120-h2880-rw",
    tags: ["React Native", "iOS", "Android"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/search?q=ais+ebiz+kyc&c=apps",
    appStoreLink: "https://apps.apple.com/us/app/ais-ebiz-kyc/id6499111441",
  },
  {
    title: "DSLSA-SAMARPAN",
    description: "Attendance tracking with GPS location and photo verification for businesses, schools, and government bodies.",
    img: "https://play-lh.googleusercontent.com/cV0-jvZzTgH6vDGnOZ5nsdLsP_3n9MBOwxnFXFMzmtEbPoLG05gecmS9l2CxI0Ry0SY=w5120-h2880-rw",
    tags: ["React Native", "Android"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=com.delhi.samarpan",
    appStoreLink: null,
  },
  {
    title: "Optus My Fleet Manager",
    description: "Enterprise mobile services dashboard for Optus. Monitor data usage, calls, and messages across your entire fleet.",
    img: "https://play-lh.googleusercontent.com/a_Oi9nz461BCZveMRD04DpIsSg6OaHn2GgPvK89llSJjMB4FwTLvUCoYMtpKiNYl7DA=w5120-h2880-rw",
    tags: ["React Native", "iOS", "Android"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=au.com.optus.mfm",
    appStoreLink: "https://apps.apple.com/us/app/optus-my-fleet-manager/id1533362811",
  },
  {
    title: "Plexys",
    description: "Pain management app — track pain levels, take interactive tests, and visualise your health journey with graphs.",
    img: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource122/v4/39/30/74/393074bc-5473-5af0-eb4d-c9e5c1e4eaa6/cc0d036a-caff-496b-8a6f-7fdd6c9b4576_IMG_0037.png/460x998bb.webp",
    tags: ["Flutter", "iOS"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: null,
    appStoreLink: "https://apps.apple.com/us/app/plexys/id6478015586",
  },
  {
    title: "Atta (Enterprise)",
    description: "BBL Digital Wallet — robust authentication, secure transactions, and protected personal data management.",
    img: "https://play-lh.googleusercontent.com/-3u393HH11gIQoOZfXAzWh0D6CF_K7jf5YrZAs8IHZCwCINw3wsdrmqGwlwUi02-DVI=w5120-h2880-rw",
    tags: ["React Native", "iOS", "Android"],
    featured: false,
    demoLink: null,
    ghLink: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=com.bangkokbank.atta&hl=en_IN",
    appStoreLink: "https://apps.apple.com/th/app/atta/id1528297380",
  },
];

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
          Apps I've built or shipped — from e‑commerce and booking to health and enterprise.
        </p>
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className={`project-card-cinematic${project.featured ? " project-card-featured" : ""} reveal reveal-delay-${Math.min((i % 3) + 1, 3)}`}
            >
              <img src={project.img} alt={project.title} />
              <span className="project-card-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="project-card-cinematic-overlay">
                {project.tags && project.tags.length > 0 && (
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <h3 className="project-card-cinematic-title">{project.title}</h3>
                <p className="project-card-cinematic-desc">{project.description}</p>
                <div className="project-card-cinematic-links">
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="project-link-store project-link-demo">
                      <FaExternalLinkAlt size={11} /> Demo
                    </a>
                  )}
                  {project.ghLink && (
                    <a href={project.ghLink} target="_blank" rel="noreferrer" className="project-link-store project-link-gh-btn">
                      <FaGithub size={13} /> GitHub
                    </a>
                  )}
                  {project.playStoreLink && (
                    <a href={project.playStoreLink} target="_blank" rel="noreferrer" className="project-link-store project-link-play" aria-label="View on Play Store">
                      <FaGooglePlay size={12} /> Play Store
                    </a>
                  )}
                  {project.appStoreLink && (
                    <a href={project.appStoreLink} target="_blank" rel="noreferrer" className="project-link-store project-link-apple" aria-label="View on App Store">
                      <FaApple size={14} /> App Store
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
