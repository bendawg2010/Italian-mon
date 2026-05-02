import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { MacBookFrame } from "../components/MacBookFrame";
import { LiveGame } from "../components/LiveGame";

// MacBook is closed at start, hinge animates open over ~2.5s using a spring
// for natural physical motion. The screen powers on (black → game) when the
// lid passes ~70°. Camera is a static medium shot, lit cleanly on a soft
// gray background — Apple product-page aesthetic.
export const LaptopOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hinge: 0 → 1 (closed → fully open). Spring gives a soft settle.
  const hingeSpring = spring({
    frame: frame - 6,                  // small initial pause
    fps,
    config: { damping: 18, stiffness: 80, mass: 1.4 },
  });
  const openness = Math.max(0, Math.min(1, hingeSpring));

  // A faint zoom-in over the whole scene (Apple ad camera move)
  const camScale = interpolate(frame, [0, fps * 4], [0.95, 1.04], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #f6f6f7 0%, #e2e3e6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: `scale(${camScale})` }}>
        <MacBookFrame
          width={1200}
          openness={openness}
          screen={<LiveGame scene="title" />}
        />
      </div>
    </AbsoluteFill>
  );
};
