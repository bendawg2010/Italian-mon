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

// Stat callouts stack onto the screen one at a time. Each row has a
// number on the left, a label on the right, separated by a heavy bar.
const STATS: Array<{ n: string; label: string; sub?: string }> = [
  { n: "73", label: "BRAINROTS", sub: "+ 4 LEGENDARIES" },
  { n: "11", label: "MAPS", sub: "PALLET → VERMILION" },
  { n: "5",  label: "GYM LEADERS", sub: "+ ESPRESSO FOUR" },
  { n: "1",  label: "BRAINROT QUEEN", sub: "TO DETHRONE" },
];

export const StatsStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Each row pops in 0.4s after the previous
  const rowFrame = (i: number) => frame - i * 18;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #2a0a3a 0%, #050010 80%)",
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
          fontSize: 22,
          fontWeight: 100,
          letterSpacing: 8,
          color: "#888",
          textTransform: "uppercase",
          marginBottom: 30,
        }}
      >
        — Inside —
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "min(900px, 80vw)" }}>
        {STATS.map((s, i) => {
          const sp = spring({
            frame: rowFrame(i),
            fps,
            config: { damping: 14, stiffness: 180 },
          });
          const x = interpolate(sp, [0, 1], [-80, 0]);
          const op = interpolate(sp, [0, 0.4], [0, 1], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                opacity: op,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 140,
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: -4,
                  width: 220,
                  textAlign: "right",
                  color: "#ffcb05",
                  textShadow: "5px 5px 0 #ff4d6d",
                }}
              >
                {s.n}
              </div>
              <div
                style={{ width: 4, height: 100, background: "linear-gradient(180deg, #ffcb05, #ff4d6d)" }}
              />
              <div>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    letterSpacing: 2,
                    lineHeight: 1,
                  }}
                >
                  {s.label}
                </div>
                {s.sub && (
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: 4,
                      color: "#888",
                      marginTop: 6,
                    }}
                  >
                    {s.sub}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
