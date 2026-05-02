import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Intro } from "./scenes/Intro";
import { LaptopOpen } from "./scenes/LaptopOpen";
import { StarterShowcase } from "./scenes/StarterShowcase";
import { IPhoneBattle } from "./scenes/IPhoneBattle";
import { IPadOverworld } from "./scenes/IPadOverworld";
import { EndCard } from "./scenes/EndCard";

// Load Inter at the module top level so the font is ready before the
// first frame renders. Multiple weights so we can do Apple-style thin/bold.
loadInter("normal", { weights: ["100", "300", "400", "600", "700", "900"] });

// 22-second narrative arc:
//   1.  0.0–3.0s  Black "BRAINROT MONSTERS" title fades in (Apple intro)
//   2.  3.0–7.0s  Closed MacBook — opens up, screen powers on, title visible
//   3.  7.0–12.0s Zoom into the screen, the 3 starters cycle one by one
//   4. 12.0–16.0s Cut to iPhone — overworld walking + wild battle starts
//   5. 16.0–19.0s Cut to iPad — battle continues bigger; mon catch sparkle
//   6. 19.0–22.0s End card — all 3 devices, URL, "Available now"
export const Ad: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Series>
        <Series.Sequence durationInFrames={3 * fps} name="Intro">
          <Intro />
        </Series.Sequence>

        <Series.Sequence durationInFrames={4 * fps} name="LaptopOpen">
          <LaptopOpen />
        </Series.Sequence>

        <Series.Sequence durationInFrames={5 * fps} name="StarterShowcase">
          <StarterShowcase />
        </Series.Sequence>

        <Series.Sequence durationInFrames={4 * fps} name="iPhone">
          <IPhoneBattle />
        </Series.Sequence>

        <Series.Sequence durationInFrames={3 * fps} name="iPad">
          <IPadOverworld />
        </Series.Sequence>

        <Series.Sequence durationInFrames={3 * fps} name="EndCard">
          <EndCard />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
