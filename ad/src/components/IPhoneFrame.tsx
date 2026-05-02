import React from "react";

// iPhone 15 Pro-ish frame: titanium-gray bezel, dynamic island, rounded
// rectangle screen viewport, very subtle drop shadow underneath.
type Props = {
  width: number;          // overall device width in px
  screen: React.ReactNode;
};

export const IPhoneFrame: React.FC<Props> = ({ width, screen }) => {
  // Aspect roughly 19.5:9, so height = width * 2.16
  const height = width * 2.16;
  const cornerRadius = width * 0.16;
  const bezel = width * 0.025;
  const islandWidth = width * 0.32;
  const islandHeight = width * 0.06;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
      }}
    >
      {/* drop shadow */}
      <div
        style={{
          position: "absolute",
          left: width * 0.08,
          right: width * 0.08,
          bottom: -width * 0.04,
          height: width * 0.06,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)",
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      />
      {/* titanium frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #5a5a60 0%, #2a2a30 50%, #4a4a50 100%)",
          borderRadius: cornerRadius,
          boxShadow:
            "inset 0 0 1px rgba(255,255,255,0.15), inset 0 0 0 1px rgba(0,0,0,0.4)",
        }}
      />
      {/* screen */}
      <div
        style={{
          position: "absolute",
          top: bezel,
          left: bezel,
          right: bezel,
          bottom: bezel,
          background: "#000",
          borderRadius: cornerRadius - bezel,
          overflow: "hidden",
        }}
      >
        {screen}
      </div>
      {/* dynamic island */}
      <div
        style={{
          position: "absolute",
          top: width * 0.06,
          left: "50%",
          transform: "translateX(-50%)",
          width: islandWidth,
          height: islandHeight,
          background: "#000",
          borderRadius: islandHeight / 2,
          zIndex: 5,
        }}
      />
    </div>
  );
};
