import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wind, Footprints, Activity, Waves, Music } from 'lucide-react';
import { soundEngine, SoundLayerVolumes } from '../utils/soundEngine';
import { useLanguage } from '../i18n/LanguageContext';

interface AudioLayerControlProps {
  isPlaying: boolean;
  playbackSpeed: number;
}

export const AudioLayerControl: React.FC<AudioLayerControlProps> = ({
  isPlaying,
  playbackSpeed,
}) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [masterVol, setMasterVol] = useState<number>(soundEngine.getMasterVolume());
  const [layers, setLayers] = useState<SoundLayerVolumes>(soundEngine.getLayerVolumes());

  useEffect(() => {
    const unsub = soundEngine.subscribe((muted, vol) => {
      setIsMuted(muted);
      setMasterVol(vol);
    });
    return unsub;
  }, []);

  const handleMasterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setMasterVol(val);
    soundEngine.setMasterVolume(val);
    if (isMuted && val > 0) {
      soundEngine.toggleMute();
    }
  };

  const handleLayerChange = (layer: keyof SoundLayerVolumes, val: number) => {
    setLayers((prev) => ({ ...prev, [layer]: val }));
    soundEngine.setLayerVolume(layer, val);
  };

  const handleToggleMute = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  };

  const modal = t.player.audioModal;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
          !isMuted && isPlaying
            ? 'bg-[#292218] border-[#c98a3c] text-[#e0a85c]'
            : 'bg-[#151310] border-[#29231b] text-[#9c9182] hover:text-[#f4efe6]'
        }`}
        title={t.player.audioControl}
      >
        {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        <span>{t.player.audioControl}</span>
        {isPlaying && !isMuted && (
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-2.5 bg-[#e0a85c] rounded-full animate-pulse" />
            <span className="w-1 h-3.5 bg-[#e0a85c] rounded-full animate-pulse delay-75" />
            <span className="w-1 h-2 bg-[#e0a85c] rounded-full animate-pulse delay-150" />
          </span>
        )}
      </button>

      {/* Popover Settings Panel */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-80 bg-[#14110e]/95 backdrop-blur-xl border border-[#382f23] rounded-xl p-4 shadow-2xl z-40 animate-fadeIn text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[#262018] mb-3">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-[#e0a85c]" />
              <span className="text-xs font-bold font-cinzel text-[#f4efe6] uppercase tracking-wider">
                {modal.title}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#7d7162] hover:text-[#f4efe6]"
            >
              ✕
            </button>
          </div>

          <div className="text-[11px] text-[#a89d8d] leading-relaxed mb-3">
            {modal.desc}
          </div>

          {/* Master Volume Slider */}
          <div className="space-y-1 mb-4 bg-[#0d0c0a] p-2.5 rounded-lg border border-[#262017]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#c7bcae] font-medium flex items-center gap-1.5">
                {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-[#e0a85c]" /> : <VolumeX className="w-3.5 h-3.5 text-[#85796b]" />}
                {modal.master}
              </span>
              <span className="font-mono text-[#e0a85c] text-[11px]">
                {isMuted ? modal.muted : `${Math.round(masterVol * 100)}%`}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : masterVol}
              onChange={handleMasterChange}
              className="w-full h-1.5 bg-[#251f18] rounded-lg appearance-none cursor-pointer accent-[#e0a85c]"
            />
          </div>

          {/* Sub-layers Controls */}
          <div className="space-y-3">
            {/* Layer 1: Tatami */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#cfc4b5] flex items-center gap-1.5">
                  <Footprints className="w-3 h-3 text-[#c98a3c]" />
                  <span>{modal.tatami}</span>
                </span>
                <span className="text-[10px] font-mono text-[#968a7b]">
                  {Math.round(layers.tatami * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={layers.tatami}
                onChange={(e) => handleLayerChange('tatami', parseFloat(e.target.value))}
                className="w-full h-1 bg-[#251f18] rounded appearance-none cursor-pointer accent-[#c98a3c]"
              />
            </div>

            {/* Layer 2: Breathing */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#cfc4b5] flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#c98a3c]" />
                  <span>{modal.breath} ({playbackSpeed}x)</span>
                </span>
                <span className="text-[10px] font-mono text-[#968a7b]">
                  {Math.round(layers.breath * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={layers.breath}
                onChange={(e) => handleLayerChange('breath', parseFloat(e.target.value))}
                className="w-full h-1 bg-[#251f18] rounded appearance-none cursor-pointer accent-[#c98a3c]"
              />
            </div>

            {/* Layer 3: Kaniv Nature & Dnieper Wind */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#cfc4b5] flex items-center gap-1.5">
                  <Wind className="w-3 h-3 text-[#c98a3c]" />
                  <span>{modal.nature}</span>
                </span>
                <span className="text-[10px] font-mono text-[#968a7b]">
                  {Math.round(layers.kanivNature * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={layers.kanivNature}
                onChange={(e) => handleLayerChange('kanivNature', parseFloat(e.target.value))}
                className="w-full h-1 bg-[#251f18] rounded appearance-none cursor-pointer accent-[#c98a3c]"
              />
            </div>

            {/* Layer 4: Japanese Music */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#cfc4b5] flex items-center gap-1.5">
                  <Music className="w-3 h-3 text-[#e0a85c]" />
                  <span>{modal.music}</span>
                </span>
                <span className="text-[10px] font-mono text-[#e0a85c]">
                  {Math.round(layers.japaneseMusic * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={layers.japaneseMusic}
                onChange={(e) => handleLayerChange('japaneseMusic', parseFloat(e.target.value))}
                className="w-full h-1 bg-[#251f18] rounded appearance-none cursor-pointer accent-[#e0a85c]"
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#262018]">
            <button
              onClick={() => soundEngine.playJapaneseMelodyPhrase()}
              className="w-full py-1.5 px-2 rounded bg-[#1c1712] hover:bg-[#282119] border border-[#3b3023] text-[#e0a85c] text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Music className="w-3 h-3" />
              <span>{modal.music}</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-[#262018] flex items-center justify-between">
            <button
              onClick={handleToggleMute}
              className="text-[11px] text-[#e0a85c] hover:underline"
            >
              {isMuted ? (language === 'en' ? 'Unmute Audio' : 'Увімкнути звук') : (language === 'en' ? 'Mute All' : 'Заглушити все')}
            </button>
            <span className="text-[10px] font-mono text-[#786c5d]">
              {language === 'en' ? `Auto-adapts to ${playbackSpeed}x` : `Авто-адаптація до ${playbackSpeed}x`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

