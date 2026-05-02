import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: inter } = loadInter("normal", { weights: ["900"] });

// Cold open. Black screen, then "ITALIAN BRAINROT" types in word by
// word with a hard kick when the second word lands. Sets the tone:
// loud, fast, opinionated. No game footage yet — pure title shock.
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // First word "ITALIAN" appears at frame 6
  const w1Spring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const w1Scale = interpolate(w1Spring, [0, 1], [0.6, 1]);
  const w1Op = interpolate(w1Spring, [0, 0.6], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Second word "BRAINROT" smashes in at frame 22 with a bigger spring
  const w2Spring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 8, stiffness: 220 },
  });
  const w2Scale = interpolate(w2Spring, [0, 1], [1.6, 1]);
  const w2Op = interpolate(w2Spring, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Camera shake when BRAINROT lands
  const shakeT = Math.max(0, 1 - (frame - 22) / 12);
  const shakeX = Math.sin(frame * 1.1) * 6 * shakeT;
  const shakeY = Math.cos(frame * 1.3) * 4 * shakeT;

  // Background flash on impact
  const bgFlash = interpolate(frame, [22, 24, 30], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: inter,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* impact flash overlay */}
      <AbsoluteFill style={{ background: "#c93dff", opacity: bgFlash * 0.15 }} />

      <div
        style={{
          fontSize: 110,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: 4,
          opacity: w1Op,
          transform: `scale(${w1Scale})`,
          marginBottom: 8,
        }}
      >
        ITALIAN
      </div>
      <div
        style={{
          fontSize: 200,
          fontWeight: 900,
          color: "#ffcb05",
          letterSpacing: -2,
          textShadow: "8px 8px 0 #ff4d6d, 16px 16px 0 #2a0a3a",
          opacity: w2Op,
          transform: `scale(${w2Scale})`,
        }}
      >
        BRAINROT
      </div>
    </AbsoluteFill>
  );
};
