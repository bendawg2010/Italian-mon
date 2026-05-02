import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { LiveGame } from "../components/LiveGame";

const { fontFamily: inter } = loadInter("normal", { weights: ["700", "900"] });

// Catch shot. Live ?scene=catch auto-throws a Brain Cell shortly after
// load, so we get the actual ball-arc + shake animation in the iframe.
// Big "GOTCHA!" word stamps over it on the catch beat.
export const CatchHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // GOTCHA stamp lands ~2s in (matches the in-game capture beat)
  const stampSpring = spring({
    frame: frame - fps * 1.6,
    fps,
    config: { damping: 8, stiffness: 220 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3, 1]);
  const stampRot = interpolate(stampSpring, [0, 1], [-25, -8]);
  const stampOp = interpolate(stampSpring, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: inter }}>
      <LiveGame scene="catch" settleMs={400} />

      {/* Stamp overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: stampOp,
            transform: `scale(${stampScale}) rotate(${stampRot}deg)`,
            fontSize: 280,
            fontWeight: 900,
            color: "#ffcb05",
            letterSpacing: -6,
            textShadow:
              "0 0 30px rgba(255,203,5,0.6), 8px 8px 0 #ff4d6d, 16px 16px 0 #2a0a3a",
          }}
        >
          GOTCHA!
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
