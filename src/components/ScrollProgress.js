import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default ScrollProgress;
