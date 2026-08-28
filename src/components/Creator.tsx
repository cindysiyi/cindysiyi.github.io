import React from "react";
import { BookOpen, Layers, Radio, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";

const Creator: React.FC = () => {
  const { t } = useTranslation();
  const tracks = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: t("creator.track1_title"),
      desc: t("creator.track1_desc"),
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: t("creator.track2_title"),
      desc: t("creator.track2_desc"),
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: t("creator.track3_title"),
      desc: t("creator.track3_desc"),
    },
  ];

  return (
    <Section id="creator" className="bg-slate-950 text-white">
      <div className="w-full max-w-6xl mx-auto py-20 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 text-cyan-200">
              <Radio className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">
                {t("creator.section_title")}
              </span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                {t("creator.title")}
              </h2>
              <p className="text-base md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                {t("creator.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 max-w-xl">
              <div className="creator-stat">
                <span>{t("creator.stat1_value")}</span>
                <small>{t("creator.stat1_label")}</small>
              </div>
              <div className="creator-stat">
                <span>{t("creator.stat2_value")}</span>
                <small>{t("creator.stat2_label")}</small>
              </div>
              <div className="creator-stat">
                <span>{t("creator.stat3_value")}</span>
                <small>{t("creator.stat3_label")}</small>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {tracks.map((track) => (
              <article key={track.title} className="creator-track">
                <div className="creator-track-icon">{track.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-300">
                    {track.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Creator;
