import React from "react";
import Section from "./Section";

interface ExperienceBlockProps {
  id: string;
  className?: string;
}

interface ExperienceItem {
  id: string;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imagePosition: string;
  href?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "bachelor",
    category: "EDUCATION",
    year: "2023",
    title: "上海大学",
    subtitle: "日语专业 · 本科",
    description: "日语专四优秀 · IELTS 7.0",
    image: "assets/experience/bachelor.jpg",
    imagePosition: "center 40%",
  },
  {
    id: "graduate",
    category: "RESEARCH",
    year: "2025",
    title: "上海大学",
    subtitle: "新闻传播学 · 研究生",
    description: "聚焦 AI 语境下的信息与用户研究",
    image: "assets/experience/graduate.jpg",
    imagePosition: "center center",
  },
  {
    id: "teaching",
    category: "TEACHING",
    year: "2024",
    title: "西部支教",
    subtitle: "大学生支教教师",
    description: "承担6个班级，326名学生的授课任务，为期一年",
    image: "assets/experience/teaching.jpg",
    imagePosition: "58% center",
  },
  {
    id: "bytedance",
    category: "INTERNSHIP",
    year: "2026",
    title: "字节跳动",
    subtitle: "AI创新业务部门 · 产品运营",
    description: "AI产品策略与体验迭代",
    image: "assets/experience/bytedance-profile.jpg",
    imagePosition: "center 44%",
  },
  {
    id: "vbuild-founder",
    category: "FOUNDER",
    year: "2026",
    title: "vBuild创始人",
    subtitle: "OPC · 一站式vibe coding平台",
    description: "自然语言生成 · 可视化修改 · 一键部署",
    image: "assets/experience/vbuild-home.png",
    imagePosition: "center center",
    href: "#project-vbuild",
  },
  {
    id: "lighthouse-founder",
    category: "CO-FOUNDER",
    year: "2026",
    title: "灯塔AI联合创始人",
    subtitle: "高考志愿咨询 Agent",
    description: "智能体咨询 · 报告生成",
    image: "assets/experience/lighthouse-ai.png",
    imagePosition: "center top",
    href: "#project-lighthouse",
  },
  {
    id: "ai-media-creator",
    category: "CREATOR",
    year: "2026",
    title: "AI自媒体博主",
    subtitle: "全网120w+播放",
    description: "3.4w赞&收藏",
    image: "assets/experience/ai-media-creator.jpg",
    imagePosition: "center 48%",
    href: "#beyond-resume",
  },
  {
    id: "open-source-author",
    category: "OPEN SOURCE",
    year: "2026",
    title: "开源作者",
    subtitle: "Clear Recording",
    description: "支持画中画与配音的本地录屏工具",
    image: "assets/experience/clear-recording.png",
    imagePosition: "center center",
    href: "#vibe-coding",
  },
  {
    id: "trilingual",
    category: "LANGUAGE",
    year: "ZH · EN · JP",
    title: "三语习得",
    subtitle: "中文、英语、日语",
    description: "IELTS 7.0 · 日语专四优秀 · 可全英文办公",
    image: "assets/experience/trilingual.jpg",
    imagePosition: "center 38%",
    href: "#beyond-resume",
  },
];

const INITIAL_INDEX = 3;

const getRelativeIndex = (index: number, activeIndex: number) => {
  const half = Math.floor(experiences.length / 2);
  return ((index - activeIndex + experiences.length + half) % experiences.length) - half;
};

const ExperienceCard: React.FC<{
  experience: ExperienceItem;
  index: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  onHoverChange: (hovering: boolean) => void;
}> = ({ experience, index, activeIndex, onSelect, onHoverChange }) => {
  const relativeIndex = getRelativeIndex(index, activeIndex);
  const distance = Math.abs(relativeIndex);
  const isActive = index === activeIndex;
  const style = {
    "--hero-card-index": relativeIndex,
    "--hero-card-x-mobile": `${relativeIndex * 76}vw`,
    "--hero-card-scale": distance === 0 ? 1.01 : distance === 1 ? 0.96 : distance === 2 ? 0.91 : distance === 3 ? 0.86 : 0.82,
    "--hero-card-opacity": distance === 0 ? 1 : distance === 1 ? 0.82 : distance === 2 ? 0.62 : distance === 3 ? 0.4 : 0.12,
    "--hero-card-blur": `${distance === 0 ? 0 : distance === 1 ? 0.05 : distance === 2 ? 0.15 : distance === 3 ? 0.3 : 0.7}px`,
    "--hero-card-z": 20 - distance,
    pointerEvents: distance <= 3 ? "auto" : "none",
  } as React.CSSProperties;

  const cardContent = (
    <span className="experience-orbit-face experience-orbit-front">
      <span className="experience-orbit-photo">
        <img
          src={experience.image}
          alt={experience.description}
          loading={distance <= 3 ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition: experience.imagePosition }}
        />
        <span className="experience-orbit-category">
          {experience.category}
          {experience.href && <i aria-hidden="true">↗</i>}
        </span>
      </span>

      <span className="experience-orbit-copy">
        <span className="experience-orbit-year">{experience.year}</span>
        <h3>{experience.title}</h3>
        <span className="experience-orbit-subtitle">{experience.subtitle}</span>
        <small>{experience.description}</small>
      </span>
    </span>
  );

  const sharedProps = {
    className: `experience-hero-card ${isActive ? "is-active" : ""}`,
    style,
    onPointerEnter: (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse") onHoverChange(true);
    },
    onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse") onHoverChange(false);
    },
    "aria-label": `${experience.title}：${experience.subtitle}${experience.href ? (isActive ? "，前往对应页面" : "，点击移到中间") : ""}`,
    tabIndex: distance <= 3 ? 0 : -1,
  };

  if (experience.href) {
    return (
      <a
        href={experience.href}
        {...sharedProps}
        onClick={(event) => {
          if (!isActive) {
            event.preventDefault();
            onSelect(index);
          }
        }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...sharedProps}
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
    >
      {cardContent}
    </button>
  );
};

export const ByteDanceExperience: React.FC<ExperienceBlockProps> = ({
  id,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = React.useState(INITIAL_INDEX);
  const [hasEntered, setHasEntered] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const [isHoveringCard, setIsHoveringCard] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const hasAutoAdvancedRef = React.useRef(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    const root = document.querySelector(".site-scroll");
    if (!section || !(root instanceof HTMLElement)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { root, threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isInView || isHoveringCard || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      hasAutoAdvancedRef.current = true;
      setActiveIndex((current) => (current + 1) % experiences.length);
    }, hasAutoAdvancedRef.current ? 2500 : 850);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isHoveringCard, isInView]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + experiences.length) % experiences.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % experiences.length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <Section
      id={id}
      className={`experience-orbit-section experience-hero-section portfolio-surface ${hasEntered ? "is-visible" : ""} ${className}`}
      fullBleed
    >
      <div
        ref={(node) => {
          sectionRef.current = node?.closest("section") ?? null;
        }}
        className="experience-orbit-frame experience-hero-frame"
      >
        <header className="experience-orbit-header">
          <p className="section-kicker">01 · ABOUT ME</p>
          <h2 className="portfolio-title">Experience</h2>
        </header>

        <div
          className="experience-hero-carousel"
          role="group"
          aria-label="经历卡片轮播，鼠标悬停暂停，使用左右方向键切换"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="experience-hero-stage">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                onHoverChange={setIsHoveringCard}
              />
            ))}
          </div>

          <div className="experience-hero-nav" aria-label="选择经历卡片">
            {experiences.map((experience, index) => (
              <button
                key={experience.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`查看${experience.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
