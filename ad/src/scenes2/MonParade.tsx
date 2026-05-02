import {
  AbsoluteFill,
  interpolate,
  Easing,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { LiveGame } from "../components/LiveGame";

const { fontFamily: inter } = loadInter("normal", { weights: ["400", "700", "900"] });

// 4 mons paraded with name + flavor. The live game's ?scene=starter
// already cycles starters every 1.5s, so we just punctuate it with
// caption cards that swap in time. We also drop in two extra non-
// starter species via small device-frame insets to imply variety.
const PARADE = [
  { name: "Tralalero",  type: "WATER · BEAST",     flavor: "3-legged shark in Nikes" },
  { name: "Bombardino", type: "FIRE · AIR",        flavor: "Crocodile-bomber w/ espresso bombs" },
  { name: "Tung Sahur", type: "BEAST · BRAINROT",  flavor: "Wooden drum that won't shut up" },
  { name: "Glorbnoxion",type: "BRAINROT · CHAOS",  flavor: "It's 2026. Don't think about it" },
];

export const MonParade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Each card holds for ~1s
  const slot = Math.min(PARADE.length - 1, Math.floor(frame / fps));
  const inSlot = frame - slot * fps;
  const slotProg = inSlot / fps;

  // Card swoop-in
  const cardSpring = spring({
    frame: inSlot,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const cardX = interpolate(cardSpring, [0, 1], [-300, 0]);
  const cardOp = interpolate(cardSpring, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Side gradient sweep
  const sweepX = interpolate(slotProg, [0, 1], [-100, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0d18", fontFamily: inter }}>
      {/* Live game cycling starters in the background */}
      <AbsoluteFill style={{ opacity: 0.95 }}>
        <LiveGame scene="starter" settleMs={400} />
      </AbsoluteFill>

      {/* Color sweep across the bottom for movement */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${90 + sweepX}deg, rgba(201,61,255,0.15) 0%, rgba(255,203,5,0.15) 50%, rgba(255,77,109,0.15) 100%)`,
          mixBlendMode: "screen" as any,
        }}
      />

      {/* Big nameplate that swaps for each slot */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px 0 80px 80px",
          color: "#fff",
        }}
      >
        <div
          style={{
            opacity: cardOp,
            transform: `translateX(${cardX}px)`,
            background: "rgba(0,0,0,0.78)",
            padding: "26px 44px",
            borderRadius: 16,
            border: "3px solid #ffcb05",
            maxWidth: 720,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#ffcb05",
              marginBottom: 4,
            }}
          >
            #{String(slot + 1).padStart(2, "0")} OF 73
          </div>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.0, letterSpacing: -2 }}>
            {PARADE[slot].name}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#cfe9ff",
              letterSpacing: 4,
              marginTop: 8,
            }}
          >
            {PARADE[slot].type}
          </div>
          <div style={{ fontSize: 22, color: "#ddd", marginTop: 10, fontStyle: "italic" }}>
            "{PARADE[slot].flavor}"
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
