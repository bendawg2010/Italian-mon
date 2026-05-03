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
        volume={fadeOut}
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
    </AbsoluteFill>
  );
};
