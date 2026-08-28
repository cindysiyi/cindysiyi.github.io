import React from "react";
import { BrainCircuit, Languages, Newspaper, Workflow } from "lucide-react";
import Section from "./Section";

const flags = [
  { label: "CN", symbol: "🇨🇳", x: "57%", y: "58%", rotate: "-10deg", delay: "0s" },
  { label: "US", symbol: "🇺🇸", x: "30%", y: "66%", rotate: "7deg", delay: "0.18s" },
  { label: "JP", symbol: "🇯🇵", x: "74%", y: "32%", rotate: "12deg", delay: "0.34s" },
];

const experiments = [
  {
    title: "高考数据清洗",
    desc: "把复杂数据整理成可复用流程。",
  },
  {
    title: "穿越播报视频",
    desc: "脚本、画面与生成链路实验。",
  },
  {
    title: "Coze 志愿填报 Agent",
    desc: "用对话澄清需求并输出建议。",
  },
];

type FlagStyle = React.CSSProperties & {
  "--x": string;
  "--y": string;
  "--r": string;
};

const Highlights: React.FC = () => {
  return (
    <Section id="highlights" className="bg-white">
      <div className="flex h-screen max-h-screen w-full max-w-7xl flex-col justify-center overflow-hidden mx-auto px-4 py-14 md:px-10 md:py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-violet-600">
              <BrainCircuit className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Personal Signals
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Languages / Media / AI
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {["English", "日本語", "AI Workflow"].map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600"
              >
                {signal}
              </span>
            ))}
          </div>
        </div>

        <div className="grid h-[calc(100vh-168px)] min-h-0 grid-cols-1 gap-3 md:h-[calc(100vh-150px)] md:grid-cols-[1.05fr_0.95fr] md:gap-5">
          <div className="grid min-h-0 grid-rows-[1.08fr_0.92fr] gap-3 md:gap-5">
            <article className="relative overflow-hidden rounded-lg border border-violet-100 bg-violet-50 p-5 shadow-sm md:p-7">
              <div className="relative z-10 max-w-[15rem] md:max-w-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm md:h-11 md:w-11">
                  <Languages className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-black text-slate-950 md:mt-7 md:text-4xl">
                  Trilingual Expression
                </h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600 md:mt-3 md:text-sm">
                  日语专四优秀 · IELTS 7.0 · 普通话一乙
                </p>
              </div>

              <div className="flag-stage" aria-hidden="true">
                {flags.map((flag) => (
                  <span
                    key={flag.label}
                    className="flag-ball"
                    style={
                      {
                        "--x": flag.x,
                        "--y": flag.y,
                        "--r": flag.rotate,
                        animationDelay: flag.delay,
                      } as FlagStyle
                    }
                  >
                    {flag.symbol}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 md:h-11 md:w-11">
                <Newspaper className="h-5 w-5" />
              </div>
              <div className="mt-5 grid grid-cols-[0.9fr_1.1fr] gap-4 md:mt-7">
                <h3 className="text-2xl font-black leading-tight text-slate-950 md:text-4xl">
                  Media Training
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-500 md:text-sm">
                  新闻传播研究生背景，长期训练信息判断、叙事结构与跨文化表达。
                </p>
              </div>
            </article>
          </div>

          <article className="flex min-h-0 flex-col justify-between rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl md:p-7">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-cyan-200 md:h-11 md:w-11">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-3xl font-black leading-tight md:mt-8 md:text-5xl">
                AI Experiments
              </h3>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-300 md:text-sm">
                从工具使用走向流程设计，把内容痛点快速拆成可验证的原型。
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:mt-8">
              {experiments.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-white/[0.07] p-4 md:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-base font-black text-white md:text-xl">
                      {item.title}
                    </h4>
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 md:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
};

export default Highlights;
