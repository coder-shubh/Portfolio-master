import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// GitHub's official contribution graph colors (green scale)
const GITHUB_THEME = {
  level0: "#161b22",   // no contributions – dark (fits our dark UI)
  level1: "#0e4429",   // 1+ contributions
  level2: "#006d32",
  level3: "#26a641",
  level4: "#39d353",   // max – bright green
};

function GithubSection() {
  const ref = useScrollReveal();

  return (
    <section className="portfolio-section github-section" ref={ref}>
      <div className="chapter-section" style={{ maxWidth: "960px", margin: "0 auto", padding: "0 2rem" }}>
        <span className="chapter-num reveal">05 — Activity</span>
        <h2 className="section-title reveal reveal-delay-1">
          Days I <span className="gradient-text">code</span>
        </h2>
        <div className="github-wrap reveal reveal-delay-2">
          <GitHubCalendar
            username="coder-shubh"
            blockSize={14}
            blockMargin={5}
            theme={GITHUB_THEME}
            fontSize={14}
          />
        </div>
      </div>
    </section>
  );
}

export default GithubSection;
