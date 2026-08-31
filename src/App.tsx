import React from "react";
import Hero from "./components/Hero";
import { ByteDanceExperience } from "./components/Experience";
import Projects from "./components/Projects";
import VibeCoding from "./components/VibeCoding";
import BeyondResume from "./components/BeyondResume";
import KeepExploring from "./components/KeepExploring";

function App() {
  return (
    <div className="site-shell selection:bg-cyan-100 selection:text-slate-950">
      {/* Main Scroll Container */}
      <main className="site-scroll h-screen w-full overflow-y-scroll scroll-smooth no-scrollbar">
        <Hero />
        <ByteDanceExperience
          id="experience-bytedance"
          className="portfolio-surface"
        />
        <Projects />
        <VibeCoding />
        <BeyondResume />
        <KeepExploring />
      </main>
    </div>
  );
}

export default App;
