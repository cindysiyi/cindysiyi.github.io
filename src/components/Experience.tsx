import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

interface ExperienceProps {
  id: string;
  dataKey: string;
  className?: string;
  imagePlaceholder?: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ id, dataKey, className = '', imagePlaceholder = true }) => {
  const { t } = useTranslation();

  return (
    <Section id={id} className={`bg-slate-50 ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto h-full py-12">
        {/* Left Content */}
        <div className="flex flex-col space-y-6 md:w-1/2 z-10">
          <div className="flex items-center space-x-2 text-purple-600">
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">
              {t('experience.section_title')}
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
              // If the translation key returns the key itself (or is empty), it means no translation exists
              if (content === key || !content) return null;
              
              return (
                <li key={num} className="flex items-start space-x-3 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm md:text-base leading-relaxed">{content}</span>
                </li>
              );
            })}
          </ul>

          <button className="group flex items-center space-x-2 text-slate-900 font-bold hover:text-purple-600 transition-colors pt-4">
            <span>{t('experience.read_more')}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Content - Image Placeholder */}
        <div className="md:w-5/12 mt-12 md:mt-0 relative h-[300px] md:h-[400px] w-full">
          {imagePlaceholder && (
            <div className="absolute inset-0 bg-slate-200 rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <div className="w-16 h-16 border-2 border-slate-400 border-dashed rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-xs">IMG</span>
                </div>
                <span className="text-xs uppercase tracking-widest">Work / Result</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
