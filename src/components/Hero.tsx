/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { ArrowDown, Play, Pause, Code, Brain, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import { config } from "../config";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    // Attempt auto-play when component mounts
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5; // Set reasonable default volume
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Auto-play prevented:", error);
          setIsPlaying(false);
        }
      }
    };
    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.error("Play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Section id="home" className="hero-container">
      <audio
        ref={audioRef}
        src={config.audio}
        onEnded={() => setIsPlaying(false)}
      />
      {/* Breathing Gradient Background */}
      <div className="breathing-gradient pointer-events-none -z-20"></div>

      {/* 3D Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="particle-3d w-3 h-3 top-[20%] left-[10%] animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="particle-3d w-4 h-4 top-[60%] left-[5%] animate-[float_12s_ease-in-out_infinite_1s]"></div>
        <div className="particle-3d w-2 h-2 top-[30%] right-[15%] animate-[float_10s_ease-in-out_infinite_2s]"></div>
        <div className="particle-3d w-5 h-5 top-[80%] right-[10%] animate-[float_15s_ease-in-out_infinite_0.5s]"></div>
        <div className="particle-3d w-2 h-2 top-[15%] right-[40%] animate-[float_9s_ease-in-out_infinite_1.5s]"></div>
      </div>

      <div className="hero-content-wrapper">
        {/* Left Side: Manifesto & Audio */}
        <div className="flex flex-col items-start space-y-8 max-w-2xl z-20">
          <h1 className="hero-title">
            {t("hero.title_line1")}
            <br />
            <span className="hero-highlight">{t("hero.title_line2")}</span>
          </h1>

          <p className="hero-subtitle">{t("hero.subtitle")}</p>

          {/* Audio Player - Styled as a primary action button */}
          <div className="hero-audio-player group">
            <button
              onClick={togglePlay}
              className="hero-play-button"
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
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {isPlaying ? "Playing..." : "Intro.mp3"}
              </span>
              <div className="flex items-center space-x-1 h-4 mt-1">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? "animate-pulse bg-blue-500" : "bg-blue-200"}`}
                    style={{
                      height: isPlaying
                        ? `${Math.random() * 100}%`
                        : `${30 + Math.sin(i) * 20}%`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Photo - HomeworkAI Style Composition */}
        <div className="mt-16 md:mt-0 relative w-full max-w-lg aspect-[4/5] md:aspect-square flex items-center justify-center">
          {/* Background Organic Shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/80 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-10 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-2xl -z-10 animate-blob"></div>
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-purple-100/50 rounded-full blur-2xl -z-10 animate-blob animation-delay-2000"></div>

          {/* Floating Elements Container */}
          <div className="relative w-full h-full">
            {/* Floating Card 1: Math/Code (Top Left) */}
            <div className="absolute top-[10%] -left-[5%] md:-left-[10%] float-card-glass transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10 animate-float">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-bold text-slate-400">PRD.md</span>
              </div>
              <div className="space-y-1">
                <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
                <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                <div className="w-20 h-2 bg-blue-100 rounded-full"></div>
              </div>
            </div>

            {/* Floating Card 2: AI Icon (Top Right) */}
            <div className="absolute top-[5%] right-[5%] bg-white p-3 rounded-2xl shadow-lg border border-blue-50 transform rotate-12 hover:rotate-6 transition-transform duration-500 z-0 animate-float animation-delay-1000">
              <Brain className="w-8 h-8 text-purple-500" />
            </div>

            {/* Floating Tag: "AI AGENT" (Bottom Left - The Yellow Pill) */}
            <div className="absolute bottom-[20%] -left-[5%] float-tag-yellow transform -rotate-12 hover:scale-110 transition-transform duration-300 animate-float animation-delay-2000 z-20">
              AI AGENT
            </div>

            {/* Floating Element: Rocket (Bottom Right) */}
            <div className="absolute bottom-[15%] right-[0%] bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-xl border border-white/50 z-20 animate-bounce">
              <Rocket className="w-6 h-6 text-orange-500" />
            </div>

            {/* Background Decorative Formulas/Text */}
            <div className="absolute top-1/4 left-10 text-blue-200 font-mono text-sm transform -rotate-12 select-none -z-10">
              user_needs = true
            </div>
            <div className="absolute bottom-1/3 right-10 text-purple-200 font-mono text-sm transform rotate-6 select-none -z-10">
              agent.execute()
            </div>

            {/* Main Image */}
            <div className="relative z-10 w-full h-full flex items-end justify-center">
              <img
                src={config.heroImg}
                alt="Profile"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
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
        <ArrowDown className="w-6 h-6 text-slate-400" />
      </div>
    </Section>
  );
};

export default Hero;
