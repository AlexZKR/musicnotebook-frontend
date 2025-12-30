import { useCallback } from "react";
import confetti from "canvas-confetti";

export type ConfettiOptions = {
  duration?: number;
  particleCount?: number;
  spread?: number;
  angleLeft?: number;
  angleRight?: number;
  colors?: string[];
};

const DEFAULTS: Required<ConfettiOptions> = {
  duration: 2000,
  particleCount: 3,
  spread: 55,
  angleLeft: 60,
  angleRight: 120,
  colors: ["#60a5fa", "#34d399", "#f472b6"],
};

export function useConfetti(options?: ConfettiOptions) {
  const settings = { ...DEFAULTS, ...options };

  return useCallback(() => {
    const end = Date.now() + settings.duration;

    const frame = () => {
      confetti({
        particleCount: settings.particleCount,
        angle: settings.angleLeft,
        spread: settings.spread,
        origin: { x: 0 },
        colors: settings.colors,
      });
      confetti({
        particleCount: settings.particleCount,
        angle: settings.angleRight,
        spread: settings.spread,
        origin: { x: 1 },
        colors: settings.colors,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, [
    settings.angleLeft,
    settings.angleRight,
    settings.colors,
    settings.duration,
    settings.particleCount,
    settings.spread,
  ]);
}
