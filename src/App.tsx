import React from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Hero from "./components/Hero";
import {
  ByteDanceExperience,
  ShanghaiGovExperience,
  TeachingExperience,
} from "./components/Experience";
import ProjectAgent from "./components/ProjectAgent";
import { useTranslation } from "react-i18next";
import { shixiLineList } from "./config";

const TimelineSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeIndexRef = React.useRef(0);
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const lastWheelTimeRef = React.useRef(0);
  const lockActiveRef = React.useRef(false);
  const lastDirectionRef = React.useRef(0);

  React.useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  React.useEffect(() => {
    const main = document.querySelector("main");
    const section = sectionRef.current;
    if (!main || !section || shixiLineList.length === 0) {
      return;
    }

    const updateLock = () => {
      const rect = section.getBoundingClientRect();
      const headerOffset = 88;
      const lastIndex = shixiLineList.length - 1;
      const atStart = activeIndexRef.current === 0;
      const atEnd = activeIndexRef.current === lastIndex;
      const direction = lastDirectionRef.current;
      const allowLock =
        direction === 0 ||
        !((atEnd && direction > 0) || (atStart && direction < 0));
      const isLocked =
        allowLock && rect.top <= headerOffset && rect.bottom >= headerOffset;
      lockActiveRef.current = isLocked;
      if (isLocked && main instanceof HTMLElement) {
        if (Math.abs(rect.top) > 1) {
          main.scrollTop += rect.top - headerOffset;
        }
      }
    };

    const onScroll = () => {
      updateLock();
    };

    const onWheel = (event: WheelEvent) => {
      const direction = event.deltaY > 0 ? 1 : -1;
      lastDirectionRef.current = direction;
      updateLock();
      if (!lockActiveRef.current) {
        return;
      }
      const lastIndex = shixiLineList.length - 1;
      const currentIndex = activeIndexRef.current;
      if (
        (direction > 0 && currentIndex >= lastIndex) ||
        (direction < 0 && currentIndex <= 0)
      ) {
        lockActiveRef.current = false;
        return;
      }
      const canStep =
        (direction > 0 && currentIndex < lastIndex) ||
        (direction < 0 && currentIndex > 0);

      if (!canStep) {
        lockActiveRef.current = false;
        return;
      }

      event.preventDefault();
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 320) {
        return;
      }
      lastWheelTimeRef.current = now;

      const nextIndex = Math.max(
        0,
        Math.min(lastIndex, currentIndex + direction),
      );
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      if (nextIndex === 0 || nextIndex === lastIndex) {
        lockActiveRef.current = false;
      }
    };

    updateLock();
    main.addEventListener("scroll", onScroll, { passive: true });
    main.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      main.removeEventListener("scroll", onScroll);
      main.removeEventListener("wheel", onWheel);
    };
  }, []);

  const lineHeights = [72, 110, 84, 128, 96, 112];
  const lineDirections = ["up", "down", "down", "up", "down", "up"];
  const nodeColors = [
    "bg-cyan-500",
    "bg-purple-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-indigo-500",
  ];
  const lineColors = [
    "bg-cyan-400",
    "bg-purple-400",
    "bg-amber-400",
    "bg-emerald-400",
    "bg-rose-400",
    "bg-indigo-400",
  ];

  return (
    <section id="experience-timeline" className="w-full bg-white snap-start">
      <div
        ref={sectionRef}
        className="relative mx-auto w-full max-w-6xl px-8 pt-80 pb-40"
      >
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200"></div>
          <div className="relative flex items-center justify-between gap-4">
            {shixiLineList.map((item, index) => {
              const isLit = index <= activeIndex;
              const lineHeight = lineHeights[index % lineHeights.length];
              const direction = lineDirections[index % lineDirections.length];
              const nodeColor = nodeColors[index % nodeColors.length];
              const lineColor = lineColors[index % lineColors.length];
              return (
                <div
                  key={`${item.date}-${item.title}`}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className={`absolute left-1/2 w-0.5 -translate-x-1/2 transition-all duration-500 ${isLit ? lineColor : "bg-slate-200"} ${direction === "up" ? "bottom-full" : "top-full"}`}
                    style={{
                      height: isLit ? `${lineHeight}px` : "0px",
                    }}
                  ></div>
                  <span
                    className={`h-3.5 w-3.5 rounded-full transition-all duration-500 ${isLit ? nodeColor : "bg-slate-300"}`}
                  ></span>
                  <div
                    className={`absolute left-1/2 w-max -translate-x-1/2 transition-colors duration-500 ${isLit ? "text-slate-900" : "text-slate-400"}`}
                    style={{
                      top:
                        direction === "up"
                          ? "auto"
                          : `calc(100% + ${lineHeight + 8}px)`,
                      bottom:
                        direction === "up"
                          ? `calc(100% + ${lineHeight + 8}px)`
                          : "auto",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="text-xs font-semibold">{item.date}</div>
                    <div className="text-sm md:text-base">{item.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  const { t } = useTranslation();
  const [showHeader, setShowHeader] = React.useState(false);
  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      const target = event.currentTarget;
      const teachingSection = document.getElementById("experience-teaching");
      const isTeachingVisible =
        teachingSection &&
        teachingSection.getBoundingClientRect().top <= 64 &&
        teachingSection.getBoundingClientRect().bottom >= 64;
      setShowHeader(target.scrollTop > 8 && !isTeachingVisible);
    },
    [],
  );

  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {showHeader && <Header />}

      {/* Main Scroll Container */}
      <main
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        onScroll={handleScroll}
      >
        <Hero />
        <TimelineSection />
        {/* Section 2: Experience - ByteDance */}
        <ByteDanceExperience id="experience-bytedance" className="bg-white" />

        {/* Section 3: Experience - Shanghai Gov */}
        <ShanghaiGovExperience
          id="experience-shanghai"
          className="bg-slate-50"
        />

        {/* Section 4: Experience - Teaching */}
        <TeachingExperience id="experience-teaching" className="bg-white" />

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
