import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Audio } from "@remotion/media";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { ColdOpen } from "./scenes2/ColdOpen";
import { Encounter } from "./scenes2/Encounter";
import { BattleHero } from "./scenes2/BattleHero";
import { SpeciesCount } from "./scenes2/SpeciesCount";
import { CatchHero } from "./scenes2/CatchHero";
import { MonParade } from "./scenes2/MonParade";
import { StatsStack } from "./scenes2/StatsStack";
import { EndCard2 } from "./scenes2/EndCard2";

loadInter("normal", { weights: ["400", "700", "900"] });

// Ad2 — game-first cut. Less hardware glamour, more of what's actually in
// the game: the world, the brainrots, the battles, the catching, the
// numbers. Devices only appear in the final end card. Pace is faster
// than Ad1 (more cuts, shorter scenes, transition wipes between beats).
export const Ad2: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  // Music: same chiptune as the in-game overworld theme (gen-music.mjs
  // synthesizes it from the same melody data as js/audio.js). 30s WAV
  // looped, with a fade-out in the last 0.7s so it doesn't cut hard.
  const fadeOut = (f: number) => interpolate(
    f,
    [0, durationInFrames - fps * 0.7, durationInFrames],
    [1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Quick fade transitions between most beats; harder cut into the
  // battle scene for impact.
  const quickFade = () => (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 8 })}
    />
  );
  const slideFromRight = () => (
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-right" })}
      timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })}
    />
  );
  const wipeUp = () => (
    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-bottom" })}
      timing={linearTiming({ durationInFrames: 12 })}
    />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio
        src={staticFile("music.wav")}
        loop
        // Cap at 0.55 baseline (already low in the WAV itself) and
        // fade out the last 0.7s so it doesn't cut hard.
        volume={(f) => fadeOut(f) * 0.55}
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <ColdOpen />
        </TransitionSeries.Sequence>

        {quickFade()}

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <Encounter />
        </TransitionSeries.Sequence>

        {wipeUp()}

        <TransitionSeries.Sequence durationInFrames={4 * fps}>
          <BattleHero />
        </TransitionSeries.Sequence>

        {quickFade()}

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <SpeciesCount />
        </TransitionSeries.Sequence>

        {slideFromRight()}

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <CatchHero />
        </TransitionSeries.Sequence>

        {quickFade()}

        <TransitionSeries.Sequence durationInFrames={4 * fps}>
          <MonParade />
        </TransitionSeries.Sequence>

        {wipeUp()}

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <StatsStack />
        </TransitionSeries.Sequence>

        {quickFade()}

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <EndCard2 />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Persistent URL watermark — sits over every scene so the
          viewer always knows where to play. Fades out before the
          end card so it doesn't fight the big URL pill there. */}
      <UrlWatermark />
    </AbsoluteFill>
  );
};

const UrlWatermark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const endCardFrame = durationInFrames - 3 * fps;

  const opacity = interpolate(
    frame,
    [
      fps * 0.6,
      fps * 1.4,
      endCardFrame - fps * 0.3,
      endCardFrame,
    ],
    [0, 0.92, 0.92, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        right: 28,
        opacity,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(0,0,0,0.62)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: "10px 18px",
        borderRadius: 100,
        border: "1px solid rgba(255,203,5,0.6)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
        fontFamily: "monospace",
        color: "#ffffff",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 0.4,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #fff5b3 0%, #ffcb05 45%, #ff8a00 100%)",
          boxShadow: "0 0 8px rgba(255,203,5,0.8)",
        }}
      />
      brainrot-monsters.pages.dev
    </div>
  );
};
