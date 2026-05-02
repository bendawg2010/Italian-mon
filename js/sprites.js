// =====================================================
// Procedural pixel-art sprites for memes & overworld
// Pokemon-GBA-style palette
// =====================================================

const SpriteRenderer = (() => {

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

  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  // ----- BIG MEME SPRITES (in battle) -----
  const SPECIAL = {
    TRALALERO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      px(ctx, x+s*0.15, y+s*0.30+bob, s*0.7, s*0.4, sp.color1);
      px(ctx, x+s*0.20, y+s*0.50+bob, s*0.6, s*0.20, sp.color2);
      px(ctx, x+s*0.05, y+s*0.30+bob, s*0.10, s*0.30, sp.color1);
      px(ctx, x+s*0.00, y+s*0.20+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.00, y+s*0.55+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.70, y+s*0.36+bob, s*0.10, s*0.10, "#fff");
      px(ctx, x+s*0.74, y+s*0.40+bob, s*0.05, s*0.05, "#000");
      px(ctx, x+s*0.80, y+s*0.50+bob, s*0.10, s*0.04, "#000");
      px(ctx, x+s*0.82, y+s*0.46+bob, s*0.02, s*0.04, "#fff");
      px(ctx, x+s*0.85, y+s*0.46+bob, s*0.02, s*0.04, "#fff");
      for (let i = 0; i < 3; i++) {
        const lx = x+s*(0.25 + i*0.20);
        px(ctx, lx, y+s*0.70+bob, s*0.10, s*0.10, "#000");
        px(ctx, lx-s*0.02, y+s*0.78+bob, s*0.16, s*0.06, sp.color3);
        px(ctx, lx+s*0.02, y+s*0.74+bob, s*0.06, s*0.02, "#fff");
      }
    },
    TRALALERONE(ctx, sp, x, y, s, t) {
      SPECIAL.TRALALERO(ctx, sp, x, y, s, t);
      for (let i = 0; i < 4; i++) px(ctx, x+s*(0.20+i*0.15), y+s*0.25, s*0.05, s*0.10, sp.color3);
    },
    BOMBARDINO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1.5;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      px(ctx, x+s*0.05, y+s*0.40+bob, s*0.20, s*0.10, sp.color2);
      px(ctx, x+s*0.75, y+s*0.40+bob, s*0.20, s*0.10, sp.color2);
      px(ctx, x+s*0.20, y+s*0.30+bob, s*0.60, s*0.35, sp.color1);
      px(ctx, x+s*0.25, y+s*0.50+bob, s*0.50, s*0.15, sp.color2);
      px(ctx, x+s*0.78, y+s*0.42+bob, s*0.15, s*0.10, sp.color1);
      for (let i = 0; i < 4; i++) px(ctx, x+s*(0.80+i*0.03), y+s*0.50+bob, s*0.02, s*0.03, "#fff");
      px(ctx, x+s*0.66, y+s*0.36+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.68, y+s*0.38+bob, s*0.03, s*0.03, "#000");
      px(ctx, x+s*0.30, y+s*0.70+bob, s*0.10, s*0.10, "#222");
      px(ctx, x+s*0.55, y+s*0.70+bob, s*0.10, s*0.10, "#222");
      px(ctx, x+s*0.38, y+s*0.20+bob, s*0.24, s*0.04, "#888");
    },
    BOMBARDIRO(ctx, sp, x, y, s, t) {
      SPECIAL.BOMBARDINO(ctx, sp, x, y, s, t);
      px(ctx, x+s*0.74, y+s*0.45, s*0.10, s*0.04, "#000");
      px(ctx, x+s*0.42, y+s*0.72, s*0.16, s*0.10, "#222");
    },
    TUNGTUNG(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.55, sp.color1);
      px(ctx, x+s*0.32, y+s*0.30+bob, s*0.36, s*0.02, sp.color2);
      px(ctx, x+s*0.32, y+s*0.50+bob, s*0.36, s*0.02, sp.color2);
      px(ctx, x+s*0.36, y+s*0.32+bob, s*0.10, s*0.06, "#fff");
      px(ctx, x+s*0.54, y+s*0.32+bob, s*0.10, s*0.06, "#fff");
      px(ctx, x+s*0.40, y+s*0.34+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.58, y+s*0.34+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.40, y+s*0.50+bob, s*0.20, s*0.04, "#000");
      px(ctx, x+s*0.72, y+s*0.20+bob, s*0.05, s*0.30, sp.color1);
      px(ctx, x+s*0.70, y+s*0.10+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.34, y+s*0.75+bob, s*0.08, s*0.10, sp.color2);
      px(ctx, x+s*0.58, y+s*0.75+bob, s*0.08, s*0.10, sp.color2);
    },
    TUNGTUNGTUNG(ctx, sp, x, y, s, t) {
      SPECIAL.TUNGTUNG(ctx, sp, x, y, s, t);
      px(ctx, x+s*0.20, y+s*0.30, s*0.05, s*0.30, sp.color1);
      px(ctx, x+s*0.18, y+s*0.20, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.40, y+s*0.34, s*0.04, s*0.04, sp.color3);
      px(ctx, x+s*0.58, y+s*0.34, s*0.04, s*0.04, sp.color3);
    },
  };
  // (other meme sprites use generic procedural fallback below)

  function genericMon(ctx, sp, x, y, s, t) {
    const h = hash(sp.id);
    const shape = h % 6;
    const eyeKind = (h >> 3) % 4;
    const limbKind = (h >> 6) % 4;
    const accessoryKind = (h >> 9) % 5;
    const bobSpeed = 0.003 + ((h >> 12) % 5) * 0.001;
    const bob = Math.sin(t * bobSpeed) * 1.5;
    shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
    if (shape === 0) {
      px(ctx, x+s*0.25, y+s*0.30+bob, s*0.50, s*0.45, sp.color1);
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.60, s*0.30, sp.color1);
      px(ctx, x+s*0.30, y+s*0.50+bob, s*0.40, s*0.15, sp.color2);
    } else if (shape === 1) {
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.55, sp.color1);
      px(ctx, x+s*0.25, y+s*0.35+bob, s*0.50, s*0.30, sp.color1);
      px(ctx, x+s*0.32, y+s*0.50+bob, s*0.36, s*0.15, sp.color2);
    } else if (shape === 2) {
      px(ctx, x+s*0.15, y+s*0.40+bob, s*0.70, s*0.30, sp.color1);
      px(ctx, x+s*0.20, y+s*0.30+bob, s*0.60, s*0.20, sp.color1);
      px(ctx, x+s*0.25, y+s*0.55+bob, s*0.50, s*0.10, sp.color2);
    } else if (shape === 3) {
      px(ctx, x+s*0.40, y+s*0.20+bob, s*0.20, s*0.10, sp.color1);
      px(ctx, x+s*0.30, y+s*0.30+bob, s*0.40, s*0.10, sp.color1);
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.60, s*0.20, sp.color1);
      px(ctx, x+s*0.30, y+s*0.60+bob, s*0.40, s*0.10, sp.color1);
      px(ctx, x+s*0.40, y+s*0.70+bob, s*0.20, s*0.05, sp.color1);
      px(ctx, x+s*0.30, y+s*0.45+bob, s*0.40, s*0.10, sp.color2);
    } else if (shape === 4) {
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.25, sp.color1);
      px(ctx, x+s*0.25, y+s*0.45+bob, s*0.50, s*0.30, sp.color2);
      px(ctx, x+s*0.32, y+s*0.55+bob, s*0.36, s*0.15, sp.color3);
    } else {
      px(ctx, x+s*0.25, y+s*0.30+bob, s*0.50, s*0.45, sp.color1);
      for (let i = 0; i < 5; i++) px(ctx, x + s*(0.20 + i * 0.15), y+s*0.20+bob, s*0.05, s*0.10, sp.color3);
      px(ctx, x+s*0.30, y+s*0.45+bob, s*0.40, s*0.20, sp.color2);
    }
    if (eyeKind === 0) {
      px(ctx, x+s*0.32, y+s*0.36+bob, s*0.12, s*0.10, "#fff");
      px(ctx, x+s*0.56, y+s*0.36+bob, s*0.12, s*0.10, "#fff");
      px(ctx, x+s*0.36, y+s*0.40+bob, s*0.05, s*0.05, "#000");
      px(ctx, x+s*0.60, y+s*0.40+bob, s*0.05, s*0.05, "#000");
    } else if (eyeKind === 1) {
      px(ctx, x+s*0.32, y+s*0.40+bob, s*0.12, s*0.04, "#000");
      px(ctx, x+s*0.56, y+s*0.40+bob, s*0.12, s*0.04, "#000");
    } else if (eyeKind === 2) {
      px(ctx, x+s*0.34, y+s*0.42+bob, s*0.10, s*0.02, "#000");
      px(ctx, x+s*0.56, y+s*0.42+bob, s*0.10, s*0.02, "#000");
      px(ctx, x+s*0.34, y+s*0.40+bob, s*0.10, s*0.02, sp.color3);
      px(ctx, x+s*0.56, y+s*0.40+bob, s*0.10, s*0.02, sp.color3);
    } else {
      px(ctx, x+s*0.32, y+s*0.38+bob, s*0.10, s*0.08, sp.color3);
      px(ctx, x+s*0.58, y+s*0.38+bob, s*0.10, s*0.08, sp.color3);
      px(ctx, x+s*0.36, y+s*0.42+bob, s*0.04, s*0.04, "#fff");
      px(ctx, x+s*0.62, y+s*0.42+bob, s*0.04, s*0.04, "#fff");
    }
    px(ctx, x+s*0.40, y+s*0.55+bob, s*0.20, s*0.03, "#000");
    if (limbKind === 0) {
      px(ctx, x+s*0.30, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.60, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
    } else if (limbKind === 1) {
      px(ctx, x+s*0.20, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.36, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.56, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.72, y+s*0.65+bob, s*0.08, s*0.20, sp.color1);
    } else if (limbKind === 2) {
      px(ctx, x+s*0.10, y+s*0.40+bob, s*0.15, s*0.08, sp.color1);
      px(ctx, x+s*0.75, y+s*0.40+bob, s*0.15, s*0.08, sp.color1);
      px(ctx, x+s*0.30, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
      px(ctx, x+s*0.60, y+s*0.75+bob, s*0.10, s*0.15, sp.color1);
    } else {
      for (let i = 0; i < 4; i++) {
        const wave = Math.sin(t * 0.005 + i) * 2;
        px(ctx, x+s*(0.20 + i*0.20), y+s*0.70+bob, s*0.06, s*0.20 + wave, sp.color1);
      }
    }
    if (accessoryKind === 0) {
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.06, sp.color3);
      px(ctx, x+s*0.36, y+s*0.10+bob, s*0.28, s*0.10, sp.color3);
    } else if (accessoryKind === 1) {
      px(ctx, x+s*0.45, y+s*0.20+bob, s*0.10, s*0.06, sp.color3);
    } else if (accessoryKind === 2) {
      px(ctx, x+s*0.28, y+s*0.36+bob, s*0.18, s*0.06, "#000");
      px(ctx, x+s*0.54, y+s*0.36+bob, s*0.18, s*0.06, "#000");
      px(ctx, x+s*0.45, y+s*0.38+bob, s*0.10, s*0.02, "#000");
    } else if (accessoryKind === 3) {
      px(ctx, x+s*0.49, y+s*0.05+bob, s*0.02, s*0.15, sp.color3);
      px(ctx, x+s*0.45, y+s*0.04+bob, s*0.10, s*0.04, sp.color3);
    }
  }

  function drawMon(ctx, speciesId, x, y, size, time) {
    const sp = SPECIES[speciesId];
    if (!sp) return;
    const fn = SPECIAL[speciesId];
    if (fn) fn(ctx, sp, x, y, size, time);
    else genericMon(ctx, sp, x, y, size, time);
  }

  // ----- PLAYER + NPC SPRITES (overworld) -----
  function drawPlayer(ctx, x, y, dir, frame) {
    // 16x16 character with bigger head + cap brim
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(x+8, y+15, 5, 1.5, 0, 0, Math.PI*2);
    ctx.fill();
    // legs (animate)
    ctx.fillStyle = "#1f1f3d";
    if (frame % 2 === 0) {
      ctx.fillRect(x+5, y+12, 2, 3);
      ctx.fillRect(x+9, y+13, 2, 2);
    } else {
      ctx.fillRect(x+5, y+13, 2, 2);
      ctx.fillRect(x+9, y+12, 2, 3);
    }
    // shoes
    ctx.fillStyle = "#000";
    ctx.fillRect(x+4, y+15, 3, 1);
    ctx.fillRect(x+9, y+15, 3, 1);
    // body shirt
    ctx.fillStyle = "#3a5cff";
    ctx.fillRect(x+4, y+8, 8, 5);
    ctx.fillStyle = "#2a4cdc";
    ctx.fillRect(x+4, y+12, 8, 1);
    // backpack hint
    ctx.fillStyle = "#1a3aaa";
    ctx.fillRect(x+5, y+9, 6, 2);
    // arms
    ctx.fillStyle = "#ffd9a0";
    ctx.fillRect(x+3, y+9, 1, 3);
    ctx.fillRect(x+12, y+9, 1, 3);
    // head
    ctx.fillStyle = "#ffd9a0";
    ctx.fillRect(x+4, y+3, 8, 5);
    ctx.fillRect(x+5, y+8, 6, 1);
    // hair tuft (sides)
    ctx.fillStyle = "#5a3a1a";
    ctx.fillRect(x+4, y+5, 1, 2);
    ctx.fillRect(x+11, y+5, 1, 2);
    // cap (bigger, brim)
    ctx.fillStyle = "#cc2222";
    ctx.fillRect(x+3, y+1, 10, 3);
    ctx.fillRect(x+5, y, 6, 1);
    // cap brim
    ctx.fillStyle = "#7a0e0e";
    if (dir === "down") ctx.fillRect(x+5, y+4, 6, 1);
    else if (dir === "up") ctx.fillRect(x+5, y+1, 6, 0.5);
    else if (dir === "left") ctx.fillRect(x+2, y+3, 2, 1);
    else if (dir === "right") ctx.fillRect(x+12, y+3, 2, 1);
    // cap highlight
    ctx.fillStyle = "#ff5e5e";
    ctx.fillRect(x+5, y+1, 2, 1);
    // eyes
    ctx.fillStyle = "#000";
    if (dir === "down") {
      ctx.fillRect(x+5, y+5, 1, 2);
      ctx.fillRect(x+10, y+5, 1, 2);
    } else if (dir === "left") {
      ctx.fillRect(x+5, y+5, 1, 2);
    } else if (dir === "right") {
      ctx.fillRect(x+10, y+5, 1, 2);
    }
  }

  function drawNpc(ctx, x, y, color, frame) {
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(x+8, y+15, 5, 1.5, 0, 0, Math.PI*2);
    ctx.fill();
    // legs
    ctx.fillStyle = "#1a1a1a";
    if (frame % 2 === 0) { ctx.fillRect(x+5, y+12, 2, 3); ctx.fillRect(x+9, y+13, 2, 2); }
    else { ctx.fillRect(x+5, y+13, 2, 2); ctx.fillRect(x+9, y+12, 2, 3); }
    ctx.fillStyle = "#000";
    ctx.fillRect(x+4, y+15, 3, 1);
    ctx.fillRect(x+9, y+15, 3, 1);
    // body
    ctx.fillStyle = color;
    ctx.fillRect(x+4, y+8, 8, 5);
    ctx.fillStyle = shade(color, -0.3);
    ctx.fillRect(x+4, y+12, 8, 1);
    // arms
    ctx.fillStyle = "#e0c090";
    ctx.fillRect(x+3, y+9, 1, 3);
    ctx.fillRect(x+12, y+9, 1, 3);
    // head
    ctx.fillStyle = "#e0c090";
    ctx.fillRect(x+4, y+3, 8, 5);
    ctx.fillRect(x+5, y+8, 6, 1);
    // hair (varies by hashed color)
    ctx.fillStyle = shade(color, -0.5);
    ctx.fillRect(x+3, y+2, 10, 2);
    ctx.fillRect(x+4, y+1, 8, 1);
    // eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(x+5, y+5, 1, 2);
    ctx.fillRect(x+10, y+5, 1, 2);
    // mouth
    ctx.fillRect(x+7, y+7, 2, 1);
  }

  function shade(hex, amt) {
    // hex like #rrggbb -> shaded color
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.floor(v + (amt < 0 ? v * amt : (255-v) * amt))));
    return `#${f(r).toString(16).padStart(2,'0')}${f(g).toString(16).padStart(2,'0')}${f(b).toString(16).padStart(2,'0')}`;
  }

  // ----- TILE RENDERER -----
  const TILE_SIZE = 16;
  function drawTile(ctx, type, x, y, time) {
    switch(type) {
      case 0: // grass
        ctx.fillStyle = "#5fb86a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#4ca055";
        ctx.fillRect(x+2, y+8, 2, 1);
        ctx.fillRect(x+10, y+4, 2, 1);
        ctx.fillRect(x+6, y+12, 2, 1);
        ctx.fillStyle = "#7fd082";
        ctx.fillRect(x+11, y+11, 1, 1);
        ctx.fillRect(x+3, y+3, 1, 1);
        break;
      case 1: // tall grass (encounter) — distinct, emphasized
        ctx.fillStyle = "#3a9a4a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#2a7a3a";
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(x + 2 + i*5, y + 4, 1, 8);
          ctx.fillRect(x + 4 + i*5, y + 6, 1, 6);
        }
        // little glints
        ctx.fillStyle = "#a0e0a0";
        ctx.fillRect(x+3, y+3, 1, 1);
        ctx.fillRect(x+13, y+8, 1, 1);
        ctx.fillRect(x+8, y+12, 1, 1);
        // encounter swirl (subtle pulse)
        const pulse = (Math.sin(time * 0.003 + x*0.05 + y*0.05) + 1) / 2;
        ctx.fillStyle = `rgba(255,255,180,${0.05 + pulse*0.07})`;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        break;
      case 2: // path - sandy
        ctx.fillStyle = "#ecd8a4";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#d4be88";
        ctx.fillRect(x+3, y+5, 1, 1);
        ctx.fillRect(x+11, y+12, 1, 1);
        ctx.fillRect(x+7, y+2, 1, 1);
        ctx.fillStyle = "#b8a070";
        ctx.fillRect(x+5, y+9, 2, 1);
        break;
      case 3: // tree - rounder, lighter
        ctx.fillStyle = "#5fb86a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#1e5028";
        ctx.fillRect(x+1, y+2, 14, 12);
        ctx.fillStyle = "#3a8a3a";
        ctx.fillRect(x+2, y+1, 12, 13);
        ctx.fillStyle = "#5cb868";
        ctx.fillRect(x+3, y+3, 4, 3);
        ctx.fillRect(x+9, y+5, 3, 3);
        ctx.fillRect(x+5, y+10, 4, 3);
        ctx.fillStyle = "#7adc88";
        ctx.fillRect(x+4, y+3, 1, 1);
        ctx.fillRect(x+10, y+5, 1, 1);
        ctx.fillRect(x+6, y+10, 1, 1);
        // trunk peek at bottom
        ctx.fillStyle = "#5a3818";
        ctx.fillRect(x+7, y+14, 2, 2);
        break;
      case 4: // water with animated waves
        const wave = Math.floor(time / 400) % 2;
        ctx.fillStyle = "#3a78dc";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#5a98fc";
        ctx.fillRect(x + 2 + wave*4, y + 4, 4, 1);
        ctx.fillRect(x + 8 - wave*4, y + 10, 4, 1);
        ctx.fillStyle = "#a0c8ff";
        ctx.fillRect(x + 3 + wave*4, y + 4, 1, 1);
        break;
      case 5: // wall - cream/light, with siding
        ctx.fillStyle = "#f5d49a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#d49b4b";
        ctx.fillRect(x, y+5, TILE_SIZE, 1);
        ctx.fillRect(x, y+11, TILE_SIZE, 1);
        ctx.fillStyle = "#a07040";
        ctx.fillRect(x, y, TILE_SIZE, 1);
        // small windowy detail
        if ((x/16 + y/16) % 3 === 0) {
          ctx.fillStyle = "#5b9bdc";
          ctx.fillRect(x+5, y+6, 6, 4);
          ctx.fillStyle = "#a0c8ff";
          ctx.fillRect(x+6, y+7, 4, 1);
        }
        break;
      case 6: // door - distinctive pokemon-style
        ctx.fillStyle = "#5a3818";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#7a4a28";
        ctx.fillRect(x+2, y+1, 12, 14);
        ctx.fillStyle = "#3a2218";
        ctx.fillRect(x+2, y+1, 12, 1);
        ctx.fillRect(x+2, y+8, 12, 1);
        ctx.fillStyle = "#d4a043";
        ctx.fillRect(x+11, y+9, 2, 2);
        // archway top
        ctx.fillStyle = "#2a1810";
        ctx.fillRect(x+3, y, 10, 1);
        break;
      case 7: // sign
        ctx.fillStyle = "#5fb86a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#7a5a3a";
        ctx.fillRect(x+3, y+10, 2, 6);
        ctx.fillRect(x+11, y+10, 2, 6);
        ctx.fillStyle = "#d4a043";
        ctx.fillRect(x+1, y+2, 14, 8);
        ctx.fillStyle = "#b8884a";
        ctx.fillRect(x+1, y+2, 14, 1);
        ctx.fillStyle = "#3a2218";
        ctx.fillRect(x+3, y+5, 10, 1);
        ctx.fillRect(x+3, y+7, 8, 1);
        // little exclamation
        ctx.fillStyle = "#fff";
        ctx.fillRect(x+13, y+3, 1, 3);
        ctx.fillRect(x+13, y+7, 1, 1);
        break;
      case 8: // healing floor (Pokemon Center-style)
        ctx.fillStyle = "#fce4d0";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#f5b8a8";
        ctx.fillRect(x+1, y+1, 14, 1);
        ctx.fillRect(x+1, y+14, 14, 1);
        ctx.fillStyle = "#ff9090";
        ctx.fillRect(x+6, y+6, 4, 4);
        ctx.fillStyle = "#fff";
        ctx.fillRect(x+7, y+6, 2, 4);
        ctx.fillRect(x+6, y+7, 4, 2);
        break;
      case 9: // flower
        ctx.fillStyle = "#5fb86a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#ff6b9b";
        ctx.fillRect(x+6, y+6, 4, 4);
        ctx.fillStyle = "#ffe070";
        ctx.fillRect(x+7, y+7, 2, 2);
        ctx.fillStyle = "#3a8a3a";
        ctx.fillRect(x+7, y+9, 1, 2);
        break;
      case 14: // SHOP_FLOOR
        ctx.fillStyle = "#cee0ff";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#7a9cdc";
        ctx.fillRect(x+1, y+1, 14, 1);
        ctx.fillRect(x+1, y+14, 14, 1);
        ctx.fillStyle = "#3a5cdc";
        ctx.fillRect(x+5, y+5, 6, 6);
        ctx.fillStyle = "#cee0ff";
        ctx.fillRect(x+7, y+6, 2, 4);
        ctx.fillRect(x+6, y+7, 4, 2);
        break;
      case 15: // HEAL_SIGN — bright red cross on building wall
        ctx.fillStyle = "#f5d49a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#a07040";
        ctx.fillRect(x, y, TILE_SIZE, 1);
        ctx.fillStyle = "#fff";
        ctx.fillRect(x+3, y+3, 10, 10);
        ctx.fillStyle = "#ff3d3d";
        ctx.fillRect(x+6, y+3, 4, 10);
        ctx.fillRect(x+3, y+6, 10, 4);
        break;
      case 16: // GYM_FLOOR
        ctx.fillStyle = "#7a3aaa";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#5a1a8a";
        ctx.fillRect(x+1, y+1, 14, 1);
        ctx.fillRect(x+1, y+14, 14, 1);
        ctx.fillStyle = "#c93dff";
        ctx.fillRect(x+6, y+6, 4, 4);
        break;
      case 17: // ROOF_RED_L
        drawRoofTile(ctx, x, y, "#ff5e5e", "#cc2222", "left");
        break;
      case 18: // ROOF_RED_M
        drawRoofTile(ctx, x, y, "#ff5e5e", "#cc2222", "mid");
        break;
      case 19: // ROOF_RED_R
        drawRoofTile(ctx, x, y, "#ff5e5e", "#cc2222", "right");
        break;
      case 20: // ROOF_BLUE_L
        drawRoofTile(ctx, x, y, "#5b9bdc", "#2a5cae", "left");
        break;
      case 21: // ROOF_BLUE_M
        drawRoofTile(ctx, x, y, "#5b9bdc", "#2a5cae", "mid");
        break;
      case 22: // ROOF_BLUE_R
        drawRoofTile(ctx, x, y, "#5b9bdc", "#2a5cae", "right");
        break;
      case 23: // ROOF_PURPLE_L
        drawRoofTile(ctx, x, y, "#c93dff", "#7a1aaa", "left");
        break;
      case 24: // ROOF_PURPLE_M
        drawRoofTile(ctx, x, y, "#c93dff", "#7a1aaa", "mid");
        break;
      case 25: // ROOF_PURPLE_R
        drawRoofTile(ctx, x, y, "#c93dff", "#7a1aaa", "right");
        break;
      case 26: // FENCE
        ctx.fillStyle = "#5fb86a";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#fff5b3";
        ctx.fillRect(x, y+5, TILE_SIZE, 2);
        ctx.fillRect(x, y+11, TILE_SIZE, 2);
        ctx.fillStyle = "#d4a043";
        ctx.fillRect(x+3, y+3, 2, 12);
        ctx.fillRect(x+11, y+3, 2, 12);
        break;
      case 27: // SAND
        ctx.fillStyle = "#fce0a0";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#e8c478";
        ctx.fillRect(x+3, y+5, 1, 1);
        ctx.fillRect(x+11, y+12, 1, 1);
        ctx.fillRect(x+7, y+2, 1, 1);
        ctx.fillRect(x+5, y+9, 2, 1);
        break;
      default:
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }

  function drawRoofTile(ctx, x, y, light, dark, side) {
    // base
    ctx.fillStyle = dark;
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // light top
    ctx.fillStyle = light;
    ctx.fillRect(x, y+2, TILE_SIZE, 8);
    // ridge highlight
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(x, y+3, TILE_SIZE, 1);
    // overhang shadow at bottom
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(x, y+10, TILE_SIZE, 2);
    // chimney on middle?
    if (side === "mid") {
      ctx.fillStyle = "#7a5a3a";
      ctx.fillRect(x+10, y, 3, 4);
      ctx.fillStyle = "#5a3818";
      ctx.fillRect(x+10, y, 3, 1);
    }
    // edges
    if (side === "left") {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(x, y+2, 1, 8);
    } else if (side === "right") {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(x+15, y+2, 1, 8);
    }
  }

  return {
    drawMon, drawPlayer, drawNpc, drawTile, TILE_SIZE,
  };
})();
