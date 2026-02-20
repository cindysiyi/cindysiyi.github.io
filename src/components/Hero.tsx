/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { ArrowDown, Play, Pause } from "lucide-react";
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
    <Section
      id="home"
      className="bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto py-12 md:py-0">
        {/* Left Side: Manifesto & Audio */}
        <div className="flex flex-col items-start space-y-8 max-w-2xl z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-slate-900">
            {t("hero.title_line1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t("hero.title_line2")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Audio Player Placeholder */}
          <div className="flex items-center space-x-4 bg-white p-2 pr-6 rounded-full shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              aria-label={
                isPlaying ? t("hero.pause_intro") : t("hero.play_intro")
              }
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-1" />
              )}
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">
                {isPlaying ? "Playing..." : "Intro.mp3"}
              </span>
              <div className="flex items-center space-x-1 h-3 mt-1">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? "animate-pulse bg-blue-500" : "bg-slate-300"}`}
                    style={{
                      height: isPlaying ? `${Math.random() * 100}%` : "40%",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Photo - Tech Fusion Style */}
        <div className="mt-12 md:mt-0 relative w-full max-w-md aspect-[4/5] md:aspect-square group [perspective:1000px] flex items-center justify-center">
          {/* Main 3D Container */}
          <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)]">
            {/* Deep Background - Large Fusion Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-[80px] [transform:translateZ(-50px)]"></div>

            {/* Tech Ring 1 - Outer Dashed Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] border border-dashed border-slate-300/40 rounded-full [transform:translateZ(-30px)] animate-[spin_60s_linear_infinite]"></div>

            {/* Tech Ring 2 - Inner Gradient Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-transparent bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full [mask-image:linear-gradient(white,transparent)] [transform:translateZ(-20px)]"></div>

            {/* Floating Tech Elements (Fusion Blocks) */}
            {/* Top Right Block */}
            <div className="absolute top-10 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-300/10 backdrop-blur-sm rounded-2xl border border-white/20 [transform:translateZ(10px)_rotate(12deg)] group-hover:[transform:translateZ(30px)_rotate(20deg)] transition-all duration-500 shadow-lg"></div>

            {/* Bottom Left Block */}
            <div className="absolute bottom-12 left-4 w-28 h-28 bg-gradient-to-tr from-purple-400/10 to-pink-300/10 backdrop-blur-sm rounded-full border border-white/20 [transform:translateZ(5px)] group-hover:[transform:translateZ(25px)] transition-all duration-500 shadow-lg"></div>

            {/* Small Floating Particles */}
            <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400 rounded-full blur-[2px] animate-pulse [transform:translateZ(40px)]"></div>
            <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-purple-400 rounded-full blur-[2px] animate-pulse delay-700 [transform:translateZ(30px)]"></div>

            {/* Front Layer - Image */}
            <div className="absolute inset-0 flex items-end justify-center transition-transform duration-500 [transform:translateZ(50px)] group-hover:[transform:translateZ(80px)_scale(1.05)]">
              <img
                src={config.heroImg}
                alt="Profile"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                style={{
                  objectPosition: "top", // 靠上
                  transform: "scale(1.3)", // 放大 1.3 倍
                  transformOrigin: "center top", // 从顶部中心放大
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
