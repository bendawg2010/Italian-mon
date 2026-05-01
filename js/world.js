// =====================================================
// Overworld map, NPCs, encounter zones
// =====================================================

const World = (() => {
  const T = {
    G: 0, // grass
    H: 1, // tall grass (encounter)
    P: 2, // path
    W: 3, // wall (tree)
    R: 4, // water
    B: 5, // building wall
    D: 6, // door
    S: 7, // sign
    F: 8, // healing floor
    L: 9, // flower
  };

  // Map: 30 wide x 22 tall
  // Use chars to make readable
  const RAW_MAP = [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WGGGGGGGGGGGGGWWWWWWWWWWWWWWWW",
    "WGLGLGGGGGGGGGWWGGGGGGGGGGGGGW",
    "WGGGGGGGSGGGGGWGGHHHHHHHHHGGGW",
    "WGGGGGGGPGGGGGGGHHHHHHHHHGGGGW",
    "WGGBBBBBPGGGGGGGGGGGGGGGGGGGGW",
    "WGGBFFFBPGGGGGGGGGGGGGGGGGGGGW",
    "WGGBFFFBPGGGGGGGSGGGHHHHHHHGGW",
    "WGGBFFFDPPPPPPPPPGGGHHHHHHHGGW",
    "WGGBBBBBGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGPGGGGGGGGGRRRRRGGGGGGW",
    "WGGGGGGGPGHHHHHGGRRRRRRRRGGGGW",
    "WGGGGGGGPGHHHHHGGRRRRRRRRGGGGW",
    "WGGGGGGGPGHHHHHGGGGRRRRRGGGGGW",
    "WGGGGGGGPGGSGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGPGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGPGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGBBPBBGGGGGGGGGGGGGGGGGGW",
    "WGGGGGBFFFBGGGGGGGGGGGGGGGGGGW",
    "WGGGGGBFFFBGGGGGGGGGGGGGGGGGGW",
    "WGGGGGBBBBBGGGGGGGGGGGGGGGGGGW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  ];

  function charToTile(c) {
    return ({
      G: T.G, H: T.H, P: T.P, W: T.W, R: T.R,
      B: T.B, D: T.D, S: T.S, F: T.F, L: T.L,
    })[c] ?? T.G;
  }

  const map = RAW_MAP.map(row => row.split("").map(charToTile));
  const HEIGHT = map.length;
  const WIDTH = map[0].length;
  const TILE = SpriteRenderer.TILE_SIZE;

  // NPCs
  const npcs = [
    {
      id: "rival",
      x: 14, y: 5,
      color: "#ff5e5e",
      facing: "down",
      defeated: false,
      dialog: ["Marco: Hey! You finally have a meme of your own?", "Marco: Let's see if you've got the rizz to back it up!"],
      trainerKey: "RIVAL_1",
      type: "trainer",
    },
    {
      id: "nurse",
      x: 5, y: 7,
      color: "#ff8aa8",
      facing: "down",
      type: "healer",
      dialog: ["Barista: Welcome to the Cappuccino Bar!", "Barista: Your monsters look exhausted... Let me top them up.", "(*HSSSS* — espresso machine sounds)", "Barista: All restored. Ciao!"],
    },
    {
      id: "pasta_chef",
      x: 16, y: 14,
      color: "#ffe070",
      facing: "down",
      defeated: false,
      dialog: ["Luigi: Mamma mia! You smell of fresh meme energy.", "Luigi: My pasta-monsters demand a battle!"],
      trainerKey: "TRAINER_1",
      type: "trainer",
    },
    {
      id: "sigma_bro",
      x: 18, y: 8,
      color: "#9aa5ff",
      facing: "down",
      defeated: false,
      dialog: ["Kai: I don't say hi. I just stare.", "Kai: ...you still here? Fine. Battle me."],
      trainerKey: "TRAINER_2",
      type: "trainer",
    },
    {
      id: "queen",
      x: 8, y: 19,
      color: "#c93dff",
      facing: "down",
      defeated: false,
      dialog: ["Brainrot Queen: You've climbed far, challenger.", "Brainrot Queen: But the deepest lore is mine.", "Brainrot Queen: Tralalero tralala... your final test begins."],
      trainerKey: "GYM_LEADER",
      type: "trainer",
    },
    {
      id: "sign1",
      x: 8, y: 3,
      color: null,
      type: "sign",
      dialog: ["[ROUTE 1]\nWild brain rot lurks in tall grass.\nSay 'tralalero' to befriend them."],
    },
    {
      id: "sign2",
      x: 16, y: 7,
      color: null,
      type: "sign",
      dialog: ["[ROUTE 2]\nDanger Level: VERY 2026.\nLore knowledge required."],
    },
    {
      id: "sign3",
      x: 11, y: 14,
      color: null,
      type: "sign",
      dialog: ["☕ CAPPUCCINO BAR ☕\nFully restores your team.\nFree espresso. We promise."],
    },
  ];

  // Encounter zones: which ENCOUNTER table per region
  function encounterTableAt(tx, ty) {
    if (tx >= 16 && tx <= 24 && ty >= 3 && ty <= 4) return "GRASS_ROUTE_2";
    if (tx >= 16 && tx <= 22 && ty >= 7 && ty <= 8) return "GRASS_ROUTE_2";
    return "GRASS_ROUTE_1";
  }

  function tileAt(x, y) {
    if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return T.W;
    return map[y][x];
  }

  function isWalkable(x, y) {
    const t = tileAt(x, y);
    if (t === T.W || t === T.R || t === T.B || t === T.S) return false;
    // check NPC collision
    for (const n of npcs) {
      if (n.x === x && n.y === y) return false;
    }
    return true;
  }

  function npcAt(x, y) {
    return npcs.find(n => n.x === x && n.y === y);
  }

  function isEncounterTile(x, y) {
    return tileAt(x, y) === T.H;
  }

  function isHealerTile(x, y) {
    return tileAt(x, y) === T.F;
  }

  // Camera-based draw
  function draw(ctx, cam, time) {
    const startX = Math.max(0, Math.floor(cam.x / TILE));
    const startY = Math.max(0, Math.floor(cam.y / TILE));
    const endX = Math.min(WIDTH, Math.ceil((cam.x + ctx.canvas.width) / TILE));
    const endY = Math.min(HEIGHT, Math.ceil((cam.y + ctx.canvas.height) / TILE));
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const sx = x*TILE - cam.x;
        const sy = y*TILE - cam.y;
        SpriteRenderer.drawTile(ctx, map[y][x], sx, sy, time);
      }
    }
    // npcs
    const frame = Math.floor(time / 350);
    for (const n of npcs) {
      if (n.color === null) continue; // signs render as tiles
      const sx = n.x*TILE - cam.x;
      const sy = n.y*TILE - cam.y;
      if (sx < -TILE || sx > ctx.canvas.width || sy < -TILE || sy > ctx.canvas.height) continue;
      SpriteRenderer.drawNpc(ctx, sx, sy, n.color, frame);
    }
  }

  return {
    map, WIDTH, HEIGHT, TILE,
    tileAt, isWalkable, npcAt, isEncounterTile, isHealerTile,
    encounterTableAt, draw, npcs, T,
  };
})();
