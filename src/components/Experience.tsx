import React from "react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import { config } from "../config";
import { Briefcase, Calendar } from "lucide-react";

type ExperienceKey = "byte_dance" | "shanghai_gov" | "teaching";

interface ExperienceSectionProps {
  id: string;
  dataKey: ExperienceKey;
  className?: string;
  right: React.ReactNode;
}

interface ExperienceBlockProps {
  id: string;
  className?: string;
}

const getImages = (dataKey: ExperienceKey) => {
  const experienceImages = config[dataKey as keyof typeof config];
  return Array.isArray(experienceImages) ? experienceImages : [];
};

const ExperienceLeft: React.FC<{ dataKey: ExperienceKey }> = ({ dataKey }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-6 md:w-1/2 z-10">
      <div className="flex items-center space-x-2 text-purple-600">
        <Briefcase className="w-5 h-5" />
        <span className="text-sm font-bold tracking-widest uppercase">
          {t("experience.section_title")}
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          {t(`experience.${dataKey}.company`)}
        </h2>
        <h3 className="text-xl md:text-2xl text-slate-600 font-medium">
          {t(`experience.${dataKey}.role`)}
        </h3>
        <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
          <Calendar className="w-4 h-4" />
          <span>{t(`experience.${dataKey}.period`)}</span>
        </div>
      </div>

      <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
        {t(`experience.${dataKey}.description`)}
      </p>

      <ul className="space-y-3">
        {[1, 2, 3, 4].map((num) => {
          const key = `experience.${dataKey}.achievement${num}`;
          const content = t(key);
          if (content === key || !content) return null;

          return (
            <li key={num} className="flex items-start space-x-3 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></span>
              <span className="text-sm md:text-base leading-relaxed">
                {content}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ExperiencePlaceholder: React.FC = () => (
  <div className="absolute inset-0 bg-slate-200 rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-500 group">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300"></div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
      <div className="w-16 h-16 border-2 border-slate-400 border-dashed rounded-lg mb-4 flex items-center justify-center">
        <span className="text-xs">IMG</span>
      </div>
      <span className="text-xs uppercase tracking-widest">Work / Result</span>
    </div>
  </div>
);

const ExperienceSectionLayout: React.FC<ExperienceSectionProps> = ({
  id,
  dataKey,
  className = "",
  right,
}) => (
  <Section id={id} className={`bg-slate-50 ${className}`}>
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto h-full py-12">
      <ExperienceLeft dataKey={dataKey} />
      <div className="md:w-5/12 mt-12 md:mt-0 relative h-[300px] md:h-[400px] w-full">
        {right}
      </div>
    </div>
  </Section>
);

const ByteDanceRight: React.FC<{ images: string[]; label: string }> = ({
  images,
  label,
}) => (
  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-slate-900/10 transform rotate-2 hover:rotate-0 transition-all duration-500 p-3">
    <div
      className={`grid h-full w-full gap-3 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
    >
      {images.map((src, index) => {
        const spanClass = images.length >= 3 && index === 0 ? "row-span-2" : "";
        return (
          <div
            key={src}
            className={`relative rounded-xl overflow-hidden ${spanClass}`}
          >
            <img
              src={src}
              alt={`${label}-${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  </div>
);

const ShanghaiRight: React.FC<{ images: string[]; label: string }> = ({
  images,
  label,
}) => (
  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-100 to-slate-200 transform -rotate-1 hover:rotate-0 transition-all duration-500">
    <div className="relative w-full h-full">
      {images[0] && (
        <div className="absolute top-6 left-6 w-[68%] h-[70%] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/70 transform -rotate-3">
          <img
            src={images[0]}
            alt={`${label}-1`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {images[1] && (
        <div className="absolute bottom-6 right-6 w-[60%] h-[60%] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/70 transform rotate-3">
          <img
            src={images[1]}
            alt={`${label}-2`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  </div>
);

export const ByteDanceExperience: React.FC<ExperienceBlockProps> = ({
  id,
  className,
}) => {
  const dataKey: ExperienceKey = "byte_dance";
  const images = getImages(dataKey);
  const { t } = useTranslation();
  const label = t(`experience.${dataKey}.company`);

  return (
    <ExperienceSectionLayout
      id={id}
      dataKey={dataKey}
      className={className}
      right={
        images.length > 0 ? (
          <ByteDanceRight images={images} label={label} />
        ) : (
          <ExperiencePlaceholder />
        )
      }
    />
  );
};

export const ShanghaiGovExperience: React.FC<ExperienceBlockProps> = ({
  id,
  className,
}) => {
  const dataKey: ExperienceKey = "shanghai_gov";
  const images = getImages(dataKey);
  const { t } = useTranslation();
  const label = t(`experience.${dataKey}.company`);

  return (
    <ExperienceSectionLayout
      id={id}
      dataKey={dataKey}
      className={className}
      right={
        images.length > 0 ? (
          <ShanghaiRight images={images} label={label} />
        ) : (
          <ExperiencePlaceholder />
        )
      }
    />
  );
};

export const TeachingExperience: React.FC<ExperienceBlockProps> = ({
  id,
  className,
}) => {
  const dataKey: ExperienceKey = "teaching";
  const images = getImages(dataKey);
  const { t } = useTranslation();
  const label = t(`experience.${dataKey}.company`);

  React.useEffect(() => {
    const section = document.getElementById(id);
    const scroller = document.querySelector("main");
    if (!section || !(scroller instanceof HTMLElement)) {
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, rect.top / viewHeight));
      section.style.setProperty(
        "--teaching-image-shift-x",
        `${progress * 32}px`,
      );
      section.style.setProperty(
        "--teaching-image-shift-y",
        `${progress * -18}px`,
      );
      section.style.setProperty(
        "--teaching-text-shift-x",
        `${progress * -24}px`,
      );
      section.style.setProperty(
        "--teaching-text-shift-y",
        `${progress * 10}px`,
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [id]);

  return (
    <Section id={id} className={`bg-slate-950 ${className}`} fullBleed>
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0">
          {images[0] ? (
            <img
              src={images[0]}
              alt={`${label}-1`}
              className="teaching-image"
            />
          ) : (
            <ExperiencePlaceholder />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/35 to-slate-900/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-950/10 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8">
            <div className="teaching-text max-w-xl teaching-card">
              <div className="flex items-center space-x-2 text-cyan-200">
                <Briefcase className="w-5 h-5" />
                <span className="text-sm font-bold tracking-widest uppercase">
                  {t("experience.section_title")}
                </span>
              </div>

              <div className="space-y-2 mt-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {t(`experience.${dataKey}.company`)}
                </h2>
                <h3 className="text-xl md:text-2xl text-slate-200 font-medium">
                  {t(`experience.${dataKey}.role`)}
                </h3>
                <div className="flex items-center space-x-2 text-slate-300 text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{t(`experience.${dataKey}.period`)}</span>
                </div>
              </div>

              <p className="text-lg text-slate-200 leading-relaxed mt-5">
                {t(`experience.${dataKey}.description`)}
              </p>

              <ul className="space-y-3 mt-6">
                {[1, 2, 3, 4].map((num) => {
                  const key = `experience.${dataKey}.achievement${num}`;
                  const content = t(key);
                  if (content === key || !content) return null;

                  return (
                    <li
                      key={num}
                      className="flex items-start space-x-3 text-slate-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 mt-2 flex-shrink-0"></span>
                      <span className="text-sm md:text-base leading-relaxed">
                        {content}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/75 via-slate-950/35 to-transparent"></div>
      </div>
    </Section>
  );
};
