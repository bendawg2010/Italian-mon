import React from "react";

// Front-view MacBook. The lid "opens" by scaling its height from 0 → 1
// (origin = bottom edge), so it grows up from the keyboard base. This
// reads as "opening the laptop" without any 3D-transform headaches and
// renders identically across browsers and Remotion.
//
// `openness` is 0 (fully closed, no lid visible) → 1 (fully open).
type Props = {
  width: number;
  openness: number;        // 0..1
  screen: React.ReactNode;
};

export const MacBookFrame: React.FC<Props> = ({
  width,
  openness,
  screen,
}) => {
  // Apple-ish proportions: 14" MBP roughly 312×222mm screen ratio = 16:10
  const lidWidth = width;
  const lidHeight = width * 0.62;
  const baseHeight = width * 0.04;
  const screenInset = width * 0.025;

  // While opening, the screen content stays dark until ~70% open. Then
  // the game image quickly fades in (CRT power-on feel, but instant).
  const screenOpacity = openness > 0.7 ? Math.min(1, (openness - 0.7) / 0.2) : 0;

  return (
    <div
      style={{
        position: "relative",
        width: lidWidth,
        height: lidHeight + baseHeight + width * 0.06,
      }}
    >
      {/* Lid (grows up from the base) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: baseHeight,
          width: lidWidth,
          height: lidHeight,
          transformOrigin: "50% 100%",
          transform: `scaleY(${openness})`,
          background: "linear-gradient(180deg, #c8ccd1 0%, #9fa3a8 100%)",
          borderRadius: `${width * 0.018}px ${width * 0.018}px 0 0`,
          boxShadow: "inset 0 0 1px rgba(255,255,255,0.5)",
          // Slight perspective tilt feels more natural than a flat scale
          transformStyle: "preserve-3d",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.16,
            height: width * 0.012,
            background: "#0a0a0a",
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
          }}
        />
        {/* Screen viewport */}
        <div
          style={{
            position: "absolute",
            top: screenInset,
            left: screenInset,
            right: screenInset,
            bottom: screenInset,
            background: "#000",
            borderRadius: width * 0.008,
            overflow: "hidden",
          }}
        >
          {/* Counter the lid's scaleY so the screen content stays at
              correct aspect ratio while the lid grows */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scaleY(${1 / Math.max(0.001, openness)})`,
              transformOrigin: "50% 100%",
              opacity: screenOpacity,
            }}
          >
            {screen}
          </div>
        </div>
      </div>

      {/* Base (keyboard wedge, viewed from front-ish) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: lidWidth,
          height: baseHeight,
          background:
            "linear-gradient(180deg, #b8bcc1 0%, #88898d 60%, #6a6c70 100%)",
          borderRadius: `0 0 ${baseHeight * 0.4}px ${baseHeight * 0.4}px`,
          boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.2)",
        }}
      />
      {/* Trackpad hint (only visible when lid is meaningfully open) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: baseHeight * 0.4,
          transform: "translateX(-50%)",
          width: width * 0.18,
          height: baseHeight * 0.4,
          background: "rgba(0,0,0,0.08)",
          borderRadius: 4,
        }}
      />

      {/* Drop shadow under base, intensifies as lid opens */}
      <div
        style={{
          position: "absolute",
          left: width * 0.04,
          right: width * 0.04,
          bottom: -width * 0.025,
          height: width * 0.05,
          background: `radial-gradient(ellipse at center, rgba(0,0,0,${0.18 + openness * 0.25}) 0%, rgba(0,0,0,0) 70%)`,
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
};
