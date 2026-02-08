import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Mobile Application Developer",
          "React Native & Flutter",
          "Senior Software Engineer",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        wrapperClassName: "hero-role-inner",
        cursorClassName: "hero-role-cursor",
      }}
    />
  );
}

export default Type;
