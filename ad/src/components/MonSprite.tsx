import { useCurrentFrame } from "remotion";

// Recreates the game's three starter mon sprites in pixel-art style,
// scaled to whatever `size` prop is passed. Uses the same color palette
// and proportions as js/sprites.js so the ad's visuals feel like the
// actual game, not an unrelated mockup.
//
// We render via SVG so the pixel-art stays crisp at any output size
// (1080p hero shots in the ad would otherwise upscale a tiny canvas).
type MonId = "TRALALERO" | "BOMBARDINO" | "TUNGTUNG" | "GLORBO" | "OHIO";

export const MonSprite: React.FC<{ id: MonId; size: number }> = ({
  id,
  size,
}) => {
  const frame = useCurrentFrame();
  const t = frame * 16; // matches the game's 60fps≈16ms tick

  const bob = Math.sin(t * 0.005) * (size * 0.012);

  // Each starter renders as a simple shape collage — same vibe as the
  // procedural js/sprites.js. SVG viewBox is 0..1 so we only deal with
  // proportions; rendering scales it via the wrapper's width/height.
  return (
    <svg
      viewBox="0 0 1 1"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* shadow under feet */}
      <ellipse cx={0.5} cy={0.96} rx={0.42} ry={0.025} fill="rgba(0,0,0,0.25)" />

      {id === "TRALALERO" && <Tralalero bob={bob} t={t} />}
      {id === "BOMBARDINO" && <Bombardino bob={bob} t={t} />}
      {id === "TUNGTUNG" && <Tungtung bob={bob} t={t} />}
      {id === "GLORBO" && <Glorbo bob={bob} t={t} />}
      {id === "OHIO" && <Ohio bob={bob} t={t} />}
    </svg>
  );
};

// ----- Tralalero: three-legged shark in Nikes -----
const Tralalero: React.FC<{ bob: number; t: number }> = ({ bob, t }) => {
  const tw = Math.sin(t * 0.012) * 0.04;
  const stride = Math.sin(t * 0.008);
  return (
    <g transform={`translate(0, ${bob})`}>
      {/* shark body */}
      <rect x={0.10} y={0.36} width={0.70} height={0.28} fill="#3da9ff" />
      <rect x={0.05} y={0.42} width={0.10} height={0.16} fill="#3da9ff" />
      <rect x={0.78} y={0.40} width={0.06} height={0.20} fill="#3da9ff" />
      {/* dorsal fin */}
      <rect x={0.34} y={0.22} width={0.16} height={0.16} fill="#3da9ff" />
      <rect x={0.40} y={0.16} width={0.08} height={0.08} fill="#3da9ff" />
      {/* tail */}
      <rect x={0.83} y={0.30 - tw} width={0.06} height={0.18} fill="#3da9ff" />
      <rect x={0.83} y={0.50 + tw} width={0.06} height={0.18} fill="#3da9ff" />
      <rect x={0.88} y={0.36} width={0.06} height={0.26} fill="#3da9ff" />
      {/* belly */}
      <rect x={0.18} y={0.54} width={0.56} height={0.10} fill="#ffffff" />
      {/* gills */}
      <rect x={0.20} y={0.42} width={0.02} height={0.08} fill="#1a4a7a" />
      <rect x={0.24} y={0.42} width={0.02} height={0.08} fill="#1a4a7a" />
      <rect x={0.28} y={0.42} width={0.02} height={0.08} fill="#1a4a7a" />
      {/* eye */}
      <rect x={0.14} y={0.40} width={0.07} height={0.07} fill="#fff" />
      <rect x={0.16} y={0.42} width={0.04} height={0.04} fill="#000" />
      {/* tooth row */}
      <rect x={0.05} y={0.52} width={0.14} height={0.03} fill="#000" />
      <rect x={0.06} y={0.50} width={0.02} height={0.02} fill="#fff" />
      <rect x={0.10} y={0.50} width={0.02} height={0.02} fill="#fff" />
      <rect x={0.13} y={0.50} width={0.02} height={0.02} fill="#fff" />
      {/* three nike legs */}
      {[0, 1, 2].map((i) => {
        const lx = 0.28 + i * 0.18;
        const sh = stride * 0.01 * (i === 1 ? -1 : 1);
        return (
          <g key={i}>
            <rect x={lx + 0.04} y={0.64} width={0.06} height={0.16} fill="#f5d59a" />
            <rect x={lx - 0.01 + sh} y={0.82} width={0.18} height={0.05} fill="#fff" />
            <rect x={lx + 0.01 + sh} y={0.78} width={0.16} height={0.05} fill="#ff6b3d" />
            <rect x={lx + 0.06 + sh} y={0.79} width={0.06} height={0.015} fill="#fff" />
          </g>
        );
      })}
    </g>
  );
};

// ----- Bombardino: crocodile-bomber -----
const Bombardino: React.FC<{ bob: number; t: number }> = ({ bob, t }) => {
  const propSpin = Math.floor(t * 0.05) % 2 === 0;
  return (
    <g transform={`translate(0, ${bob})`}>
      {/* wings */}
      <rect x={0.00} y={0.46} width={0.22} height={0.10} fill="#5a3a2a" />
      <rect x={0.78} y={0.46} width={0.22} height={0.10} fill="#5a3a2a" />
      <rect x={0.00} y={0.50} width={0.06} height={0.06} fill="#7a5a3a" />
      <rect x={0.94} y={0.50} width={0.06} height={0.06} fill="#7a5a3a" />
      {/* engine pods */}
      <rect x={0.04} y={0.42} width={0.06} height={0.06} fill="#444" />
      <rect x={0.84} y={0.42} width={0.06} height={0.06} fill="#444" />
      {/* propellers */}
      {propSpin ? (
        <>
          <rect x={0.04} y={0.44} width={0.12} height={0.02} fill="#aaa" />
          <rect x={0.84} y={0.44} width={0.12} height={0.02} fill="#aaa" />
        </>
      ) : (
        <>
          <rect x={0.06} y={0.40} width={0.02} height={0.10} fill="#aaa" />
          <rect x={0.86} y={0.40} width={0.02} height={0.10} fill="#aaa" />
        </>
      )}
      {/* fuselage */}
      <rect x={0.22} y={0.32} width={0.56} height={0.34} fill="#5a3a2a" />
      <rect x={0.20} y={0.40} width={0.60} height={0.18} fill="#7a5a3a" />
      {/* crocodile snout */}
      <rect x={0.78} y={0.42} width={0.18} height={0.14} fill="#5a3a2a" />
      <rect x={0.94} y={0.46} width={0.04} height={0.06} fill="#5a3a2a" />
      {/* teeth */}
      <rect x={0.80} y={0.50} width={0.16} height={0.02} fill="#000" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={0.81 + i * 0.04} y={0.49} width={0.02} height={0.02} fill="#fff" />
      ))}
      {/* reptile eye */}
      <rect x={0.70} y={0.36} width={0.06} height={0.06} fill="#fff" />
      <rect x={0.71} y={0.37} width={0.04} height={0.04} fill="#ffe070" />
      <rect x={0.73} y={0.37} width={0.01} height={0.04} fill="#000" />
      {/* cockpit canopy */}
      <rect x={0.40} y={0.24} width={0.20} height={0.10} fill="#7ad0ff" />
      <rect x={0.42} y={0.26} width={0.04} height={0.04} fill="#fff" />
      {/* tail fin */}
      <rect x={0.18} y={0.20} width={0.06} height={0.18} fill="#5a3a2a" />
      {/* hanging bombs */}
      <rect x={0.32} y={0.66} width={0.06} height={0.10} fill="#3a2218" />
      <rect x={0.62} y={0.66} width={0.06} height={0.10} fill="#3a2218" />
      <rect x={0.32} y={0.66} width={0.06} height={0.02} fill="#fff" />
      <rect x={0.62} y={0.66} width={0.06} height={0.02} fill="#fff" />
      {/* landing gear */}
      <rect x={0.30} y={0.74} width={0.08} height={0.04} fill="#222" />
      <rect x={0.62} y={0.74} width={0.08} height={0.04} fill="#222" />
    </g>
  );
};

// ----- Tung Sahur: wooden drum creature -----
const Tungtung: React.FC<{ bob: number; t: number }> = ({ bob, t }) => {
  const swing = Math.sin(t * 0.006) * 0.05;
  return (
    <g transform={`translate(0, ${bob})`}>
      {/* drum body */}
      <rect x={0.26} y={0.22} width={0.46} height={0.56} fill="#7a5230" />
      <rect x={0.24} y={0.26} width={0.50} height={0.04} fill="#5a3818" />
      <rect x={0.24} y={0.70} width={0.50} height={0.04} fill="#5a3818" />
      {/* wood grain */}
      {[0.30, 0.40, 0.58, 0.66].map((x) => (
        <rect key={x} x={x} y={0.36} width={0.02} height={0.30} fill="#5a3818" />
      ))}
      {/* head */}
      <rect x={0.32} y={0.10} width={0.36} height={0.18} fill="#7a5230" />
      <rect x={0.30} y={0.14} width={0.40} height={0.10} fill="#7a5230" />
      {/* googly eyes */}
      <rect x={0.36} y={0.13} width={0.12} height={0.10} fill="#fff" />
      <rect x={0.52} y={0.13} width={0.12} height={0.10} fill="#fff" />
      <rect x={0.40} y={0.16} width={0.04} height={0.04} fill="#000" />
      <rect x={0.56} y={0.16} width={0.04} height={0.04} fill="#000" />
      {/* mouth */}
      <rect x={0.44} y={0.22} width={0.12} height={0.04} fill="#000" />
      <rect x={0.46} y={0.23} width={0.08} height={0.02} fill="#a04020" />
      {/* drumstick + bat (swinging) */}
      <rect x={0.72 + swing} y={0.34} width={0.06} height={0.20} fill="#7a5230" />
      <rect x={0.72 + swing} y={0.18} width={0.10} height={0.20} fill="#7a5230" />
      <rect x={0.74 + swing} y={0.06} width={0.06} height={0.16} fill="#7a5230" />
      {/* other arm */}
      <rect x={0.20} y={0.40} width={0.06} height={0.18} fill="#7a5230" />
      {/* legs */}
      <rect x={0.34} y={0.78} width={0.10} height={0.14} fill="#3a2818" />
      <rect x={0.56} y={0.78} width={0.10} height={0.14} fill="#3a2818" />
      <rect x={0.32} y={0.90} width={0.14} height={0.04} fill="#000" />
      <rect x={0.54} y={0.90} width={0.14} height={0.04} fill="#000" />
    </g>
  );
};

// ----- Glorbo: glowing translucent blob (purple glow) -----
const Glorbo: React.FC<{ bob: number; t: number }> = ({ bob, t }) => {
  const pulse = 0.5 + Math.sin(t * 0.004) * 0.5;
  return (
    <g transform={`translate(0, ${bob})`}>
      <ellipse cx={0.5} cy={0.5} rx={0.5} ry={0.4} fill={`rgba(201,61,255,${0.1 * pulse})`} />
      <ellipse cx={0.5} cy={0.5} rx={0.4} ry={0.32} fill={`rgba(255,138,255,${0.18 * pulse})`} />
      <ellipse cx={0.5} cy={0.5} rx={0.32} ry={0.26} fill="#c93dff" />
      <ellipse cx={0.42} cy={0.45} rx={0.12} ry={0.08} fill="#ff8aff" />
      <rect x={0.42} y={0.46} width={0.16} height={0.10} fill="#fff" />
      <rect x={0.46} y={0.48} width={0.08} height={0.06} fill="#000" />
    </g>
  );
};

// ----- Ohio: chaos gremlin -----
const Ohio: React.FC<{ bob: number; t: number }> = ({ bob, t }) => {
  const wob = Math.sin(t * 0.012) * 0.02;
  return (
    <g transform={`translate(0, ${bob})`}>
      <rect x={0.20 + wob} y={0.40} width={0.60} height={0.30} fill="#c93dff" />
      <rect x={0.16 - wob} y={0.46} width={0.20} height={0.20} fill="#c93dff" />
      <rect x={0.64 + wob} y={0.46} width={0.20} height={0.20} fill="#c93dff" />
      <rect x={0.28} y={0.50} width={0.16} height={0.02} fill="#ff3d9b" />
      <rect x={0.56} y={0.56} width={0.20} height={0.02} fill="#ffd700" />
      <rect x={0.28} y={0.42} width={0.16} height={0.10} fill="#ffd700" />
      <rect x={0.30} y={0.44} width={0.10} height={0.06} fill="#000" />
      <rect x={0.32} y={0.62} width={0.36} height={0.04} fill="#000" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={0.34 + i * 0.06} y={0.60} width={0.02} height={0.02} fill="#fff" />
      ))}
    </g>
  );
};
