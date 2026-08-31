import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Section from "./Section";

type ProjectMedia = {
  label: string;
  src: string;
  type: "image" | "video";
};

const vbuildMedia: ProjectMedia[] = [
  { label: "Overview", src: "/assets/projects/vbuild-overview.m4v", type: "video" },
  { label: "Resume Demo 01", src: "/assets/projects/vbuild-resume-demo-1.m4v", type: "video" },
  { label: "Resume Demo 02", src: "/assets/projects/vbuild-resume-demo-2.m4v", type: "video" },
  { label: "Music", src: "/assets/projects/vbuild-music.png", type: "image" },
  { label: "Web", src: "/assets/projects/vbuild-web.png", type: "image" },
  { label: "Resume", src: "/assets/projects/vbuild-resume.png", type: "image" },
  { label: "Slides", src: "/assets/projects/vbuild-slides.png", type: "image" },
  { label: "Work History", src: "/assets/projects/vbuild-history.png", type: "image" },
];

const AnimatedNumber: React.FC<{
  value: number;
  start: boolean;
  suffix?: string;
  decimals?: number;
}> = ({ value, start, suffix = "", decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(start ? value : 0);

  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = 1100;
    const startedAt = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [start, value]);

  return <>{displayValue.toFixed(decimals)}{suffix}</>;
};

const Projects: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState(0);
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [lighthouseNumbersVisible, setLighthouseNumbersVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const projectStartRef = useRef<HTMLDivElement>(null);
  const lighthouseStartRef = useRef<HTMLDivElement>(null);
  const vbuildGalleryRef = useRef<HTMLDivElement>(null);
  const vbuildVideoRef = useRef<HTMLVideoElement>(null);
  const lighthouseVideoRef = useRef<HTMLVideoElement>(null);
  const selectedMedia = vbuildMedia[activeMedia];
  const showPreviousMedia = () => {
    setActiveMedia((current) => (current - 1 + vbuildMedia.length) % vbuildMedia.length);
  };
  const showNextMedia = () => {
    setActiveMedia((current) => (current + 1) % vbuildMedia.length);
  };

  useEffect(() => {
    const node = projectStartRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNumbersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = lighthouseStartRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLighthouseNumbersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = vbuildGalleryRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setGalleryVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = vbuildVideoRef.current;
    if (selectedMedia.type === "video" && video) {
      if (galleryVisible) void video.play().catch(() => undefined);
      else video.pause();
      return undefined;
    }
    if (!galleryVisible) return undefined;
    const timer = window.setTimeout(showNextMedia, 3800);
    return () => window.clearTimeout(timer);
  }, [activeMedia, galleryVisible, selectedMedia.type]);

  useEffect(() => {
    const video = lighthouseVideoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="projects" className="portfolio-surface projects-section" fullBleed>
      <div id="project-vbuild" ref={projectStartRef} className="project-case project-case-vbuild">
        <div className="project-case-frame">
          <div className="project-case-rail">
            <span>02 · Project</span>
            <span>01 / 02</span>
          </div>

          <div className="project-case-layout">
            <div className="project-case-intro">
              <h2>vBuild.cn</h2>
              <div className="project-case-lead project-case-vbuild-lead">
                <p className="project-case-tagline">人人都是Vibe Builder</p>
                <p className="project-case-positioning">一站式vibe coding创作与发布平台</p>
              </div>

              <dl className="project-case-meta">
                <div>
                  <dt>ROLE</dt>
                  <dd>创始人（<span className="project-number-inline"><AnimatedNumber value={1} start={numbersVisible} /></span>人团队）</dd>
                </div>
                <div>
                  <dt>PERIOD</dt>
                  <dd>2026.07 — 至今</dd>
                </div>
              </dl>

              <div className="project-case-flow" aria-label="VBuild product flow">
                <span>自然语言生成</span><i />
                <span>可视化修改</span><i />
                <span>一键部署</span>
              </div>

              <div className="project-case-metrics">
                <div><strong><AnimatedNumber value={4} start={numbersVisible} /></strong><span>类工作台</span></div>
                <div><strong><AnimatedNumber value={100} start={numbersVisible} suffix="+" /></strong><span>生成项目</span></div>
                <div><strong><AnimatedNumber value={40} start={numbersVisible} suffix="+" /></strong><span>公网部署</span></div>
              </div>

              <a className="project-case-link" href="https://www.vbuild.cn" target="_blank" rel="noreferrer">
                Visit vBuild.cn <ArrowUpRight />
              </a>
            </div>

            <div ref={vbuildGalleryRef} className="project-gallery">
              <div className="project-gallery-stage">
                {selectedMedia.type === "video" ? (
                  <video
                    ref={vbuildVideoRef}
                    key={selectedMedia.src}
                    src={selectedMedia.src}
                    autoPlay={galleryVisible}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={showNextMedia}
                  />
                ) : (
                  <img key={selectedMedia.src} src={selectedMedia.src} alt={`VBuild ${selectedMedia.label} 界面`} />
                )}
                <div className="project-gallery-arrows" aria-label="切换 VBuild 展示内容">
                  <button type="button" onClick={showPreviousMedia} aria-label="上一项展示内容">
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button type="button" onClick={showNextMedia} aria-label="下一项展示内容">
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
                <span className="project-gallery-caption">
                  {String(activeMedia + 1).padStart(2, "0")} / {String(vbuildMedia.length).padStart(2, "0")} · {selectedMedia.label}
                </span>
              </div>

              <div className="project-gallery-index" aria-label="VBuild product gallery">
                {vbuildMedia.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    className={index === activeMedia ? "is-active" : ""}
                    onClick={() => setActiveMedia(index)}
                    aria-label={`展示 ${item.label}`}
                    aria-pressed={index === activeMedia}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.label}</strong>
                    {item.type === "video" ? <Play aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="project-lighthouse" ref={lighthouseStartRef} className="project-case project-case-lighthouse">
        <div className="project-case-frame">
          <div className="project-case-rail">
            <span>02 · Project</span>
            <span>02 / 02</span>
          </div>

          <div className="project-case-layout project-case-layout-reverse">
            <div className="project-case-intro">
              <p className="project-case-kind">CONSULTING AGENT</p>
              <h2>灯塔AI</h2>
              <p className="project-case-lead">高考志愿咨询 Agent</p>

              <dl className="project-case-meta">
                <div>
                  <dt>ROLE</dt>
                  <dd>创始成员 / 产品经理</dd>
                </div>
                <div>
                  <dt>PERIOD</dt>
                  <dd>2026.05 — 2026.07</dd>
                </div>
              </dl>

              <div className="project-case-evidence">
                <p>
                  <span className="project-evidence-index">01</span>
                  <span className="project-evidence-copy">从 <b className="project-number-token">0 → 1</b> 完成产品、交互与 Agent 设计</span>
                </p>
                <p>
                  <span className="project-evidence-index">02</span>
                  <span className="project-evidence-copy">推进 <b className="project-number-token"><AnimatedNumber value={4} start={lighthouseNumbersVisible} /></b> 个版本迭代</span>
                </p>
                <p>
                  <span className="project-evidence-index">03</span>
                  <span className="project-evidence-copy">核心功能使用率提升 <b className="project-number-token"><AnimatedNumber value={30} start={lighthouseNumbersVisible} suffix="%" /></b></span>
                </p>
              </div>

              <a
                className="project-case-link"
                href="https://www.dengtaai.cn/dev/ui3/index.html?v=20250925"
                target="_blank"
                rel="noreferrer"
              >
                View Prototype <ArrowUpRight />
              </a>
            </div>

            <div className="project-gallery project-gallery-lighthouse">
              <div className="project-gallery-stage">
                <video
                  ref={lighthouseVideoRef}
                  src="/assets/projects/lighthouse-ui-demo.m4v"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <span className="project-gallery-caption">PRODUCT UI / FULL WALKTHROUGH · 02:23</span>
              </div>
              <p className="project-gallery-note">首页 · 智能体 · 语音对话 · 咨询记录 · 报告生成</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Projects;
