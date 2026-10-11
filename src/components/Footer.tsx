import React from 'react';
import { Music, MapPin, Phone, Navigation, ExternalLink } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { KANIV_DOJO_INFO } from '../data/cinematicTakes';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full bg-[#080705] border-t border-[#1f1a14] py-12 text-[#8e8272]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1b1712]">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-widest text-[#f4efe6]">
              {t.footer.brand}
            </span>
            <span className="text-xs text-[#52483b]">|</span>
            <span className="font-jp text-sm text-[#c98a3c]">
              {language === 'en' ? 'AURA SOMA · Somatics' : '合気道 · カニウ「桜」道場'}
            </span>
          </div>

          {/* Location and Phone in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#b3a898]">
            <span className="flex items-center gap-1.5 text-[#e0a85c]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{KANIV_DOJO_INFO.fullAddress}</span>
            </span>
            <span aria-hidden="true" className="text-[#453c30]">·</span>
            <a
              href={`tel:${KANIV_DOJO_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-[#f4efe6] hover:text-[#e0a85c] font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#e0a85c]" />
              <span>{KANIV_DOJO_INFO.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={KANIV_DOJO_INFO.googleMapsRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#1f1710] border border-[#4a3924] text-[#e0a85c] hover:bg-[#e0a85c] hover:text-[#0b0a08] transition-all shadow-md group"
              title={`${t.map.btnGoogleMaps} (${KANIV_DOJO_INFO.address})`}
            >
              <Navigation className="w-3.5 h-3.5 text-[#e0a85c] group-hover:text-[#0b0a08] transition-colors" />
              <span>{t.map.btnGoogleMaps}</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:text-[#0b0a08]" />
            </a>

            <button
              onClick={() => soundEngine.playJapaneseMelodyPhrase()}
              className="text-xs text-[#a39686] hover:text-[#e0a85c] flex items-center gap-1.5 transition-colors px-2 py-1"
              title={t.footer.melodyBtn}
            >
              <Music className="w-3.5 h-3.5 text-[#c98a3c]" />
              <span className="hidden sm:inline">{t.footer.melodyBtn}</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e6354]">
          <p>
            {t.footer.addressNote}. {t.footer.phoneLabel} +38 067 324 26 28.
          </p>
          <p className="font-mono">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};


