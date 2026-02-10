import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import SectionIndicator from "./components/SectionIndicator";
import { useActiveSection } from "./hooks/useActiveSection";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";

function App() {
  const [load, updateLoad] = useState(true);
  const activeSection = useActiveSection();

  useEffect(() => {
    const timer = setTimeout(() => updateLoad(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Restrict copying and right-click to protect content
  useEffect(() => {
    const preventCopy = (e) => e.preventDefault();
    const preventContextMenu = (e) => e.preventDefault();
    const preventDrag = (e) => e.preventDefault();

    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCopy);
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDrag);

    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCopy);
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <ScrollProgress />
        <Navbar />
        <ScrollToTop />
        <BackToTop />
        <SectionIndicator activeId={activeSection} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/project" element={<Landing />} />
          <Route path="/about" element={<Landing />} />
          <Route path="/resume" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
