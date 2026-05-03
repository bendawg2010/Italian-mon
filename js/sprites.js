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
    // Three-legged shark in Nikes. Now actually shark-shaped.
    TRALALERO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.42, 4);
      // body: tapered shark torpedo (head left, tail right)
      px(ctx, x+s*0.10, y+s*0.36+bob, s*0.70, s*0.28, sp.color1);
      px(ctx, x+s*0.05, y+s*0.42+bob, s*0.10, s*0.16, sp.color1);          // snout taper
      px(ctx, x+s*0.78, y+s*0.40+bob, s*0.06, s*0.20, sp.color1);          // peduncle
      // dorsal fin
      px(ctx, x+s*0.34, y+s*0.22+bob, s*0.16, s*0.16, sp.color1);
      px(ctx, x+s*0.40, y+s*0.16+bob, s*0.08, s*0.08, sp.color1);
      // tail fluke (animated)
      const tw = Math.sin(t * 0.012) * s*0.04;
      px(ctx, x+s*0.83, y+s*0.30+bob - tw, s*0.06, s*0.18, sp.color1);
      px(ctx, x+s*0.83, y+s*0.50+bob + tw, s*0.06, s*0.18, sp.color1);
      px(ctx, x+s*0.88, y+s*0.36+bob, s*0.06, s*0.26, sp.color1);
      // pec fin
      px(ctx, x+s*0.30, y+s*0.58+bob, s*0.16, s*0.06, sp.color1);
      // pale belly
      px(ctx, x+s*0.18, y+s*0.54+bob, s*0.56, s*0.10, sp.color2);
      // gills
      px(ctx, x+s*0.20, y+s*0.42+bob, s*0.02, s*0.08, "#1a4a7a");
      px(ctx, x+s*0.24, y+s*0.42+bob, s*0.02, s*0.08, "#1a4a7a");
      px(ctx, x+s*0.28, y+s*0.42+bob, s*0.02, s*0.08, "#1a4a7a");
      // eye (white sclera + black pupil + glint)
      px(ctx, x+s*0.14, y+s*0.40+bob, s*0.07, s*0.07, "#fff");
      px(ctx, x+s*0.16, y+s*0.42+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.17, y+s*0.42+bob, s*0.01, s*0.01, "#fff");
      // toothy grin
      px(ctx, x+s*0.05, y+s*0.52+bob, s*0.14, s*0.03, "#000");
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.06 + i*0.035), y+s*0.50+bob, s*0.02, s*0.02, "#fff");
      }
      // three legs in Nikes — sole, blue upper (real Nike Air Force-ish
      // colorway), bigger swoosh more obviously branded
      for (let i = 0; i < 3; i++) {
        const lx = x+s*(0.28 + i*0.18);
        const stride = (Math.sin(t * 0.008 + i*1.4) * 1) * (s*0.01);
        // leg
        px(ctx, lx + s*0.04, y+s*0.64+bob, s*0.06, s*0.16, "#f5d59a");
        // shoe — chunky sneaker silhouette
        // White sole
        px(ctx, lx-s*0.02 + stride, y+s*0.82+bob, s*0.20, s*0.05, "#ffffff");
        // White midsole
        px(ctx, lx-s*0.01 + stride, y+s*0.78+bob, s*0.18, s*0.04, "#f5f5f5");
        // Blue/orange upper (Nike colors)
        px(ctx, lx + s*0.00 + stride, y+s*0.74+bob, s*0.17, s*0.04, "#1a3a78");
        // Tongue (white square peeking out)
        px(ctx, lx + s*0.06 + stride, y+s*0.72+bob, s*0.06, s*0.04, "#ffffff");
        // SWOOSH — bigger, more recognizable arc shape (3-pixel curved swipe)
        px(ctx, lx + s*0.04 + stride, y+s*0.77+bob, s*0.04, s*0.012, "#ffffff");
        px(ctx, lx + s*0.08 + stride, y+s*0.78+bob, s*0.04, s*0.012, "#ffffff");
        px(ctx, lx + s*0.11 + stride, y+s*0.76+bob, s*0.03, s*0.012, "#ffffff");
      }
    },
    TRALALERONE(ctx, sp, x, y, s, t) {
      SPECIAL.TRALALERO(ctx, sp, x, y, s, t);
      // extra tail-shoes
      const stride = Math.sin(t * 0.008) * (s*0.01);
      for (let i = 0; i < 3; i++) {
        const lx = x+s*(0.86 + i*0.02);
        px(ctx, lx + stride, y+s*0.62 + i*s*0.06, s*0.08, s*0.04, sp.color3);
      }
      // crown of fins on head
      px(ctx, x+s*0.10, y+s*0.30, s*0.04, s*0.06, sp.color3);
      px(ctx, x+s*0.16, y+s*0.26, s*0.04, s*0.06, sp.color3);
    },
    // Crocodile fused with a WW2 bomber. Now actually has a snout + wings + props.
    BOMBARDINO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1.5;
      const propSpin = Math.floor(t * 0.05) % 2;  // 0 or 1, prop blur
      shadow(ctx, x + s/2, y + s - 4, s*0.45, 4);
      // wings (broad, swept slightly)
      px(ctx, x+s*0.00, y+s*0.46+bob, s*0.22, s*0.10, sp.color1);
      px(ctx, x+s*0.78, y+s*0.46+bob, s*0.22, s*0.10, sp.color1);
      // wing tips (darker color2)
      px(ctx, x+s*0.00, y+s*0.50+bob, s*0.06, s*0.06, sp.color2);
      px(ctx, x+s*0.94, y+s*0.50+bob, s*0.06, s*0.06, sp.color2);
      // engine pods + propellers
      const propW = propSpin ? s*0.12 : s*0.02;
      const propH = propSpin ? s*0.02 : s*0.12;
      px(ctx, x+s*0.04, y+s*0.42+bob, s*0.06, s*0.06, "#444");          // engine L
      px(ctx, x+s*0.84, y+s*0.42+bob, s*0.06, s*0.06, "#444");           // engine R
      px(ctx, x-s*0.02 + (s*0.06 - propW)/2 + s*0.04, y+s*0.45+bob + (s*0.06 - propH)/2, propW, propH, "#aaa");
      px(ctx, x+s*0.84 + (s*0.06 - propW)/2, y+s*0.45+bob + (s*0.06 - propH)/2, propW, propH, "#aaa");
      // crocodile fuselage body (camo green/brown)
      px(ctx, x+s*0.22, y+s*0.32+bob, s*0.56, s*0.34, sp.color1);
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.60, s*0.18, sp.color2);        // belly
      // long snout (crocodile face on the front)
      px(ctx, x+s*0.78, y+s*0.42+bob, s*0.18, s*0.14, sp.color1);
      px(ctx, x+s*0.94, y+s*0.46+bob, s*0.04, s*0.06, sp.color1);        // nose tip
      // teeth row in mouth
      px(ctx, x+s*0.80, y+s*0.50+bob, s*0.16, s*0.02, "#000");
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.81 + i*0.04), y+s*0.49+bob, s*0.02, s*0.02, "#fff");
      }
      // crocodile reptile eye (yellow slit)
      px(ctx, x+s*0.70, y+s*0.36+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.71, y+s*0.37+bob, s*0.04, s*0.04, "#ffe070");
      px(ctx, x+s*0.73, y+s*0.37+bob, s*0.01, s*0.04, "#000");
      // cockpit canopy (glass dome on the back)
      px(ctx, x+s*0.40, y+s*0.24+bob, s*0.20, s*0.10, "#7ad0ff");
      px(ctx, x+s*0.42, y+s*0.26+bob, s*0.04, s*0.04, "#fff");          // glass shine
      // tail fin (vertical stabilizer)
      px(ctx, x+s*0.18, y+s*0.20+bob, s*0.06, s*0.18, sp.color1);
      // espresso bombs hanging
      px(ctx, x+s*0.32, y+s*0.66+bob, s*0.06, s*0.10, "#3a2218");
      px(ctx, x+s*0.32, y+s*0.66+bob, s*0.06, s*0.02, "#fff");           // bomb crema
      px(ctx, x+s*0.62, y+s*0.66+bob, s*0.06, s*0.10, "#3a2218");
      px(ctx, x+s*0.62, y+s*0.66+bob, s*0.06, s*0.02, "#fff");
      // landing gear feet
      px(ctx, x+s*0.30, y+s*0.74+bob, s*0.08, s*0.04, "#222");
      px(ctx, x+s*0.62, y+s*0.74+bob, s*0.08, s*0.04, "#222");
    },
    BOMBARDIRO(ctx, sp, x, y, s, t) {
      SPECIAL.BOMBARDINO(ctx, sp, x, y, s, t);
      // Extra: moustache + extra bombs
      px(ctx, x+s*0.74, y+s*0.55, s*0.16, s*0.04, "#1a1008");
      px(ctx, x+s*0.46, y+s*0.66, s*0.06, s*0.10, "#3a2218");
      px(ctx, x+s*0.46, y+s*0.66, s*0.06, s*0.02, "#fff");
    },
    // Wooden creature with a bat. Now has rounder face, drum body texture.
    TUNGTUNG(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      const swing = Math.sin(t * 0.006) * (s*0.05);
      shadow(ctx, x + s/2, y + s - 4, s*0.38, 4);
      // wooden cylindrical body (drum shape)
      px(ctx, x+s*0.26, y+s*0.22+bob, s*0.46, s*0.56, sp.color1);
      px(ctx, x+s*0.24, y+s*0.26+bob, s*0.50, s*0.04, "#5a3818");        // top hoop
      px(ctx, x+s*0.24, y+s*0.70+bob, s*0.50, s*0.04, "#5a3818");        // bottom hoop
      // wood grain
      px(ctx, x+s*0.30, y+s*0.36+bob, s*0.02, s*0.30, "#5a3818");
      px(ctx, x+s*0.40, y+s*0.36+bob, s*0.02, s*0.30, "#5a3818");
      px(ctx, x+s*0.58, y+s*0.36+bob, s*0.02, s*0.30, "#5a3818");
      px(ctx, x+s*0.66, y+s*0.36+bob, s*0.02, s*0.30, "#5a3818");
      // big wooden head on top
      px(ctx, x+s*0.32, y+s*0.10+bob, s*0.36, s*0.18, sp.color1);
      px(ctx, x+s*0.30, y+s*0.14+bob, s*0.40, s*0.10, sp.color1);
      // huge googly eyes
      px(ctx, x+s*0.36, y+s*0.13+bob, s*0.12, s*0.10, "#fff");
      px(ctx, x+s*0.52, y+s*0.13+bob, s*0.12, s*0.10, "#fff");
      const eyeShift = Math.sin(t * 0.003) * 0.02;
      px(ctx, x+s*(0.40+eyeShift), y+s*0.16+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*(0.56+eyeShift), y+s*0.16+bob, s*0.04, s*0.04, "#000");
      // mouth (open, surprised)
      px(ctx, x+s*0.44, y+s*0.22+bob, s*0.12, s*0.04, "#000");
      px(ctx, x+s*0.46, y+s*0.23+bob, s*0.08, s*0.02, "#a04020");
      // drumstick arm raised, swinging the bat
      px(ctx, x+s*0.72 + swing, y+s*0.34+bob, s*0.06, s*0.20, sp.color1);
      // bat
      px(ctx, x+s*0.72 + swing, y+s*0.18+bob, s*0.10, s*0.20, sp.color1);
      px(ctx, x+s*0.74 + swing, y+s*0.06+bob, s*0.06, s*0.16, sp.color1);
      // other arm hanging
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.06, s*0.18, sp.color1);
      // legs
      px(ctx, x+s*0.34, y+s*0.78+bob, s*0.10, s*0.14, sp.color2);
      px(ctx, x+s*0.56, y+s*0.78+bob, s*0.10, s*0.14, sp.color2);
      // sandals
      px(ctx, x+s*0.32, y+s*0.90+bob, s*0.14, s*0.04, "#000");
      px(ctx, x+s*0.54, y+s*0.90+bob, s*0.14, s*0.04, "#000");
    },
    TUNGTUNGTUNG(ctx, sp, x, y, s, t) {
      SPECIAL.TUNGTUNG(ctx, sp, x, y, s, t);
      // second + third arm with extra bats on the OTHER side
      const swing2 = Math.sin(t * 0.006 + 1.5) * (s*0.05);
      px(ctx, x+s*0.16 + swing2, y+s*0.34, s*0.06, s*0.18, sp.color1);
      px(ctx, x+s*0.10 + swing2, y+s*0.18, s*0.10, s*0.20, sp.color1);
      // glowing brainrot eyes
      px(ctx, x+s*0.40, y+s*0.16, s*0.04, s*0.04, sp.color3);
      px(ctx, x+s*0.56, y+s*0.16, s*0.04, s*0.04, sp.color3);
    },

    // Cow with rings of Saturn around the body
    VACCASATURN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.003) * 1;
      const ringSpin = Math.sin(t * 0.002);
      shadow(ctx, x + s/2, y + s - 4, s*0.45, 4);
      // body (cow torso)
      px(ctx, x+s*0.18, y+s*0.40+bob, s*0.64, s*0.30, sp.color1);
      // black & white spots
      px(ctx, x+s*0.22, y+s*0.46+bob, s*0.10, s*0.10, sp.color2);
      px(ctx, x+s*0.66, y+s*0.50+bob, s*0.12, s*0.10, sp.color2);
      px(ctx, x+s*0.40, y+s*0.42+bob, s*0.08, s*0.06, sp.color2);
      // head
      px(ctx, x+s*0.10, y+s*0.36+bob, s*0.18, s*0.20, sp.color1);
      // muzzle
      px(ctx, x+s*0.04, y+s*0.46+bob, s*0.12, s*0.10, "#ffd0c0");
      px(ctx, x+s*0.06, y+s*0.50+bob, s*0.03, s*0.02, "#000");
      px(ctx, x+s*0.10, y+s*0.50+bob, s*0.03, s*0.02, "#000");
      // horns
      px(ctx, x+s*0.10, y+s*0.30+bob, s*0.04, s*0.06, "#fff5b3");
      px(ctx, x+s*0.22, y+s*0.30+bob, s*0.04, s*0.06, "#fff5b3");
      // big cow eyes
      px(ctx, x+s*0.14, y+s*0.40+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.16, y+s*0.42+bob, s*0.03, s*0.03, "#000");
      // udder
      px(ctx, x+s*0.46, y+s*0.66+bob, s*0.10, s*0.10, "#ffaaaa");
      // legs
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.24 + i*0.14), y+s*0.70+bob, s*0.06, s*0.18, sp.color1);
        px(ctx, x+s*(0.24 + i*0.14), y+s*0.86+bob, s*0.06, s*0.04, "#3a2218");
      }
      // SATURN RINGS — drawn as ellipses around the body
      const cx = x+s*0.5, cy = y+s*0.55+bob;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ringSpin * 0.1 - 0.15);
      ctx.strokeStyle = sp.color3;
      ctx.lineWidth = Math.max(1, s*0.025);
      ctx.beginPath();
      ctx.ellipse(0, 0, s*0.50, s*0.10, 0, 0, Math.PI*2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = Math.max(1, s*0.015);
      ctx.beginPath();
      ctx.ellipse(0, 0, s*0.55, s*0.12, 0, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();
    },

    // Fish wearing a cat head
    TRULIMERO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1.5;
      const tw = Math.sin(t * 0.008) * s*0.04;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // fish body (torpedo, on the right)
      px(ctx, x+s*0.30, y+s*0.42+bob, s*0.50, s*0.26, sp.color1);
      px(ctx, x+s*0.28, y+s*0.50+bob, s*0.40, s*0.10, sp.color3);
      // tail fluke
      px(ctx, x+s*0.78, y+s*0.36+bob - tw, s*0.06, s*0.16, sp.color1);
      px(ctx, x+s*0.78, y+s*0.50+bob + tw, s*0.06, s*0.16, sp.color1);
      // dorsal fin
      px(ctx, x+s*0.50, y+s*0.34+bob, s*0.14, s*0.10, sp.color1);
      // CAT HEAD on the front (left)
      px(ctx, x+s*0.10, y+s*0.30+bob, s*0.30, s*0.30, sp.color2);
      // ears
      px(ctx, x+s*0.10, y+s*0.24+bob, s*0.08, s*0.08, sp.color2);
      px(ctx, x+s*0.32, y+s*0.24+bob, s*0.08, s*0.08, sp.color2);
      px(ctx, x+s*0.13, y+s*0.27+bob, s*0.04, s*0.04, "#ff8aa8");
      px(ctx, x+s*0.35, y+s*0.27+bob, s*0.04, s*0.04, "#ff8aa8");
      // eyes
      px(ctx, x+s*0.16, y+s*0.38+bob, s*0.06, s*0.06, sp.color3);
      px(ctx, x+s*0.28, y+s*0.38+bob, s*0.06, s*0.06, sp.color3);
      px(ctx, x+s*0.18, y+s*0.40+bob, s*0.02, s*0.04, "#000");
      px(ctx, x+s*0.30, y+s*0.40+bob, s*0.02, s*0.04, "#000");
      // nose + mouth
      px(ctx, x+s*0.22, y+s*0.46+bob, s*0.04, s*0.02, "#ff8aa8");
      px(ctx, x+s*0.20, y+s*0.50+bob, s*0.08, s*0.02, "#000");
      // whiskers
      px(ctx, x+s*0.06, y+s*0.46+bob, s*0.06, s*0.01, "#000");
      px(ctx, x+s*0.06, y+s*0.50+bob, s*0.06, s*0.01, "#000");
    },

    // Watermelon-striped tiger
    TIGRILINI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // body (watermelon-green)
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.60, s*0.30, sp.color1);
      // pink rind interior
      px(ctx, x+s*0.24, y+s*0.46+bob, s*0.52, s*0.18, sp.color2);
      // black tiger stripes (also = watermelon seeds)
      for (let i = 0; i < 5; i++) {
        px(ctx, x+s*(0.28 + i*0.10), y+s*0.42+bob, s*0.02, s*0.10, "#1a1a1a");
      }
      // tail
      px(ctx, x+s*0.80, y+s*0.40+bob, s*0.12, s*0.06, sp.color1);
      px(ctx, x+s*0.88, y+s*0.36+bob, s*0.06, s*0.10, sp.color1);
      // head
      px(ctx, x+s*0.10, y+s*0.30+bob, s*0.30, s*0.30, sp.color1);
      // ears
      px(ctx, x+s*0.10, y+s*0.24+bob, s*0.08, s*0.08, sp.color1);
      px(ctx, x+s*0.32, y+s*0.24+bob, s*0.08, s*0.08, sp.color1);
      // tiger face
      px(ctx, x+s*0.16, y+s*0.40+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.28, y+s*0.40+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.18, y+s*0.42+bob, s*0.02, s*0.04, "#000");
      px(ctx, x+s*0.30, y+s*0.42+bob, s*0.02, s*0.04, "#000");
      // muzzle
      px(ctx, x+s*0.20, y+s*0.50+bob, s*0.10, s*0.06, "#fff5e0");
      px(ctx, x+s*0.23, y+s*0.52+bob, s*0.04, s*0.02, "#000");
      // legs
      px(ctx, x+s*0.30, y+s*0.70+bob, s*0.10, s*0.16, sp.color1);
      px(ctx, x+s*0.60, y+s*0.70+bob, s*0.10, s*0.16, sp.color1);
    },

    // Elephant with coconut head
    COCOFANTO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.003) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.5, 4);
      // huge elephant body
      px(ctx, x+s*0.16, y+s*0.42+bob, s*0.68, s*0.32, sp.color1);
      // belly
      px(ctx, x+s*0.20, y+s*0.54+bob, s*0.60, s*0.14, "#a07a5a");
      // huge coconut head
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.32, sp.color2);
      // coconut texture (3 round dots = the holes)
      px(ctx, x+s*0.40, y+s*0.30+bob, s*0.04, s*0.04, "#3a2818");
      px(ctx, x+s*0.50, y+s*0.30+bob, s*0.04, s*0.04, "#3a2818");
      px(ctx, x+s*0.45, y+s*0.36+bob, s*0.04, s*0.04, "#3a2818");
      // coconut hairs
      for (let i = 0; i < 8; i++) {
        px(ctx, x+s*(0.30 + i*0.05), y+s*0.16+bob, s*0.01, s*0.04, "#5a3818");
      }
      // tiny eyes (the elephant peeking out from below)
      px(ctx, x+s*0.36, y+s*0.46+bob, s*0.04, s*0.03, "#fff");
      px(ctx, x+s*0.60, y+s*0.46+bob, s*0.04, s*0.03, "#fff");
      px(ctx, x+s*0.37, y+s*0.46+bob, s*0.02, s*0.03, "#000");
      px(ctx, x+s*0.61, y+s*0.46+bob, s*0.02, s*0.03, "#000");
      // trunk hanging down
      px(ctx, x+s*0.46, y+s*0.50+bob, s*0.08, s*0.20, sp.color1);
      px(ctx, x+s*0.50, y+s*0.68+bob, s*0.08, s*0.04, sp.color1);
      // ears
      px(ctx, x+s*0.06, y+s*0.40+bob, s*0.10, s*0.16, sp.color1);
      px(ctx, x+s*0.84, y+s*0.40+bob, s*0.10, s*0.16, sp.color1);
      // 4 chunky legs
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.22 + i*0.16), y+s*0.74+bob, s*0.10, s*0.14, sp.color1);
        px(ctx, x+s*(0.22 + i*0.16), y+s*0.86+bob, s*0.10, s*0.04, "#3a2218");
      }
    },

    // Slot machine 777
    SEVENSEVEN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.006) * 1.5;
      const flash = (Math.floor(t * 0.005) % 2) === 0;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // slot machine body
      px(ctx, x+s*0.18, y+s*0.20+bob, s*0.64, s*0.60, sp.color1);
      // chrome highlights
      px(ctx, x+s*0.18, y+s*0.20+bob, s*0.64, s*0.04, "#fff5b3");
      px(ctx, x+s*0.18, y+s*0.78+bob, s*0.64, s*0.02, "#a08820");
      // top crown lights (flashing)
      const lightColor = flash ? "#fff" : sp.color2;
      for (let i = 0; i < 5; i++) {
        px(ctx, x+s*(0.22 + i*0.12), y+s*0.16+bob, s*0.06, s*0.04, lightColor);
      }
      // three reels showing 7 7 7
      for (let i = 0; i < 3; i++) {
        px(ctx, x+s*(0.24 + i*0.18), y+s*0.34+bob, s*0.14, s*0.20, "#fff");
        // draw a "7" in the reel
        px(ctx, x+s*(0.26 + i*0.18), y+s*0.36+bob, s*0.10, s*0.03, sp.color2);
        px(ctx, x+s*(0.32 + i*0.18), y+s*0.36+bob, s*0.04, s*0.16, sp.color2);
      }
      // payout slot
      px(ctx, x+s*0.30, y+s*0.62+bob, s*0.40, s*0.08, "#000");
      // coin spilling out
      px(ctx, x+s*0.46, y+s*0.66+bob, s*0.08, s*0.04, sp.color2);
      // lever on the right
      px(ctx, x+s*0.84, y+s*0.30+bob, s*0.04, s*0.20, "#888");
      px(ctx, x+s*0.83, y+s*0.28+bob, s*0.06, s*0.06, sp.color2);
      // little googly eyes (it's alive!)
      px(ctx, x+s*0.32, y+s*0.26+bob, s*0.04, s*0.04, "#fff");
      px(ctx, x+s*0.62, y+s*0.26+bob, s*0.04, s*0.04, "#fff");
      px(ctx, x+s*0.33, y+s*0.27+bob, s*0.02, s*0.02, "#000");
      px(ctx, x+s*0.63, y+s*0.27+bob, s*0.02, s*0.02, "#000");
    },

    // AI-generated horror — six fingers, glitchy
    AISLOP(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.003) * 1;
      const glitch = Math.sin(t * 0.02) * s*0.02;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // body — pastel pinkish blob
      px(ctx, x+s*0.20, y+s*0.34+bob, s*0.60, s*0.40, sp.color1);
      px(ctx, x+s*0.16, y+s*0.40+bob, s*0.68, s*0.20, sp.color1);
      // glitchy color shifts
      px(ctx, x+s*0.22 + glitch, y+s*0.48+bob, s*0.20, s*0.06, sp.color2);
      px(ctx, x+s*0.55 - glitch, y+s*0.42+bob, s*0.16, s*0.06, sp.color3);
      // too-many eyes
      px(ctx, x+s*0.28, y+s*0.40+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.46, y+s*0.38+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.62, y+s*0.40+bob, s*0.08, s*0.06, "#fff");
      px(ctx, x+s*0.30, y+s*0.42+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.48, y+s*0.40+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.64, y+s*0.42+bob, s*0.04, s*0.04, "#000");
      // smile too wide
      px(ctx, x+s*0.30, y+s*0.58+bob, s*0.40, s*0.04, "#fff");
      px(ctx, x+s*0.30, y+s*0.58+bob, s*0.40, s*0.02, "#000");
      px(ctx, x+s*0.30, y+s*0.62+bob, s*0.40, s*0.02, "#000");
      // SIX FINGERS on each hand (the AI tell)
      for (let i = 0; i < 6; i++) {
        px(ctx, x+s*(0.04 + i*0.025), y+s*0.66+bob, s*0.02, s*0.10, sp.color1);
        px(ctx, x+s*(0.78 + i*0.025), y+s*0.66+bob, s*0.02, s*0.10, sp.color1);
      }
      // legs
      px(ctx, x+s*0.32, y+s*0.74+bob, s*0.10, s*0.16, sp.color1);
      px(ctx, x+s*0.58, y+s*0.74+bob, s*0.10, s*0.16, sp.color1);
    },

    // Skibidi Toiletto — bald head poking out of a toilet, singing into
    // a mic. Faithful to the actual Skibidi Toilet meme (NOT the
    // slicked-back CEO look it had before). Head is bald, eyes wild.
    SKIBIDI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1.5;
      const eyeWiggle = Math.sin(t * 0.012);
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);

      // Toilet bowl base (white porcelain)
      px(ctx, x+s*0.16, y+s*0.62+bob, s*0.68, s*0.22, "#f4f4f4");
      px(ctx, x+s*0.16, y+s*0.62+bob, s*0.68, s*0.04, "#d8d8d8");
      // Bowl rim shading
      px(ctx, x+s*0.16, y+s*0.82+bob, s*0.68, s*0.02, "#a8a8a8");
      // Toilet tank behind the head
      px(ctx, x+s*0.22, y+s*0.46+bob, s*0.56, s*0.18, "#ececec");
      px(ctx, x+s*0.22, y+s*0.46+bob, s*0.56, s*0.03, "#c0c0c0");
      // Flusher knob on tank
      px(ctx, x+s*0.74, y+s*0.48+bob, s*0.05, s*0.04, "#a0a0a0");
      // Water visible through the bowl opening
      px(ctx, x+s*0.28, y+s*0.68+bob, s*0.44, s*0.08, "#5a8aff");
      px(ctx, x+s*0.30, y+s*0.68+bob, s*0.40, s*0.02, "#7aaaff");

      // BALD HEAD popping out the top — pink/skin color, wide
      px(ctx, x+s*0.28, y+s*0.18+bob, s*0.44, s*0.32, "#ffd9a0");
      // Subtle skull shading on top
      px(ctx, x+s*0.34, y+s*0.16+bob, s*0.32, s*0.04, "#f0c890");
      // Bald shine streak
      px(ctx, x+s*0.40, y+s*0.20+bob, s*0.10, s*0.02, "#ffe6b3");
      // Big ears
      px(ctx, x+s*0.24, y+s*0.30+bob, s*0.06, s*0.10, "#ffd9a0");
      px(ctx, x+s*0.70, y+s*0.30+bob, s*0.06, s*0.10, "#ffd9a0");
      px(ctx, x+s*0.26, y+s*0.32+bob, s*0.02, s*0.04, "#e0a880");

      // Wide-open eyes — Skibidi's signature unsettling stare
      px(ctx, x+s*0.32, y+s*0.30+bob, s*0.12, s*0.10, "#ffffff");
      px(ctx, x+s*0.56, y+s*0.30+bob, s*0.12, s*0.10, "#ffffff");
      // Pupils that wiggle a bit
      const pupilShift = eyeWiggle * 0.015;
      px(ctx, x+s*(0.36 + pupilShift), y+s*0.32+bob, s*0.05, s*0.06, "#000");
      px(ctx, x+s*(0.60 + pupilShift), y+s*0.32+bob, s*0.05, s*0.06, "#000");
      // Tiny pupil highlights
      px(ctx, x+s*(0.37 + pupilShift), y+s*0.33+bob, s*0.01, s*0.01, "#fff");
      px(ctx, x+s*(0.61 + pupilShift), y+s*0.33+bob, s*0.01, s*0.01, "#fff");

      // Singing-mouth (the meme's distinctive open-mouth singing pose)
      px(ctx, x+s*0.40, y+s*0.42+bob, s*0.20, s*0.06, "#000");
      px(ctx, x+s*0.42, y+s*0.43+bob, s*0.16, s*0.03, "#a04020");
      // Tiny teeth on top
      px(ctx, x+s*0.44, y+s*0.42+bob, s*0.02, s*0.02, "#fff");
      px(ctx, x+s*0.48, y+s*0.42+bob, s*0.02, s*0.02, "#fff");
      px(ctx, x+s*0.52, y+s*0.42+bob, s*0.02, s*0.02, "#fff");
      px(ctx, x+s*0.56, y+s*0.42+bob, s*0.02, s*0.02, "#fff");

      // Microphone held up to mouth
      px(ctx, x+s*0.46, y+s*0.50+bob, s*0.04, s*0.12, "#1a1a1a");
      // Mic head
      px(ctx, x+s*0.42, y+s*0.46+bob, s*0.12, s*0.06, "#444");
      px(ctx, x+s*0.43, y+s*0.47+bob, s*0.10, s*0.04, "#666");
      // Mic mesh dots
      px(ctx, x+s*0.45, y+s*0.48+bob, s*0.02, s*0.01, "#888");
      px(ctx, x+s*0.49, y+s*0.48+bob, s*0.02, s*0.01, "#888");
    },

    // Glorbo Florbo — small alien blob with one big eye, pointy
    // antennae, and dangly tentacles. Faithful to the actual brainrot
    // meme (the Family-Guy "they put Glorbo in" reference). Pulsing
    // glow stays — it's the recognizable bit — but the shape now reads
    // as a tiny critter, not just a luminous puddle.
    GLORBO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.006) * 2;
      const pulse = 0.5 + Math.sin(t * 0.004) * 0.5;
      const wig = Math.sin(t * 0.01);
      shadow(ctx, x + s/2, y + s - 4, s*0.36, 4);

      // Outer pulsing glow halo (kept — it's the iconic look)
      ctx.fillStyle = `rgba(201,61,255,${0.1 * pulse})`;
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.5+bob, s*0.5, s*0.42, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,138,255,${0.18 * pulse})`;
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.5+bob, s*0.4, s*0.34, 0, 0, Math.PI*2);
      ctx.fill();

      // Antennae — two pointy stalks with bulbs on top, slight wiggle
      ctx.strokeStyle = sp.color1;
      ctx.lineWidth = Math.max(1, s*0.025);
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.32+bob);
      ctx.lineTo(x+s*(0.30 + wig*0.02), y+s*0.16+bob);
      ctx.moveTo(x+s*0.62, y+s*0.32+bob);
      ctx.lineTo(x+s*(0.68 - wig*0.02), y+s*0.16+bob);
      ctx.stroke();
      // Antenna bulbs
      px(ctx, x+s*(0.28 + wig*0.02), y+s*0.14+bob, s*0.06, s*0.06, sp.color2);
      px(ctx, x+s*(0.66 - wig*0.02), y+s*0.14+bob, s*0.06, s*0.06, sp.color2);

      // Body — a single squat lumpy oval
      ctx.fillStyle = sp.color1;
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.5+bob, s*0.30, s*0.24, 0, 0, Math.PI*2);
      ctx.fill();
      // Belly highlight
      ctx.fillStyle = sp.color2;
      ctx.beginPath();
      ctx.ellipse(x+s*0.46, y+s*0.56+bob, s*0.16, s*0.08, 0, 0, Math.PI*2);
      ctx.fill();

      // ONE BIG EYE in the center — the meme's single most-iconic feature
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.46+bob, s*0.13, s*0.11, 0, 0, Math.PI*2);
      ctx.fill();
      // Pupil tracking slightly with wig
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(x+s*(0.5 + wig*0.025), y+s*0.47+bob, s*0.06, s*0.06, 0, 0, Math.PI*2);
      ctx.fill();
      // Eye highlight
      px(ctx, x+s*(0.52 + wig*0.025), y+s*0.45+bob, s*0.02, s*0.02, "#fff");

      // Wide grinning mouth (curved fang line below eye)
      ctx.strokeStyle = "#000";
      ctx.lineWidth = Math.max(1, s*0.018);
      ctx.beginPath();
      ctx.arc(x+s*0.5, y+s*0.62+bob, s*0.10, 0.15*Math.PI, 0.85*Math.PI);
      ctx.stroke();
      // Two tiny fangs
      px(ctx, x+s*0.44, y+s*0.66+bob, s*0.02, s*0.04, "#fff");
      px(ctx, x+s*0.54, y+s*0.66+bob, s*0.02, s*0.04, "#fff");

      // Three dangly tentacle legs
      for (let i = 0; i < 3; i++) {
        const lx = x+s*(0.30 + i*0.20);
        const ly = y+s*0.72+bob;
        const sway = Math.sin(t * 0.008 + i*1.5) * s*0.02;
        px(ctx, lx + sway, ly, s*0.06, s*0.04, sp.color1);
        px(ctx, lx + sway*1.5, ly + s*0.04, s*0.06, s*0.04, sp.color1);
        px(ctx, lx + sway*2, ly + s*0.08, s*0.08, s*0.04, sp.color2);
      }

      // Floating sparkles around (kept from old version)
      for (let i = 0; i < 4; i++) {
        const a = t * 0.003 + i * Math.PI/2;
        const sx = x+s*0.5 + Math.cos(a) * s*0.40;
        const sy = y+s*0.5+bob + Math.sin(a) * s*0.30;
        px(ctx, sx, sy, s*0.03, s*0.03, sp.color2);
      }
    },

    // Ohio Skibidini — chaotic gremlin, reality bends
    OHIO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.008) * 2;
      const wobble = Math.sin(t * 0.012) * s*0.02;
      shadow(ctx, x + s/2, y + s - 4, s*0.45, 4);
      // chaos aura ring
      for (let i = 0; i < 6; i++) {
        const a = t * 0.005 + i * Math.PI/3;
        const sx = x+s*0.5 + Math.cos(a) * s*0.45;
        const sy = y+s*0.5+bob + Math.sin(a) * s*0.30;
        px(ctx, sx, sy, s*0.04, s*0.04, sp.color1);
      }
      // body (jagged shape)
      px(ctx, x+s*0.20+wobble, y+s*0.40+bob, s*0.60, s*0.30, sp.color2);
      px(ctx, x+s*0.16-wobble, y+s*0.46+bob, s*0.20, s*0.20, sp.color2);
      px(ctx, x+s*0.64+wobble, y+s*0.46+bob, s*0.20, s*0.20, sp.color2);
      // glitch slashes
      px(ctx, x+s*0.28, y+s*0.50+bob, s*0.16, s*0.02, sp.color1);
      px(ctx, x+s*0.56, y+s*0.56+bob, s*0.20, s*0.02, sp.color3);
      // mismatched eyes (one big, one small, both glowing)
      px(ctx, x+s*0.28, y+s*0.42+bob, s*0.16, s*0.10, sp.color3);
      px(ctx, x+s*0.30, y+s*0.44+bob, s*0.10, s*0.06, "#000");
      px(ctx, x+s*0.34, y+s*0.46+bob, s*0.02, s*0.02, "#fff");
      px(ctx, x+s*0.58, y+s*0.46+bob, s*0.06, s*0.06, sp.color3);
      px(ctx, x+s*0.59, y+s*0.47+bob, s*0.04, s*0.04, "#000");
      // jagged mouth
      px(ctx, x+s*0.32, y+s*0.62+bob, s*0.36, s*0.04, "#000");
      for (let i = 0; i < 6; i++) {
        px(ctx, x+s*(0.34 + i*0.06), y+s*0.60+bob, s*0.02, s*0.02, "#fff");
      }
      // claw arms
      px(ctx, x+s*0.04, y+s*0.50+bob, s*0.10, s*0.04, sp.color1);
      px(ctx, x+s*0.86, y+s*0.50+bob, s*0.10, s*0.04, sp.color1);
      // legs
      px(ctx, x+s*0.30, y+s*0.70+bob, s*0.10, s*0.16, sp.color2);
      px(ctx, x+s*0.60, y+s*0.70+bob, s*0.10, s*0.16, sp.color2);
    },

    // Sigma Wolfini — stoic lone wolf
    SIGMAWOLF(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.003) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.42, 4);
      // body
      px(ctx, x+s*0.18, y+s*0.46+bob, s*0.58, s*0.24, sp.color1);
      px(ctx, x+s*0.24, y+s*0.56+bob, s*0.50, s*0.10, sp.color3);
      // tail
      px(ctx, x+s*0.74, y+s*0.42+bob, s*0.10, s*0.10, sp.color1);
      px(ctx, x+s*0.82, y+s*0.36+bob, s*0.06, s*0.16, sp.color1);
      // head
      px(ctx, x+s*0.10, y+s*0.34+bob, s*0.30, s*0.26, sp.color1);
      // pointed ears
      px(ctx, x+s*0.10, y+s*0.26+bob, s*0.06, s*0.10, sp.color1);
      px(ctx, x+s*0.32, y+s*0.26+bob, s*0.06, s*0.10, sp.color1);
      // muzzle
      px(ctx, x+s*0.04, y+s*0.44+bob, s*0.14, s*0.10, sp.color1);
      px(ctx, x+s*0.04, y+s*0.50+bob, s*0.06, s*0.04, "#000");
      // unblinking sigma eyes (bright blue)
      px(ctx, x+s*0.16, y+s*0.40+bob, s*0.06, s*0.04, sp.color2);
      px(ctx, x+s*0.28, y+s*0.40+bob, s*0.06, s*0.04, sp.color2);
      px(ctx, x+s*0.18, y+s*0.41+bob, s*0.02, s*0.02, "#000");
      px(ctx, x+s*0.30, y+s*0.41+bob, s*0.02, s*0.02, "#000");
      // sigma scar
      px(ctx, x+s*0.20, y+s*0.34+bob, s*0.02, s*0.06, "#fff");
      // legs
      px(ctx, x+s*0.24, y+s*0.70+bob, s*0.06, s*0.14, sp.color1);
      px(ctx, x+s*0.40, y+s*0.70+bob, s*0.06, s*0.14, sp.color1);
      px(ctx, x+s*0.56, y+s*0.70+bob, s*0.06, s*0.14, sp.color1);
      px(ctx, x+s*0.66, y+s*0.70+bob, s*0.06, s*0.14, sp.color1);
    },

    // Cappuccino Assassino — cup with two katanas
    CAPPUASS(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      const slash = Math.sin(t * 0.008) * s*0.04;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // saucer
      px(ctx, x+s*0.16, y+s*0.78+bob, s*0.68, s*0.06, "#d8d8d8");
      px(ctx, x+s*0.22, y+s*0.74+bob, s*0.56, s*0.06, "#fff5b3");
      // cup
      px(ctx, x+s*0.26, y+s*0.40+bob, s*0.48, s*0.36, sp.color1);
      // handle
      px(ctx, x+s*0.74, y+s*0.50+bob, s*0.10, s*0.18, sp.color1);
      px(ctx, x+s*0.78, y+s*0.54+bob, s*0.06, s*0.10, "#0d0d18");
      // cappuccino crema on top
      px(ctx, x+s*0.30, y+s*0.36+bob, s*0.40, s*0.06, sp.color2);
      // foam art (a leaf)
      px(ctx, x+s*0.46, y+s*0.34+bob, s*0.08, s*0.04, "#5a3818");
      // assassin eyes (red glow)
      px(ctx, x+s*0.34, y+s*0.50+bob, s*0.10, s*0.06, "#ff3d3d");
      px(ctx, x+s*0.56, y+s*0.50+bob, s*0.10, s*0.06, "#ff3d3d");
      px(ctx, x+s*0.36, y+s*0.52+bob, s*0.04, s*0.04, "#000");
      px(ctx, x+s*0.58, y+s*0.52+bob, s*0.04, s*0.04, "#000");
      // mouth
      px(ctx, x+s*0.42, y+s*0.62+bob, s*0.16, s*0.02, "#000");
      // TWO KATANAS (one swinging)
      // left katana (handle behind)
      px(ctx, x+s*0.04 + slash, y+s*0.40+bob, s*0.04, s*0.40, "#1a1a1a");          // handle
      px(ctx, x+s*0.06 + slash, y+s*0.20+bob, s*0.02, s*0.20, "#cfe9ff");          // blade
      px(ctx, x+s*0.07 + slash, y+s*0.16+bob, s*0.02, s*0.04, "#fff");             // tip glint
      // right katana
      px(ctx, x+s*0.92 - slash, y+s*0.40+bob, s*0.04, s*0.40, "#1a1a1a");
      px(ctx, x+s*0.92 - slash, y+s*0.20+bob, s*0.02, s*0.20, "#cfe9ff");
      px(ctx, x+s*0.93 - slash, y+s*0.16+bob, s*0.02, s*0.04, "#fff");
    },

    // Lirili Larila — cactus elephant in flip-flops
    LIRILI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.003) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.45, 4);
      // big elephant body, green cactus skin
      px(ctx, x+s*0.18, y+s*0.42+bob, s*0.64, s*0.34, sp.color1);
      px(ctx, x+s*0.20, y+s*0.54+bob, s*0.60, s*0.18, "#3a7a30");
      // cactus spines (vertical lines)
      for (let i = 0; i < 6; i++) {
        px(ctx, x+s*(0.24 + i*0.10), y+s*0.44+bob, s*0.01, s*0.20, "#1e4a18");
      }
      // small cactus flower on back
      px(ctx, x+s*0.42, y+s*0.40+bob, s*0.06, s*0.04, sp.color2);
      // head
      px(ctx, x+s*0.06, y+s*0.36+bob, s*0.18, s*0.22, sp.color1);
      // trunk
      px(ctx, x+s*0.02, y+s*0.50+bob, s*0.10, s*0.08, sp.color1);
      px(ctx, x+s*0.00, y+s*0.56+bob, s*0.08, s*0.04, sp.color1);
      // ear
      px(ctx, x+s*0.04, y+s*0.40+bob, s*0.06, s*0.10, sp.color1);
      // eye
      px(ctx, x+s*0.12, y+s*0.42+bob, s*0.05, s*0.05, "#fff");
      px(ctx, x+s*0.13, y+s*0.43+bob, s*0.03, s*0.03, "#000");
      // 4 legs
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.22 + i*0.16), y+s*0.74+bob, s*0.08, s*0.12, sp.color1);
        // flip-flops
        px(ctx, x+s*(0.20 + i*0.16), y+s*0.86+bob, s*0.12, s*0.04, sp.color3);
        px(ctx, x+s*(0.24 + i*0.16), y+s*0.84+bob, s*0.02, s*0.04, "#ffe070");
      }
    },

    // Brr Brr Patapim — baboon-tree creature
    PATAPIM(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.004) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.4, 4);
      // tree trunk legs
      px(ctx, x+s*0.30, y+s*0.62+bob, s*0.10, s*0.24, sp.color2);
      px(ctx, x+s*0.60, y+s*0.62+bob, s*0.10, s*0.24, sp.color2);
      px(ctx, x+s*0.30, y+s*0.86+bob, s*0.10, s*0.04, "#3a2218");
      px(ctx, x+s*0.60, y+s*0.86+bob, s*0.10, s*0.04, "#3a2218");
      // body — green leafy torso
      px(ctx, x+s*0.22, y+s*0.34+bob, s*0.56, s*0.32, sp.color1);
      // leafy tufts
      px(ctx, x+s*0.18, y+s*0.30+bob, s*0.10, s*0.10, sp.color1);
      px(ctx, x+s*0.72, y+s*0.30+bob, s*0.10, s*0.10, sp.color1);
      // baboon head
      px(ctx, x+s*0.30, y+s*0.10+bob, s*0.40, s*0.26, sp.color2);
      // long proboscis nose
      px(ctx, x+s*0.32, y+s*0.22+bob, s*0.10, s*0.16, "#ff8aa8");
      // eyes
      px(ctx, x+s*0.46, y+s*0.18+bob, s*0.06, s*0.06, "#ffe070");
      px(ctx, x+s*0.58, y+s*0.18+bob, s*0.06, s*0.06, "#ffe070");
      px(ctx, x+s*0.48, y+s*0.20+bob, s*0.02, s*0.04, "#000");
      px(ctx, x+s*0.60, y+s*0.20+bob, s*0.02, s*0.04, "#000");
      // mouth
      px(ctx, x+s*0.46, y+s*0.30+bob, s*0.16, s*0.02, "#000");
    },

    // Trippi Troppi — cat-shrimp floater
    TRIPPI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.006) * 2;  // floats higher
      shadow(ctx, x + s/2, y + s - 2, s*0.3, 3);
      // shrimp body (curled, segmented)
      px(ctx, x+s*0.20, y+s*0.40+bob, s*0.50, s*0.20, sp.color1);
      // shrimp segments (orange stripes)
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.24 + i*0.12), y+s*0.40+bob, s*0.02, s*0.20, sp.color2);
      }
      // shrimp tail curling up
      px(ctx, x+s*0.66, y+s*0.34+bob, s*0.10, s*0.06, sp.color1);
      px(ctx, x+s*0.70, y+s*0.28+bob, s*0.06, s*0.06, sp.color1);
      // tiny shrimp legs underneath
      for (let i = 0; i < 4; i++) {
        px(ctx, x+s*(0.24 + i*0.10), y+s*0.60+bob, s*0.02, s*0.06, sp.color1);
      }
      // CAT HEAD on top
      px(ctx, x+s*0.20, y+s*0.18+bob, s*0.30, s*0.24, sp.color3);
      // cat ears
      px(ctx, x+s*0.20, y+s*0.12+bob, s*0.08, s*0.08, sp.color3);
      px(ctx, x+s*0.42, y+s*0.12+bob, s*0.08, s*0.08, sp.color3);
      // floating effect — small ground-shimmer beneath body
      px(ctx, x+s*0.30, y+s*s + 0, s*0.40, s*0.01, "rgba(255,255,255,0.3)");
      // big eyes
      px(ctx, x+s*0.24, y+s*0.24+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.36, y+s*0.24+bob, s*0.06, s*0.06, "#fff");
      px(ctx, x+s*0.26, y+s*0.26+bob, s*0.02, s*0.04, "#000");
      px(ctx, x+s*0.38, y+s*0.26+bob, s*0.02, s*0.04, "#000");
      // confused expression — wiggly mouth
      const wig = Math.sin(t * 0.01);
      px(ctx, x+s*0.28, y+s*0.34+bob, s*0.04, s*0.02, "#000");
      px(ctx, x+s*0.32 + wig*0.5, y+s*0.32+bob, s*0.04, s*0.02, "#000");
      px(ctx, x+s*0.36, y+s*0.34+bob, s*0.04, s*0.02, "#000");
    },

    // Pigeonore di Venezia — tired pigeon
    PIGEONORE(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.005) * 1;
      shadow(ctx, x + s/2, y + s - 4, s*0.35, 4);
      // body
      px(ctx, x+s*0.26, y+s*0.40+bob, s*0.46, s*0.28, sp.color1);
      // chest pop
      px(ctx, x+s*0.30, y+s*0.46+bob, s*0.36, s*0.16, "#c8c8c8");
      // wing
      px(ctx, x+s*0.50, y+s*0.40+bob, s*0.20, s*0.16, sp.color2);
      // head
      px(ctx, x+s*0.20, y+s*0.30+bob, s*0.20, s*0.18, sp.color1);
      // beak (orange)
      px(ctx, x+s*0.10, y+s*0.36+bob, s*0.10, s*0.06, sp.color3);
      // eye (tired)
      px(ctx, x+s*0.26, y+s*0.34+bob, s*0.04, s*0.02, "#000");
      // legs
      px(ctx, x+s*0.36, y+s*0.68+bob, s*0.02, s*0.10, sp.color3);
      px(ctx, x+s*0.56, y+s*0.68+bob, s*0.02, s*0.10, sp.color3);
      px(ctx, x+s*0.34, y+s*0.78+bob, s*0.06, s*0.02, sp.color3);
      px(ctx, x+s*0.54, y+s*0.78+bob, s*0.06, s*0.02, sp.color3);
    },

    // Cringefly — cringe energy moth
    CRINGEFLY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t * 0.012) * 3;
      const wing = Math.sin(t * 0.04);
      shadow(ctx, x + s/2, y + s - 4, s*0.25, 3);
      // wings (flapping)
      const wW = s*0.30 + wing * s*0.06;
      ctx.fillStyle = sp.color1;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(x+s*0.30, y+s*0.40+bob, wW, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x+s*0.70, y+s*0.40+bob, wW, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
      // wing patterns (2026 cringe spiral)
      px(ctx, x+s*0.26, y+s*0.40+bob, s*0.04, s*0.04, sp.color2);
      px(ctx, x+s*0.66, y+s*0.40+bob, s*0.04, s*0.04, sp.color2);
      // body
      px(ctx, x+s*0.42, y+s*0.36+bob, s*0.16, s*0.30, sp.color3);
      // big anime eyes
      px(ctx, x+s*0.40, y+s*0.32+bob, s*0.08, s*0.08, "#fff");
      px(ctx, x+s*0.52, y+s*0.32+bob, s*0.08, s*0.08, "#fff");
      px(ctx, x+s*0.42, y+s*0.34+bob, s*0.04, s*0.06, "#000");
      px(ctx, x+s*0.54, y+s*0.34+bob, s*0.04, s*0.06, "#000");
      // antennae
      px(ctx, x+s*0.42, y+s*0.20+bob, s*0.02, s*0.10, sp.color3);
      px(ctx, x+s*0.56, y+s*0.20+bob, s*0.02, s*0.10, sp.color3);
      px(ctx, x+s*0.40, y+s*0.18+bob, s*0.04, s*0.04, sp.color2);
      px(ctx, x+s*0.56, y+s*0.18+bob, s*0.04, s*0.04, sp.color2);
    },

    // Vacca Galaxia — Saturn cow's evolved form
    VACCAGALAXIA(ctx, sp, x, y, s, t) {
      SPECIAL.VACCASATURN(ctx, sp, x, y, s, t);
      // extra cosmic ring + stars
      const cx = x+s*0.5, cy = y+s*0.55 + Math.sin(t * 0.003);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.0008 + 0.3);
      ctx.strokeStyle = "rgba(255,215,0,0.7)";
      ctx.lineWidth = Math.max(1, s*0.02);
      ctx.beginPath();
      ctx.ellipse(0, 0, s*0.62, s*0.16, 0, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();
      // tiny stars around
      for (let i = 0; i < 4; i++) {
        const a = t * 0.001 + i * Math.PI/2;
        px(ctx, x+s*0.5 + Math.cos(a)*s*0.45, y+s*0.45 + Math.sin(a)*s*0.30, s*0.03, s*0.03, "#fff");
      }
    },

    // Cocofantitan — bigger tougher Cocofanto
    COCOFANTITAN(ctx, sp, x, y, s, t) {
      SPECIAL.COCOFANTO(ctx, sp, x, y, s, t);
      // armor plates on legs
      px(ctx, x+s*0.22, y+s*0.78, s*0.10, s*0.04, "#1a1a1a");
      px(ctx, x+s*0.38, y+s*0.78, s*0.10, s*0.04, "#1a1a1a");
      px(ctx, x+s*0.54, y+s*0.78, s*0.10, s*0.04, "#1a1a1a");
      px(ctx, x+s*0.70, y+s*0.78, s*0.10, s*0.04, "#1a1a1a");
      // chest crystal
      px(ctx, x+s*0.46, y+s*0.50, s*0.08, s*0.10, sp.color3);
    },

    // Skibidini Maximus — Skibidi's evolved form, with crown
    SKIBIDINI(ctx, sp, x, y, s, t) {
      SPECIAL.SKIBIDI(ctx, sp, x, y, s, t);
      // crown on top of the slicked-back head
      const bob = Math.sin(t * 0.005) * 1.5;
      px(ctx, x+s*0.36, y+s*0.06+bob, s*0.28, s*0.04, sp.color2);
      px(ctx, x+s*0.40, y+s*0.02+bob, s*0.04, s*0.06, sp.color2);
      px(ctx, x+s*0.48, y+s*0.00+bob, s*0.04, s*0.08, sp.color2);
      px(ctx, x+s*0.56, y+s*0.02+bob, s*0.04, s*0.06, sp.color2);
      // gem
      px(ctx, x+s*0.49, y+s*0.04+bob, s*0.02, s*0.02, "#ff3d3d");
    },

    // Glorbnoxion — Glorbo's final, aggressive form
    GLORBNOXION(ctx, sp, x, y, s, t) {
      // start from Glorbo's pulsing blob
      SPECIAL.GLORBO(ctx, sp, x, y, s, t);
      // add second eye + jagged rage tendrils
      const bob = Math.sin(t * 0.006) * 2;
      px(ctx, x+s*0.28, y+s*0.46+bob, s*0.10, s*0.08, "#fff");
      px(ctx, x+s*0.30, y+s*0.48+bob, s*0.06, s*0.04, "#000");
      // angry brow lines
      px(ctx, x+s*0.30, y+s*0.42+bob, s*0.10, s*0.02, sp.color3);
      px(ctx, x+s*0.50, y+s*0.42+bob, s*0.10, s*0.02, sp.color3);
      // jagged tendrils sticking out
      const jag = Math.sin(t * 0.01);
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3 + jag * 0.3;
        const r = s*0.42;
        px(ctx, x+s*0.5 + Math.cos(a) * r, y+s*0.5 + Math.sin(a) * r * 0.7, s*0.04, s*0.06, sp.color1);
      }
    },

    // Tung-Tung-Tung Sahur Maximus — a pile of bats with a face
    TUNGTITAN(ctx, sp, x, y, s, t) {
      // base on TUNGTUNG with massive scaling
      SPECIAL.TUNGTUNGTUNG(ctx, sp, x, y, s, t);
      // crown of bats around the head
      const swing = Math.sin(t * 0.008);
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI*0.6 + (i / 4) * Math.PI*1.2 + swing * 0.05;
        const bx = x+s*0.5 + Math.cos(a) * s*0.42;
        const by = y+s*0.18 + Math.sin(a) * s*0.20;
        px(ctx, bx, by, s*0.04, s*0.10, sp.color3);
      }
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
  // ===== PLAYER & NPC HUMAN SPRITES =====
  // Both characters share a 16×16 footprint and a 4-frame walk cycle.
  // The walk cycle is:
  //   0 = contact-L (both feet down, body low)
  //   1 = left-lead (left foot forward, body slightly raised)
  //   2 = contact-R (both feet down, body low; eye-blink frame)
  //   3 = right-lead (right foot forward, body slightly raised)

  // Shared ground shadow under any humanoid sprite
  function shadow16(ctx, x, y) {
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.beginPath();
    ctx.ellipse(x+8, y+15.4, 4.5, 1.4, 0, 0, Math.PI*2);
    ctx.fill();
  }

  // Draws a human character with overalls + a colored shirt visible at
  // collar + headband. Used by both player (with cap) and NPCs (with
  // role-specific hat/hair on top).
  function drawHumanBody(ctx, x, y, frame, opts) {
    const f = ((frame|0) % 4 + 4) % 4;
    const bob = (f === 1 || f === 3) ? -1 : 0;
    const skin = opts.skin || "#ffd9a0";
    const shirt = opts.shirt;            // collar/sleeves visible color
    const overalls = opts.overalls || "#1f3aaa";
    const overallsLight = opts.overallsLight || shade(overalls, 0.18);
    const shoe = opts.shoe || "#000";

    // Pant-legs: stride pose
    ctx.fillStyle = overalls;
    if (f === 0 || f === 2) {
      ctx.fillRect(x+5, y+12+bob, 2, 3);
      ctx.fillRect(x+9, y+12+bob, 2, 3);
    } else if (f === 1) {
      ctx.fillRect(x+5, y+11+bob, 2, 4);
      ctx.fillRect(x+9, y+13+bob, 2, 2);
    } else {
      ctx.fillRect(x+5, y+13+bob, 2, 2);
      ctx.fillRect(x+9, y+11+bob, 2, 4);
    }
    // Shoes
    ctx.fillStyle = shoe;
    ctx.fillRect(x+4, y+15+bob, 3, 1);
    ctx.fillRect(x+9, y+15+bob, 3, 1);

    // Torso — overalls main body
    ctx.fillStyle = overalls;
    ctx.fillRect(x+4, y+9+bob, 8, 4);
    // Belt
    ctx.fillStyle = shade(overalls, -0.4);
    ctx.fillRect(x+4, y+12+bob, 8, 1);
    // Shirt collar showing above overalls
    ctx.fillStyle = shirt;
    ctx.fillRect(x+4, y+8+bob, 8, 1);
    // Overall shoulder straps (V across the chest)
    ctx.fillStyle = overallsLight;
    ctx.fillRect(x+5, y+9+bob, 1, 2);
    ctx.fillRect(x+10, y+9+bob, 1, 2);
    // Single overall button
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(x+7, y+10+bob, 1, 1);
    ctx.fillRect(x+8, y+10+bob, 1, 1);

    // Arms — swing opposite the leading leg
    ctx.fillStyle = skin;
    const armOffL = (f === 1) ?  1 : (f === 3) ? -1 : 0;
    const armOffR = (f === 3) ?  1 : (f === 1) ? -1 : 0;
    ctx.fillRect(x+3, y+9+bob+armOffL, 1, 3);
    ctx.fillRect(x+12, y+9+bob+armOffR, 1, 3);
    // Tiny shirt cuff
    ctx.fillStyle = shirt;
    ctx.fillRect(x+3, y+8+bob+armOffL, 1, 1);
    ctx.fillRect(x+12, y+8+bob+armOffR, 1, 1);

    // Head
    ctx.fillStyle = skin;
    ctx.fillRect(x+4, y+3+bob, 8, 5);
    // Neck shadow line
    ctx.fillStyle = shade(skin, -0.25);
    ctx.fillRect(x+5, y+8+bob, 6, 1);

    return { f, bob, skin };
  }

  // Player: blue trainer with red cap. Reads as Pokemon-Red-protagonist
  // silhouette but with a more refined face.
  function drawPlayer(ctx, x, y, dir, frame) {
    shadow16(ctx, x, y);
    const { f, bob, skin } = drawHumanBody(ctx, x, y, frame, {
      skin: "#ffd9a0",
      shirt: "#ffe6c0",
      overalls: "#1a3aaa",
      overallsLight: "#3a5cff",
      shoe: "#1a1a1a",
    });

    // Hair tufts visible under the cap (sides + back)
    ctx.fillStyle = "#5a3a1a";
    ctx.fillRect(x+4, y+5+bob, 1, 2);
    ctx.fillRect(x+11, y+5+bob, 1, 2);
    if (dir === "up") ctx.fillRect(x+4, y+6+bob, 8, 1);  // back of head

    // Cap base (red Pokemon-style, with a thin white band)
    ctx.fillStyle = "#cc2222";
    ctx.fillRect(x+3, y+1+bob, 10, 3);
    ctx.fillRect(x+5, y+bob, 6, 1);
    // Cap white band stripe
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x+3, y+3+bob, 10, 1);
    // Cap highlight (sun-side)
    ctx.fillStyle = "#ff5e5e";
    ctx.fillRect(x+5, y+1+bob, 2, 1);
    // Cap pokeball-style circle on the front (when facing down/sideways)
    if (dir !== "up") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x+7, y+2+bob, 2, 1);
      ctx.fillStyle = "#cc2222";
      ctx.fillRect(x+7, y+1+bob, 2, 1);
    }
    // Cap brim — directional
    ctx.fillStyle = "#7a0e0e";
    if (dir === "down")       ctx.fillRect(x+5, y+4+bob, 6, 1);
    else if (dir === "up")    ctx.fillRect(x+5, y+1+bob, 6, 1);
    else if (dir === "left")  ctx.fillRect(x+1, y+3+bob, 3, 1);
    else if (dir === "right") ctx.fillRect(x+12, y+3+bob, 3, 1);

    // Eyes + mouth — directional, eyes blink on f===2
    drawHumanFace(ctx, x, y, dir, f, bob, skin, "#1a1a1a");
  }

  // NPCs: same body template, but with a `kind` field that swaps
  // hair / hat / accessory so different roles are visually distinct.
  // kind: "trainer" | "healer" | "shop" | "ferry" | "npc" | "sign" | "item"
  function drawNpc(ctx, x, y, color, frame, kind) {
    if (kind === "sign" || kind === "item") return; // tile-rendered, not human
    shadow16(ctx, x, y);
    // Healer / shop / ferry get specific uniform colors so the SHIRT
    // color is more about role than the per-NPC `color` value (which
    // becomes hair color instead — same as Pokemon Red NPCs).
    const palette = npcPalette(kind, color);
    const { f, bob, skin } = drawHumanBody(ctx, x, y, frame, palette);

    // Hair (under hat, but visible on sides)
    ctx.fillStyle = palette.hair;
    if (kind !== "ferry" && kind !== "shop") {
      // wide hair sweep across the top
      ctx.fillRect(x+3, y+2+bob, 10, 2);
      ctx.fillRect(x+4, y+1+bob, 8, 1);
    } else {
      // just side-burns when wearing a hat
      ctx.fillRect(x+4, y+4+bob, 1, 2);
      ctx.fillRect(x+11, y+4+bob, 1, 2);
    }

    // Role-specific hat
    if (kind === "healer") {
      // Pink barista hairband
      ctx.fillStyle = "#ff8aa8";
      ctx.fillRect(x+3, y+1+bob, 10, 2);
      ctx.fillRect(x+5, y+bob, 6, 1);
      // Heart decoration
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x+7, y+1+bob, 2, 1);
    } else if (kind === "shop") {
      // Gold visor / shopkeeper apron tag
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(x+3, y+3+bob, 10, 1);
      ctx.fillStyle = "#5a3a1a";
      ctx.fillRect(x+3, y+1+bob, 10, 2);
    } else if (kind === "ferry") {
      // Sailor hat (white round + black brim)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x+3, y+1+bob, 10, 2);
      ctx.fillRect(x+4, y+bob, 8, 1);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+3, y+3+bob, 10, 1);
      // Anchor squiggle
      ctx.fillStyle = "#3a78dc";
      ctx.fillRect(x+7, y+1+bob, 2, 1);
    } else if (kind === "trainer") {
      // No hat — the bright shirt color is the giveaway, plus a small
      // shoulder strap accent to look "kitted out for battle"
      ctx.fillStyle = shade(palette.shirt, -0.3);
      ctx.fillRect(x+4, y+8+bob, 1, 1);
      ctx.fillRect(x+11, y+8+bob, 1, 1);
    }
    // "npc" kind = no hat, just hair

    drawHumanFace(ctx, x, y, "down", f, bob, skin, "#1a1a1a");
  }

  // Maps NPC kind + per-NPC color into shirt/overalls/hair palette.
  function npcPalette(kind, color) {
    if (kind === "healer") return {
      skin: "#ffd9a0", shirt: "#ffffff",
      overalls: "#ff8aa8", overallsLight: "#ffaac0",
      shoe: "#fff", hair: shade(color || "#ff8aa8", -0.5),
    };
    if (kind === "shop") return {
      skin: "#ffd9a0", shirt: "#ffe070",
      overalls: "#5a3a1a", overallsLight: "#7a5a3a",
      shoe: "#3a2218", hair: "#3a2218",
    };
    if (kind === "ferry") return {
      skin: "#ffd9a0", shirt: "#ffffff",
      overalls: "#1a3a78", overallsLight: "#3a78dc",
      shoe: "#1a1a1a", hair: "#1a1a1a",
    };
    if (kind === "trainer") return {
      skin: "#ffd9a0", shirt: color,
      overalls: shade(color, -0.45), overallsLight: shade(color, -0.2),
      shoe: "#1a1a1a", hair: shade(color || "#5a3a1a", -0.55),
    };
    // Generic civilian NPC
    return {
      skin: "#ffd9a0", shirt: color,
      overalls: shade(color || "#aaa", -0.3),
      overallsLight: shade(color || "#aaa", 0),
      shoe: "#1a1a1a", hair: shade(color || "#5a3a1a", -0.5),
    };
  }

  // Shared face renderer (eyes + mouth) for all humans.
  function drawHumanFace(ctx, x, y, dir, f, bob, skin, eyeColor) {
    const blink = (f === 2);
    ctx.fillStyle = eyeColor;
    if (dir === "down") {
      if (blink) {
        ctx.fillRect(x+5, y+6+bob, 1, 1);
        ctx.fillRect(x+10, y+6+bob, 1, 1);
      } else {
        ctx.fillRect(x+5, y+5+bob, 1, 2);
        ctx.fillRect(x+10, y+5+bob, 1, 2);
      }
      // Subtle mouth
      ctx.fillRect(x+7, y+7+bob, 2, 1);
      // Cheek tint (warm)
      ctx.fillStyle = "rgba(255,138,168,0.55)";
      ctx.fillRect(x+5, y+7+bob, 1, 1);
      ctx.fillRect(x+10, y+7+bob, 1, 1);
    } else if (dir === "up") {
      // Back of head — nothing
    } else if (dir === "left") {
      ctx.fillRect(x+4, y+5+bob, 1, blink ? 1 : 2);
      ctx.fillRect(x+5, y+7+bob, 2, 1);
    } else if (dir === "right") {
      ctx.fillRect(x+11, y+5+bob, 1, blink ? 1 : 2);
      ctx.fillRect(x+9, y+7+bob, 2, 1);
    }
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
  // x, y = SCREEN coords (where to paint). tx, ty = WORLD tile coords,
  // used for deterministic per-tile details (window placement etc.) so
  // those don't dance as the camera scrolls. tx/ty are optional so older
  // call sites still work but won't have stable details.
  function drawTile(ctx, type, x, y, time, tx, ty) {
    if (tx === undefined) tx = x / 16;
    if (ty === undefined) ty = y / 16;
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
        // Window placement based on world tile (tx, ty) so a given wall
        // tile always has — or always doesn't have — a window. Used to
        // be screen-coord-based, which made windows flicker in/out as
        // the camera scrolled.
        if ((tx + ty) % 3 === 0) {
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
