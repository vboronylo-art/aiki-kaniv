import React, { useState } from 'react';
import { Compass, Wind, Shield, Activity, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

interface BiomechanicalExplorerProps {
  onJumpToTechnique: (takeId: string, time: number) => void;
}

export const BiomechanicalExplorer: React.FC<BiomechanicalExplorerProps> = ({
  onJumpToTechnique,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'kuzushi' | 'tenkan' | 'kokyu' | 'ukemi'>('kuzushi');

  const concepts = [
    {
      id: 'kuzushi' as const,
      title: t.biomechanics.tabs.kuzushi.title,
      japanese: '崩し',
      icon: Compass,
      subtitle: t.biomechanics.tabs.kuzushi.sub,
      summary: t.biomechanics.tabs.kuzushi.summary,
      keyPoints: [
        t.biomechanics.tabs.kuzushi.p1,
        t.biomechanics.tabs.kuzushi.p2,
        t.biomechanics.tabs.kuzushi.p3,
      ],
      linkedTakeId: 'take-1-irimi',
      linkedTime: 7.6,
      diagramLabel: t.biomechanics.tabs.kuzushi.diagram,
    },
    {
      id: 'tenkan' as const,
      title: t.biomechanics.tabs.tenkan.title,
      japanese: '転換',
      icon: Wind,
      subtitle: t.biomechanics.tabs.tenkan.sub,
      summary: t.biomechanics.tabs.tenkan.summary,
      keyPoints: [
        t.biomechanics.tabs.tenkan.p1,
        t.biomechanics.tabs.tenkan.p2,
        t.biomechanics.tabs.tenkan.p3,
      ],
      linkedTakeId: 'take-2-tenkan',
      linkedTime: 4.8,
      diagramLabel: t.biomechanics.tabs.tenkan.diagram,
    },
    {
      id: 'kokyu' as const,
      title: t.biomechanics.tabs.kokyu.title,
      japanese: '呼吸力',
      icon: Activity,
      subtitle: t.biomechanics.tabs.kokyu.sub,
      summary: t.biomechanics.tabs.kokyu.summary,
      keyPoints: [
        t.biomechanics.tabs.kokyu.p1,
        t.biomechanics.tabs.kokyu.p2,
        t.biomechanics.tabs.kokyu.p3,
      ],
      linkedTakeId: 'take-3-concentration',
      linkedTime: 2.0,
      diagramLabel: t.biomechanics.tabs.kokyu.diagram,
    },
    {
      id: 'ukemi' as const,
      title: t.biomechanics.tabs.ukemi.title,
      japanese: '前受身',
      icon: Shield,
      subtitle: t.biomechanics.tabs.ukemi.sub,
      summary: t.biomechanics.tabs.ukemi.summary,
      keyPoints: [
        t.biomechanics.tabs.ukemi.p1,
        t.biomechanics.tabs.ukemi.p2,
        t.biomechanics.tabs.ukemi.p3,
      ],
      linkedTakeId: 'take-1-irimi',
      linkedTime: 13.8,
      diagramLabel: t.biomechanics.tabs.ukemi.diagram,
    },
  ];

  const current = concepts.find((c) => c.id === activeTab) || concepts[0];

  return (
    <section id="biomechanics" className="py-20 bg-[#0b0a08] border-b border-[#241e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c98a3c] mb-2">
            {t.biomechanics.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#f4efe6] tracking-tight">
            {t.biomechanics.title}
          </h2>
          <p className="mt-3 text-base text-[#b3a797] leading-relaxed">
            {t.biomechanics.description}
          </p>
        </div>

        {/* Tab Selector: Interactive Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#14120e] rounded-xl border border-[#262018] mb-8">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            const isActive = activeTab === concept.id;
            return (
              <button
                key={concept.id}
                onClick={() => {
                  setActiveTab(concept.id as typeof activeTab);
                  soundEngine.playTatamiStep();
                }}
                className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#292218] text-[#e0a85c] border border-[#c98a3c]/60 shadow-lg'
                    : 'text-[#9c9080] hover:text-[#f4efe6] hover:bg-[#1a1712]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{concept.title.split(':')[0]}</span>
                <span className="text-[10px] font-jp text-[#807464] hidden md:inline">
                  {concept.japanese}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#12100d] border border-[#282117] rounded-2xl p-6 sm:p-8">
          {/* Left Info Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#c98a3c] mb-1">
                <span>{current.japanese}</span>
                <span aria-hidden="true">·</span>
                <span>{current.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#f4efe6]">
                {current.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-[#c7beaf]">
              {current.summary}
            </p>

            {/* Key Mechanics */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#938776]">
                {t.biomechanics.keyMechanicsLabel}
              </h4>
              <ul className="space-y-2 text-xs text-[#dcd4c8]">
                {current.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c98a3c] mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA: Jump to this moment in Video */}
            <div className="pt-4 border-t border-[#262018]">
              <button
                onClick={() => {
                  onJumpToTechnique(current.linkedTakeId, current.linkedTime);
                  soundEngine.playSingingBowl(349.23); // F4
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#e0a85c] text-[#0b0a08] hover:bg-[#f2bc72] transition-colors"
              >
                <span>{t.biomechanics.btnJump}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Vector Diagram Graphic */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center bg-[#0a0907] border border-[#241e16] rounded-xl p-6 relative overflow-hidden">
            {/* Background subtle Tatami grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#292218_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />

            {/* Dynamic Diagram Visual */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Outer orbit ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#c98a3c]/30 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-4 rounded-full border border-[#c98a3c]/20" />

              {/* Tangential vector arrows based on activeTab */}
              {activeTab === 'kuzushi' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <path d="M 50 50 Q 75 25 85 45" fill="none" stroke="#e0a85c" strokeWidth="2" strokeDasharray="3 2" />
                  <polygon points="85,45 83,38 78,42" fill="#e0a85c" />
                  <circle cx="50" cy="50" r="4" fill="#f4efe6" />
                </svg>
              )}

              {activeTab === 'tenkan' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <path d="M 50 15 A 35 35 0 0 1 50 85" fill="none" stroke="#e0a85c" strokeWidth="2.5" />
                  <polygon points="50,85 46,78 54,78" fill="#e0a85c" />
                  <circle cx="50" cy="50" r="5" fill="#f4efe6" />
                </svg>
              )}

              {activeTab === 'kokyu' && (
                <div className="w-24 h-24 rounded-full bg-[#c98a3c]/20 border border-[#e0a85c] flex items-center justify-center animate-breathing">
                  <span className="text-xs font-mono text-[#e0a85c] font-bold">52 BPM</span>
                </div>
              )}

              {activeTab === 'ukemi' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <path d="M 20 20 C 40 40, 60 70, 80 80" fill="none" stroke="#e0a85c" strokeWidth="2.5" />
                  <circle cx="20" cy="20" r="3" fill="#e0a85c" />
                  <circle cx="50" cy="55" r="4" fill="#f4efe6" />
                  <circle cx="80" cy="80" r="3" fill="#e0a85c" />
                </svg>
              )}

              {/* Center Tanden Core Indicator */}
              <div className="z-10 text-center">
                <div className="text-xs font-jp text-[#e0a85c] font-bold">丹田</div>
                <div className="text-[10px] font-mono text-[#a89d8e]">
                  {language === 'en' ? 'One Point' : 'Єдина Точка'}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="text-xs font-mono text-[#e0a85c] font-semibold">
                {current.diagramLabel}
              </div>
              <div className="text-[11px] text-[#7a6f60] mt-0.5">
                {language === 'en'
                  ? 'Kinetic simulation based on 120 FPS high-speed capture'
                  : 'Кінетична симуляція на основі зйомки 120 кадр/с'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
