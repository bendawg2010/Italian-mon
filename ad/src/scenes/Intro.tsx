import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: inter } = loadInter("normal", { weights: ["100", "400", "700", "900"] });

// Apple-style intro: pure black, "BRAINROT MONSTERS" fades in centered,
// holds, then fades out. Subtitle "for Mac, iPhone, and iPad" tracks in
// underneath after the title settles.
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title: 0.4s fade-in, hold, 0.4s fade-out at end of scene
  const fadeIn = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const titleOpacity = fadeIn * fadeOut;

  // Subtle scale-up as it fades in (Apple keynote vibe)
  const titleScale = interpolate(frame, [10, 30], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtitle: appears slightly later, tracks letter-spacing in
  const subOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * fadeOut;
  const subTracking = interpolate(frame, [30, 60], [12, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
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
        color: "#fff",
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          letterSpacing: -3,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          background: "linear-gradient(180deg, #ffffff 0%, #cfcfcf 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Brainrot Monsters
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 100,
          letterSpacing: subTracking,
          color: "#888",
          marginTop: 24,
          opacity: subOpacity,
          textTransform: "uppercase",
        }}
      >
        for Mac · iPhone · iPad
      </div>
    </AbsoluteFill>
  );
};
