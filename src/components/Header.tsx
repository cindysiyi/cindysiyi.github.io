import React from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const navItems = [
    { href: "#home", label: "首页" },
    { href: "#experience-bytedance", label: "经历" },
    { href: "#projects", label: "项目" },
    { href: "#vibe-coding", label: "作品实验" },
    { href: "#beyond-resume", label: "简历之外" },
  ];
  const mobileNavItems = [navItems[0], navItems[2], navItems[4]];

  const toggleLanguage = () => {
    if (i18n.language.startsWith("en")) {
      i18n.changeLanguage("zh");
    } else if (i18n.language.startsWith("zh")) {
      i18n.changeLanguage("ja");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const getLanguageLabel = () => {
    if (i18n.language.startsWith("en")) return "CN";
    if (i18n.language.startsWith("zh")) return "JP";
    return "EN";
  };

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-4 flex justify-between items-center text-slate-900 bg-[#f7f7f5]/90 backdrop-blur-xl transition-all duration-300">
      <a href="#home" className="header-brand">
        <strong>Cindy</strong>
        <span>AI Practitioner</span>
      </a>

      {/* Right Side: Navigation */}
      <nav className="flex items-center gap-3 md:gap-8">
        <ul className="hidden md:flex space-x-7 text-[11px] font-semibold tracking-[0.12em] text-slate-600">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="hover:text-purple-600 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex md:hidden items-center gap-3 text-xs font-bold text-slate-600">
          {mobileNavItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block whitespace-nowrap hover:text-purple-600 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 hover:text-purple-600 transition-colors uppercase text-sm tracking-widest font-bold text-slate-900"
          aria-label="Toggle language"
        >
          <Globe className="w-4 h-4" />
          <span>{getLanguageLabel()}</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
