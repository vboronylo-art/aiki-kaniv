import React from 'react';
import { Play, Sparkles, Phone, MapPin, Music } from 'lucide-react';
import { CinematicTake } from '../types';
import { KANIV_DOJO_INFO } from '../data/cinematicTakes';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  takes: CinematicTake[];
  onStartReel: () => void;
  onSelectTake: (take: CinematicTake) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  takes,
  onStartReel,
  onSelectTake,
  isMuted,
  setIsMuted,
}) => {
  const { language, t } = useLanguage();

  const handleStartWithSound = () => {
    if (isMuted) {
      soundEngine.toggleMute();
      setIsMuted(false);
    }
    soundEngine.playJapaneseMelodyPhrase();
    onStartReel();
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden bg-[#0b0a08] border-b border-[#241e17]">
      {/* Background Subtle Ambient Warm Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c98a3c]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Editorial Kicker & Address Pill */}
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase font-mono text-[#c98a3c] mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-[#e0a85c] animate-pulse" />
          <span>{t.hero.badge}</span>
          <span aria-hidden="true">·</span>
          <span>{t.hero.senseiName}</span>
          <span aria-hidden="true">·</span>
          <span>{t.hero.locationShort}</span>
          <span aria-hidden="true">·</span>
          <a href={`tel:${KANIV_DOJO_INFO.phoneRaw}`} className="text-[#f4efe6] hover:text-[#e0a85c] font-bold">
            {language === 'en' ? 'Tel:' : 'Тел:'} {KANIV_DOJO_INFO.phone}
          </a>
        </div>

        {/* Massive Primary Display Heading */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-cinzel text-[#f4efe6] tracking-tight leading-[1.08] text-balance">
            {t.hero.title}
          </h1>
          <div className="mt-2 text-lg sm:text-xl font-jp text-[#c98a3c] tracking-widest font-normal">
            {t.hero.subJapanese}
          </div>
          <p className="mt-5 text-base sm:text-lg text-[#b8ab9a] leading-relaxed max-w-3xl">
            {t.hero.description}
          </p>
        </div>

        {/* Primary Interactive Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={handleStartWithSound}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#e0a85c] text-[#0b0a08] hover:bg-[#f2bc72] shadow-xl hover:shadow-[#e0a85c]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.hero.btnStart}</span>
          </button>

          <a
            href={`tel:${KANIV_DOJO_INFO.phoneRaw}`}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#221a12] border border-[#c98a3c]/60 text-[#e0a85c] hover:bg-[#302418] transition-colors shadow-lg"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>{t.hero.btnCall}</span>
          </a>

          <button
            onClick={() => {
              const el = document.getElementById('meditation');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium bg-[#171410] border border-[#2e261d] text-[#e3dacd] hover:bg-[#252017] hover:border-[#423729] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#e0a85c]" />
            <span>{t.hero.btnMokuso}</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('enrollment');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium bg-[#171410] border border-[#2e261d] text-[#e3dacd] hover:bg-[#252017] hover:border-[#423729] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#c98a3c]" />
            <span>{t.hero.btnSchedule}</span>
          </button>

          {isMuted && (
            <button
              onClick={() => {
                soundEngine.toggleMute();
                setIsMuted(false);
              }}
              className="flex items-center gap-2 text-xs text-[#a89b8a] hover:text-[#e0a85c] transition-colors py-2 px-1"
            >
              <Music className="w-3.5 h-3.5 text-[#e0a85c]" />
              <span>{t.hero.soundPhrase}</span>
            </button>
          )}
        </div>

        {/* 5-Take Visual Preview Strip */}
        <div className="mt-14 pt-8 border-t border-[#241e17]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8e8272]">
              {language === 'en' ? 'Select perspective / take:' : 'Оберіть ракурс зйомки / дубль:'}
            </span>
            <span className="text-xs font-mono text-[#7a6f60]">
              {language === 'en'
                ? '5 Takes · Captured with Cooke & Leica Anamorphic Optics'
                : '5 дублів · Знято оптикою Cooke та Leica Anamorphic'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {takes.map((take) => {
              const takeTitle = language === 'en' && take.titleEn ? take.titleEn : take.title;
              const takeTech = language === 'en' && take.primaryTechniqueEn ? take.primaryTechniqueEn : take.primaryTechnique;
              return (
                <button
                  key={take.id}
                  onClick={() => {
                    onSelectTake(take);
                    const player = document.getElementById('player');
                    player?.scrollIntoView({ behavior: 'smooth' });
                    soundEngine.playTatamiStep();
                  }}
                  className="group text-left bg-[#13110d] hover:bg-[#1f1912] border border-[#272118] hover:border-[#c98a3c] rounded-xl overflow-hidden transition-all duration-300 p-2"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-[#080705]">
                    <img
                      src={take.imagePath}
                      alt={takeTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-white/90 bg-black/60 px-1 rounded">
                      {take.duration}с
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#f4efe6] group-hover:text-[#e0a85c] transition-colors line-clamp-1">
                    {takeTitle.split(':')[0]}
                  </div>
                  <div className="text-[10px] text-[#7d7162] font-mono mt-0.5 line-clamp-1">
                    {takeTech.split('(')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

