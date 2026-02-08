import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  DiReact,
  DiJavascript1,
  DiGit,
  DiJava,
  DiPython,
} from "react-icons/di";
import {
  SiFlutter,
  SiIos,
  SiAndroid,
  SiFirebase,
  SiRedux,
  SiJest,
  SiTypescript,
  SiVisualstudiocode,
  SiPostman,
  SiAndroidstudio,
  SiXcode,
  SiMacos,
} from "react-icons/si";
import { CgCPlusPlus } from "react-icons/cg";

const SKILLS = [
  { Icon: DiReact, name: "React" },
  { Icon: SiFlutter, name: "Flutter" },
  { Icon: SiIos, name: "iOS" },
  { Icon: SiAndroid, name: "Android" },
  { Icon: DiJavascript1, name: "JavaScript" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiRedux, name: "Redux" },
  { Icon: SiFirebase, name: "Firebase" },
  { Icon: SiJest, name: "Jest" },
  { Icon: DiGit, name: "Git" },
  { Icon: DiJava, name: "Java" },
  { Icon: CgCPlusPlus, name: "C++" },
  { Icon: DiPython, name: "Python" },
];

const TOOLS = [
  { Icon: SiMacos, name: "macOS" },
  { Icon: SiVisualstudiocode, name: "VS Code" },
  { Icon: SiAndroidstudio, name: "Android Studio" },
  { Icon: SiXcode, name: "Xcode" },
  { Icon: SiPostman, name: "Postman" },
];

function SkillCard({ Icon, name, delay }) {
  return (
    <div
      className={`skill-card reveal reveal-delay-${Math.min(delay, 4)}`}
    >
      <div className="skill-card-inner">
        <div className="skill-card-icon">
          <Icon />
        </div>
        <span className="skill-card-name">{name}</span>
      </div>
    </div>
  );
}

function SkillsSection() {
  const ref = useScrollReveal();

  return (
    <section className="portfolio-section skills-section-wrap" id="skills" ref={ref}>
      <div className="skills-section-inner">
        <span className="chapter-num reveal">02 — Skills</span>
        <h2 className="section-title reveal reveal-delay-1">
          Tech <span className="gradient-text">stack</span> & tools
        </h2>
        <p className="skills-section-desc reveal reveal-delay-2">
          Technologies I build with and tools I work in every day.
        </p>

        <div className="skills-block reveal reveal-delay-2">
          <h3 className="skills-block-title">
            <span className="skills-block-title-icon">◇</span>
            Technologies
          </h3>
          <div className="skills-grid skills-grid-main">
            {SKILLS.map((item, i) => (
              <SkillCard
                key={item.name}
                Icon={item.Icon}
                name={item.name}
                delay={i + 1}
              />
            ))}
          </div>
        </div>

        <div className="skills-block skills-block-tools reveal reveal-delay-3">
          <h3 className="skills-block-title">
            <span className="skills-block-title-icon">◆</span>
            Tools
          </h3>
          <div className="skills-grid skills-grid-tools">
            {TOOLS.map((item, i) => (
              <SkillCard
                key={item.name}
                Icon={item.Icon}
                name={item.name}
                delay={i + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
