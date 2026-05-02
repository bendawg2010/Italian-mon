import {
  AbsoluteFill,
  interpolate,
  Easing,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { IPhoneFrame } from "../components/IPhoneFrame";
import { LiveGame } from "../components/LiveGame";

const { fontFamily: inter } = loadInter("normal", { weights: ["100", "400", "900"] });

// "Now play it on your phone" beat. iPhone slides in from the right with
// the overworld scene, then the inner game cuts to a battle. Caption
// "Take it anywhere." appears on the left.
export const IPhoneBattle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phone slides in from right
  const slideIn = interpolate(frame, [0, 24], [600, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // Subtle hover-up after settling
  const hover = Math.sin(frame * 0.07) * 6;

  // Caption fades in
  const captionOp = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Inside the phone: show overworld throughout
  const showBattle = false;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a30 0%, #0d0625 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: inter,
      }}
    >
      {/* Caption on the left */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#fff",
          opacity: captionOp,
          maxWidth: 480,
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
          Step 2
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.0,
            background: "linear-gradient(180deg, #ffffff 0%, #aaaaaa 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Take it<br />anywhere.
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "#ccc",
            marginTop: 20,
            lineHeight: 1.4,
          }}
        >
          73 brainrot creatures. 11 maps.<br />
          One pocket.
        </div>
      </div>

      {/* iPhone */}
      <div
        style={{
          position: "absolute",
          right: 280,
          top: "50%",
          transform: `translateY(calc(-50% + ${hover}px)) translateX(${slideIn}px) rotate(-6deg)`,
          filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.6))",
        }}
      >
        <IPhoneFrame
          width={420}
          screen={<LiveGame scene={showBattle ? "battle" : "overworld"} />}
        />
      </div>
    </AbsoluteFill>
  );
};
