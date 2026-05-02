import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { MonSprite } from "../components/MonSprite";
import { MacBookFrame } from "../components/MacBookFrame";
import { IPhoneFrame } from "../components/IPhoneFrame";
import { IPadFrame } from "../components/IPadFrame";
import { LiveGame } from "../components/LiveGame";

const { fontFamily: inter } = loadInter("normal", { weights: ["100", "400", "700", "900"] });

// Apple end-card. Three device silhouettes line up at the bottom, big
// brand text, URL, "Available now". The three starter mons drift gently
// across the upper half as a hero shot.
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const monsRise = interpolate(frame, [0, 30], [40, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 35%, #2a0a3a 0%, #0a0010 80%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: inter,
        color: "#fff",
        opacity: fadeIn,
      }}
    >
      {/* Three actual devices side-by-side, all running the live game */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 60,
          marginBottom: 50,
          transform: `translateY(${monsRise}px)`,
        }}
      >
        <IPhoneFrame width={170} screen={<LiveGame scene="title" />} />
        <MacBookFrame width={520} openness={1} screen={<LiveGame scene="starter" />} />
        <IPadFrame width={280} screen={<LiveGame scene="title" />} />
      </div>

      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: -2,
          lineHeight: 1,
          background: "linear-gradient(180deg, #ffcb05 0%, #ff8a00 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 16px rgba(255,138,0,0.3)",
        }}
      >
        Brainrot Monsters
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 100,
          letterSpacing: 8,
          color: "#bbb",
          marginTop: 18,
          textTransform: "uppercase",
        }}
      >
        Available now
      </div>

      <div
        style={{
          marginTop: 40,
          padding: "16px 40px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 100,
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: 0.5,
          color: "#fff",
          fontFamily: "monospace",
        }}
      >
        brainrot-monsters.pages.dev
      </div>

      {/* Device line-up icons */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          gap: 50,
          color: "#777",
          fontSize: 18,
          fontWeight: 400,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span>Mac</span>
        <span style={{ color: "#444" }}>·</span>
        <span>iPhone</span>
        <span style={{ color: "#444" }}>·</span>
        <span>iPad</span>
      </div>
    </AbsoluteFill>
  );
};
