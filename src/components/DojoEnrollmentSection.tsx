import React, { useState } from 'react';
import { Phone, MapPin, Clock, Check, Copy, ShieldCheck, HeartHandshake } from 'lucide-react';
import { KANIV_DOJO_INFO } from '../data/cinematicTakes';
import { DojoGoogleMapsButton } from './DojoGoogleMapsButton';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

export const DojoEnrollmentSection: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(KANIV_DOJO_INFO.phone);
    setCopied(true);
    soundEngine.playTatamiStep();
    setTimeout(() => setCopied(false), 2200);
  };

  const schedule = [
    {
      group: t.enrollment.groups.kids.name,
      schedule: t.enrollment.groups.kids.time,
      description: t.enrollment.groups.kids.desc,
      level: t.enrollment.groups.kids.level,
    },
    {
      group: t.enrollment.groups.adults.name,
      schedule: t.enrollment.groups.adults.time,
      description: t.enrollment.groups.adults.desc,
      level: t.enrollment.groups.adults.level,
    },
    {
      group: t.enrollment.groups.advanced.name,
      schedule: t.enrollment.groups.advanced.time,
      description: t.enrollment.groups.advanced.desc,
      level: t.enrollment.groups.advanced.level,
    },
  ];

  return (
    <section id="enrollment" className="py-20 bg-[#0c0a08] border-b border-[#241e17] relative">
      {/* Background soft ambient warm light */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#c98a3c]/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c98a3c] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e0a85c] animate-pulse" />
            <span>{t.enrollment.addressPill}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#f4efe6] tracking-tight">
            {t.enrollment.title}
          </h2>
          <p className="mt-3 text-base text-[#b3a797] leading-relaxed">
            {t.enrollment.desc}
          </p>
        </div>

        {/* Highlighted Contact Card */}
        <div className="bg-[#14110e] border border-[#3b3225] rounded-2xl p-6 sm:p-8 shadow-2xl mb-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Address and Phone */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#241d15] border border-[#403424] text-xs font-mono text-[#e0a85c]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{KANIV_DOJO_INFO.fullAddress}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#f4efe6]">
                {t.enrollment.title}
              </h3>

              <p className="text-sm text-[#c7beaf] leading-relaxed">
                {t.enrollment.desc}
              </p>

              {/* Direct Phone Call and Copy Block */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${KANIV_DOJO_INFO.phoneRaw}`}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#e0a85c] text-[#0b0a08] hover:bg-[#f2bc72] shadow-xl hover:shadow-[#e0a85c]/20 transition-all hover:scale-[1.02]"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>{t.enrollment.btnCall}</span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-medium bg-[#1d1813] border border-[#352c21] text-[#e0a85c] hover:bg-[#2b241b] transition-colors"
                  title={t.enrollment.btnCopy}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t.enrollment.copied : t.enrollment.btnCopy}</span>
                </button>
              </div>
            </div>

            {/* Right: Quick Highlights */}
            <div className="lg:col-span-5 bg-[#0a0907] border border-[#262018] rounded-xl p-5 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1c1712] text-[#e0a85c] shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-[#8a7e6f]">
                    {t.enrollment.highlights.instructor}
                  </div>
                  <div className="text-sm font-semibold text-[#f4efe6]">
                    {t.enrollment.highlights.instructorName}
                  </div>
                  <div className="text-[11px] text-[#9c9081]">
                    {t.enrollment.highlights.instructorRole}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1c1712] text-[#e0a85c] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-[#8a7e6f]">
                    {t.enrollment.highlights.location}
                  </div>
                  <div className="text-sm font-semibold text-[#f4efe6]">
                    {t.enrollment.highlights.locationVal}
                  </div>
                  <div className="text-[11px] text-[#9c9081]">
                    {t.enrollment.highlights.locationSub}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1c1712] text-[#e0a85c] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-[#8a7e6f]">
                    {t.enrollment.highlights.phone}
                  </div>
                  <a
                    href={`tel:${KANIV_DOJO_INFO.phoneRaw}`}
                    className="text-sm font-semibold text-[#e0a85c] hover:underline"
                  >
                    {KANIV_DOJO_INFO.phone}
                  </a>
                  <div className="text-[11px] text-[#9c9081]">
                    {t.enrollment.highlights.phoneSub}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1c1712] text-[#e0a85c] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-[#8a7e6f]">
                    {t.enrollment.highlights.firstKeiko}
                  </div>
                  <div className="text-xs text-[#c5bcb0] leading-snug">
                    {t.enrollment.highlights.firstKeikoVal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Official Google Maps Route Button Card */}
        <div className="mb-14">
          <DojoGoogleMapsButton />
        </div>

        {/* Dojo Training Schedule Cards */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold font-cinzel text-[#f4efe6] uppercase tracking-wider">
              {t.enrollment.cardsTitle}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#d19a4e] bg-[#1a1612] px-3 py-1.5 rounded-lg border border-[#33281c]">
              <MapPin className="w-3.5 h-3.5 text-[#e0a85c] shrink-0" />
              <span>{t.enrollment.branchLabel}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="bg-[#14120e] border border-[#272118] rounded-xl p-5 space-y-3 hover:border-[#c98a3c]/60 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#8c806f]">
                  <span>{t.enrollment.groupLabel} 0{i + 1}</span>
                  <span className="text-[#e0a85c]">{item.level}</span>
                </div>

                <h4 className="text-base font-bold font-cinzel text-[#f4efe6]">
                  {item.group}
                </h4>

                <div className="flex items-center gap-2 text-xs text-[#e0a85c] font-medium bg-[#1c1712] p-2 rounded-lg border border-[#2a2219]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.schedule}</span>
                </div>

                <p className="text-xs leading-relaxed text-[#a89d8e]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


