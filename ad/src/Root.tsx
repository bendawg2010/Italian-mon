import { Composition } from "remotion";
import { Ad } from "./Ad";
import { AdSquare } from "./AdSquare";

// 22-second 1080p ad in 16:9 (the cinematic / YouTube version) and a
// matching 1:1 square cut for Instagram / TikTok.
const FPS = 30;
const TOTAL_FRAMES = 22 * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Ad"
        component={Ad}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="AdSquare"
        component={AdSquare}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
