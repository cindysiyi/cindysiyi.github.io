/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from "react";
import { ArrowDown, Play, Pause, Code, Brain, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import { config } from "../config";

const welcomeLines = [
  { start: 0, text: "你好呀，很高兴在这里见到你！", lang: "zh-CN" },
  {
    start: 3.2,
    text: "With AI, I enjoy turning ideas into things people can actually use.",
    lang: "en",
  },
  {
    start: 10.2,
    text: "ここでは、私の仕事や小さな実験をご紹介しております。",
    lang: "ja",
  },
  {
    start: 15.6,
    text: "どうぞごゆっくりご覧ください。",
    lang: "ja",
  },
];

const waveformHeights = [
  12, 20, 29, 18, 35, 24, 42, 31, 48, 26, 39, 19, 32, 45, 25, 38, 17, 30,
];

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeWelcomeLine, setActiveWelcomeLine] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const autoPlayAttemptedRef = React.useRef(false);
  const hasAudio = Boolean(config.audio);
  const subtitle = t("hero.subtitle");

  React.useEffect(() => {
    const characters = Array.from(subtitle);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setTypedSubtitle(subtitle);
      return;
    }

    setTypedSubtitle("");
    let index = 0;
    let typingTimer: number;
    const startTimer = window.setTimeout(() => {
      const typeNextCharacter = () => {
        index += 1;
        setTypedSubtitle(characters.slice(0, index).join(""));
        if (index < characters.length) {
          typingTimer = window.setTimeout(typeNextCharacter, 34);
        }
      };
      typeNextCharacter();
    }, 480);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(typingTimer);
    };
  }, [subtitle]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio || autoPlayAttemptedRef.current) {
      return;
    }

    autoPlayAttemptedRef.current = true;
    audio.loop = false;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [hasAudio]);

  const togglePlay = () => {
    if (!audioRef.current || !hasAudio) {
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((e) => console.error("Play failed:", e));
  };

  const syncWelcomeLine = () => {
    const currentTime = audioRef.current?.currentTime ?? 0;
    const nextIndex = welcomeLines.reduce(
      (activeIndex, line, index) =>
        currentTime >= line.start ? index : activeIndex,
      0,
    );
    setActiveWelcomeLine(nextIndex);
  };

  return (
    <Section id="home" className="hero-container" fullBleed>
      <audio
        ref={audioRef}
        src={config.audio}
        autoPlay
        preload="auto"
        loop={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={syncWelcomeLine}
        onEnded={() => {
          setIsPlaying(false);
          setActiveWelcomeLine(welcomeLines.length - 1);
        }}
      />
      <div className="breathing-gradient pointer-events-none absolute inset-0 -z-30"></div>
      <div className="hero-grid pointer-events-none absolute inset-0 -z-20"></div>
      <div className="hero-glow hero-glow-left pointer-events-none -z-20"></div>
      <div className="hero-glow hero-glow-right pointer-events-none -z-20"></div>
      <div className="hero-vignette pointer-events-none absolute inset-0 -z-10"></div>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="hero-code-text top-[6%] left-[8%] hero-code-float hero-code-float-1"
          style={{ "--hero-tilt": "-7deg" } as React.CSSProperties}
        >
          agent.execute()
        </div>
        <div
          className="hero-code-text is-credential top-[16%] right-[10%] hero-code-float hero-code-float-2"
          style={{ "--hero-tilt": "6deg" } as React.CSSProperties}
        >
          OPC
        </div>
        <div
          className="hero-code-text is-credential is-primary top-[7%] left-[40%] hero-code-float hero-code-float-3"
          style={{ "--hero-tilt": "-4deg" } as React.CSSProperties}
        >
          120w+播放
        </div>
        <div
          className="hero-code-text top-[38%] right-[7%] hero-code-float hero-code-float-4"
          style={{ "--hero-tilt": "3deg" } as React.CSSProperties}
        >
          context.sync()
        </div>
        <div
          className="hero-code-text is-credential is-primary top-[9%] left-[58%] hero-code-float hero-code-float-5"
          style={{ "--hero-tilt": "-2deg" } as React.CSSProperties}
        >
          vBuild创始人
        </div>
        <div
          className="hero-code-text is-credential top-[29%] right-[5%] hero-code-float hero-code-float-6"
          style={{ "--hero-tilt": "2deg" } as React.CSSProperties}
        >
          灯塔AI联合创始人
        </div>
        <div
          className="hero-code-text bottom-[8%] left-[28%] hero-code-float hero-code-float-7"
          style={{ "--hero-tilt": "-8deg" } as React.CSSProperties}
        >
          pipeline.ready()
        </div>
        <div
          className="hero-code-text is-credential bottom-[9%] right-[27%] hero-code-float hero-code-float-8"
          style={{ "--hero-tilt": "5deg" } as React.CSSProperties}
        >
          开源作者
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="particle-3d w-3 h-3 top-[20%] left-[10%] animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="particle-3d w-4 h-4 top-[60%] left-[5%] animate-[float_12s_ease-in-out_infinite_1s]"></div>
        <div className="particle-3d w-2 h-2 top-[30%] right-[15%] animate-[float_10s_ease-in-out_infinite_2s]"></div>
        <div className="particle-3d w-5 h-5 top-[80%] right-[10%] animate-[float_15s_ease-in-out_infinite_0.5s]"></div>
        <div className="particle-3d w-2 h-2 top-[15%] right-[40%] animate-[float_9s_ease-in-out_infinite_1.5s]"></div>
      </div>

      <div className="hero-content-wrapper">
        {/* Left Side: Manifesto & Audio */}
        <div className="hero-copy flex max-w-2xl flex-col items-start z-20">
          <h1 className="hero-title">
            <span className="hero-type-line hero-type-line-1 hero-type-caret">
              {t("hero.title_line1")}
            </span>
            <br />
            <span className="hero-highlight hero-type-line hero-type-line-2 hero-type-caret">
              {t("hero.title_line2")}
            </span>
          </h1>

          <p className="hero-subtitle" aria-label={subtitle}>
            <span aria-hidden="true">{typedSubtitle}</span>
            <span className="hero-type-cursor" aria-hidden="true"></span>
          </p>

          {/* Audio Player */}
          <div className={`hero-audio-player group ${hasAudio ? "" : "hero-audio-player-pending"}`}>
            <button
              onClick={togglePlay}
              className="hero-play-button"
              disabled={!hasAudio}
              aria-label={
                isPlaying ? t("hero.pause_intro") : t("hero.play_intro")
              }
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 ml-1 fill-current" />
              )}
            </button>
            <div className="hero-audio-content">
              <div className="hero-audio-lyrics" aria-live="polite">
                <div
                  className="hero-audio-lyrics-track"
                  style={{
                    transform: `translateY(-${activeWelcomeLine * 2.7}rem)`,
                  }}
                >
                  {welcomeLines.map((line, index) => (
                    <span
                      key={`${line.lang}-${line.start}`}
                      lang={line.lang}
                      className={`hero-audio-lyric ${index === activeWelcomeLine ? "is-active" : ""}`}
                    >
                      {line.text}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`hero-audio-waveform ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
                {waveformHeights.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    style={
                      {
                        "--wave-height": `${height}px`,
                        "--wave-delay": `${index * -62}ms`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Photo - HomeworkAI Style Composition */}
        <div className="hero-visual relative mt-6 flex aspect-[4/5] items-center justify-center md:mt-0 md:aspect-square">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-10 right-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-2xl -z-10 animate-blob"></div>
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-2xl -z-10 animate-blob animation-delay-2000"></div>

          {/* Floating Elements Container */}
          <div className="relative w-full h-full">
            {/* Floating Card 1: Math/Code (Top Left) */}
            <div className="absolute top-[10%] -left-[5%] md:-left-[10%] float-card-glass transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10 animate-float">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-cyan-300" />
                <span className="text-xs font-bold text-slate-300">PRD.md</span>
              </div>
              <div className="space-y-1">
                <div className="w-24 h-2 bg-white/20 rounded-full"></div>
                <div className="w-16 h-2 bg-white/20 rounded-full"></div>
                <div className="w-20 h-2 bg-cyan-400/40 rounded-full"></div>
              </div>
            </div>

            {/* Floating Card 2: AI Icon (Top Right) */}
            <div className="absolute top-[5%] right-[5%] bg-white/10 p-3 rounded-2xl shadow-lg border border-white/10 transform rotate-12 hover:rotate-6 transition-transform duration-500 z-0 animate-float animation-delay-1000 backdrop-blur-xl">
              <Brain className="w-8 h-8 text-indigo-300" />
            </div>

            {/* Floating Tag: "AI AGENT" (Bottom Left - The Yellow Pill) */}
            <div className="absolute bottom-[20%] -left-[5%] float-tag-yellow transform -rotate-12 hover:scale-110 transition-transform duration-300 animate-float animation-delay-2000 z-20">
              AI AGENT
            </div>

            {/* Floating Element: Rocket (Bottom Right) */}
            <div className="absolute bottom-[15%] right-[0%] bg-white/10 backdrop-blur-xl p-3 rounded-full shadow-xl border border-white/10 z-20">
              <Rocket className="w-6 h-6 text-amber-300" />
            </div>

            {/* Background Decorative Formulas/Text */}
            {/* Main Image */}
            <div className="relative z-10 w-full h-full flex items-end justify-center">
              <div className="hero-photo-halo w-[95%] h-[95%] -z-10 left-1/2 top-[22%] -translate-x-1/2"></div>
              <div
                className={`hero-photo-placeholder ${imageLoaded ? "is-loaded" : ""}`}
                aria-hidden="true"
              ></div>
              <img
                src={config.heroImg}
                alt="Cindy"
                className={`hero-profile-image w-full h-full object-contain object-bottom drop-shadow-2xl ${imageLoaded ? "is-loaded" : ""}`}
                loading="eager"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 90%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 90%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-cyan-200/70" />
      </div>
    </Section>
  );
};

export default Hero;
