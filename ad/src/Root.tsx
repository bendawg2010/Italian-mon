import { Composition } from "remotion";
import { Ad } from "./Ad";
import { AdSquare } from "./AdSquare";
import { Ad2 } from "./Ad2";

const FPS = 30;
const AD1_FRAMES = 22 * FPS;
// Ad2 uses TransitionSeries with overlapping transitions that compress
// the timeline. Sum of sequences = 2+3+4+3+3+4+3+3 = 25s = 750f.
// Overlapping transitions: 4 fades × 8 + 2 wipes × 12 + 1 slide × 18
// ≈ 74 frames consumed by overlap. Real visible content ≈ 676 frames
// (~22.5s). Set composition to match so the timeline ends on the
// EndCard, not on trailing black.
const AD2_FRAMES = 676;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Ad v1 — Apple-style "Mac, iPhone, iPad" launch */}
      <Composition
        id="Ad"
        component={Ad}
        durationInFrames={AD1_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="AdSquare"
        component={AdSquare}
        durationInFrames={AD1_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
      {/* Ad v2 — game-first, faster cuts, more content callouts */}
      <Composition
        id="Ad2"
        component={Ad2}
        durationInFrames={AD2_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
