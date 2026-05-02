import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { LiveGame } from "../components/LiveGame";

const { fontFamily: inter } = loadInter("normal", { weights: ["400", "700", "900"] });

// "Pick your starter" beat. Camera dollies INTO the laptop screen,
// occupying most of the frame, while a side caption fades in calling out
// "Three starters. Three vibes." Each starter is highlighted in turn.
export const StarterShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Camera push-in: scene starts pulled back, ends close
  const camScale = interpolate(frame, [0, durationInFrames], [1.0, 1.15], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Side caption fade-in/out
  const captionOp = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0d0d18 0%, #1a1a30 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: inter,
      }}
    >
      {/* big caption on the left edge */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#fff",
          opacity: captionOp,
          maxWidth: 380,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 100,
            letterSpacing: 6,
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Step 1
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.0,
            background: "linear-gradient(180deg, #ffffff 0%, #cccccc 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Pick your<br />starter.
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#ccc",
            marginTop: 18,
            lineHeight: 1.4,
          }}
        >
          Three Italian brainrots.<br />
          Three completely different vibes.
        </div>
      </div>

      {/* big game canvas on the right */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: "50%",
          transform: `translateY(-50%) scale(${camScale})`,
          width: 1180,
          height: 720,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <LiveGame scene="starter" settleMs={1500} />
      </div>
    </AbsoluteFill>
  );
};
