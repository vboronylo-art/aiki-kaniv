import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Music, ArrowRight, Volume2, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

interface MeditationTimerProps {
  onCompleteAndStartTraining: () => void;
}

export const MeditationTimer: React.FC<MeditationTimerProps> = ({
  onCompleteAndStartTraining,
}) => {
  const { t } = useLanguage();

  const PRESET_DURATIONS = [
    { label: t.meditation.presets.p1.label, seconds: 60, desc: t.meditation.presets.p1.desc },
    { label: t.meditation.presets.p2.label, seconds: 120, desc: t.meditation.presets.p2.desc },
    { label: t.meditation.presets.p3.label, seconds: 180, desc: t.meditation.presets.p3.desc },
    { label: t.meditation.presets.p4.label, seconds: 300, desc: t.meditation.presets.p4.desc },
  ];

  const [selectedDuration, setSelectedDuration] = useState<number>(120);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const timerRef = useRef<number | null>(null);
  const breathTimerRef = useRef<number | null>(null);

  // Manage countdown timer
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  // Handle countdown completion
  useEffect(() => {
    if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
      soundEngine.endMeditationWithGradualFade(7.0);
    }
  }, [isActive, timeLeft]);

  // Visual breathing guide loop during active meditation (4s in, 2s hold, 4s out)
  useEffect(() => {
    if (!isActive) return;

    let mounted = true;
    const runCycle = () => {
      if (!mounted || !isActive) return;
      setBreathPhase('inhale');

      breathTimerRef.current = window.setTimeout(() => {
        if (!mounted || !isActive) return;
        setBreathPhase('hold');

        breathTimerRef.current = window.setTimeout(() => {
          if (!mounted || !isActive) return;
          setBreathPhase('exhale');

          breathTimerRef.current = window.setTimeout(() => {
            if (!mounted || !isActive) return;
            runCycle();
          }, 4000);
        }, 2000);
      }, 4000);
    };

    runCycle();

    return () => {
      mounted = false;
      if (breathTimerRef.current) clearTimeout(breathTimerRef.current);
    };
  }, [isActive]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(selectedDuration);
    }
    setIsActive(true);
    setIsCompleted(false);
    // Start tranquil meditation soundscape with opening singing bowl
    soundEngine.startMeditationAudio();
  };

  const handlePause = () => {
    setIsActive(false);
    soundEngine.stopMeditationAudio();
  };

  const handleReset = () => {
    setIsActive(false);
    setIsCompleted(false);
    setTimeLeft(selectedDuration);
    soundEngine.stopMeditationAudio();
  };

  const handleSelectPreset = (seconds: number) => {
    if (isActive) {
      soundEngine.stopMeditationAudio();
    }
    setIsActive(false);
    setIsCompleted(false);
    setSelectedDuration(seconds);
    setTimeLeft(seconds);
  };

  const adjustCustomTime = (delta: number) => {
    if (isActive) return;
    const next = Math.max(30, Math.min(900, selectedDuration + delta));
    setSelectedDuration(next);
    setTimeLeft(next);
  };

  const handleTimerComplete = () => {
    setIsActive(false);
    setIsCompleted(true);
    // Trigger closing bell and gradual sound fade-out over 7 seconds
    soundEngine.endMeditationWithGradualFade(7.0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = selectedDuration > 0 ? ((selectedDuration - timeLeft) / selectedDuration) * 100 : 0;

  return (
    <section id="meditation" className="py-20 bg-[#0d0b09] border-b border-[#241e17] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#c98a3c]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c98a3c] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.meditation.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#f4efe6] tracking-tight">
            {t.meditation.title}
          </h2>
          <div className="text-sm font-jp text-[#b8ab9a] mt-1">
            {t.meditation.japaneseSub}
          </div>
          <p className="mt-3 text-sm text-[#a89d8e] leading-relaxed">
            {t.meditation.description}
          </p>
        </div>

        {/* Main Meditation Console */}
        <div className="bg-[#12100d] border border-[#2b241a] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-xs font-mono text-[#8a7e6f] uppercase mr-2">{t.meditation.durationLabel}</span>
            {PRESET_DURATIONS.map((preset) => (
              <button
                key={preset.seconds}
                onClick={() => handleSelectPreset(preset.seconds)}
                disabled={isActive}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDuration === preset.seconds
                    ? 'bg-[#e0a85c] text-[#0b0a08] font-semibold shadow'
                    : 'bg-[#191612] text-[#9c9182] hover:text-[#f4efe6] hover:bg-[#252019] border border-[#2e261d]'
                } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{preset.label}</span>
                <span className="hidden sm:inline text-[10px] opacity-80 ml-1.5">
                  ({preset.desc})
                </span>
              </button>
            ))}

            {/* Micro adjustments */}
            {!isActive && (
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => adjustCustomTime(-30)}
                  className="px-2 py-1 text-xs bg-[#191612] text-[#9c9182] hover:text-[#f4efe6] rounded border border-[#2e261d]"
                  title="-30s"
                >
                  -30с
                </button>
                <button
                  onClick={() => adjustCustomTime(30)}
                  className="px-2 py-1 text-xs bg-[#191612] text-[#9c9182] hover:text-[#f4efe6] rounded border border-[#2e261d]"
                  title="+30s"
                >
                  +30с
                </button>
              </div>
            )}
          </div>

          {/* Centerpiece: Circular Visual Timer & Breath Guide */}
          <div className="flex flex-col items-center justify-center my-6">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Circular SVG Progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#1f1a14"
                  strokeWidth="2.5"
                />
                {/* Active progress */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#e0a85c"
                  strokeWidth="2.5"
                  strokeDasharray="276.46"
                  strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-linear"
                />
              </svg>

              {/* Expanding & Contracting Breathing Bubble */}
              <div
                className={`absolute rounded-full transition-all duration-[3500ms] ease-in-out pointer-events-none ${
                  isActive
                    ? breathPhase === 'inhale'
                      ? 'w-44 h-44 bg-[#e0a85c]/15 border border-[#e0a85c]/40 scale-105'
                      : breathPhase === 'hold'
                      ? 'w-44 h-44 bg-[#e0a85c]/20 border border-[#e0a85c]/60 scale-100'
                      : 'w-24 h-24 bg-[#e0a85c]/5 border border-[#e0a85c]/20 scale-95'
                    : 'w-36 h-36 bg-[#16130f] border border-[#292218]'
                }`}
              />

              {/* Time & State readout */}
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#f4efe6] tabular-nums">
                  {formatTime(timeLeft)}
                </div>

                <div className="mt-1 text-xs font-medium font-cinzel text-[#e0a85c]">
                  {isActive ? (
                    breathPhase === 'inhale' ? (
                      t.meditation.phases.inhale
                    ) : breathPhase === 'hold' ? (
                      t.meditation.phases.hold
                    ) : (
                      t.meditation.phases.exhale
                    )
                  ) : isCompleted ? (
                    t.meditation.phases.completed
                  ) : (
                    t.meditation.phases.ready
                  )}
                </div>

                {isActive && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#8a7f71]">
                    <Volume2 className="w-3 h-3 text-[#e0a85c] animate-pulse" />
                    <span>{t.meditation.soundActive}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Completion Banner (when time expires with sound fade-out notice) */}
          {isCompleted && (
            <div className="max-w-md mx-auto my-4 p-4 bg-[#1b1712] border border-[#e0a85c]/60 rounded-xl text-center animate-fadeIn shadow-xl">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#e0a85c] mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#e0a85c]" />
                <span>{t.meditation.completeTitle}</span>
              </div>
              <p className="text-xs text-[#c7bdae] leading-relaxed mb-3">
                {t.meditation.completeDesc}
              </p>
              <button
                onClick={onCompleteAndStartTraining}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#e0a85c] text-[#0b0a08] hover:bg-[#f2bc72] shadow-lg transition-transform hover:scale-105"
              >
                <span>{t.meditation.btnGoToPlayer}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Transport Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold bg-[#e0a85c] text-[#0b0a08] hover:bg-[#f2bc72] shadow-xl hover:shadow-[#e0a85c]/20 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{timeLeft === 0 ? t.meditation.btnRestart : t.meditation.btnStart}</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold bg-[#262017] border border-[#403628] text-[#f4efe6] hover:bg-[#342b20] transition-colors"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>{t.meditation.btnPause}</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-3 rounded-xl text-[#9c9080] hover:text-[#f4efe6] hover:bg-[#1f1a14] border border-[#2b241a] transition-colors"
              title={t.meditation.btnResetTooltip}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => soundEngine.playJapaneseMelodyPhrase()}
              className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs font-medium text-[#c98a3c] bg-[#171410] border border-[#2b241a] hover:bg-[#221c15] transition-colors"
              title={t.meditation.btnMelody}
            >
              <Music className="w-3.5 h-3.5" />
              <span>{t.meditation.btnMelody}</span>
            </button>
          </div>

          {/* Cultural Instruction Footer */}
          <div className="mt-8 pt-6 border-t border-[#241e17] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d7162] gap-2">
            <span className="font-jp">{t.meditation.doctrine}</span>
            <span>{t.meditation.fadeNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
