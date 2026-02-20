import React from "react";
import { MessageCircle, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

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
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center text-white mix-blend-difference">
      {/* Left Side: Contact Info */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-light tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {t("header.wechat")}
          </span>
        </div>

        <div className="h-4 w-[1px] bg-white/30"></div>

        <div className="flex items-center space-x-4 text-sm font-light tracking-wide">
          <a
            href="mailto:contact@example.com"
            className="hover:opacity-70 transition-opacity"
          >
            contact@example.com
          </a>
        </div>
      </div>

      {/* Right Side: Navigation */}
      <nav className="flex items-center gap-8">
        <ul className="flex space-x-8 text-sm font-medium tracking-widest uppercase">
          <li>
            <a href="#home" className="hover:text-gray-300 transition-colors">
              {t("header.home")}
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-300 transition-colors">
              {t("header.about")}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-gray-300 transition-colors"
            >
              {t("header.projects")}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-gray-300 transition-colors"
            >
              {t("header.contact")}
            </a>
          </li>
        </ul>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity uppercase text-sm tracking-widest"
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
