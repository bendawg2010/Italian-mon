import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: inter } = loadInter("normal", { weights: ["400", "700", "900"] });

// End card for Ad2. No devices, just bold call-to-action: title slams
// in, then "PLAY FREE — NO INSTALL" subheading, then the URL pill.
export const EndCard2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const titleScale = interpolate(titleSpring, [0, 1], [1.4, 1]);
  const titleOp = interpolate(titleSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subOp = interpolate(frame, [12, 24], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const urlSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16, stiffness: 200 },
  });
  const urlY = interpolate(urlSpring, [0, 1], [40, 0]);
  const urlOp = interpolate(urlSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulsing glow around URL
  const pulse = 0.5 + Math.sin(frame * 0.15) * 0.5;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #5b2d8c 0%, #0a0010 80%)",
        fontFamily: inter,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 160,
          fontWeight: 900,
          letterSpacing: -3,
          lineHeight: 0.95,
          textAlign: "center",
          opacity: titleOp,
          transform: `scale(${titleScale})`,
          background: "linear-gradient(180deg, #ffcb05 0%, #ff8a00 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 4px 30px rgba(255,138,0,0.4)",
        }}
      >
        BRAINROT<br />MONSTERS
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 8,
          color: "#cfe9ff",
          marginTop: 36,
          opacity: subOp,
        }}
      >
        PLAY FREE · NO INSTALL · 73 BRAINROTS
      </div>

      <div
        style={{
          marginTop: 56,
          padding: "20px 56px",
          background: "rgba(255,255,255,0.08)",
          border: "2px solid rgba(255,203,5,0.6)",
          borderRadius: 100,
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: "#fff",
          fontFamily: "monospace",
          opacity: urlOp,
          transform: `translateY(${urlY}px)`,
          boxShadow: `0 0 ${30 * pulse}px rgba(255,203,5,${0.4 * pulse})`,
        }}
      >
        brainrot-monsters.pages.dev
      </div>
    </AbsoluteFill>
  );
};
