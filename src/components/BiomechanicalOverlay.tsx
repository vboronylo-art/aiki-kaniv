import React from 'react';
import { KeyframeMarker } from '../types';

interface BiomechanicalOverlayProps {
  currentKeyframe: KeyframeMarker | null;
  currentTime: number;
  isVisible: boolean;
}

export const BiomechanicalOverlay: React.FC<BiomechanicalOverlayProps> = ({
  currentKeyframe,
  currentTime,
  isVisible,
}) => {
  if (!isVisible || !currentKeyframe) return null;

  const { haraPosition, vectorAngle, vectorMagnitude, phase, japaneseTerm, label } = currentKeyframe;

  // Calculate vector line endpoints
  const length = (vectorMagnitude / 100) * 80;
  const radians = (vectorAngle * Math.PI) / 180;
  const dx = Math.cos(radians) * length;
  const dy = -Math.sin(radians) * length;

  // Real physical throw trajectory calculations
  const isThrowActive = phase === 'Nage' || phase === 'Ukemi' || phase === 'Kuzushi';
  const isApex = phase === 'Nage';
  const isImpact = phase === 'Ukemi';

  // Throw progression phases
  const throwPhases = [
    { key: 'Kuzushi', label: '1. Кудзуші', desc: 'Виведення з рівноваги' },
    { key: 'Irimi', label: '2. Цукурі', desc: 'Вхід під центр ваги' },
    { key: 'Nage', label: '3. Каке/Наґе', desc: 'Політ та проєкція' },
    { key: 'Ukemi', label: '4. Укемі', desc: 'Безпечне падіння' },
    { key: 'Zanshin', label: '5. Дзаншін', desc: 'Збереження уваги' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none transition-opacity duration-300">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Subtle grid reference lines representing Tatami alignment */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(224, 168, 92, 0.08)" strokeDasharray="1 3" strokeWidth="0.2" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(224, 168, 92, 0.08)" strokeDasharray="1 3" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="35" stroke="rgba(224, 168, 92, 0.05)" fill="none" strokeWidth="0.2" />
        
        {/* Realistic kinetic throw projection spiral arc */}
        {isThrowActive && (
          <>
            {/* Centrifugal spiral trajectory of uke's flight */}
            <path
              d={`M ${haraPosition.x - 24} ${haraPosition.y + 18} C ${haraPosition.x - 5} ${haraPosition.y - 32}, ${haraPosition.x + 18} ${haraPosition.y - 28}, ${haraPosition.x + dx * 0.35} ${haraPosition.y + dy * 0.35}`}
              fill="none"
              stroke="rgba(224, 168, 92, 0.65)"
              strokeWidth="0.75"
              strokeDasharray="1.5 1.5"
            />

            {/* Glowing trajectory envelope */}
            <path
              d={`M ${haraPosition.x - 24} ${haraPosition.y + 18} C ${haraPosition.x - 5} ${haraPosition.y - 32}, ${haraPosition.x + 18} ${haraPosition.y - 28}, ${haraPosition.x + dx * 0.35} ${haraPosition.y + dy * 0.35}`}
              fill="none"
              stroke="rgba(245, 187, 110, 0.25)"
              strokeWidth="2.5"
            />
          </>
        )}

        {/* Impact shockwave ring when the throw touches the tatami */}
        {isImpact && (
          <>
            <circle
              cx={haraPosition.x + 8}
              cy={haraPosition.y + 12}
              r="7"
              fill="none"
              stroke="#e0a85c"
              strokeWidth="0.5"
              className="animate-ping"
              style={{ animationDuration: '1.2s' }}
            />
            <ellipse
              cx={haraPosition.x + 8}
              cy={haraPosition.y + 12}
              rx="12"
              ry="4"
              fill="rgba(224, 168, 92, 0.12)"
              stroke="rgba(224, 168, 92, 0.4)"
              strokeWidth="0.3"
            />
          </>
        )}

        {/* Center of Gravity (Hara / Tanden) Ring */}
        <circle
          cx={haraPosition.x}
          cy={haraPosition.y}
          r={isApex ? '2.4' : '1.8'}
          fill="none"
          stroke="#e0a85c"
          strokeWidth="0.4"
          className="animate-ping"
          style={{ animationDuration: isApex ? '1.5s' : '3s' }}
        />
        <circle
          cx={haraPosition.x}
          cy={haraPosition.y}
          r="0.8"
          fill="#e0a85c"
        />

        {/* Directional momentum vector */}
        {vectorMagnitude > 10 && (
          <>
            <line
              x1={haraPosition.x}
              y1={haraPosition.y}
              x2={haraPosition.x + dx * 0.25}
              y2={haraPosition.y + dy * 0.25}
              stroke="#f4efe6"
              strokeWidth="0.4"
            />
            <circle
              cx={haraPosition.x + dx * 0.25}
              cy={haraPosition.y + dy * 0.25}
              r="0.4"
              fill="#f4efe6"
            />
          </>
        )}
      </svg>

      {/* Floating Biomechanical Telemetry & Throw Stage HUD */}
      <div
        className="absolute transition-all duration-300 pointer-events-auto"
        style={{
          left: `${Math.min(Math.max(haraPosition.x + 3, 8), 68)}%`,
          top: `${Math.min(Math.max(haraPosition.y - 14, 6), 70)}%`,
        }}
      >
        <div className="bg-[#12100d]/95 backdrop-blur-md border border-[#40372a] rounded-xl p-3.5 shadow-2xl text-left min-w-[240px]">
          <div className="flex items-center justify-between text-[10px] tracking-wider text-[#9f9483] mb-1 font-mono uppercase">
            <span className="text-[#e0a85c] font-semibold">● ФАЗА: {phase}</span>
            <span className="text-[#f4efe6] font-semibold">{currentTime.toFixed(2)}с</span>
          </div>

          <div className="font-cinzel text-xs font-bold text-[#f4efe6] mb-0.5">
            {label}
          </div>
          <div className="text-[11px] text-[#c98a3c] mb-1.5 font-medium font-jp">
            {japaneseTerm}
          </div>

          <p className="text-[11px] leading-relaxed text-[#c5bcb0] mb-2.5">
            {currentKeyframe.description}
          </p>

          {/* Realistic Throw Physics Indicators */}
          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-[#262018] text-[10px] font-mono text-[#a89d8d]">
            <div>
              <span className="text-[#7d7162] block text-[9px]">КУТ КИДКА:</span>
              <span className="text-[#f4efe6] font-semibold">{vectorAngle}°</span>
            </div>
            <div>
              <span className="text-[#7d7162] block text-[9px]">СИЛА ІМПУЛЬСУ:</span>
              <span className="text-[#e0a85c] font-semibold">{vectorMagnitude}%</span>
            </div>
          </div>

          {/* Throw Progression Phase Breadcrumb */}
          <div className="mt-2.5 pt-2 border-t border-[#262018]/60 flex items-center justify-between text-[9px] font-mono">
            {throwPhases.slice(0, 4).map((p) => {
              const isCurrent = p.key === phase;
              return (
                <span
                  key={p.key}
                  className={`px-1 py-0.5 rounded ${
                    isCurrent
                      ? 'bg-[#e0a85c] text-[#0b0a08] font-bold'
                      : 'text-[#6e6354]'
                  }`}
                  title={p.desc}
                >
                  {p.label.split('.')[1]}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
