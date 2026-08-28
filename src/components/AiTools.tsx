import React from "react";
import { ArrowUpRight, Wrench } from "lucide-react";
import Section from "./Section";

const tools = [
  {
    name: "Claude",
    type: "Assistant",
    note: "适合长文档梳理、复杂推理和产品方案推演，能把零散想法快速结构化。",
    href: "https://www.anthropic.com/claude",
    icon: "Cl",
  },
  {
    name: "ChatGPT",
    type: "Assistant",
    note: "日常最高频入口，覆盖选题发散、内容初稿、学习陪跑和多语言表达润色。",
    href: "https://chatgpt.com/",
    icon: "G",
  },
  {
    name: "Codex",
    type: "Coding Agent",
    note: "vibe coding 的核心搭档，适合把页面、交互和产品原型推进到可运行状态。",
    href: "https://openai.com/codex/",
    icon: "Cx",
  },
  {
    name: "NotebookLM",
    type: "Research",
    note: "适合论文、报告和访谈材料消化，能把资料库转化为可追问的研究空间。",
    href: "https://notebooklm.google/",
    icon: "N",
  },
  {
    name: "Coze",
    type: "Agent Builder",
    note: "曾用于搭建高考志愿填报 Agent，适合验证对话流程、Prompt 与工具调用逻辑。",
    href: "https://www.coze.com/",
    icon: "Co",
  },
  {
    name: "Dreamina 即梦",
    type: "AIGC Visual",
    note: "个人亲身实践，AIGC 自媒体动画创作的最佳搭档。",
    href: "https://dreamina.capcut.com/",
    icon: "D",
  },
  {
    name: "PaddlePaddle",
    type: "AI Framework",
    note: "更接近 AI 工程框架，帮助理解模型训练、部署与国产深度学习生态。",
    href: "https://www.paddlepaddle.org.cn/",
    icon: "P",
  },
  {
    name: "Lovart",
    type: "Design Agent",
    note: "观察 AI 进入设计流程的样本，适合品牌视觉、多模态创意和方案探索。",
    href: "https://www.lovart.ai/",
    icon: "L",
  },
  {
    name: "Comet",
    type: "AI Browser",
    note: "关注 AI 浏览器如何重构搜索、阅读和网页任务，是信息获取方式的新变量。",
    href: "https://www.perplexity.ai/comet",
    icon: "C",
  },
];

const AiTools: React.FC = () => {
  return (
    <Section id="ai-tools" className="bg-slate-50">
      <div className="flex h-screen max-h-screen w-full max-w-7xl flex-col justify-center overflow-hidden mx-auto px-3 py-14 md:px-10 md:py-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600">
              <Wrench className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Stack
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              AI Tools I Like
            </h2>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-2 md:gap-5">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="flex min-h-0 flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 md:p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-950 md:h-11 md:w-11 md:text-sm">
                    {tool.icon}
                  </div>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${tool.name}`}
                    className="text-blue-500 transition hover:text-purple-600"
                  >
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </div>
                <h3 className="mt-2 text-sm font-black leading-tight text-blue-600 md:mt-3 md:text-xl">
                  {tool.name}
                </h3>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:text-xs">
                  {tool.type}
                </div>
                <p className="mt-3 line-clamp-3 text-[11px] leading-relaxed text-slate-600 md:text-sm">
                  {tool.note}
                </p>
              </div>

              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 md:text-sm"
              >
                Visit
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AiTools;
