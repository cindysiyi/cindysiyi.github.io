import React from "react";
import { Mail, MessageCircle, NotebookText } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import { config } from "../config";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const items = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("contact.email"),
      value: config.contactEmail || t("contact.pending"),
      href: config.contactEmail ? `mailto:${config.contactEmail}` : "",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: t("contact.wechat"),
      value: config.contactWechat || t("contact.pending"),
      href: "",
    },
    {
      icon: <NotebookText className="h-5 w-5" />,
      label: t("contact.resume"),
      value: config.socialLinks.resume ? t("contact.view_resume") : t("contact.pending"),
      href: config.socialLinks.resume,
    },
  ];

  return (
    <Section id="contact" className="bg-white">
      <div className="w-full max-w-6xl mx-auto px-6 py-20 md:px-10 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
            {t("contact.section_label")}
          </p>
          <h2 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            {t("contact.title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item) => {
            const card = (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-cyan-200 hover:bg-white">
                <div className="flex items-center justify-between text-slate-400">
                  {item.icon}
                </div>
                <div className="mt-8 text-xs font-bold uppercase tracking-widest text-slate-400">
                  {item.label}
                </div>
                <div className="mt-2 break-words text-base font-bold text-slate-950">
                  {item.value}
                </div>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href}>
                {card}
              </a>
            ) : (
              <div key={item.label}>{card}</div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
