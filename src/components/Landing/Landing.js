import React from "react";
import Home from "../Home/Home";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import GithubSection from "./GithubSection";
import ContactSection from "./ContactSection";

function Landing() {
  return (
    <>
      <Home />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <GithubSection />
      <ContactSection />
    </>
  );
}

export default Landing;
