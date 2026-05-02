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

const { fontFamily: inter } = loadInter("normal", { weights: ["400", "700", "900"] });

// Big number slot-machine roll: 0 → 73 BRAINROTS. Live game starter
// screen plays semi-transparently behind so the count feels backed by
// actual content.
export const SpeciesCount: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Counter eases out from 0 → 73 over the first ~1.5s, then holds.
  const countProg = interpolate(frame, [4, fps * 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const count = Math.floor(countProg * 73);

  // Number itself slightly bounces every time it ticks (cheap chunk feel)
  const bounce = (count > 0 && count !== 73) ? Math.abs(Math.sin(frame * 0.8)) * 4 : 0;

  // Label fades in as count finishes
  const labelOp = interpolate(frame, [fps * 1.2, fps * 1.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0625", fontFamily: inter }}>
      {/* Faded game backdrop */}
      <AbsoluteFill style={{ opacity: 0.35, filter: "blur(2px) saturate(140%)" }}>
        <LiveGame scene="starter" settleMs={1200} />
      </AbsoluteFill>
      {/* Color wash */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,61,255,0.45) 0%, rgba(13,6,37,0.85) 70%)",
        }}
      />

      {/* Big counter */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: 360,
            fontWeight: 900,
            lineHeight: 1,
            color: "#ffcb05",
            textShadow: "8px 8px 0 #ff4d6d, 16px 16px 0 #2a0a3a",
            transform: `translateY(${-bounce}px)`,
            letterSpacing: -8,
          }}
        >
          {count}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: 6,
            marginTop: 20,
            opacity: labelOp,
            background: "linear-gradient(180deg, #fff 0%, #aaa 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BRAINROTS · TO · CATCH
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: 4,
            color: "#cfe9ff",
            marginTop: 18,
            opacity: labelOp,
          }}
        >
          INCLUDING 4 LEGENDARIES
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
