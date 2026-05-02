import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { LiveGame } from "../components/LiveGame";

const { fontFamily: inter } = loadInter("normal", { weights: ["700", "900"] });

// Fullscreen battle. The live game runs the actual fight. Big tag in the
// corner says "LIVE BATTLES · 10 TYPES · 2026 MOVES".
export const BattleHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // The corner tag slides in from the right side
  const tagSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 160 },
  });
  const tagX = interpolate(tagSpring, [0, 1], [400, 0]);
  const tagOp = interpolate(tagSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle shake for energy
  const wob = Math.sin(frame * 0.3) * 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: inter }}>
      {/* Live battle */}
      <AbsoluteFill style={{ transform: `translate(${wob}px, 0)` }}>
        <LiveGame scene="battle" settleMs={1800} />
      </AbsoluteFill>

      {/* Bottom-right callout tag */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: 60,
        }}
      >
        <div
          style={{
            opacity: tagOp,
            transform: `translateX(${tagX}px)`,
            background: "linear-gradient(135deg, #ffcb05 0%, #ff8a00 100%)",
            color: "#1a0a3a",
            padding: "18px 32px",
            borderRadius: 12,
            fontWeight: 900,
            fontSize: 30,
            letterSpacing: 1,
            boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
            transform: `translateX(${tagX}px) rotate(-2deg)`,
          }}
        >
          REAL TURN-BASED BATTLES
          <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.7, marginTop: 4, letterSpacing: 4 }}>
            10 TYPES · STAB · CRITS · STATUS
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
