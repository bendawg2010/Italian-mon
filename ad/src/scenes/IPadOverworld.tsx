import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { IPadFrame } from "../components/IPadFrame";
import { LiveGame } from "../components/LiveGame";

const { fontFamily: inter } = loadInter("normal", { weights: ["100", "400", "900"] });

// "Catch them all on a bigger canvas." iPad slides up from below with the
// catch animation playing inside.
export const IPadOverworld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const slideUp = interpolate(frame, [0, 22], [400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const captionOp = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0d0625 0%, #1a0a3a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: inter,
      }}
    >
      {/* Caption */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "30%",
          color: "#fff",
          opacity: captionOp,
          maxWidth: 460,
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
          Step 3
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
          Catch every<br />brainrot.
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
          Italian classics. 2026 memes.<br />
          Two legendaries hiding in deep grass.
        </div>
      </div>

      {/* iPad */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: `translateY(calc(-50% + ${slideUp}px)) rotate(4deg)`,
          filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
        }}
      >
        <IPadFrame width={680} screen={<LiveGame scene="battle" settleMs={1500} />} />
      </div>
    </AbsoluteFill>
  );
};
