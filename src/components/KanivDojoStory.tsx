import React from 'react';
import { MapPin, Heart, ShieldCheck, Sun } from 'lucide-react';
import { KANIV_DOJO_INFO } from '../data/cinematicTakes';
import aikidoKanivDojoDusk from '../assets/images/aikido_kaniv_dojo_dusk_1790939041005.jpg';
import { useLanguage } from '../i18n/LanguageContext';

export const KanivDojoStory: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="dojo-story" className="py-20 bg-[#0b0a08] border-b border-[#241e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c98a3c] mb-2">
            {t.story.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#f4efe6] tracking-tight">
            {t.story.title}
          </h2>
          <p className="mt-3 text-base text-[#b3a797] leading-relaxed">
            {t.story.p1}
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Image of Dojo Veranda at Dusk */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#2b241a] group shadow-2xl">
            <img
              src={aikidoKanivDojoDusk}
              alt="Додзьо «Сакура» в Каневі — Сенсей Валерій Боронило"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/90 via-[#0b0a08]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#e0a85c] mb-1">
                {t.story.cardLocationBadge}
              </div>
              <h3 className="text-xl font-bold font-cinzel text-[#f4efe6]">
                {t.story.cardTitle}
              </h3>
              <p className="text-xs text-[#c5bcb0] mt-1 line-clamp-2">
                {t.story.cardDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-sm leading-relaxed text-[#c4b9aa]">
              <p>{t.story.p2}</p>
              <p>{t.story.p3}</p>
              <p>
                {t.story.p4}{' '}
                <a href={`tel:${KANIV_DOJO_INFO.phoneRaw}`} className="text-[#e0a85c] font-semibold underline underline-offset-4">
                  {KANIV_DOJO_INFO.phone}
                </a>
              </p>
            </div>

            {/* Metadata Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#262018]">
              <div className="bg-[#14120e] p-4 rounded-xl border border-[#262018]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8c806f] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c98a3c]" />
                  <span>{t.story.stats.location}</span>
                </div>
                <div className="text-sm font-semibold text-[#f4efe6]">
                  {t.story.stats.locationVal}
                </div>
                <div className="text-xs text-[#a69b8b] mt-0.5">
                  {t.story.stats.locationSub}
                </div>
              </div>

              <div className="bg-[#14120e] p-4 rounded-xl border border-[#262018]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8c806f] mb-1">
                  <Sun className="w-3.5 h-3.5 text-[#c98a3c]" />
                  <span>{t.story.stats.atmosphere}</span>
                </div>
                <div className="text-sm font-semibold text-[#f4efe6]">
                  {t.story.stats.atmosphereVal}
                </div>
                <div className="text-xs text-[#a69b8b] mt-0.5">
                  {t.story.stats.atmosphereSub}
                </div>
              </div>

              <div className="bg-[#14120e] p-4 rounded-xl border border-[#262018]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8c806f] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c98a3c]" />
                  <span>{t.story.stats.architecture}</span>
                </div>
                <div className="text-sm font-semibold text-[#f4efe6]">
                  {t.story.stats.architectureVal}
                </div>
                <div className="text-xs text-[#a69b8b] mt-0.5">
                  {t.story.stats.architectureSub}
                </div>
              </div>

              <div className="bg-[#14120e] p-4 rounded-xl border border-[#262018]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8c806f] mb-1">
                  <Heart className="w-3.5 h-3.5 text-[#c98a3c]" />
                  <span>{t.story.stats.doctrine}</span>
                </div>
                <div className="text-sm font-semibold text-[#f4efe6]">
                  {t.story.stats.doctrineVal}
                </div>
                <div className="text-xs text-[#a69b8b] mt-0.5">
                  {t.story.stats.doctrineSub}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

