/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import {
  Sparkles,
  ArrowUpRight,
  Zap,
  Target,
  BarChart,
  Settings,
  Rocket,
} from "lucide-react";

const ProjectAgent: React.FC = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      key: "projects.agent.highlight1",
    },
    {
      icon: <Target className="w-5 h-5 text-red-500" />,
      key: "projects.agent.highlight2",
    },
    {
      icon: <BarChart className="w-5 h-5 text-blue-500" />,
      key: "projects.agent.highlight3",
    },
    {
      icon: <Settings className="w-5 h-5 text-purple-500" />,
      key: "projects.agent.highlight4",
    },
    {
      icon: <Rocket className="w-5 h-5 text-green-500" />,
      key: "projects.agent.highlight5",
    },
  ];

  return (
    <Section
      id="project-agent"
      className="bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto h-full py-12 gap-12">
        {/* Left Content: Text Info */}
        <div className="flex flex-col space-y-8 lg:w-1/2 z-10">
          <div className="flex items-center space-x-2 text-purple-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">
              AI Agent Project
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {t("projects.agent.title")}
            </h2>
            <h3 className="text-xl md:text-2xl text-slate-600 font-medium bg-purple-50 inline-block px-4 py-2 rounded-lg">
              {t("projects.agent.role")}
            </h3>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed">
            {t("projects.agent.description")}
          </p>

          <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1 flex-shrink-0 bg-slate-50 p-1.5 rounded-full">
                  {item.icon}
                </div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  {t(item.key)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#"
              className="flex items-center space-x-2 bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
            >
              <span className="font-bold tracking-wide">
                {t("projects.agent.cta_case")}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.dengtaai.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white text-slate-900 border border-slate-200 px-8 py-3 rounded-full hover:border-purple-600 hover:text-purple-600 transition-all duration-300 shadow-sm"
            >
              <span className="font-bold tracking-wide">
                {t("projects.agent.cta_demo")}
              </span>
              <Zap className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Content: PC Preview Mockup */}
        <div className="lg:w-1/2 w-full flex justify-center items-center relative group">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-purple-200/30 to-blue-200/30 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>

          {/* Browser Window Mockup */}
          <div className="w-full rounded-xl shadow-2xl overflow-hidden bg-slate-900 border border-slate-800 transform transition-all hover:scale-[1.02] hover:shadow-purple-500/20 duration-500">
            {/* Browser Toolbar */}
            <div className="bg-slate-800 px-4 py-3 flex items-center space-x-4 border-b border-slate-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
              </div>
              <div className="flex-1 bg-slate-900/50 rounded-md h-6 flex items-center px-3 text-xs text-slate-400 font-mono overflow-hidden whitespace-nowrap">
                <span className="text-green-500 mr-2">🔒</span>
                https://www.dengtaai.cn/dev/ui3
              </div>
            </div>

            {/* Content Area - 16:10 Aspect Ratio for PC view */}
            <div className="w-full aspect-[16/10] bg-white relative">
              <iframe
                src="https://www.dengtaai.cn/dev/ui3/index.html?v=20251011"
                title="App Preview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>

              {/* Optional Loading State or Overlay if needed */}
            </div>
          </div>

          {/* Floating Stats / Info Cards */}
          <div
            className="absolute -right-4 -top-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 animate-bounce hidden md:block"
            style={{ animationDuration: "3s" }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700">
                PC Webview
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectAgent;
