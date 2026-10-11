import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  Camera, 
  Compass, 
  Layers, 
  Maximize2,
  Film,
  Phone,
  MapPin,
  Gauge,
  Zap,
  Target
} from 'lucide-react';
import { CinematicTake, KeyframeMarker, PlaybackSpeed, VisualFilter } from '../types';
import { KANIV_DOJO_INFO } from '../data/cinematicTakes';
import { DustMoteCanvas } from './DustMoteCanvas';
import { BiomechanicalOverlay } from './BiomechanicalOverlay';
import { AudioLayerControl } from './AudioLayerControl';
import { soundEngine } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

interface CinematicPlayerProps {
  takes: CinematicTake[];
  activeTake: CinematicTake;
  onSelectTake: (take: CinematicTake) => void;
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
  onCaptureFrame: (take: CinematicTake, keyframe: KeyframeMarker | null, time: number) => void;
}

export const CinematicPlayer: React.FC<CinematicPlayerProps> = ({
  takes,
  activeTake,
  onSelectTake,
  isCinemaMode,
  onToggleCinemaMode,
  onCaptureFrame,
}) => {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(3.5);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0);
  const [showBiometrics, setShowBiometrics] = useState<boolean>(true);
  const [visualFilter, setVisualFilter] = useState<VisualFilter>('amber-lantern');
  const [aspectRatioClass, setAspectRatioClass] = useState<string>('aspect-[21/9]'); // 2.39:1 Cinemascope
  const [showTakeDrawer, setShowTakeDrawer] = useState<boolean>(false);
  const [isImpactActive, setIsImpactActive] = useState<boolean>(false);

  const lastClimaxTriggerRef = useRef<string | null>(null);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Derive active keyframe directly from current time (no extra setState in render loops)
  const activeKeyframe = React.useMemo(() => {
    if (!activeTake.keyframes || activeTake.keyframes.length === 0) return null;
    const kf = activeTake.keyframes.reduce((prev, curr) => {
      return Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime) ? curr : prev;
    }, activeTake.keyframes[0]);

    return Math.abs(kf.time - currentTime) < 1.2 ? kf : null;
  }, [currentTime, activeTake]);

  // Trigger audio effect on high-impact keyframes (Nage projection or Ukemi breakfall)
  useEffect(() => {
    if (!activeKeyframe) return;

    if (
      (activeKeyframe.phase === 'Nage' || activeKeyframe.phase === 'Ukemi') &&
      lastClimaxTriggerRef.current !== activeKeyframe.id
    ) {
      lastClimaxTriggerRef.current = activeKeyframe.id;
      soundEngine.playSlowMotionWhoosh(playbackSpeed);
      if (activeKeyframe.phase === 'Nage') {
        soundEngine.playSingingBowl(329.63); // E4 tone
      }
      if (activeKeyframe.phase === 'Ukemi') {
        setIsImpactActive(true);
        const timer = setTimeout(() => setIsImpactActive(false), 240);
        return () => clearTimeout(timer);
      }
    }
  }, [activeKeyframe?.id, activeKeyframe?.phase, playbackSpeed]);

  // Auto-activate audio layer when video playback state or speed changes with smooth fading
  useEffect(() => {
    soundEngine.onPlayStateChange(isPlaying, playbackSpeed);
  }, [isPlaying, playbackSpeed]);

  useEffect(() => {
    soundEngine.updateSpeed(playbackSpeed);
  }, [playbackSpeed]);

  // Animation frame loop for smooth slow-motion progress
  useEffect(() => {
    const updateProgress = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + dt * playbackSpeed;
          if (next >= activeTake.duration) {
            return 0; // loop
          }
          return next;
        });
      }

      animRef.current = requestAnimationFrame(updateProgress);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, playbackSpeed, activeTake.duration]);

  // Keyboard shortcut for Play/Pause and Frame stepping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepFrame(-1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepFrame(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTake.duration]);

  const stepFrame = (direction: -1 | 1) => {
    setIsPlaying(false);
    soundEngine.playTatamiStep();
    setCurrentTime((t) => {
      const step = (1 / 24) * 2; // ~2 cine frames
      const next = t + direction * step;
      return Math.max(0, Math.min(activeTake.duration, next));
    });
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
  };

  const jumpToKeyframe = (kf: KeyframeMarker) => {
    setCurrentTime(kf.time);
    soundEngine.playSingingBowl(261.63); // C4
  };

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const millis = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  };

  // Filter styles
  const getFilterStyle = (): React.CSSProperties => {
    switch (visualFilter) {
      case 'amber-lantern':
        return {
          filter: 'sepia(0.22) contrast(1.1) saturate(1.25) brightness(1.02)',
        };
      case 'sumi-ink':
        return {
          filter: 'grayscale(1) contrast(1.35) brightness(0.95)',
        };
      case 'dnieper-dusk':
        return {
          filter: 'hue-rotate(-15deg) contrast(1.15) saturate(1.3) brightness(0.96)',
        };
      case 'natural-tatami':
      default:
        return {
          filter: 'contrast(1.04) brightness(1.0)',
        };
    }
  };

  const progressRatio = currentTime / activeTake.duration;
  const zoomScale = 1.03 + Math.sin(progressRatio * Math.PI) * 0.04;
  const panX = (progressRatio - 0.5) * -1.5;

  return (
    <div
      id="player"
      className={`relative w-full transition-all duration-500 ${
        isCinemaMode
          ? 'fixed inset-0 z-50 bg-[#060504] flex flex-col justify-center px-4 py-6'
          : 'bg-[#0f0d0a] border-y border-[#262017] py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        {/* Dojo Location & Enrollment Phone Top Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#241e17] text-xs">
          <div className="flex items-center gap-2 font-mono text-[#e0a85c]">
            <MapPin className="w-3.5 h-3.5 text-[#e0a85c]" />
            <span className="font-medium text-[#f4efe6]">{t.player.locationHeader}</span>
            <span className="text-[#6d5e4d] hidden md:inline">· {t.player.tatamiBadge}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#9e9080] text-[11px] hidden sm:inline">{t.player.callLabel}</span>
            <a
              href={`tel:${KANIV_DOJO_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#241d15] hover:bg-[#32271a] border border-[#c98a3c]/50 text-[#e0a85c] font-mono font-bold transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{t.player.callSenseiBtn}</span>
            </a>
          </div>
        </div>

        {/* Cinema Header Zone */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#c98a3c] mb-1 font-mono">
              <span>{language === 'en' && activeTake.cameraPerspectiveEn ? activeTake.cameraPerspectiveEn : activeTake.cameraPerspective}</span>
              <span aria-hidden="true">·</span>
              <span>{activeTake.lensType}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#f4efe6] tracking-tight">
              {language === 'en' && activeTake.titleEn ? activeTake.titleEn : activeTake.title}
            </h2>
            <div className="text-sm font-jp text-[#b3a695] mt-0.5">
              {activeTake.japaneseTitle}
            </div>
          </div>

          {/* Quick HUD controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextSpeed: PlaybackSpeed = playbackSpeed === 1.0 ? 0.25 : 1.0;
                setPlaybackSpeed(nextSpeed);
                soundEngine.playTatamiStep();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                playbackSpeed === 1.0
                  ? 'bg-[#e0a85c] text-[#0b0a08] border-[#e0a85c] shadow-lg shadow-[#e0a85c]/20'
                  : 'bg-[#191511] text-[#e0a85c] border-[#c98a3c]/50 hover:bg-[#282119]'
              }`}
              title={playbackSpeed === 1.0 ? t.player.speedSlow : t.player.speedNormal}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{playbackSpeed === 1.0 ? (language === 'en' ? '⚡ Normal Speed' : '⚡ Справжня швидкість') : (language === 'en' ? 'Slow Motion' : 'Уповільнений рух')}</span>
            </button>

            <button
              onClick={() => setShowBiometrics(!showBiometrics)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                showBiometrics
                  ? 'bg-[#292218] border-[#c98a3c]/60 text-[#f4efe6]'
                  : 'bg-[#151310] border-[#29231b] text-[#8e8374] hover:text-[#d5cbc0]'
              }`}
              title={showBiometrics ? t.player.hudBiometricsHide : t.player.hudBiometrics}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'en' ? `Vectors: ${showBiometrics ? 'ON' : 'OFF'}` : `Вектори: ${showBiometrics ? 'УВІМК' : 'ВИМК'}`}</span>
            </button>

            <button
              onClick={() =>
                setAspectRatioClass(
                  aspectRatioClass.includes('21/9') ? 'aspect-[16/9]' : 'aspect-[21/9]'
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#151310] border border-[#29231b] text-[#c5bcb0] hover:text-[#f4efe6] transition-colors"
              title="2.39:1 / 16:9"
            >
              <Film className="w-3.5 h-3.5" />
              <span>{aspectRatioClass.includes('21/9') ? (language === 'en' ? '2.39:1 Cinema' : '2.39:1 Кіно') : (language === 'en' ? '16:9 Master' : '16:9 Майстер')}</span>
            </button>

            <button
              onClick={() => setShowTakeDrawer(!showTakeDrawer)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#151310] border border-[#29231b] text-[#c5bcb0] hover:text-[#f4efe6] transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Takes (5)' : 'Ракурси (5 дублів)'}</span>
            </button>
          </div>
        </div>

        {/* Video Viewport Stage */}
        <div className="relative w-full bg-[#070605] rounded-xl overflow-hidden shadow-2xl border border-[#2b241a] group">
          {/* Main Visual Display */}
          <div className={`relative w-full ${aspectRatioClass} overflow-hidden flex items-center justify-center`}>
            {/* Image Canvas with Slow-motion Ken Burns / drift */}
            <img
              src={activeTake.imagePath}
              alt={activeTake.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none transition-transform duration-700 ease-out"
              style={{
                ...getFilterStyle(),
                transform: `scale(${zoomScale}) translate(${panX}%, ${isImpactActive ? '3px' : '0px'})`,
              }}
            />

            {/* Cinematic Anamorphic Glow & Warm Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b0a08]/85 via-transparent to-[#0b0a08]/40" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
            
            {/* Anamorphic warm flare streak */}
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f3b562]/20 to-transparent pointer-events-none mix-blend-screen" />

            {/* Procedural Canvas Dust Motes suspended in warm dojo light */}
            <DustMoteCanvas isPlaying={isPlaying} playbackSpeed={playbackSpeed} />

            {/* Interactive Biomechanical Vector HUD */}
            <BiomechanicalOverlay
              currentKeyframe={activeKeyframe}
              currentTime={currentTime}
              isVisible={showBiometrics}
            />

            {/* Floating Top Indicator: Live Speed & Timecode */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#0d0b09]/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#30281e] text-xs font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-[#e0a85c] animate-pulse" />
              <span className="text-[#f4efe6] font-semibold">{formatTimecode(currentTime)}</span>
              <span className="text-[#756a5c]">/</span>
              <span className="text-[#968a7a]">{formatTimecode(activeTake.duration)}</span>
              <span className="text-[#40372b]">|</span>
              <span className={`font-semibold ${playbackSpeed === 1.0 ? 'text-amber-400' : 'text-[#e0a85c]'}`}>
                {playbackSpeed === 1.0
                  ? (language === 'en' ? '⚡ 1.0x NORMAL SPEED' : '⚡ 1.0x СПРАВЖНЯ ШВИДКІСТЬ')
                  : (language === 'en' ? `${playbackSpeed}x SLOW-MO` : `${playbackSpeed}x СПОВІЛЬНЕННЯ`)}
              </span>
            </div>

            {/* Floating Top Right: Snapshot Button */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => onCaptureFrame(activeTake, activeKeyframe, currentTime)}
                className="flex items-center gap-1.5 bg-[#0d0b09]/80 backdrop-blur-md hover:bg-[#201a14] border border-[#382f23] text-[#e0a85c] px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                title={t.player.hudSnapshot}
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.player.hudSnapshot}</span>
              </button>
            </div>

            {/* Center Big Play overlay when paused */}
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer group/center transition-all"
                aria-label="Продовжити сповільнене відтворення"
              >
                <div className="w-16 h-16 rounded-full bg-[#1b1712]/90 border border-[#c98a3c] flex items-center justify-center text-[#e0a85c] shadow-2xl group-hover/center:scale-110 transition-transform">
                  <Play className="w-7 h-7 ml-1 fill-current" />
                </div>
              </button>
            )}
          </div>

          {/* Interactive Frame Timeline & Scrubber Bar */}
          <div className="bg-[#12100d] px-4 pt-3 pb-3 border-t border-[#241f17]">
            {/* Timeline Progress Bar with Keyframe Pins */}
            <div className="relative w-full mb-3">
              <input
                type="range"
                min="0"
                max={activeTake.duration}
                step="0.02"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-[#201b15] rounded-lg appearance-none cursor-pointer accent-[#e0a85c] focus:outline-none"
              />

              {/* Keyframe Markers along timeline */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none px-1">
                {activeTake.keyframes.map((kf) => {
                  const percent = (kf.time / activeTake.duration) * 100;
                  const isCurrent = activeKeyframe?.id === kf.id;
                  return (
                    <button
                      key={kf.id}
                      onClick={() => jumpToKeyframe(kf)}
                      className="absolute pointer-events-auto -translate-x-1/2 top-1/2 -translate-y-1/2 group/pin"
                      style={{ left: `${percent}%` }}
                      title={`${kf.time}с: ${kf.label} (${kf.phase})`}
                    >
                      <span
                        className={`block transition-all ${
                          isCurrent
                            ? 'w-3 h-3 rounded-full bg-[#e0a85c] ring-4 ring-[#e0a85c]/30'
                            : 'w-2 h-2 rounded-full bg-[#756a5a] hover:bg-[#d4a86b]'
                        }`}
                      />
                      {/* Tooltip on pin hover */}
                      <span className="hidden group-hover/pin:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1b1712] border border-[#40372b] px-2 py-1 rounded text-[10px] text-[#f4efe6] whitespace-nowrap shadow-xl z-30 font-sans">
                        {kf.label} · {kf.time}с
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Playback Controls Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Transport Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-md bg-[#251f18] hover:bg-[#342b21] border border-[#403629] text-[#f4efe6] flex items-center justify-center transition-colors"
                  title={isPlaying ? 'Пауза (Пробіл)' : 'Відтворення (Пробіл)'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  )}
                </button>

                <button
                  onClick={() => stepFrame(-1)}
                  className="p-2 rounded-md text-[#a39786] hover:text-[#f4efe6] hover:bg-[#1f1a14] transition-colors"
                  title="Крок назад на 1 кадр (Клавіша ←)"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => stepFrame(1)}
                  className="p-2 rounded-md text-[#a39786] hover:text-[#f4efe6] hover:bg-[#1f1a14] transition-colors"
                  title="Крок вперед на 1 кадр (Клавіша →)"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTime(0);
                    soundEngine.playTatamiStep();
                  }}
                  className="p-2 rounded-md text-[#a39786] hover:text-[#f4efe6] hover:bg-[#1f1a14] transition-colors"
                  title="Почати дубль спочатку"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-[1px] bg-[#2a241b] mx-1" />

                {/* Microsecond Timecode */}
                <div className="text-xs font-mono text-[#cfc4b6] tabular-nums">
                  <span className="text-[#e0a85c] font-semibold">{formatTimecode(currentTime)}</span>
                  <span className="text-[#6d6253]"> / </span>
                  <span>{formatTimecode(activeTake.duration)}</span>
                </div>
              </div>

              {/* Slow-Motion Speed Selector */}
              <div className="flex items-center gap-1 bg-[#1a1612] p-1 rounded-md border border-[#2b241a]">
                <span className="text-[11px] font-mono text-[#8a7e6f] px-2 uppercase">Швидкість:</span>
                {([0.1, 0.25, 0.5, 1.0] as PlaybackSpeed[]).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackSpeed(speed);
                      soundEngine.playTatamiStep();
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-[#c98a3c] text-[#0b0a08] font-bold shadow'
                        : 'text-[#a39786] hover:text-[#f4efe6]'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Visual Filter Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-[#8a7e6f] uppercase hidden lg:inline">{t.player.hudFilter}:</span>
                <select
                  value={visualFilter}
                  onChange={(e) => setVisualFilter(e.target.value as VisualFilter)}
                  className="bg-[#1a1612] border border-[#2b241a] text-xs text-[#c5bcb0] px-2.5 py-1 rounded-md focus:outline-none focus:border-[#c98a3c]"
                >
                  <option value="amber-lantern">{t.player.filters.amber}</option>
                  <option value="sumi-ink">{t.player.filters.sumi}</option>
                  <option value="dnieper-dusk">{t.player.filters.dusk}</option>
                  <option value="natural-tatami">{t.player.filters.tatami}</option>
                </select>

                {/* Dojo Atmospheric Audio Layer Controller */}
                <AudioLayerControl isPlaying={isPlaying} playbackSpeed={playbackSpeed} />

                <button
                  onClick={onToggleCinemaMode}
                  className="p-1.5 rounded-md text-[#a39786] hover:text-[#f4efe6] hover:bg-[#1f1a14] transition-colors"
                  title={language === 'en' ? 'Toggle Cinema Fullscreen' : 'Перемкнути кінематографічний повний екран'}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Keyframe Jump Pill Track (Fast Analysis of Phases) */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-mono uppercase text-[#857a6b] shrink-0">
            {language === 'en' ? 'Take Phases:' : 'Фази дубля:'}
          </span>
          {activeTake.keyframes.map((kf) => (
            <button
              key={kf.id}
              onClick={() => jumpToKeyframe(kf)}
              className={`shrink-0 px-2.5 py-1 rounded text-xs transition-colors border ${
                activeKeyframe?.id === kf.id
                  ? 'bg-[#292218] border-[#c98a3c] text-[#e0a85c] font-medium'
                  : 'bg-[#14120e] border-[#262018] text-[#9c9182] hover:text-[#d9d0c3] hover:border-[#382f23]'
              }`}
            >
              {language === 'en' && kf.labelEn ? kf.labelEn : kf.label} ({kf.time}{language === 'en' ? 's' : 'с'})
            </button>
          ))}
        </div>

        {/* Realistic Throw Slow-Motion Controls Bar */}
        <div className="mt-4 p-4 bg-[#14110e] border border-[#2b241a] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#e0a85c]">
              <Target className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Realistic Throw & Motion Analysis in Slow Motion' : 'Аналіз реалістичного кидка в уповільненому русі'}</span>
            </div>
            <div className="text-xs text-[#a89d8d]">
              {language === 'en' ? 'Playback Speed: ' : 'Швидкість відтворення: '}
              <span className="text-[#f4efe6] font-semibold font-mono">{playbackSpeed}x</span> · 
              {language === 'en' ? (
                playbackSpeed === 0.1 ? ' Ultra slow-mo (240 fps) for granular amplitude study' :
                playbackSpeed === 0.25 ? ' Quarter speed for off-balancing vector analysis (Kuzushi)' :
                playbackSpeed === 0.5 ? ' Fluid projection motion (half-speed)' : ' Real martial combat tempo (1.0x)'
              ) : (
                playbackSpeed === 0.1 ? ' Ультра-slow-mo (240 кадр/с) для детального вивчення амплітуди' : 
                playbackSpeed === 0.25 ? ' Чверть швидкості для аналізу виведення з рівноваги (Кудзуші)' : 
                playbackSpeed === 0.5 ? ' Плинний рух (половинна швидкість)' : ' Реальний ритм виконання'
              )}
            </div>
          </div>

          {/* Quick Throw Stage Jumps & Speed Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setPlaybackSpeed(1.0);
                soundEngine.playTatamiStep();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                playbackSpeed === 1.0
                  ? 'bg-[#e0a85c] text-[#0b0a08] shadow-md shadow-[#e0a85c]/20 font-bold'
                  : 'bg-[#1e1913] hover:bg-[#2b2218] border border-[#3d3326] text-[#e0a85c]'
              }`}
              title={language === 'en' ? 'Switch to 100% full real-speed' : 'Перемкнути на 100% реальну бойову швидкість'}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'en' ? '⚡ Full Speed (1.0x)' : '⚡ Справжня швидкість (1.0x)'}</span>
            </button>

            <button
              onClick={() => {
                const nageKf = activeTake.keyframes.find(k => k.phase === 'Nage') || activeTake.keyframes[0];
                jumpToKeyframe(nageKf);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e1913] hover:bg-[#2b2218] border border-[#3d3326] text-[#e0a85c] transition-colors"
              title={language === 'en' ? 'Jump directly to the flight apex' : 'Перейти безпосередньо до апогею польоту уке'}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Throw Apex (Flight)' : 'Апогей кидка (Політ)'}</span>
            </button>

            <button
              onClick={() => {
                const ukemiKf = activeTake.keyframes.find(k => k.phase === 'Ukemi') || activeTake.keyframes[0];
                jumpToKeyframe(ukemiKf);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e1913] hover:bg-[#2b2218] border border-[#3d3326] text-[#f4efe6] transition-colors"
              title={language === 'en' ? 'Jump to tatami impact contact' : 'Перейти до моменту контакту з татамі'}
            >
              <span>{language === 'en' ? 'Breakfall (Ukemi)' : 'Падіння (Укемі)'}</span>
            </button>

            {/* Micro Frame Step controls */}
            <div className="flex items-center gap-1 bg-[#0b0a08] p-1 rounded-md border border-[#241e17]">
              <button
                onClick={() => stepFrame(-1)}
                className="px-2 py-1 text-[11px] font-mono text-[#a39786] hover:text-[#f4efe6] rounded hover:bg-[#1a1712]"
                title={language === 'en' ? 'Step back 1/24 second' : 'Назад на 1/24 секунди'}
              >
                {language === 'en' ? '-1f' : '-1к'}
              </button>
              <span className="text-[10px] font-mono text-[#665a4c]">|</span>
              <button
                onClick={() => stepFrame(1)}
                className="px-2 py-1 text-[11px] font-mono text-[#a39786] hover:text-[#f4efe6] rounded hover:bg-[#1a1712]"
                title={language === 'en' ? 'Step forward 1/24 second' : 'Вперед на 1/24 секунди'}
              >
                {language === 'en' ? '+1f' : '+1к'}
              </button>
            </div>
          </div>
        </div>

        {/* Camera Angles / Take Selector Drawer */}
        {showTakeDrawer && (
          <div className="mt-5 p-4 bg-[#14120f] border border-[#2d261c] rounded-xl animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold tracking-wider font-cinzel text-[#f4efe6] uppercase">
                {t.player.drawerTitle}
              </h3>
              <button
                onClick={() => setShowTakeDrawer(false)}
                className="text-xs text-[#8c8172] hover:text-[#f4efe6]"
              >
                ✕ {t.player.drawerClose}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {takes.map((take) => {
                const isCurrent = take.id === activeTake.id;
                const cardTitle = language === 'en' && take.titleEn ? take.titleEn : take.title;
                const cardPerspective = language === 'en' && take.cameraPerspectiveEn ? take.cameraPerspectiveEn : take.cameraPerspective;
                return (
                  <button
                    key={take.id}
                    onClick={() => {
                      onSelectTake(take);
                      setCurrentTime(2.0);
                      soundEngine.playSingingBowl(392); // G4
                    }}
                    className={`group text-left rounded-lg overflow-hidden border transition-all ${
                      isCurrent
                        ? 'border-[#c98a3c] ring-1 ring-[#c98a3c] bg-[#221c14]'
                        : 'border-[#262017] hover:border-[#403627] bg-[#171410]'
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={take.imagePath}
                        alt={cardTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-[#f4efe6] bg-black/60 px-1 rounded">
                        {take.duration}{language === 'en' ? 's' : 'с'}
                      </span>
                    </div>

                    <div className="p-2.5">
                      <div className="text-xs font-semibold text-[#f4efe6] line-clamp-1">
                        {cardTitle}
                      </div>
                      <div className="text-[10px] text-[#c98a3c] font-jp line-clamp-1 mt-0.5">
                        {take.japaneseTitle}
                      </div>
                      <div className="text-[10px] text-[#7a6f60] font-mono mt-1">
                        {cardPerspective.split('·')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
