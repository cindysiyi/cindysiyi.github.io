/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { ArrowDown, Play, Pause, Code, Brain, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import { config } from "../config";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Logic for playing audio will be implemented later
  };

  return (
    <Section id="home" className="bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto py-12 md:py-0 px-4 md:px-8">
        {/* Left Side: Manifesto & Audio */}
        <div className="flex flex-col items-start space-y-8 max-w-2xl z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900">
            {t("hero.title_line1")}
            <br />
            <span className="text-blue-600">{t("hero.title_line2")}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-lg font-medium leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Audio Player - Styled as a primary action button */}
          <div className="flex items-center space-x-4 bg-white p-2 pr-6 rounded-full shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
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
            <div className="absolute top-[10%] -left-[5%] md:-left-[10%] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10 animate-float">
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
            <div className="absolute bottom-[20%] -left-[5%] bg-yellow-400 text-white font-black text-sm px-6 py-2 rounded-lg transform -rotate-12 shadow-lg z-20 hover:scale-110 transition-transform duration-300 animate-float animation-delay-2000">
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
