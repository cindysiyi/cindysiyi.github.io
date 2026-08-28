import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import {
  ByteDanceExperience,
  ShanghaiGovExperience,
  TeachingExperience,
} from "./components/Experience";
import ProjectAgent from "./components/ProjectAgent";
import Creator from "./components/Creator";
import Contact from "./components/Contact";
import AiTools from "./components/AiTools";
import Highlights from "./components/Highlights";
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
    <section
      id="experience-timeline"
      className="w-full min-h-screen bg-white snap-start flex items-center"
    >
      <div
        ref={sectionRef}
        className="relative mx-auto w-full max-w-6xl px-8 pt-80 pb-40"
      >
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200"></div>
          <div className="relative flex items-center justify-between gap-4">
          {shixiLineList.map((item, index) => (
            <div
              key={`${item.date}-${item.title}`}
              className="relative flex flex-col items-center"
            >
              <div
                className={`absolute left-1/2 w-0.5 -translate-x-1/2 transition-all duration-500 ${index <= activeIndex ? lineColors[index % lineColors.length] : "bg-slate-200"} ${lineDirections[index % lineDirections.length] === "up" ? "bottom-full" : "top-full"}`}
                style={{
                  height:
                    index <= activeIndex
                      ? `${lineHeights[index % lineHeights.length]}px`
                      : "0px",
                }}
              ></div>
              <span
                className={`h-3.5 w-3.5 rounded-full transition-all duration-500 ${index <= activeIndex ? nodeColors[index % nodeColors.length] : "bg-slate-300"}`}
              ></span>
              <div
                className={`absolute left-1/2 w-max -translate-x-1/2 transition-colors duration-500 ${index <= activeIndex ? "text-slate-900" : "text-slate-400"}`}
                style={{
                  top:
                    lineDirections[index % lineDirections.length] === "up"
                      ? "auto"
                      : `calc(100% + ${lineHeights[index % lineHeights.length] + 8}px)`,
                  bottom:
                    lineDirections[index % lineDirections.length] === "up"
                      ? `calc(100% + ${lineHeights[index % lineHeights.length] + 8}px)`
                      : "auto",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="text-xs font-semibold">{item.date}</div>
                <div className="text-sm md:text-base">{item.title}</div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
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
        className="h-screen w-full overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth no-scrollbar"
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
        <TeachingExperience id="experience-teaching" />

        {/* Section 5: AI Agent Project */}
        <ProjectAgent />

        <Highlights />

        <AiTools />

        {/* Section 6: Learn in public */}
        <Creator />

        <Contact />
      </main>
    </div>
  );
}

export default App;
