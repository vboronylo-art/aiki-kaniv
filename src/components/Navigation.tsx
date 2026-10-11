import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Phone } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

interface NavigationProps {
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isCinemaMode,
  onToggleCinemaMode,
  isMuted,
  setIsMuted,
  activeSection,
  onNavigate,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const handleToggleAudio = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0a08]/92 backdrop-blur-md border-b border-[#2a241b] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Dynamic Brand Wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex flex-col items-start text-left focus:outline-none group shrink-0"
        >
          <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider font-cinzel text-[#f4efe6] group-hover:text-[#e0a85c] transition-colors leading-tight">
            {t.brand.main}
          </span>
          <span className="text-[10px] tracking-widest text-[#c98a3c] font-mono">
            {t.brand.sub}
          </span>
        </button>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-[#b3a898]">
          <button
            onClick={() => onNavigate('player')}
            className={`transition-colors hover:text-[#f4efe6] ${
              activeSection === 'player' ? 'text-[#e0a85c] underline underline-offset-8' : ''
            }`}
          >
            {t.nav.cinema}
          </button>
          <button
            onClick={() => onNavigate('meditation')}
            className={`transition-colors hover:text-[#f4efe6] ${
              activeSection === 'meditation' ? 'text-[#e0a85c] underline underline-offset-8' : ''
            }`}
          >
            {t.nav.meditation}
          </button>
          <button
            onClick={() => onNavigate('biomechanics')}
            className={`transition-colors hover:text-[#f4efe6] ${
              activeSection === 'biomechanics' ? 'text-[#e0a85c] underline underline-offset-8' : ''
            }`}
          >
            {t.nav.biomechanics}
          </button>
          <button
            onClick={() => onNavigate('techniques')}
            className={`transition-colors hover:text-[#f4efe6] ${
              activeSection === 'techniques' ? 'text-[#e0a85c] underline underline-offset-8' : ''
            }`}
          >
            {t.nav.techniques}
          </button>
          <button
            onClick={() => onNavigate('enrollment')}
            className={`transition-colors hover:text-[#f4efe6] ${
              activeSection === 'enrollment' ? 'text-[#e0a85c] underline underline-offset-8' : ''
            }`}
          >
            {t.nav.enrollment}
          </button>
        </nav>

        {/* Zone 3: Primary Action Controls & Language Switcher Flags */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher: 🇺🇦 / 🇬🇧 flags */}
          <div
            className="flex items-center bg-[#15120d] border border-[#382f22] rounded-full p-0.5 shadow-inner"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => {
                setLanguage('uk');
                soundEngine.playTatamiStep();
              }}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs transition-all ${
                language === 'uk'
                  ? 'bg-[#c98a3c] text-[#0b0a08] font-bold shadow-sm'
                  : 'text-[#9c907f] hover:text-[#f4efe6] hover:bg-[#201a13]'
              }`}
              title="Українська версія · Айкідо-Канів"
              aria-label="Українська версія"
            >
              <span className="text-sm select-none" role="img" aria-label="Україна">🇺🇦</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider">UA</span>
            </button>
            <button
              onClick={() => {
                setLanguage('en');
                soundEngine.playTatamiStep();
              }}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs transition-all ${
                language === 'en'
                  ? 'bg-[#c98a3c] text-[#0b0a08] font-bold shadow-sm'
                  : 'text-[#9c907f] hover:text-[#f4efe6] hover:bg-[#201a13]'
              }`}
              title="English version · AURA SOMA - International Somatics"
              aria-label="English version"
            >
              <span className="text-sm select-none" role="img" aria-label="United Kingdom">🇬🇧</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider">EN</span>
            </button>
          </div>

          <a
            href="tel:+380673242628"
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-bold bg-[#241d15] text-[#e0a85c] border border-[#c98a3c]/40 hover:bg-[#34291c] transition-colors"
            title="+38 067 324 26 28"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden 2xl:inline">+38 067 324 26 28</span>
            <span className="2xl:hidden">{t.nav.callSensei}</span>
          </a>

          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              !isMuted
                ? 'bg-[#2a2115] text-[#e0a85c] border-[#c98a3c]/40'
                : 'bg-[#151310] text-[#a69c8e] border-[#2b251d] hover:border-[#40372b] hover:text-[#e2dacd]'
            }`}
            title={!isMuted ? t.nav.soundOn : t.nav.soundOff}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{!isMuted ? t.nav.soundOn : t.nav.soundOff}</span>
          </button>

          <button
            onClick={onToggleCinemaMode}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium bg-[#1e1b16] text-[#f4efe6] hover:bg-[#2b261f] border border-[#3b3428] transition-colors"
            title={isCinemaMode ? t.nav.cinemaOff : t.nav.cinemaOn}
          >
            {isCinemaMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isCinemaMode ? t.nav.cinemaOff : t.nav.cinemaOn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

