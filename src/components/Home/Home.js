import React from "react";
import homeLogo from "../../Assets/home-main.svg";
import Type from "./Type";
import ThreeScene from "./ThreeScene";

const RESUME_PDF_URL = `${process.env.PUBLIC_URL || ""}/Resume.pdf`;

function Home() {
  return (
    <section className="hero-cinematic" id="home">
      <div className="hero-cinematic-bg" aria-hidden="true" />
      <div className="hero-threejs-scene">
        <ThreeScene />
      </div>
      <div className="hero-cinematic-content">
        <div className="hero-now-badge">Building mobile apps at INVIA Pvt Ltd</div>
        <p className="hero-label">Hi, I'm</p>
        <h1 className="hero-name">
          Shubham
          <span className="hero-name-line2"> Kumar Singh</span>
        </h1>
        <div className="hero-role-wrap">
          <Type />
        </div>
        <p className="hero-desc">
          I build mobile and web experiences that users love. Senior Software Engineer at INVIA Pvt Ltd — 
          React Native, Flutter, Android & iOS. From idea to App Store.
        </p>
        <div className="hero-cinematic-btns">
          <a href="#projects" className="hero-btn hero-btn-primary">
            View my work
          </a>
          <a href={RESUME_PDF_URL} target="_blank" rel="noreferrer" className="hero-btn hero-btn-secondary">
            Download Resume
          </a>
        </div>
      </div>
      <img
        src={homeLogo}
        alt=""
        className="hero-cinematic-visual"
        aria-hidden="true"
      />
      <div className="hero-scroll-cue">
        <span className="hero-scroll-cue-line" aria-hidden="true" />
        <span className="hero-scroll-cue-text">Scroll</span>
      </div>
    </section>
  );
}

export default Home;
