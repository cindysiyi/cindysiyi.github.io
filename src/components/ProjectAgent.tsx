import React from "react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  MessageSquareText,
  Route,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { config } from "../config";

const ProjectAgent: React.FC = () => {
  const { t } = useTranslation();
  const highlights = [
    { icon: <Target className="w-5 h-5" />, key: "projects.agent.highlight1" },
    { icon: <Route className="w-5 h-5" />, key: "projects.agent.highlight2" },
    { icon: <BarChart3 className="w-5 h-5" />, key: "projects.agent.highlight3" },
    { icon: <MessageSquareText className="w-5 h-5" />, key: "projects.agent.highlight4" },
  ];

  return (
    <Section id="project-agent" className="bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-20 md:px-10 md:py-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">
                AI Agent Project
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black leading-tight text-slate-950">
                {t("projects.agent.title")}
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-slate-500 max-w-2xl">
                {t("projects.agent.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.key}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                    {item.icon}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {t(item.key)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={config.projectLinks.aiAgent}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-600"
              >
                {t("projects.agent.cta_demo")}
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-500">
                {t("projects.agent.cta_case")}
                <FileText className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-cyan-100/40 blur-3xl"></div>
            <div className="relative overflow-hidden rounded-lg border border-slate-900 bg-slate-950 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400"></span>
                <span className="h-3 w-3 rounded-full bg-amber-300"></span>
                <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
                <span className="ml-3 truncate text-xs font-mono text-slate-400">
                  dengtaai.cn/dev/ui3
                </span>
              </div>
              <div className="aspect-[16/10] bg-white">
                <iframe
                  src="https://www.dengtaai.cn/dev/ui3/index.html?v=20251011"
                  title="AI Agent Preview"
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>
            <div className="absolute -bottom-5 left-6 hidden rounded-lg bg-white px-4 py-3 shadow-xl ring-1 ring-slate-200 md:block">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                <Zap className="h-4 w-4 text-amber-500" />
                {t("projects.agent.badge")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectAgent;
