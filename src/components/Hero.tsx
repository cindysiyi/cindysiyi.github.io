import React, { useState } from "react";
import { ArrowDown, Play, Pause, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";

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
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-slate-900">
            {t("hero.title_line1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t("hero.title_line2")}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-xl font-light leading-relaxed">
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

        {/* Right Side: Photo Placeholder */}
        <div className="mt-12 md:mt-0 relative w-full max-w-md aspect-[4/5] md:aspect-square">
          {/* Decorative Background Blob */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div
            className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="relative h-full w-full bg-slate-200 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="text-slate-400 flex flex-col items-center">
              <User className="w-24 h-24 mb-4 opacity-50" />
              <span className="text-sm uppercase tracking-widest">
                Photo Placeholder
              </span>
            </div>
            {/* Image tag for future use */}
            {/* <img src="" alt="Profile" className="object-cover w-full h-full" /> */}
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
