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

// "Walk into tall grass." Live game overworld fills the frame, big text
// reads "WILD MEMES IN THE TALL GRASS" — then we punch white on the cut.
export const Encounter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slight camera zoom into the game — feels like the world is breathing
  const camScale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Big text drops in
  const textSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, stiffness: 180 },
  });
  const textY = interpolate(textSpring, [0, 1], [-60, 0]);
  const textOp = interpolate(textSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pre-cut white flash so the next scene "punches in"
  const flash = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames - 1],
    [0, 0.9],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        fontFamily: inter,
      }}
    >
      {/* Live overworld scene fills the screen */}
      <AbsoluteFill
        style={{
          transform: `scale(${camScale})`,
          transformOrigin: "center center",
        }}
      >
        <LiveGame scene="overworld" settleMs={400} />
      </AbsoluteFill>

      {/* Heavy bottom-aligned text */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            opacity: textOp,
            transform: `translateY(${textY}px)`,
            background: "rgba(0,0,0,0.78)",
            border: "4px solid #ffcb05",
            color: "#fff",
            padding: "22px 60px",
            borderRadius: 14,
            textAlign: "center",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#ffcb05",
              letterSpacing: 6,
              marginBottom: 6,
            }}
          >
            STEP INTO THE
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            TALL GRASS
          </div>
        </div>
      </AbsoluteFill>

      {/* white pre-cut flash */}
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};
