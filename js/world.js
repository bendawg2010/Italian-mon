// =====================================================
// Overworld map, NPCs, encounter zones - bigger world
// =====================================================

const World = (() => {
  const T = {
    G: 0, H: 1, P: 2, W: 3, R: 4, B: 5, D: 6, S: 7, F: 8, L: 9,
    SAND: 10, SNOW: 11, ROCK: 12, BRIDGE: 13, SHOP_FLOOR: 14,
    HEAL_SIGN: 15, GYM_FLOOR: 16,
  };

  // 50 wide x 40 tall
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
    "WGGGB##FBPGGGGGGGGGGSGGGGGGGGGPGGGGGGGGGGGGGGGGGGW",
    "WGGGBFFFDPGGGGGGGGGGGGGGGGGGGGPGGGGGGGGGGGGGGGGGGW",
    "WGGGBFFFBPGGGBBBBBGGGGGGGGGGGGPGGGGGRRRRRRRRRRGGGW",
    "WGGGBBBBBPGGGB$$$BGGGGGGGGGGGGPPPPPPGGRRRRRRRRGGGW",
    "WGGGGGGGGPGGGB$$$DGGGGGGGGGGGGGGGGGGGGGRRRRRRGGGGW",
    "WGGGGGGGGPGGGBBBBBGGGGGGGGGGGGGGGGGGGGGGRRRRGGGGGW",
    "WGGGGGGGGPGGGGGGGGGGGGGGGBBBBBBBGGGGGBBBBBGGGGGGGW",
    "WGGGGGGGGPGGGSGGGGGGGGGGGB%%%%%BGGGGGB##FBGGGGGGGW",
    "WGGGGGGGGPGGGGGGGGGGGGGGGB%%%%%DPPPPPDFFFBGGGGGGGW",
    "WGGGGGGGGPGGHHHHHGGGGGGGGB%%%%%BGGGGGBFFFBGGGGGGGW",
    "WGGGGGGGGPGGHHHHHGGGGGGGGBBBBBBBGGGGGBBBBBGGGGGGGW",
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
      "#": T.HEAL_SIGN,
      "%": T.GYM_FLOOR,
    })[c] ?? T.G;
  }

  const map = RAW_MAP.map(row => row.split("").map(charToTile));
  const HEIGHT = map.length;
  const WIDTH = map[0].length;
  const TILE = SpriteRenderer.TILE_SIZE;

  // NPCs (gym leaders are flagged via trainerKey + GYM_*)
  const npcs = [
    // Starting town
    { id: "rival_1", x: 14, y: 13, color: "#ff5e5e", facing: "down", defeated: false, type: "trainer",
      dialog: ["Marco: Hey! You finally have a meme of your own?", "Marco: Let's see if you've got the rizz to back it up!"],
      trainerKey: "RIVAL_1" },
    { id: "nurse", x: 5, y: 17, color: "#ff8aa8", facing: "down", type: "healer",
      dialog: ["Barista: Welcome to the Cappuccino Bar!", "Barista: Your monsters look exhausted... Let me top them up.", "(*HSSSS* — espresso machine sounds)", "Barista: All restored. Ciao!"] },
    { id: "shopkeeper", x: 16, y: 19, color: "#ffd700", facing: "down", type: "shop",
      dialog: ["Shopkeeper: Welcome to the Brain Cell Mart!", "Shopkeeper: Quality vibes for sale. What'll it be?"] },
    // Beach town healer (2nd Cappuccino Bar)
    { id: "nurse_beach", x: 39, y: 24, color: "#ff8aa8", facing: "down", type: "healer",
      dialog: ["Beach Barista: Surf's up! Need some refresh?", "(*HSSSS* — beachside espresso machine sounds)", "Beach Barista: Fully restored! Hang ten!"] },

    // Gym Leaders (5)
    { id: "gym_pasta", x: 18, y: 5, color: "#ffe070", facing: "down", defeated: false, type: "trainer",
      dialog: ["Pasta Gym Leader Luigi: Ah, finally a challenger!", "Luigi: Ready your team. Mamma mia!"],
      trainerKey: "GYM_PASTA" },
    { id: "gym_bird", x: 12, y: 6, color: "#a08a5a", facing: "down", defeated: false, type: "trainer",
      dialog: ["Aviary Gym Leader Pia: Coooo! The pigeons whisper of you.", "Pia: Earn the GUSINI BADGE!"],
      trainerKey: "GYM_BIRD" },
    { id: "gym_sigma", x: 22, y: 14, color: "#9aa5ff", facing: "down", defeated: false, type: "trainer",
      dialog: ["Sigma Gym Leader Kai: I don't say hi. I just stare.", "Kai: Earn the SIGMA BADGE if you have what it takes."],
      trainerKey: "GYM_SIGMA" },
    { id: "gym_beach", x: 38, y: 20, color: "#3a78dc", facing: "down", defeated: false, type: "trainer",
      dialog: ["Sea Gym Leader Tony: I caught a tralalero THIS big.", "Tony: TRALALERO BADGE awaits."],
      trainerKey: "GYM_BEACH" },
    { id: "gym_fire", x: 28, y: 24, color: "#a3361f", facing: "down", defeated: false, type: "trainer",
      dialog: ["Fire Gym Leader Greg: 800 degrees!", "Greg: Earn the BOMBARDINO BADGE."],
      trainerKey: "GYM_FIRE" },

    // Espresso Four
    { id: "elite_1", x: 12, y: 33, color: "#5a3818", facing: "down", defeated: false, type: "trainer",
      dialog: ["Espresso Four #1: I am steam.", "Cappuccino: Show me your decaf."],
      trainerKey: "ELITE_1" },
    { id: "elite_2", x: 14, y: 33, color: "#9aa5ff", facing: "down", defeated: false, type: "trainer",
      dialog: ["Espresso Four #2: My aura is sigma.", "Stella: Let's go."],
      trainerKey: "ELITE_2" },
    { id: "elite_3", x: 16, y: 33, color: "#c93dff", facing: "down", defeated: false, type: "trainer",
      dialog: ["Espresso Four #3: I have studied the deepest brainrot.", "Don: Have you?"],
      trainerKey: "ELITE_3" },
    { id: "elite_4", x: 18, y: 33, color: "#d44a2a", facing: "down", defeated: false, type: "trainer",
      dialog: ["Espresso Four #4: It's-a me!", "Mario: I will-a cook you!"],
      trainerKey: "ELITE_4" },
    { id: "champion", x: 20, y: 33, color: "#c93dff", facing: "down", defeated: false, type: "trainer",
      dialog: ["Champion Brainrot Queen: You've climbed far.", "Queen: Tralalero tralala... your final test begins."],
      trainerKey: "CHAMPION" },

    // Other trainers
    { id: "rival_2", x: 28, y: 28, color: "#ff5e5e", facing: "down", defeated: false, type: "trainer",
      dialog: ["Marco: I've been training. I've got 3 badges already.", "Marco: This time you're cooked."],
      trainerKey: "RIVAL_2" },
    { id: "beach_bum", x: 35, y: 24, color: "#ffaa66", facing: "down", defeated: false, type: "trainer",
      dialog: ["Beach Bum Brad: Bruh, wanna battle?"],
      trainerKey: "BEACH_BUM" },
    { id: "hiker", x: 38, y: 6, color: "#7a5a3a", facing: "down", defeated: false, type: "trainer",
      dialog: ["Hiker Beppe: Salve! I climb mountains in espadrilles!"],
      trainerKey: "HIKER" },
    { id: "youngster", x: 11, y: 12, color: "#3aa83a", facing: "down", defeated: false, type: "trainer",
      dialog: ["Youngster Tito: I challenge you with my SHORTS!"],
      trainerKey: "YOUNGSTER" },
    { id: "lass", x: 26, y: 11, color: "#ff8aa8", facing: "down", defeated: false, type: "trainer",
      dialog: ["Lass Bianca: My memes are the cutest!"],
      trainerKey: "LASS" },
    { id: "cultist", x: 42, y: 11, color: "#5a1a8a", facing: "down", defeated: false, type: "trainer",
      dialog: ["Cultist Velvelo: GLORBO! GLORBO!"],
      trainerKey: "CULTIST" },

    // Signs
    { id: "sign_route1", x: 9, y: 5, color: null, type: "sign", dialog: ["[ROUTE 1]\nWild brain rot lurks in tall grass.\nFresh challengers, head north!"] },
    { id: "sign_route2", x: 22, y: 9, color: null, type: "sign", dialog: ["[ROUTE 2]\nDanger Level: VERY 2026.\nLore knowledge required."] },
    { id: "sign_bar", x: 6, y: 16, color: null, type: "sign", dialog: ["★ CAPPUCCINO BAR ★\n\nFully restores your team.\nWalk through the door!"] },
    { id: "sign_gym2", x: 23, y: 23, color: null, type: "sign", dialog: ["★ FIRE GYM ★\nLeader: Greg the 800° Pizzaiolo\nBadge 5 — requires 4 prior badges."] },
    { id: "sign_gym4", x: 39, y: 23, color: null, type: "sign", dialog: ["★ BEACH HEAL SPOT ★\nFully restores your team!\nWalk through the door!"] },
    { id: "sign_south", x: 13, y: 23, color: null, type: "sign", dialog: ["▶ SOUTH: Espresso Four & Champion\nNeed 5 gym badges to enter!"] },
    { id: "sign_beach", x: 30, y: 30, color: null, type: "sign", dialog: ["[BEACH ROUTE]\nThe sand is suspiciously hot.\nGym 4 is east of here."] },
    { id: "sign_forest", x: 12, y: 4, color: null, type: "sign", dialog: ["[FOREST]\nThe trees here whisper 'patapim'.\nDo not respond."] },

    // NPCs (chatter / hint)
    { id: "kid", x: 11, y: 14, color: "#5fa84a", facing: "down", type: "npc",
      dialog: ["Kid: Did you know Tralalero used to wear flip-flops?", "Kid: Now it's strictly Nikes. Times change!"] },
    { id: "old_man", x: 7, y: 23, color: "#aabbcc", facing: "down", type: "npc",
      dialog: ["Old Man: In my day, we had only ONE skibidi toilet.", "Old Man: ...kids these days have like 80."] },
    { id: "lore_master", x: 25, y: 5, color: "#9b6b9b", facing: "down", type: "npc",
      dialog: ["Lore Master: The deepest brainrot truth?", "Lore Master: ...is that we are all skibidi inside.",
               "Lore Master: Press X to open the menu. Check your MEMEDEX!"] },
    { id: "guide_npc", x: 11, y: 22, color: "#ffd700", facing: "down", type: "npc",
      dialog: ["Guide: Welcome, traveler!", "Guide: ★ Cappuccino Bar (heal) is just NORTHWEST of here.",
               "Guide: ★ The 5 GYM LEADERS are scattered around — earn 5 badges to face the Champion.",
               "Guide: ★ Press X for menu, Z to interact, arrows to move."] },

    // Hidden treasure pickups
    { id: "treasure_1", x: 11, y: 11, color: "#ff8aff", facing: "down", type: "item",
      dialog: ["Treasure! You found a Doppio Espresso!"], itemKey: "ESPRESSO_DBL", consumed: false },
    { id: "treasure_2", x: 41, y: 4, color: "#ff8aff", facing: "down", type: "item",
      dialog: ["Treasure! You found a Great Cell!"], itemKey: "GREATCELL", consumed: false },
    { id: "treasure_3", x: 38, y: 30, color: "#ff8aff", facing: "down", type: "item",
      dialog: ["Treasure! You found an Ultra Cell!"], itemKey: "ULTRACELL", consumed: false },
    { id: "treasure_4", x: 47, y: 6, color: "#ff8aff", facing: "down", type: "item",
      dialog: ["Treasure! You found a Pasta Elixir!"], itemKey: "ELIXIR", consumed: false },
  ];

  function encounterTableAt(tx, ty) {
    if (ty <= 5) return "FOREST_NORTH";
    if (ty <= 13 && tx >= 30) return "FOREST_EAST";
    if (ty >= 25 && tx <= 12) return "GYM_GRASS";
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
    if (t === T.W || t === T.R || t === T.B || t === T.S || t === T.HEAL_SIGN) return false;
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
