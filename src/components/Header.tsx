import React from "react";
import { MessageCircle, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { config } from "../config";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navItems = [
    { href: "#home", label: t("header.home") },
    { href: "#experience-timeline", label: t("header.experience") },
    { href: "#projects", label: t("header.projects") },
    { href: "#contact", label: t("header.contact") },
  ];
  const mobileNavItems = [navItems[0], navItems[2], navItems[3]];

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-5 flex justify-between items-center text-slate-900 bg-white/85 backdrop-blur-sm shadow-sm transition-all duration-300">
      {/* Left Side: Contact Info */}
      <div className="flex items-center space-x-3 md:space-x-6 min-w-0">
        <div className="flex items-center space-x-2 group cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="hidden md:inline text-sm font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {t("header.wechat")}
          </span>
        </div>

        <div className="hidden md:block h-4 w-[1px] bg-slate-300"></div>

        {config.contactEmail && (
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium tracking-wide text-slate-600">
            <a
              href={`mailto:${config.contactEmail}`}
              className="hover:text-purple-600 transition-colors"
            >
              {config.contactEmail}
            </a>
          </div>
        )}
      </div>

      {/* Right Side: Navigation */}
      <nav className="flex items-center gap-3 md:gap-8">
        <ul className="hidden md:flex space-x-8 text-sm font-bold tracking-widest uppercase text-slate-600">
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
