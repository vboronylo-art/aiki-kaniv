import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { DOJO_TECHNIQUES_GUIDE } from '../data/cinematicTakes';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

interface TechniqueCatalogProps {
  onSelectTechnique: (takeId: string, time: number) => void;
}

export const TechniqueCatalog: React.FC<TechniqueCatalogProps> = ({
  onSelectTechnique,
}) => {
  const { language, t } = useLanguage();

  return (
    <section id="techniques" className="py-20 bg-[#0f0d0a] border-b border-[#241e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#c98a3c] mb-2">
              {t.catalog.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#f4efe6] tracking-tight">
              {t.catalog.title}
            </h2>
            <p className="mt-3 text-sm text-[#b3a797] leading-relaxed">
              {t.catalog.desc}
            </p>
          </div>

          <div className="text-xs font-mono text-[#8a7f70] flex items-center gap-2">
            <span>{t.catalog.fpsInfo}</span>
            <span aria-hidden="true">·</span>
            <span>{t.catalog.locationInfo}</span>
          </div>
        </div>

        {/* Technique Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOJO_TECHNIQUES_GUIDE.map((tech, idx) => {
            const name = language === 'en' && tech.nameEn ? tech.nameEn : tech.name;
            const subtitle = language === 'en' && tech.subtitleEn ? tech.subtitleEn : tech.subtitle;
            const concept = language === 'en' && tech.conceptEn ? tech.conceptEn : tech.concept;
            const principle = language === 'en' && tech.principleEn ? tech.principleEn : tech.principle;

            return (
              <div
                key={tech.name}
                className="group bg-[#14120e] border border-[#272118] hover:border-[#c98a3c]/60 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#c98a3c]/5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8c806f] font-mono mb-2">
                    <span>0{idx + 1} // {t.catalog.techNumber}</span>
                    <span className="font-jp text-sm text-[#c98a3c]">{tech.japanese}</span>
                  </div>

                  <h3 className="text-xl font-bold font-cinzel text-[#f4efe6] group-hover:text-[#e0a85c] transition-colors">
                    {name}
                  </h3>
                  <div className="text-xs text-[#b8ad9f] font-medium mt-0.5 mb-3">
                    {subtitle}
                  </div>

                  <p className="text-xs leading-relaxed text-[#a89d8e] mb-4">
                    {concept}
                  </p>

                  <div className="bg-[#0b0a08] border border-[#221c15] p-3 rounded-lg text-[11px] text-[#cfc5b8] mb-4">
                    <span className="text-[#c98a3c] font-semibold block mb-0.5">
                      {t.catalog.principleLabel}
                    </span>
                    {principle}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    onSelectTechnique(tech.takeId, tech.climaxTime);
                    soundEngine.playSingingBowl(329.63); // E4
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#1f1a14] group-hover:bg-[#e0a85c] text-[#f4efe6] group-hover:text-[#0b0a08] transition-colors border border-[#30281e] group-hover:border-transparent"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {language === 'en' ? `Explore at ${tech.climaxTime}s` : `Дослідити на ${tech.climaxTime}с`}
                    </span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

