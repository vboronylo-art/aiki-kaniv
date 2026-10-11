import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Compass, Phone } from 'lucide-react';
import { KANIV_DOJO_INFO } from '../data/cinematicTakes';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

export const DojoGoogleMapsButton: React.FC = () => {
  const { language, t } = useLanguage();
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);
  const { coordinates, phone, phoneRaw, googleMapsUrl, googleMapsRouteUrl, fullAddress } = KANIV_DOJO_INFO;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`);
    setCopiedCoords(true);
    soundEngine.playTatamiStep();
    setTimeout(() => setCopiedCoords(false), 2200);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1610] via-[#14100c] to-[#0c0a08] border border-[#4a3924] shadow-2xl p-6 sm:p-8 md:p-10 transition-all hover:border-[#c98a3c]/60">
      {/* Subtle decorative atmospheric background elements */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#c98a3c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#e0a85c]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Side: Address Info & Geotag Details */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#261d14] border border-[#543f29] text-xs font-mono uppercase tracking-wider text-[#e0a85c]">
            <MapPin className="w-3.5 h-3.5 text-[#e0a85c] animate-pulse" />
            <span>{t.map.gpsTag}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#f4efe6] tracking-tight">
            {t.map.floatingTitle}
          </h3>

          <p className="text-sm sm:text-base text-[#cfc5b7] font-medium leading-relaxed">
            {t.map.fullAddr}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#a39686]">
            <span className="flex items-center gap-1.5 font-mono text-[#e0a85c] bg-[#1a130c] px-2.5 py-1 rounded-md border border-[#3d2e1c]">
              <Compass className="w-3.5 h-3.5 text-[#c98a3c]" />
              {t.map.dmsCoords}
            </span>
            <span>·</span>
            <span className="text-[#a89d8e]">
              {t.map.landmark}
            </span>
          </div>
        </div>

        {/* Right Side: Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Main Requested Button: "Открыть Додзьо на картах Google" (Direct Route / View on Google Maps) */}
          <a
            href={googleMapsRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playJapaneseMelodyPhrase()}
            className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-[#e0a85c] via-[#f2bc72] to-[#c98a3c] text-[#0d0b08] shadow-lg shadow-[#c98a3c]/20 hover:shadow-xl hover:shadow-[#c98a3c]/35 hover:scale-[1.02] active:scale-[0.99] transition-all"
            title={`${t.map.btnGoogleMaps} — ${fullAddress}`}
          >
            <div className="p-1 rounded-lg bg-[#0d0b08]/15">
              <Navigation className="w-5 h-5 text-[#0d0b08] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="tracking-wide">
              {t.map.btnGoogleMaps}
            </span>
            <ExternalLink className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Secondary Quick-Actions: Copy Coordinates & Call */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCoords}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-mono bg-[#1f1710] border border-[#423220] text-[#e0a85c] hover:bg-[#2b2116] hover:border-[#5c462d] transition-all"
              title="GPS: 49.7445, 31.458"
            >
              {copiedCoords ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCoords ? t.map.gpsCopied : t.map.btnCopyGps}</span>
            </button>

            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center justify-center p-3.5 rounded-xl bg-[#1f1710] border border-[#423220] text-[#e0a85c] hover:bg-[#2b2116] hover:border-[#5c462d] transition-all"
              title={`${t.map.callSensei} ${phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
