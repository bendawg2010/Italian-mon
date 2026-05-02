// =====================================================
// Procedural pixel-art sprites for memes & overworld
// =====================================================

const SpriteRenderer = (() => {

  // Draw a filled rounded shape made of pixel cells
  function px(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function shadow(ctx, cx, cy, rx, ry) {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Generic monster body builder, parameterized by species color1/2/3 and shape kind
  // Each species gets a stable shape based on its id hash
  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  // Specialized sprite functions per species
  const SPECIAL = {
    TRALALERO(ctx, sp, x, y, s, t) {
      // Shark body with three legs and Nikes
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // body
      px(ctx, x+s*0.15, y+s*0.30+bob, s*0.7, s*0.4, sp.color1);
      // belly
      px(ctx, x+s*0.20, y+s*0.50+bob, s*0.6, s*0.20, sp.color2);
      // tail
      px(ctx, x+s*0.05, y+s*0.30+bob, s*0.10, s*0.30, sp.color1);
      px(ctx, x+s*0.00, y+s*0.20+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.00, y+s*0.55+bob, s*0.10, s*0.15, sp.color1);
      // eye
      px(ctx, x+s*0.70, y+s*0.36+bob, s*0.10, s*0.10, "#fff");
      px(ctx, x+s*0.74, y+s*0.40+bob, s*0.05, s*0.05, "#000");
      // mouth (sharp)
      px(ctx, x+s*0.80, y+s*0.50+bob, s*0.10, s*0.04, "#000");
      px(ctx, x+s*0.82, y+s*0.46+bob, s*0.02, s*0.04, "#fff");
      px(ctx, x+s*0.85, y+s*0.46+bob, s*0.02, s*0.04, "#fff");
      // nikes (3 shoes)
      for (let i = 0; i < 3; i++) {
        const lx = x+s*(0.25 + i*0.20);
        px(ctx, lx, y+s*0.70+bob, s*0.10, s*0.10, "#000");
        px(ctx, lx-s*0.02, y+s*0.78+bob, s*0.16, s*0.06, sp.color3);
        px(ctx, lx+s*0.02, y+s*0.74+bob, s*0.06, s*0.02, "#fff"); // swoosh
      }
    },
    TRALALERONE(ctx, sp, x, y, s, t) {
      SPECIAL.TRALALERO(ctx, sp, x, y, s, t);
      // spikes
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.20+i*0.15), y+s*0.25, s*0.05, s*0.10, sp.color3);
      }
    },
    BOMBARDINO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1.5;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // wings
      px(ctx, x+s*0.05, y+s*0.40+bob, s*0.20, s*0.10, sp.color2);
      px(ctx, x+s*0.75, y+s*0.40+bob, s*0.20, s*0.10, sp.color2);
      // body croc
      px(ctx, x+s*0.20, y+s*0.30+bob, s*0.60, s*0.35, sp.color1);
      // belly
      px(ctx, x+s*0.25, y+s*0.50+bob, s*0.50, s*0.15, sp.color2);
      // teeth on snout
      px(ctx, x+s*0.78, y+s*0.42+bob, s*0.15, s*0.10, sp.color1);
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.80+i*0.03), y+s*0.50+bob, s*0.02, s*0.03, "#fff");
      }
      // eye
      px(ctx, x+s*0.66, y+s*0.36+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.68, y+s*0.38+bob, s*0.03, s*0.03, "#000");
      // bombs underneath
      px(ctx, x+s*0.30, y+s*0.70+bob, s*0.10, s*0.10, "#222");
      px(ctx, x+s*0.55, y+s*0.70+bob, s*0.10, s*0.10, "#222");
      // propeller
      px(ctx, x+s*0.38, y+s*0.20+bob, s*0.24, s*0.04, "#888");
    },
    BOMBARDIRO(ctx, sp, x, y, s, t) {
      SPECIAL.BOMBARDINO(ctx, sp, x, y, s, t);
      // moustache
      px(ctx, x+s*0.74, y+s*0.45, s*0.10, s*0.04, "#000");
      // extra bomb
      px(ctx, x+s*0.42, y+s*0.72, s*0.16, s*0.10, "#222");
    },
    TUNGTUNG(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
      // wooden cylindrical body
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.55, sp.color1);
      // wood lines
      px(ctx, x+s*0.32, y+s*0.30+bob, s*0.36, s*0.02, sp.color2);
      px(ctx, x+s*0.32, y+s*0.50+bob, s*0.36, s*0.02, sp.color2);
      // angry eyes
      px(ctx, x+s*0.36, y+s*0.32+bob, s*0.10, s*0.06, "#fff");
      px(ctx, x+s*0.54, y+s*0.32+bob, s*0.10, s*0.06, "#fff");
      px(ctx, x+s*0.40, y+s*0.34+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.58, y+s*0.34+bob, s*0.04, s*0.04, "#000");
      // mouth
      px(ctx, x+s*0.40, y+s*0.50+bob, s*0.20, s*0.04, "#000");
      // bat in hand
      px(ctx, x+s*0.72, y+s*0.20+bob, s*0.05, s*0.30, sp.color1);
      px(ctx, x+s*0.70, y+s*0.10+bob, s*0.10, s*0.15, sp.color1);
      // legs
      px(ctx, x+s*0.34, y+s*0.75+bob, s*0.08, s*0.10, sp.color2);
      px(ctx, x+s*0.58, y+s*0.75+bob, s*0.08, s*0.10, sp.color2);
    },
    TUNGTUNGTUNG(ctx, sp, x, y, s, t) {
      SPECIAL.TUNGTUNG(ctx, sp, x, y, s, t);
      // extra bats
      px(ctx, x+s*0.20, y+s*0.30, s*0.05, s*0.30, sp.color1);
      px(ctx, x+s*0.18, y+s*0.20, s*0.10, s*0.15, sp.color1);
      // glowing eyes
      px(ctx, x+s*0.40, y+s*0.34, s*0.04, s*0.04, sp.color3);
      px(ctx, x+s*0.58, y+s*0.34, s*0.04, s*0.04, sp.color3);
    },
    LIRILI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
      // cactus body
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.55, sp.color1);
      // arms
      px(ctx, x+s*0.15, y+s*0.35+bob, s*0.15, s*0.10, sp.color1);
      px(ctx, x+s*0.70, y+s*0.35+bob, s*0.15, s*0.10, sp.color1);
      // spikes
      for (let i = 0; i < 6; i++) {
        const sx = x+s*(0.32+i*0.06);
        px(ctx, sx, y+s*0.18+bob, s*0.02, s*0.04, "#fff");
      }
      // elephant trunk
      px(ctx, x+s*0.45, y+s*0.55+bob, s*0.10, s*0.20, sp.color1);
      // eyes
      px(ctx, x+s*0.36, y+s*0.34+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.56, y+s*0.34+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.40, y+s*0.36+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.60, y+s*0.36+bob, s*0.04, s*0.04, "#000");
      // sandals
      px(ctx, x+s*0.32, y+s*0.80+bob, s*0.14, s*0.05, sp.color2);
      px(ctx, x+s*0.54, y+s*0.80+bob, s*0.14, s*0.05, sp.color2);
    },
    GUSINI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.006) * 2;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // jet body
      px(ctx, x+s*0.10, y+s*0.40+bob, s*0.80, s*0.20, sp.color1);
      // wings
      px(ctx, x+s*0.30, y+s*0.32+bob, s*0.40, s*0.06, sp.color3);
      px(ctx, x+s*0.30, y+s*0.62+bob, s*0.40, s*0.06, sp.color3);
      // goose head poking out
      px(ctx, x+s*0.78, y+s*0.30+bob, s*0.16, s*0.20, sp.color1);
      px(ctx, x+s*0.90, y+s*0.36+bob, s*0.10, s*0.06, sp.color2);
      // eye
      px(ctx, x+s*0.84, y+s*0.34+bob, s*0.04, s*0.04, "#000");
      // jet flame
      px(ctx, x+s*0.05, y+s*0.45+bob, s*0.05, s*0.10, "#ff6b3d");
      px(ctx, x+s*0.00, y+s*0.47+bob, s*0.05, s*0.06, "#ffe070");
    },
    PATAPIM(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
      // tree-trunk legs
      px(ctx, x+s*0.30, y+s*0.55+bob, s*0.40, s*0.30, sp.color2);
      // monkey body
      px(ctx, x+s*0.25, y+s*0.30+bob, s*0.50, s*0.30, sp.color1);
      // face
      px(ctx, x+s*0.30, y+s*0.35+bob, s*0.40, s*0.25, sp.color2);
      // proboscis
      px(ctx, x+s*0.45, y+s*0.45+bob, s*0.15, s*0.15, sp.color2);
      // eyes
      px(ctx, x+s*0.34, y+s*0.40+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.60, y+s*0.40+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.36, y+s*0.42+bob, s*0.03, s*0.03, "#000");
      px(ctx, x+s*0.62, y+s*0.42+bob, s*0.03, s*0.03, "#000");
      // leaves
      px(ctx, x+s*0.20, y+s*0.20+bob, s*0.10, s*0.10, sp.color1);
      px(ctx, x+s*0.70, y+s*0.20+bob, s*0.10, s*0.10, sp.color1);
    },
    CHIMPANZ(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.3, 4);
      // banana body
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.55, sp.color1);
      px(ctx, x+s*0.35, y+s*0.18+bob, s*0.30, s*0.10, sp.color2);
      // monkey face
      px(ctx, x+s*0.32, y+s*0.30+bob, s*0.36, s*0.30, sp.color3);
      // eyes
      px(ctx, x+s*0.36, y+s*0.36+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.56, y+s*0.36+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.40, y+s*0.38+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.60, y+s*0.38+bob, s*0.04, s*0.04, "#000");
      // mouth
      px(ctx, x+s*0.42, y+s*0.50+bob, s*0.16, s*0.04, "#000");
    },
    CAPPUASS(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.3, 4);
      // cup
      px(ctx, x+s*0.25, y+s*0.30+bob, s*0.50, s*0.45, sp.color2);
      // rim
      px(ctx, x+s*0.22, y+s*0.28+bob, s*0.56, s*0.06, sp.color1);
      // foam
      px(ctx, x+s*0.28, y+s*0.34+bob, s*0.44, s*0.10, "#fff");
      // handle
      px(ctx, x+s*0.72, y+s*0.40+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.78, y+s*0.45+bob, s*0.04, s*0.10, sp.color1);
      // angry eyes
      px(ctx, x+s*0.32, y+s*0.50+bob, s*0.10, s*0.04, "#000");
      px(ctx, x+s*0.55, y+s*0.50+bob, s*0.10, s*0.04, "#000");
      // katanas
      px(ctx, x+s*0.05, y+s*0.20+bob, s*0.04, s*0.50, sp.color3);
      px(ctx, x+s*0.04, y+s*0.18+bob, s*0.06, s*0.04, "#000");
      px(ctx, x+s*0.91, y+s*0.20+bob, s*0.04, s*0.50, sp.color3);
      px(ctx, x+s*0.90, y+s*0.18+bob, s*0.06, s*0.04, "#000");
    },
    BALLERINA(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.006) * 2;
      shadow(ctx, x + s/2, y + s - 4, s*0.3, 4);
      // cup body
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.40, sp.color1);
      // foam
      px(ctx, x+s*0.32, y+s*0.22+bob, s*0.36, s*0.06, sp.color3);
      // tutu
      px(ctx, x+s*0.20, y+s*0.55+bob, s*0.60, s*0.10, sp.color2);
      px(ctx, x+s*0.25, y+s*0.62+bob, s*0.50, s*0.06, sp.color2);
      // legs
      px(ctx, x+s*0.40, y+s*0.70+bob, s*0.04, s*0.15, sp.color3);
      px(ctx, x+s*0.56, y+s*0.70+bob, s*0.04, s*0.15, sp.color3);
      // eyes (smug)
      px(ctx, x+s*0.36, y+s*0.36+bob, s*0.08, s*0.04, "#000");
      px(ctx, x+s*0.56, y+s*0.36+bob, s*0.08, s*0.04, "#000");
    },
    TRIPPI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.008) * 2;
      shadow(ctx, x + s/2, y + s - 4, s*0.3, 4);
      // shrimp tail
      px(ctx, x+s*0.10, y+s*0.40+bob, s*0.30, s*0.20, sp.color2);
      px(ctx, x+s*0.05, y+s*0.45+bob, s*0.10, s*0.10, sp.color2);
      // cat body
      px(ctx, x+s*0.35, y+s*0.30+bob, s*0.45, s*0.35, sp.color1);
      // ears
      px(ctx, x+s*0.40, y+s*0.20+bob, s*0.10, s*0.10, sp.color1);
      px(ctx, x+s*0.65, y+s*0.20+bob, s*0.10, s*0.10, sp.color1);
      // eyes (sus)
      px(ctx, x+s*0.42, y+s*0.36+bob, s*0.08, s*0.08, sp.color3);
      px(ctx, x+s*0.62, y+s*0.36+bob, s*0.08, s*0.08, sp.color3);
      px(ctx, x+s*0.45, y+s*0.40+bob, s*0.02, s*0.04, "#000");
      px(ctx, x+s*0.65, y+s*0.40+bob, s*0.02, s*0.04, "#000");
      // legs
      px(ctx, x+s*0.45, y+s*0.65+bob, s*0.05, s*0.10, sp.color1);
      px(ctx, x+s*0.65, y+s*0.65+bob, s*0.05, s*0.10, sp.color1);
    },
    FRIGO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.003) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // fridge body
      px(ctx, x+s*0.25, y+s*0.20+bob, s*0.50, s*0.55, sp.color1);
      // fridge door line
      px(ctx, x+s*0.25, y+s*0.45+bob, s*0.50, s*0.02, sp.color3);
      // handles
      px(ctx, x+s*0.70, y+s*0.30+bob, s*0.04, s*0.10, sp.color3);
      px(ctx, x+s*0.70, y+s*0.55+bob, s*0.04, s*0.10, sp.color3);
      // camel head
      px(ctx, x+s*0.60, y+s*0.05+bob, s*0.15, s*0.20, sp.color2);
      px(ctx, x+s*0.72, y+s*0.10+bob, s*0.10, s*0.10, sp.color2);
      // eye
      px(ctx, x+s*0.74, y+s*0.12+bob, s*0.03, s*0.03, "#000");
      // legs
      px(ctx, x+s*0.30, y+s*0.75+bob, s*0.10, s*0.15, sp.color2);
      px(ctx, x+s*0.60, y+s*0.75+bob, s*0.10, s*0.15, sp.color2);
    },
    BONECA(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
      // tire
      px(ctx, x+s*0.20, y+s*0.30+bob, s*0.60, s*0.40, sp.color2);
      // tire inner
      px(ctx, x+s*0.30, y+s*0.40+bob, s*0.40, s*0.20, sp.color3);
      // frog face inside
      px(ctx, x+s*0.34, y+s*0.42+bob, s*0.32, s*0.16, sp.color1);
      px(ctx, x+s*0.38, y+s*0.40+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.54, y+s*0.40+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.40, y+s*0.42+bob, s*0.02, s*0.02, "#000");
      px(ctx, x+s*0.56, y+s*0.42+bob, s*0.02, s*0.02, "#000");
      // legs (human)
      px(ctx, x+s*0.30, y+s*0.70+bob, s*0.08, s*0.20, sp.color3);
      px(ctx, x+s*0.60, y+s*0.70+bob, s*0.08, s*0.20, sp.color3);
      // shoes
      px(ctx, x+s*0.28, y+s*0.85+bob, s*0.14, s*0.05, "#000");
      px(ctx, x+s*0.58, y+s*0.85+bob, s*0.14, s*0.05, "#000");
    },
    SKIBIDI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // toilet base
      px(ctx, x+s*0.20, y+s*0.55+bob, s*0.60, s*0.30, sp.color1);
      // toilet seat
      px(ctx, x+s*0.18, y+s*0.50+bob, s*0.64, s*0.06, sp.color3);
      // tank back
      px(ctx, x+s*0.25, y+s*0.20+bob, s*0.50, s*0.30, sp.color1);
      // head poking out
      px(ctx, x+s*0.32, y+s*0.10+bob, s*0.36, s*0.30, sp.color2);
      // eyes
      px(ctx, x+s*0.38, y+s*0.20+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.55, y+s*0.20+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.42, y+s*0.22+bob, s*0.03, s*0.03, "#000");
      px(ctx, x+s*0.58, y+s*0.22+bob, s*0.03, s*0.03, "#000");
      // smile
      px(ctx, x+s*0.40, y+s*0.32+bob, s*0.20, s*0.03, "#000");
    },
    GLORBO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.008) * 2;
      const wob = Math.sin(t * 0.01) * 0.05;
      shadow(ctx, x + s/2, y + s - 4, s*0.3, 4);
      // glowing aura
      ctx.fillStyle = sp.color2;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(x+s*0.5, y+s*0.5+bob, s*0.45, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
      // blob
      px(ctx, x+s*(0.30-wob), y+s*0.30+bob, s*(0.40+wob*2), s*0.50, sp.color1);
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.60, s*0.30, sp.color1);
      // eyes (multiple)
      for (let i = 0; i < 3; i++) {
        px(ctx, x+s*(0.30+i*0.18), y+s*(0.40+(i%2)*0.10)+bob, s*0.06, s*0.06, "#fff");
        px(ctx, x+s*(0.32+i*0.18), y+s*(0.42+(i%2)*0.10)+bob, s*0.03, s*0.03, "#000");
      }
    },
    SIGMAWOLF(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // body
      px(ctx, x+s*0.20, y+s*0.45+bob, s*0.60, s*0.30, sp.color1);
      // head
      px(ctx, x+s*0.55, y+s*0.30+bob, s*0.30, s*0.30, sp.color1);
      // ears
      px(ctx, x+s*0.55, y+s*0.22+bob, s*0.08, s*0.10, sp.color3);
      px(ctx, x+s*0.75, y+s*0.22+bob, s*0.08, s*0.10, sp.color3);
      // eye - glowing sigma stare
      px(ctx, x+s*0.62, y+s*0.40+bob, s*0.06, s*0.06, sp.color2);
      px(ctx, x+s*0.74, y+s*0.40+bob, s*0.06, s*0.06, sp.color2);
      // snout
      px(ctx, x+s*0.78, y+s*0.46+bob, s*0.10, s*0.10, sp.color3);
      // legs
      px(ctx, x+s*0.25, y+s*0.72+bob, s*0.08, s*0.15, sp.color1);
      px(ctx, x+s*0.40, y+s*0.72+bob, s*0.08, s*0.15, sp.color1);
      px(ctx, x+s*0.55, y+s*0.72+bob, s*0.08, s*0.15, sp.color1);
      px(ctx, x+s*0.70, y+s*0.72+bob, s*0.08, s*0.15, sp.color1);
      // tail
      px(ctx, x+s*0.10, y+s*0.40+bob, s*0.10, s*0.20, sp.color1);
    },
    RIZZLER(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.3, 4);
      // body humanoid
      px(ctx, x+s*0.35, y+s*0.40+bob, s*0.30, s*0.40, sp.color2);
      // head
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.25, sp.color1);
      // tiny hat
      px(ctx, x+s*0.34, y+s*0.10+bob, s*0.32, s*0.06, sp.color3);
      px(ctx, x+s*0.40, y+s*0.05+bob, s*0.20, s*0.06, sp.color3);
      // eyes (smolder)
      px(ctx, x+s*0.36, y+s*0.26+bob, s*0.08, s*0.04, "#000");
      px(ctx, x+s*0.56, y+s*0.26+bob, s*0.08, s*0.04, "#000");
      // smirk
      px(ctx, x+s*0.42, y+s*0.34+bob, s*0.16, s*0.03, "#000");
      // arms
      px(ctx, x+s*0.20, y+s*0.45+bob, s*0.15, s*0.05, sp.color1);
      px(ctx, x+s*0.65, y+s*0.45+bob, s*0.15, s*0.05, sp.color1);
      // legs
      px(ctx, x+s*0.38, y+s*0.78+bob, s*0.08, s*0.15, sp.color2);
      px(ctx, x+s*0.54, y+s*0.78+bob, s*0.08, s*0.15, sp.color2);
    },
    OHIO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.01) * 3;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // chaotic mass
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 + t*0.001;
        const cx = x + s*0.5 + Math.cos(ang) * s * 0.30;
        const cy = y + s*0.5 + Math.sin(ang) * s * 0.30 + bob;
        const c = [sp.color1, sp.color2, sp.color3][i % 3];
        px(ctx, cx, cy, s*0.10, s*0.10, c);
      }
      // central eye
      px(ctx, x+s*0.40, y+s*0.40+bob, s*0.20, s*0.20, "#fff");
      px(ctx, x+s*0.45, y+s*0.45+bob, s*0.10, s*0.10, "#000");
      px(ctx, x+s*0.47, y+s*0.47+bob, s*0.04, s*0.04, sp.color3);
    },
    LASAGNINI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
      // layers
      for (let i = 0; i < 4; i++) {
        const ly = y + s*(0.35 + i*0.10) + bob;
        const c = i % 2 === 0 ? sp.color1 : sp.color2;
        px(ctx, x+s*0.20, ly, s*0.60, s*0.10, c);
      }
      // top sauce
      px(ctx, x+s*0.20, y+s*0.30+bob, s*0.60, s*0.06, sp.color3);
      // sunglasses
      px(ctx, x+s*0.28, y+s*0.42+bob, s*0.16, s*0.06, "#000");
      px(ctx, x+s*0.56, y+s*0.42+bob, s*0.16, s*0.06, "#000");
      px(ctx, x+s*0.44, y+s*0.43+bob, s*0.12, s*0.02, "#000");
    },
  };

  function genericMon(ctx, sp, x, y, s, t) {
    // procedurally distinct mon based on species id hash
    const h = hash(sp.id);
    const shape = h % 6; // body shape
    const eyeKind = (h >> 3) % 4;
    const limbKind = (h >> 6) % 4;
    const accessoryKind = (h >> 9) % 5;
    const bobSpeed = 0.003 + ((h >> 12) % 5) * 0.001;
    const bob = Math.sin(t * bobSpeed) * 1.5;
    shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);

    // body shape
    if (shape === 0) {
      // round blob
      px(ctx, x+s*0.25, y+s*0.30+bob, s*0.50, s*0.45, sp.color1);
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.60, s*0.30, sp.color1);
      px(ctx, x+s*0.30, y+s*0.50+bob, s*0.40, s*0.15, sp.color2);
    } else if (shape === 1) {
      // tall body
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.55, sp.color1);
      px(ctx, x+s*0.25, y+s*0.35+bob, s*0.50, s*0.30, sp.color1);
      px(ctx, x+s*0.32, y+s*0.50+bob, s*0.36, s*0.15, sp.color2);
    } else if (shape === 2) {
      // wide body
      px(ctx, x+s*0.15, y+s*0.40+bob, s*0.70, s*0.30, sp.color1);
      px(ctx, x+s*0.20, y+s*0.30+bob, s*0.60, s*0.20, sp.color1);
      px(ctx, x+s*0.25, y+s*0.55+bob, s*0.50, s*0.10, sp.color2);
    } else if (shape === 3) {
      // diamond
      px(ctx, x+s*0.40, y+s*0.20+bob, s*0.20, s*0.10, sp.color1);
      px(ctx, x+s*0.30, y+s*0.30+bob, s*0.40, s*0.10, sp.color1);
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.60, s*0.20, sp.color1);
      px(ctx, x+s*0.30, y+s*0.60+bob, s*0.40, s*0.10, sp.color1);
      px(ctx, x+s*0.40, y+s*0.70+bob, s*0.20, s*0.05, sp.color1);
      px(ctx, x+s*0.30, y+s*0.45+bob, s*0.40, s*0.10, sp.color2);
    } else if (shape === 4) {
      // segmented (stack of two)
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.25, sp.color1);
      px(ctx, x+s*0.25, y+s*0.45+bob, s*0.50, s*0.30, sp.color2);
      px(ctx, x+s*0.32, y+s*0.55+bob, s*0.36, s*0.15, sp.color3);
    } else {
      // spiky
      px(ctx, x+s*0.25, y+s*0.30+bob, s*0.50, s*0.45, sp.color1);
      for (let i = 0; i < 5; i++) {
        const sx = x + s*(0.20 + i * 0.15);
        px(ctx, sx, y+s*0.20+bob, s*0.05, s*0.10, sp.color3);
      }
      px(ctx, x+s*0.30, y+s*0.45+bob, s*0.40, s*0.20, sp.color2);
    }

    // eyes
    if (eyeKind === 0) {
      // big anime eyes
      px(ctx, x+s*0.32, y+s*0.36+bob, s*0.12, s*0.10, "#fff");
      px(ctx, x+s*0.56, y+s*0.36+bob, s*0.12, s*0.10, "#fff");
      px(ctx, x+s*0.36, y+s*0.40+bob, s*0.05, s*0.05, "#000");
      px(ctx, x+s*0.60, y+s*0.40+bob, s*0.05, s*0.05, "#000");
    } else if (eyeKind === 1) {
      // angry slits
      px(ctx, x+s*0.32, y+s*0.40+bob, s*0.12, s*0.04, "#000");
      px(ctx, x+s*0.56, y+s*0.40+bob, s*0.12, s*0.04, "#000");
    } else if (eyeKind === 2) {
      // sleepy
      px(ctx, x+s*0.34, y+s*0.42+bob, s*0.10, s*0.02, "#000");
      px(ctx, x+s*0.56, y+s*0.42+bob, s*0.10, s*0.02, "#000");
      px(ctx, x+s*0.34, y+s*0.40+bob, s*0.10, s*0.02, sp.color3);
      px(ctx, x+s*0.56, y+s*0.40+bob, s*0.10, s*0.02, sp.color3);
    } else {
      // glowing
      px(ctx, x+s*0.32, y+s*0.38+bob, s*0.10, s*0.08, sp.color3);
      px(ctx, x+s*0.58, y+s*0.38+bob, s*0.10, s*0.08, sp.color3);
      px(ctx, x+s*0.36, y+s*0.42+bob, s*0.04, s*0.04, "#fff");
      px(ctx, x+s*0.62, y+s*0.42+bob, s*0.04, s*0.04, "#fff");
    }

    // mouth
    px(ctx, x+s*0.40, y+s*0.55+bob, s*0.20, s*0.03, "#000");

    // limbs
    if (limbKind === 0) {
      // legs
      px(ctx, x+s*0.30, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.60, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
    } else if (limbKind === 1) {
      // 4 legs
      px(ctx, x+s*0.20, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.36, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.56, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.72, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
    } else if (limbKind === 2) {
      // arms + legs
      px(ctx, x+s*0.10, y+s*0.40+bob, s*0.15, s*0.08, sp.color1);
      px(ctx, x+s*0.75, y+s*0.40+bob, s*0.15, s*0.08, sp.color1);
      px(ctx, x+s*0.30, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.60, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
    } else {
      // tentacles
      for (let i = 0; i < 4; i++) {
        const wave = Math.sin(t * 0.005 + i) * 2;
        px(ctx, x+s*(0.20 + i*0.20), y+s*0.70+bob, s*0.06, s*0.20 + wave, sp.color1);
      }
    }

    // accessory
    if (accessoryKind === 0) {
      // hat
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.06, sp.color3);
      px(ctx, x+s*0.36, y+s*0.10+bob, s*0.28, s*0.10, sp.color3);
    } else if (accessoryKind === 1) {
      // bow
      px(ctx, x+s*0.45, y+s*0.20+bob, s*0.10, s*0.06, sp.color3);
    } else if (accessoryKind === 2) {
      // sunglasses
      px(ctx, x+s*0.28, y+s*0.36+bob, s*0.18, s*0.06, "#000");
      px(ctx, x+s*0.54, y+s*0.36+bob, s*0.18, s*0.06, "#000");
      px(ctx, x+s*0.45, y+s*0.38+bob, s*0.10, s*0.02, "#000");
    } else if (accessoryKind === 3) {
      // antenna
      px(ctx, x+s*0.49, y+s*0.05+bob, s*0.02, s*0.15, sp.color3);
      px(ctx, x+s*0.45, y+s*0.04+bob, s*0.10, s*0.04, sp.color3);
    }
    // 4 = no accessory
  }

  function drawMon(ctx, speciesId, x, y, size, time) {
    const sp = SPECIES[speciesId];
    if (!sp) return;
    const fn = SPECIAL[speciesId];
    if (fn) {
      fn(ctx, sp, x, y, size, time);
    } else {
      genericMon(ctx, sp, x, y, size, time);
    }
  }

  // Player overworld sprite (16x16-ish)
  function drawPlayer(ctx, x, y, dir, frame) {
    const s = 16;
    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(x+2, y+s-2, s-4, 2);
    // body
    ctx.fillStyle = "#3a5cff";
    ctx.fillRect(x+4, y+8, 8, 6);
    // head
    ctx.fillStyle = "#ffd9a0";
    ctx.fillRect(x+4, y+2, 8, 6);
    // hat
    ctx.fillStyle = "#cc2222";
    ctx.fillRect(x+3, y+1, 10, 3);
    ctx.fillRect(x+5, y, 6, 2);
    // legs (animate based on frame)
    ctx.fillStyle = "#222244";
    const legOffset = (frame % 2 === 0) ? 0 : 1;
    ctx.fillRect(x+4, y+14, 3, 2);
    ctx.fillRect(x+9, y+14+legOffset, 3, 2);
    // eyes (face direction)
    ctx.fillStyle = "#000";
    if (dir === "down") {
      ctx.fillRect(x+5, y+5, 1, 1);
      ctx.fillRect(x+10, y+5, 1, 1);
    } else if (dir === "up") {
      // none visible
    } else if (dir === "left") {
      ctx.fillRect(x+5, y+5, 1, 1);
    } else if (dir === "right") {
      ctx.fillRect(x+10, y+5, 1, 1);
    }
  }

  // Tile renderer
  const TILE_SIZE = 16;
  function drawTile(ctx, type, x, y, time) {
    switch(type) {
      case 0: // grass
        ctx.fillStyle = "#3aa855";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#2a8845";
        ctx.fillRect(x+2, y+8, 2, 1);
        ctx.fillRect(x+10, y+4, 2, 1);
        ctx.fillRect(x+6, y+12, 2, 1);
        break;
      case 1: // tall grass (encounter)
        ctx.fillStyle = "#2a8845";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#1e6a30";
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(x + 2 + i*5, y + 4, 1, 8);
          ctx.fillRect(x + 4 + i*5, y + 6, 1, 6);
        }
        ctx.fillStyle = "#5cd765";
        ctx.fillRect(x+4, y+10, 1, 2);
        break;
      case 2: // path
        ctx.fillStyle = "#c9a86a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#a98750";
        ctx.fillRect(x+3, y+5, 1, 1);
        ctx.fillRect(x+11, y+12, 1, 1);
        ctx.fillRect(x+7, y+2, 1, 1);
        break;
      case 3: // wall (tree)
        ctx.fillStyle = "#1e5028";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#3a8a3a";
        ctx.fillRect(x+1, y+1, 14, 14);
        ctx.fillStyle = "#5cd765";
        ctx.fillRect(x+3, y+3, 4, 3);
        ctx.fillRect(x+9, y+5, 3, 3);
        ctx.fillRect(x+5, y+10, 4, 3);
        break;
      case 4: // water
        const wave = Math.floor(time / 300) % 2;
        ctx.fillStyle = "#3a78dc";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#5a98fc";
        ctx.fillRect(x + 2 + wave*4, y + 4, 4, 1);
        ctx.fillRect(x + 8 - wave*4, y + 10, 4, 1);
        break;
      case 5: // building wall
        ctx.fillStyle = "#7a5a4a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#5a3a2a";
        ctx.fillRect(x, y+8, TILE_SIZE, 1);
        ctx.fillRect(x+8, y, 1, TILE_SIZE);
        break;
      case 6: // door
        ctx.fillStyle = "#3a2218";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#6a3818";
        ctx.fillRect(x+2, y+2, 12, 14);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(x+11, y+9, 1, 1);
        break;
      case 7: // sign
        ctx.fillStyle = "#3aa855";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#7a5a3a";
        ctx.fillRect(x+3, y+10, 2, 6);
        ctx.fillRect(x+11, y+10, 2, 6);
        ctx.fillStyle = "#c9a86a";
        ctx.fillRect(x+1, y+2, 14, 8);
        ctx.fillStyle = "#3a2218";
        ctx.fillRect(x+3, y+5, 10, 1);
        ctx.fillRect(x+3, y+7, 8, 1);
        break;
      case 8: // healing pad (cappuccino bar floor)
        ctx.fillStyle = "#f5c890";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#c98850";
        ctx.fillRect(x+1, y+1, 14, 1);
        ctx.fillRect(x+1, y+14, 14, 1);
        ctx.fillStyle = "#5a3818";
        ctx.fillRect(x+6, y+6, 4, 4);
        break;
      case 9: // flower
        ctx.fillStyle = "#3aa855";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#ff6b9b";
        ctx.fillRect(x+6, y+6, 4, 4);
        ctx.fillStyle = "#ffe070";
        ctx.fillRect(x+7, y+7, 2, 2);
        break;
      default:
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }

  function drawNpc(ctx, x, y, color, frame) {
    const s = 16;
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(x+2, y+s-2, s-4, 2);
    // body
    ctx.fillStyle = color;
    ctx.fillRect(x+4, y+8, 8, 6);
    // head
    ctx.fillStyle = "#e0c090";
    ctx.fillRect(x+4, y+2, 8, 6);
    ctx.fillStyle = "#000";
    ctx.fillRect(x+5, y+5, 1, 1);
    ctx.fillRect(x+10, y+5, 1, 1);
    // legs
    ctx.fillStyle = "#222";
    const legOffset = (frame % 2 === 0) ? 0 : 1;
    ctx.fillRect(x+4, y+14, 3, 2);
    ctx.fillRect(x+9, y+14+legOffset, 3, 2);
  }

  return {
    drawMon, drawPlayer, drawTile, drawNpc, TILE_SIZE,
  };
})();
