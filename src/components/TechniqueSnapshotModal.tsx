import React, { useState } from 'react';
import { X, Copy, Check, Info } from 'lucide-react';
import { CinematicTake, KeyframeMarker } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface TechniqueSnapshotModalProps {
  take: CinematicTake | null;
  keyframe: KeyframeMarker | null;
  currentTime: number;
  isOpen: boolean;
  onClose: () => void;
}

export const TechniqueSnapshotModal: React.FC<TechniqueSnapshotModalProps> = ({
  take,
  keyframe,
  currentTime,
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !take) return null;

  const takeTitle = language === 'en' && take.titleEn ? take.titleEn : take.title;
  const takeTech = language === 'en' && take.primaryTechniqueEn ? take.primaryTechniqueEn : take.primaryTechnique;
  const kfNotes = language === 'en' && keyframe?.notesEn ? keyframe.notesEn : (keyframe?.notes || (language === 'en' ? 'Maintain unbendable arm and align hip rotation.' : 'Утримуйте незгинаєму руку та координуйте стегна.'));
  const kfLabel = language === 'en' && keyframe?.labelEn ? keyframe.labelEn : (keyframe?.label || (language === 'en' ? 'Interim Frame' : 'Проміжний кадр'));
  const kfDesc = language === 'en' && keyframe?.descriptionEn ? keyframe.descriptionEn : (keyframe?.description || (language === 'en' && take.descriptionEn ? take.descriptionEn : take.description));
  const practitioners = language === 'en' && take.keyPractitionersEn ? take.keyPractitionersEn : take.keyPractitioners;

  const handleCopyNotes = () => {
    const text = `=== ${language === 'en' ? 'AURA SOMA FRAME RESEARCH' : 'ДОСЛІДЖЕННЯ КАДРУ АЙКІ КАНІВ'} ===
${language === 'en' ? 'Take' : 'Дубль'}: ${takeTitle} (${take.japaneseTitle})
${language === 'en' ? 'Timecode' : 'Часова позначка'}: ${currentTime.toFixed(2)}s / ${take.duration}s
${language === 'en' ? 'Technique' : 'Техніка'}: ${takeTech}
${language === 'en' ? 'Movement Phase' : 'Фаза руху'}: ${keyframe?.phase || 'Dynamic movement'}
${language === 'en' ? 'Frame Analysis' : 'Опис кадру'}: ${kfLabel}
${language === 'en' ? 'Japanese Term' : 'Японський термін'}: ${keyframe?.japaneseTerm || '合気道'}
${language === 'en' ? 'Description' : 'Опис'}: ${kfDesc}
${language === 'en' ? 'Vector' : 'Кут вектора'}: ${keyframe?.vectorAngle || 0}° | ${language === 'en' ? 'Momentum' : 'Сила імпульсу'}: ${keyframe?.vectorMagnitude || 0}%
${language === 'en' ? 'Master Note' : 'Вказівки майстра'}: ${kfNotes}
${language === 'en' ? 'Location' : 'Локація'}: ${t.snapshot.location}
======================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#12100d] border border-[#3b3225] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262017]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#c98a3c]">
              <span>{t.snapshot.title}</span>
              <span aria-hidden="true">·</span>
              <span>{currentTime.toFixed(2)}s</span>
            </div>
            <h3 className="text-xl font-bold font-cinzel text-[#f4efe6]">
              {takeTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9e9282] hover:text-[#f4efe6] hover:bg-[#201b15] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual Frame Display */}
          <div className="relative rounded-xl overflow-hidden border border-[#2b2419] bg-[#070605]">
            <img
              src={take.imagePath}
              alt={takeTitle}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[420px] object-cover"
            />
            {/* Stamp Overlay */}
            <div className="absolute bottom-3 left-3 bg-[#0d0b09]/85 backdrop-blur-md px-3 py-1.5 rounded border border-[#382f23] text-xs font-mono text-[#f4efe6]">
              {language === 'en' ? 'AURA SOMA SOMATIC ARCHIVE · KEYFRAME' : 'КАНІВСЬКЕ ДОДЗЬО АЙКІ · СТОП-КАДР'} {currentTime.toFixed(2)}s
            </div>
          </div>

          {/* Biomechanical Analysis Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#9f9483]">
                {language === 'en' ? 'Active Movement Phase Analysis' : 'Аналіз поточної фази руху'}
              </h4>
              <div className="bg-[#171410] border border-[#282219] p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e8272]">{t.snapshot.phase}</span>
                  <span className="font-semibold text-[#e0a85c]">{keyframe?.phase || (language === 'en' ? 'Dynamic Flow' : 'Динамічна проєкція')}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e8272]">{language === 'en' ? 'Japanese Term:' : 'Японське позначення:'}</span>
                  <span className="font-jp text-[#f4efe6]">{keyframe?.japaneseTerm || '合気術'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e8272]">{t.snapshot.vectorAngle}</span>
                  <span className="font-mono text-[#f4efe6]">
                    {keyframe ? `${keyframe.vectorAngle}° / ${keyframe.vectorMagnitude}%` : 'Circular curve'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e8272]">{language === 'en' ? 'Practitioners:' : 'Учасники:'}</span>
                  <span className="text-[#f4efe6]">{practitioners}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#9f9483]">
                {t.snapshot.masterNote}
              </h4>
              <div className="bg-[#171410] border border-[#282219] p-4 rounded-xl">
                <p className="text-xs leading-relaxed text-[#c5bcb0] mb-3">
                  {kfNotes}
                </p>
                <div className="text-[11px] text-[#938777] italic border-t border-[#262018] pt-2">
                  {language === 'en'
                    ? '"In Aikido, the motion of the universe repeats in miniature. Do not collide with the oncoming force; guide it gently along the periphery."'
                    : '"В Айкідо рух Всесвіту повторюється у мініатюрі. Не протистійте горі, що суне на вас; дозвольте горі пройти повз."'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-[#262017] bg-[#0e0c0a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#8c8070]">
            <Info className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Kaniv Sakura Dojo somatic analysis protocol' : 'Високоточний навчальний протокол Канівського додзьо'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyNotes}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-[#e0a85c] text-[#0b0a08] hover:bg-[#f5bb6e] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.snapshot.copied : t.snapshot.btnCopy}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

