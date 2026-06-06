import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  attribution?: {
    kicker?: string;
    name: string;
    role?: string;
  };
}

const PLAYBACK_SPEEDS = [0.5, 1, 1.5, 2] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface CustomSliderProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  ariaLabel: string;
  className?: string;
}

function CustomSlider({
  value,
  max,
  onChange,
  ariaLabel,
  className,
}: CustomSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (rect.width <= 0) return;
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      onChange(ratio * max);
    },
    [max, onChange],
  );

  const handlePointerDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
    updateFromClientX(event.clientX);
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (event: MouseEvent) => updateFromClientX(event.clientX);
    const handleUp = () => setDragging(false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      className={cn(
        "relative h-1 w-full cursor-pointer rounded-full bg-white/20",
        className,
      )}
      onMouseDown={handlePointerDown}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-white"
        style={{ width: `${percentage}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <motion.div
        className="absolute top-1/2 -ml-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow"
        style={{ left: `${percentage}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}

export default function VideoPlayer({
  src,
  poster,
  attribution,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => {
      setIsPlaying(true);
      setHasStarted(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setHasStarted(true);
      void video.play();
    } else {
      video.pause();
    }
  };

  const handleSeek = (next: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = next;
    setCurrentTime(next);
  };

  const handleVolumeChange = (next: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.min(1, Math.max(0, next));
    video.volume = clamped;
    video.muted = clamped === 0;
    setVolume(clamped);
    setIsMuted(clamped === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      video.volume = 1;
      setVolume(1);
    }
  };

  const handlePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full cursor-pointer object-contain"
      />

      <AnimatePresence>
        {!hasStarted ? (
          <motion.div
            key="poster-overlay"
            className="pointer-events-none absolute inset-0 z-10 flex flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative flex flex-1 items-center justify-center">
              <motion.button
                type="button"
                onClick={togglePlay}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto mt-12 flex h-20 w-20 items-center justify-center rounded-full bg-[#d9ff3a] text-black shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] md:mt-16"
                aria-label="Play video"
              >
                <Play className="h-8 w-8 fill-current" />
              </motion.button>
            </div>

            {attribution ? (
              <div className="relative p-6 text-white md:p-8">
                {attribution.kicker ? (
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/70">
                    {attribution.kicker}
                  </p>
                ) : null}
                <p className="font-serif text-3xl leading-tight text-white md:text-4xl">
                  {attribution.name}
                </p>
                {attribution.role ? (
                  <p className="mt-2 text-sm text-white/80 md:text-base">
                    {attribution.role}
                  </p>
                ) : null}
              </div>
            ) : null}

            <motion.button
              type="button"
              onClick={togglePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-[#d9ff3a] px-5 py-2.5 text-sm font-medium text-black shadow-lg md:bottom-8 md:right-8"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch video
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {controlsVisible && hasStarted ? (
          <motion.div
            key="controls"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex flex-col gap-3 rounded-lg bg-[#11111198] p-3 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
          >
            <div className="pointer-events-auto flex items-center gap-3 text-xs tabular-nums">
              <span className="w-10 text-right text-white/80">
                {formatTime(currentTime)}
              </span>
              <CustomSlider
                value={currentTime}
                max={duration || 0}
                onChange={handleSeek}
                ariaLabel="Seek video"
                className="flex-1"
              />
              <span className="w-10 text-white/60">{formatTime(duration)}</span>
            </div>

            <div className="pointer-events-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="h-9 w-9 text-white hover:bg-white/10 hover:text-white"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>

                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      className="h-9 w-9 text-white hover:bg-white/10 hover:text-white"
                    >
                      <VolumeIcon className="h-5 w-5" />
                    </Button>
                  </motion.div>
                  <div className="w-24">
                    <CustomSlider
                      value={isMuted ? 0 : volume}
                      max={1}
                      onChange={handleVolumeChange}
                      ariaLabel="Volume"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {PLAYBACK_SPEEDS.map((rate) => {
                  const active = playbackRate === rate;
                  return (
                    <motion.div
                      key={rate}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePlaybackRate(rate)}
                        aria-pressed={active}
                        className={cn(
                          "h-8 rounded-md px-2 text-xs text-white hover:bg-white/10 hover:text-white",
                          active && "bg-[#111111d1] hover:bg-[#111111d1]",
                        )}
                      >
                        {rate}x
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
