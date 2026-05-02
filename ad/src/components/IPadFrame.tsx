import React from "react";

// iPad Pro-ish frame: silver bezel, rounded corners, 4:3 aspect.
type Props = {
  width: number;
  screen: React.ReactNode;
};

export const IPadFrame: React.FC<Props> = ({ width, screen }) => {
  const height = width * 1.33; // 4:3
  const cornerRadius = width * 0.05;
  const bezel = width * 0.03;

  return (
    <div style={{ position: "relative", width, height }}>
      {/* drop shadow */}
      <div
        style={{
          position: "absolute",
          left: width * 0.1,
          right: width * 0.1,
          bottom: -width * 0.04,
          height: width * 0.06,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)",
          borderRadius: "50%",
          filter: "blur(10px)",
        }}
      />
      {/* aluminum frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #d8dade 0%, #a8acb0 50%, #c0c4c8 100%)",
          borderRadius: cornerRadius,
          boxShadow:
            "inset 0 0 1px rgba(255,255,255,0.5), inset 0 0 0 1px rgba(0,0,0,0.2)",
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
          borderRadius: cornerRadius - bezel * 0.4,
          overflow: "hidden",
        }}
      >
        {screen}
      </div>
      {/* front camera dot */}
      <div
        style={{
          position: "absolute",
          top: bezel * 0.5,
          left: "50%",
          transform: "translateX(-50%)",
          width: 6,
          height: 6,
          background: "#222",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};
