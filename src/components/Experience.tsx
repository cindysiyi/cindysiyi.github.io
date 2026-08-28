import React from "react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import { config } from "../config";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Database,
  FileText,
  Globe2,
  Newspaper,
} from "lucide-react";

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
  const experienceImages: Record<ExperienceKey, string[]> = {
    byte_dance: config.byte_dance,
    shanghai_gov: config.shanghai_gov,
    teaching: config.teaching,
  };
  return experienceImages[dataKey];
};

const ExperienceLeft: React.FC<{ dataKey: ExperienceKey }> = ({ dataKey }) => {
  const { t } = useTranslation();
  const metrics = [1, 2, 3].map((num) => ({
    value: t(`experience.${dataKey}.metric${num}_value`),
    label: t(`experience.${dataKey}.metric${num}_label`),
  }));

  return (
    <div className="relative z-10 flex flex-col space-y-7 lg:w-[48%]">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 text-purple-600">
          <Briefcase className="w-5 h-5" />
          <span className="text-sm font-bold tracking-widest uppercase">
            {t("experience.section_title")}
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            {t(`experience.${dataKey}.company`)}
          </h2>
          <h3 className="inline-flex rounded-lg bg-white px-4 py-2 text-lg font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 md:text-xl">
            {t(`experience.${dataKey}.role`)}
          </h3>
          <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
            <Calendar className="w-4 h-4" />
            <span>{t(`experience.${dataKey}.period`)}</span>
          </div>
        </div>
      </div>

      <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
        {t(`experience.${dataKey}.description`)}
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-xl">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xl font-black text-slate-950">
              {metric.value}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-slate-500">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      <ul className="space-y-3 max-w-2xl">
        {[1, 2, 3, 4].map((num) => {
          const key = `experience.${dataKey}.achievement${num}`;
          const content = t(key);
          if (content === key || !content) return null;

          return (
            <li key={num} className="flex items-start space-x-3 text-slate-600">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />
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
    <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 md:px-10 lg:min-h-screen lg:flex-row lg:py-12">
      <ExperienceLeft dataKey={dataKey} />
      <div className="relative h-[420px] w-full lg:h-[560px] lg:w-[48%]">
        {right}
      </div>
    </div>
  </Section>
);

const ByteDanceRight: React.FC<{ images: string[]; label: string }> = ({
  images,
  label,
}) => (
  <div className="absolute inset-0 grid grid-rows-[1fr_auto] gap-4">
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">
      <div className="flex h-full flex-col overflow-hidden rounded-md bg-slate-100">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Content Quality System
          </span>
          <Database className="h-4 w-4 text-cyan-500" />
        </div>
        <img
          src={images[0]}
          alt={`${label}-1`}
          className="min-h-0 w-full flex-1 object-cover"
        />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {["Growth supply", "Quality labels", "Model review"].map((item) => (
        <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <FileText className="h-5 w-5 text-purple-500" />
          <div className="mt-3 text-xs font-bold text-slate-600">
            {item}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ShanghaiRight: React.FC<{ images: string[]; label: string }> = ({
  images,
  label,
}) => (
  <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] gap-4 rounded-lg bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-5 shadow-2xl shadow-slate-200">
    <div className="flex items-center justify-between rounded-lg bg-white px-5 py-4 shadow-sm">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Public Communication
        </div>
        <div className="mt-1 text-lg font-black text-slate-950">
          Global Events Desk
        </div>
      </div>
      <Globe2 className="h-8 w-8 text-cyan-500" />
    </div>
    <div className="grid min-h-0 grid-cols-2 gap-4">
      {images[0] && (
        <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-white/70">
          <img
            src={images[0]}
            alt={`${label}-1`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {images[1] && (
        <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-white/70">
          <img
            src={images[1]}
            alt={`${label}-2`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
    <div className="rounded-lg bg-slate-950 p-4 text-white shadow-xl">
      <div className="flex items-center gap-2 text-sm font-bold">
        <Newspaper className="h-5 w-5 text-cyan-300" />
        Media Briefing
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-full bg-white/10 px-3 py-1">Agenda</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Q&A</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Archive</span>
      </div>
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
      <div className="relative min-h-screen w-full overflow-hidden">
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
        <div className="relative z-10 flex min-h-screen items-center">
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
