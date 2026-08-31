import React from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import Section from "./Section";

const experiments = [
  {
    title: "Clear Recording录屏工具",
    label: "FEATURED BUILD",
    summary: "一款支持画中画与配音的 macOS 本地录屏工具。",
    poster: "/assets/vibe/clear-recording.png",
    motion: "/assets/vibe/clear-recording.m4v",
    mediaType: "video",
    featured: true,
  },
  {
    title: "高考志愿数据清洗Workflow",
    label: "DATA WORKFLOW",
    summary: "清洗、整理并结构化高考数据。",
    poster: "/assets/vibe/data-workflow.png",
    motion: "/assets/vibe/data-workflow.gif",
    mediaType: "image",
  },
  {
    title: "记者穿越播报视频Workflow",
    label: "AIGC STORY",
    summary: "从工作流到成片的生成式视频实验。",
    poster: "/assets/vibe/time-travel-workflow.png",
    motion: "/assets/vibe/time-travel-workflow.gif",
    mediaType: "image",
  },
  {
    title: "AI志愿填报Agent",
    label: "AGENT PROTOTYPE",
    summary: "高考志愿填报的对话式咨询原型。",
    poster: "/assets/vibe/coze-agent.png",
    motion: "/assets/vibe/coze-agent.gif",
    mediaType: "image",
  },
];

const fanSlots = [0, 1, -1, 2];

const VibeCoding: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!expanded) return undefined;

    const closeFromOutside = (event: PointerEvent) => {
      const expandedCard = document.querySelector("#vibe-coding .vibe-fan-card.is-expanded");
      if (expandedCard?.contains(event.target as Node)) return;
      setExpanded(false);
    };

    document.addEventListener("pointerdown", closeFromOutside);
    return () => document.removeEventListener("pointerdown", closeFromOutside);
  }, [expanded]);

  React.useEffect(() => {
    const closeExpandedCard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    window.addEventListener("keydown", closeExpandedCard);
    return () => window.removeEventListener("keydown", closeExpandedCard);
  }, []);

  const selectCard = (index: number) => {
    if (index === activeIndex) {
      setExpanded((current) => !current);
      return;
    }

    setActiveIndex(index);
    setExpanded(false);
  };

  return (
    <Section id="vibe-coding" className="portfolio-surface vibe-section" fullBleed>
      <div
        ref={sectionRef}
        className={`vibe-console mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 py-20 md:px-10 ${isVisible ? "is-visible" : ""}`}
      >
        <header className="vibe-console-header">
          <p className="section-kicker">03 · Skills &amp; Workflow</p>
          <h2 className="portfolio-title">Vibe Coding实践</h2>
        </header>

        <div className={`vibe-fan-stage ${expanded ? "has-expanded" : ""}`} aria-label="Vibe Coding 项目">
          {experiments.map((item, index) => {
            const relativeIndex = (index - activeIndex + experiments.length) % experiments.length;
            const slot = fanSlots[relativeIndex];
            const visualSlot = slot - 0.5;
            const isActive = index === activeIndex;
            const isExpanded = isActive && expanded;

            return (
              <button
                key={item.title}
                type="button"
                className={`vibe-fan-card ${isActive ? "is-active" : ""} ${isExpanded ? "is-expanded" : ""} ${item.featured ? "is-featured" : ""}`}
                style={{
                  "--fan-slot": slot,
                  "--fan-x": `${visualSlot * 220}px`,
                  "--fan-y": `${Math.abs(visualSlot) * 42}px`,
                  "--fan-x-mobile": `${visualSlot * 30}vw`,
                  "--fan-y-mobile": `${Math.abs(visualSlot) * 28}px`,
                  "--fan-rotate": `${visualSlot * 9}deg`,
                  "--fan-scale": Math.max(0.78, 0.94 - Math.abs(visualSlot) * 0.065),
                  "--fan-scale-mobile": Math.max(0.74, 0.9 - Math.abs(visualSlot) * 0.055),
                  "--fan-delay": `${index * 90}ms`,
                  "--fan-depth": 20 - Math.abs(visualSlot) * 4,
                } as React.CSSProperties}
                onClick={() => selectCard(index)}
                aria-pressed={isActive}
                aria-expanded={isExpanded}
                aria-label={
                  isExpanded
                    ? `收起 ${item.title}`
                    : isActive
                      ? `放大 ${item.title}`
                      : `选择 ${item.title}`
                }
              >
                <span className="vibe-fan-card-body">
                  <span className="vibe-card-media">
                    {isExpanded && isVisible && item.mediaType === "video" ? (
                      <video
                        key={item.motion}
                        src={item.motion}
                        poster={item.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={isExpanded && isVisible ? item.motion : item.poster}
                        alt=""
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    )}
                    <span className="vibe-card-shade" />
                    {item.featured && <span className="vibe-featured-mark">FEATURED</span>}
                    <span className="vibe-card-expand-icon" aria-hidden="true">
                      {isExpanded ? <Minimize2 /> : <Maximize2 />}
                    </span>
                  </span>

                  <span className="vibe-card-copy">
                    <span className="vibe-card-topline">
                      <span>{item.label}</span>
                      <span>0{index + 1}</span>
                    </span>
                    <strong>{item.title}</strong>
                    <span className="vibe-card-summary">{item.summary}</span>
                    <span className="vibe-card-action">
                      {isExpanded ? "Click to close" : isActive ? "Click to enlarge" : "Click to focus"}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="vibe-dial"
          style={{ "--dial-angle": `${-54 + activeIndex * 36}deg` } as React.CSSProperties}
          aria-label="项目选择仪表盘"
        >
          <svg className="vibe-dial-track" viewBox="0 0 430 108" aria-hidden="true">
            <path d="M 43 101 A 184 184 0 0 1 387 101" />
            <path className="vibe-dial-track-soft" d="M 68 101 A 158 158 0 0 1 362 101" />
          </svg>

          <span className="vibe-dial-needle" aria-hidden="true"><i /></span>
          <span className="vibe-dial-pivot" aria-hidden="true" />

          {experiments.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`vibe-dial-tick ${index === activeIndex ? "is-active" : ""}`}
              style={{ "--tick-angle": `${-54 + index * 36}deg` } as React.CSSProperties}
              onClick={() => {
                setActiveIndex(index);
                setExpanded(false);
              }}
              aria-label={`查看 ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span>0{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default VibeCoding;
