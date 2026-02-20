import React from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import ProjectAgent from "./components/ProjectAgent";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <Header />

      {/* Main Scroll Container */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Experience - ByteDance */}
        <Experience
          id="experience-bytedance"
          dataKey="byte_dance"
          className="bg-white"
        />

        {/* Section 3: Experience - Shanghai Gov */}
        <Experience
          id="experience-shanghai"
          dataKey="shanghai_gov"
          className="bg-slate-50"
        />

        {/* Section 4: Experience - Teaching */}
        <Experience
          id="experience-teaching"
          dataKey="teaching"
          className="bg-white"
        />

        {/* Section 5: AI Agent Project */}
        <ProjectAgent />

        {/* Section 6: Projects */}
        <Section id="projects" className="bg-slate-50">
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-12">
              {t("projects.section_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group relative bg-white rounded-2xl p-8 h-96 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end border border-slate-100"
                >
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                      {t("projects.tag")}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-2 text-slate-900">
                    {t("projects.item_title", { number: item })}
                  </h4>
                  <p className="text-slate-500 text-sm">
                    {t("projects.item_desc")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 4: Contact */}
        <Section id="contact" className="bg-white">
          <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
              {t("contact.title")}
            </h2>
            <p className="text-xl text-slate-500 max-w-xl">
              {t("contact.subtitle")}
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-block bg-slate-900 text-white px-12 py-4 text-lg hover:bg-purple-600 transition-colors duration-300 uppercase tracking-widest rounded-full shadow-lg hover:shadow-purple-500/30"
            >
              Get in Touch
            </a>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
