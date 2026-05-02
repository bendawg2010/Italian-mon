// =====================================================
// Overworld map, NPCs, encounter zones - bigger world
// =====================================================

const World = (() => {
  const T = {
    G: 0, H: 1, P: 2, W: 3, R: 4, B: 5, D: 6, S: 7, F: 8, L: 9,
    SAND: 10, SNOW: 11, ROCK: 12, BRIDGE: 13, SHOP_FLOOR: 14,
  };

  // 50 wide x 40 tall
  // Regions:
  // North: Forest (rows 1-12)
  // Middle: Hometown / Pasta Town (rows 13-25)
  // East: Beach / Coast (cols 30-49, rows 13-30)
  // South: Gym Town (rows 26-38)
  const RAW_MAP = [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WGGWWWWWWWGGGGGGGGGGGGGGGGGGGWWWWWWWWWWWGGGGGGGGGW",
    "WGGWWWWWGGGHHHHHHHHHHGGGGGGGGGGWWWWWWGGGGHHHHHHGGW",
    "WGGGGGGGGGGHHHHHHHHHHGGGGGGGGGGGGGGGGGGGGHHHHHHGGW",
    "WGGGGLGGGGGHHHHHHHHHHGGGGGGGGGGGGGGGGGGGGHHHHHHGGW",
    "WGGGGGGGGSGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGWWWWWWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGWWWWWWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGGGGGGGGGGGSGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGHHHHHHHHGGGGGGGGGGGGGGHHHHHHHHHHGGGGGW",
    "WGGGGGGGGPGGHHHHHHHHGGGGGGGGGGGGGGHHHHHHHHHHGGGGGW",
    "WGGGGGGGGPGGHHHHHHHHGGGGGGGGGGGGGGHHHHHHHHHHGGGGGW",
    "WGGGGGGGGPGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WWGGGLGGGPPPPPPPPPPPPPPPPPPPPPPGGGGGGGGGGGGGGGGGGW",
    "WGGGBBBBBPGGGGGGGGGGGGGGGGGGGGPGGGGGGGGGGGGGGGGGGW",
    "WGGGBFFFBPGGGGGGGGGGSGGGGGGGGGPGGGGGGGGGGGGGGGGGGW",
    "WGGGBFFFDPGGGGGGGGGGGGGGGGGGGGPGGGGGGGGGGGGGGGGGGW",
    "WGGGBFFFBPGGGBBBBBGGGGGGGGGGGGPGGGGGRRRRRRRRRRGGGW",
    "WGGGBBBBBPGGGB$$$BGGGGGGGGGGGGPPPPPPGGRRRRRRRRGGGW",
    "WGGGGGGGGPGGGB$$$DGGGGGGGGGGGGGGGGGGGGGRRRRRRGGGGW",
    "WGGGGGGGGPGGGBBBBBGGGGGGGGGGGGGGGGGGGGGGRRRRGGGGGW",
    "WGGGGGGGGPGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGGSGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGHHHHHGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPGGHHHHHGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGPPPPPPPPPPPPPPPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGGGGGGGGGGGGGGGPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGGGGGGGGGGGGGGGPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGBBBBPBBBBBBBBBBPGGGGGSGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGBFFFFFFFFFFFFFBPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGBFFFFFFFFFFFFFBPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGBFFFFFFFFFFFFFBPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGBFFFFFFFFFFFFFBPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGBBBBBDBBBBBBBBBPGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGGGGGGGGGPGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WGGGGLLLGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGLLLGGGGGGGGW",
    "WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  ];

  function charToTile(c) {
    return ({
      G: T.G, H: T.H, P: T.P, W: T.W, R: T.R,
      B: T.B, D: T.D, S: T.S, F: T.F, L: T.L,
      $: T.SHOP_FLOOR,
    })[c] ?? T.G;
  }

  const map = RAW_MAP.map(row => row.split("").map(charToTile));
  const HEIGHT = map.length;
  const WIDTH = map[0].length;
  const TILE = SpriteRenderer.TILE_SIZE;

  // NPCs
  const npcs = [
    {
      id: "rival_1", x: 14, y: 13, color: "#ff5e5e", facing: "down", defeated: false,
      type: "trainer",
      dialog: ["Marco: Hey! You finally have a meme of your own?", "Marco: Let's see if you've got the rizz to back it up!"],
      trainerKey: "RIVAL_1",
    },
    {
      id: "nurse", x: 5, y: 17, color: "#ff8aa8", facing: "down", type: "healer",
      dialog: ["Barista: Welcome to the Cappuccino Bar!", "Barista: Your monsters look exhausted... Let me top them up.", "(*HSSSS* — espresso machine sounds)", "Barista: All restored. Ciao!"],
    },
    {
      id: "shopkeeper", x: 16, y: 19, color: "#ffd700", facing: "down", type: "shop",
      dialog: ["Shopkeeper: Welcome to the Brain Cell Mart!", "Shopkeeper: I sell quality vibes. What'll it be?"],
    },
    {
      id: "pasta_chef", x: 18, y: 5, color: "#ffe070", facing: "down", defeated: false, type: "trainer",
      dialog: ["Luigi: Mamma mia! You smell of fresh meme energy.", "Luigi: My pasta-monsters demand a battle!"],
      trainerKey: "TRAINER_1",
    },
    {
      id: "sigma_bro", x: 22, y: 14, color: "#9aa5ff", facing: "down", defeated: false, type: "trainer",
      dialog: ["Kai: I don't say hi. I just stare.", "Kai: ...you still here? Fine. Battle me."],
      trainerKey: "TRAINER_2",
    },
    {
      id: "bird_lady", x: 12, y: 6, color: "#a08a5a", facing: "down", defeated: false, type: "trainer",
      dialog: ["Bird Lady: Coooo! The pigeons whisper of you.", "Bird Lady: Fight my flock!"],
      trainerKey: "BIRD_LADY",
    },
    {
      id: "fisher", x: 38, y: 20, color: "#3a78dc", facing: "down", defeated: false, type: "trainer",
      dialog: ["Fisher Tony: I caught a tralalero this big once!", "Fisher Tony: Watch me hook your team."],
      trainerKey: "FISHER",
    },
    {
      id: "beach_bum", x: 35, y: 24, color: "#ffaa66", facing: "down", defeated: false, type: "trainer",
      dialog: ["Beach Bum: Yo, surf's up. Wanna battle?"],
      trainerKey: "BEACH_BUM",
    },
    {
      id: "rival_2", x: 28, y: 28, color: "#ff5e5e", facing: "down", defeated: false, type: "trainer",
      dialog: ["Marco: I've been training! No more freebies.", "Marco: This time my team is built different."],
      trainerKey: "RIVAL_2",
    },
    {
      id: "ramp_chef", x: 20, y: 24, color: "#a3361f", facing: "down", defeated: false, type: "trainer",
      dialog: ["Pizza Chef Greg: My margheritron is 800 degrees!", "Pizza Chef Greg: You will be charred."],
      trainerKey: "PIZZA_CHEF",
    },
    {
      id: "elite_1", x: 14, y: 33, color: "#5a3818", facing: "down", defeated: false, type: "trainer",
      dialog: ["Elite Cappuccino: I am the first of the Espresso Four.", "Elite Cappuccino: Steam yourself ready."],
      trainerKey: "ELITE_1",
    },
    {
      id: "queen", x: 18, y: 33, color: "#c93dff", facing: "down", defeated: false, type: "trainer",
      dialog: ["Brainrot Queen: You've climbed far, challenger.", "Brainrot Queen: But the deepest lore is mine.", "Brainrot Queen: Tralalero tralala... your final test begins."],
      trainerKey: "GYM_LEADER",
    },
    // signs
    { id: "sign1", x: 9, y: 5, color: null, type: "sign", dialog: ["[ROUTE 1]\nWild brain rot lurks in tall grass.\nSay 'tralalero' to befriend them."] },
    { id: "sign2", x: 22, y: 9, color: null, type: "sign", dialog: ["[ROUTE 2]\nDanger Level: VERY 2026.\nLore knowledge required."] },
    { id: "sign3", x: 13, y: 16, color: null, type: "sign", dialog: ["☕ CAPPUCCINO BAR ☕\nFully restores your team.\nFree espresso. We promise."] },
    { id: "sign4", x: 13, y: 23, color: null, type: "sign", dialog: ["▶ SOUTH: Gym Town\n▼ Continue training!"] },
    { id: "sign5", x: 30, y: 30, color: null, type: "sign", dialog: ["[BEACH ROUTE]\nWatch out for swimmers.\nThe sand is suspiciously hot."] },
    { id: "sign6", x: 12, y: 4, color: null, type: "sign", dialog: ["[FOREST]\nThe trees here whisper 'patapim'.\nDo not respond."] },
    // NPCs (non-trainer chatter)
    {
      id: "kid", x: 11, y: 14, color: "#5fa84a", facing: "down", type: "npc",
      dialog: ["Kid: Did you know Tralalero used to wear flip-flops?", "Kid: Now it's strictly Nikes. Times change!"],
    },
    {
      id: "old_man", x: 7, y: 23, color: "#aabbcc", facing: "down", type: "npc",
      dialog: ["Old Man: In my day, we only had ONE skibidi toilet.", "Old Man: ...kids these days have like 80."],
    },
    {
      id: "lore_master", x: 25, y: 5, color: "#9b6b9b", facing: "down", type: "npc",
      dialog: ["Lore Master: The deepest brainrot truth?", "Lore Master: ...is that we are all skibidi inside."],
    },
    {
      id: "merchant", x: 36, y: 16, color: "#ffd700", facing: "down", type: "item",
      dialog: ["Treasure! You found a Pasta Elixir!"],
      itemKey: "ELIXIR",
      consumed: false,
    },
    {
      id: "treasure_1", x: 11, y: 11, color: "#ff8aff", facing: "down", type: "item",
      dialog: ["Treasure! You found a Doppio Espresso!"],
      itemKey: "ESPRESSO_DBL",
      consumed: false,
    },
    {
      id: "treasure_2", x: 41, y: 4, color: "#ff8aff", facing: "down", type: "item",
      dialog: ["Treasure! You found a Great Cell!"],
      itemKey: "GREATCELL",
      consumed: false,
    },
    {
      id: "treasure_3", x: 38, y: 30, color: "#ff8aff", facing: "down", type: "item",
      dialog: ["Treasure! You found an Ultra Cell!"],
      itemKey: "ULTRACELL",
      consumed: false,
    },
  ];

  // Encounter zones based on which "biome" the tile sits in
  function encounterTableAt(tx, ty) {
    if (ty <= 5) return "FOREST_NORTH"; // forest area top
    if (ty <= 13 && tx >= 30) return "FOREST_EAST"; // east forest patch
    if (ty >= 25 && tx <= 12) return "GYM_GRASS"; // grass near gym
    if (tx >= 30) return "BEACH";
    if (ty >= 8 && ty <= 14 && tx >= 12 && tx <= 22) return "ROUTE_2";
    return "ROUTE_1";
  }

  function tileAt(x, y) {
    if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return T.W;
    return map[y][x];
  }

  function isWalkable(x, y) {
    const t = tileAt(x, y);
    if (t === T.W || t === T.R || t === T.B || t === T.S) return false;
    for (const n of npcs) {
      if (n.consumed) continue;
      if (n.x === x && n.y === y) return false;
    }
    return true;
  }

  function npcAt(x, y) {
    return npcs.find(n => !n.consumed && n.x === x && n.y === y);
  }

  function isEncounterTile(x, y) {
    return tileAt(x, y) === T.H;
  }

  function draw(ctx, cam, time) {
    const startX = Math.max(0, Math.floor(cam.x / TILE) - 1);
    const startY = Math.max(0, Math.floor(cam.y / TILE) - 1);
    const endX = Math.min(WIDTH, Math.ceil((cam.x + ctx.canvas.width) / TILE) + 1);
    const endY = Math.min(HEIGHT, Math.ceil((cam.y + ctx.canvas.height) / TILE) + 1);
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const sx = x*TILE - cam.x;
        const sy = y*TILE - cam.y;
        SpriteRenderer.drawTile(ctx, map[y][x], sx, sy, time);
      }
    }
    const frame = Math.floor(time / 350);
    for (const n of npcs) {
      if (n.consumed) continue;
      if (n.color === null) continue;
      const sx = n.x*TILE - cam.x;
      const sy = n.y*TILE - cam.y;
      if (sx < -TILE || sx > ctx.canvas.width || sy < -TILE || sy > ctx.canvas.height) continue;
      SpriteRenderer.drawNpc(ctx, sx, sy, n.color, frame);
    }
  }

  return {
    map, WIDTH, HEIGHT, TILE,
    tileAt, isWalkable, npcAt, isEncounterTile,
    encounterTableAt, draw, npcs, T,
  };
})();
