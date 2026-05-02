// =====================================================
// BRAINROT MONSTERS - Data Module
// All creature definitions, moves, types, type-chart
// =====================================================

const TYPES = {
  PASTA:    { name: "Pasta",    color: "#f5d76e" },
  FIRE:     { name: "Fire",     color: "#ff6b3d" },
  WATER:    { name: "Water",    color: "#3da9ff" },
  EARTH:    { name: "Earth",    color: "#9b6b3a" },
  AIR:      { name: "Air",      color: "#cfe9ff" },
  BEAST:    { name: "Beast",    color: "#7b5e3c" },
  BRAINROT: { name: "Brainrot", color: "#c93dff" },
  SIGMA:    { name: "Sigma",    color: "#9aa5ff" },
  CHAOS:    { name: "Chaos",    color: "#ff3d9b" },
  STEEL:    { name: "Steel",    color: "#9ea6b3" },
};

// type-chart[attacker][defender] -> multiplier
const TYPE_CHART = {
  Pasta:    { Fire: 0.5, Water: 2, Earth: 1, Air: 1, Beast: 1, Brainrot: 0.5, Sigma: 1, Chaos: 1, Steel: 0.5, Pasta: 0.5 },
  Fire:     { Fire: 0.5, Water: 0.5, Earth: 1, Air: 2, Beast: 2, Brainrot: 1, Sigma: 1, Chaos: 1, Steel: 2, Pasta: 2 },
  Water:    { Fire: 2, Water: 0.5, Earth: 0.5, Air: 1, Beast: 1, Brainrot: 1, Sigma: 1, Chaos: 1, Steel: 1, Pasta: 2 },
  Earth:    { Fire: 2, Water: 2, Earth: 1, Air: 0.5, Beast: 1, Brainrot: 1, Sigma: 1, Chaos: 1, Steel: 2, Pasta: 1 },
  Air:      { Fire: 1, Water: 1, Earth: 2, Air: 0.5, Beast: 2, Brainrot: 1, Sigma: 1, Chaos: 1, Steel: 0.5, Pasta: 1 },
  Beast:    { Fire: 0.5, Water: 1, Earth: 1, Air: 0.5, Beast: 1, Brainrot: 2, Sigma: 1, Chaos: 1, Steel: 1, Pasta: 1 },
  Brainrot: { Fire: 1, Water: 1, Earth: 1, Air: 1, Beast: 0.5, Brainrot: 0.5, Sigma: 2, Chaos: 0.5, Steel: 1, Pasta: 2 },
  Sigma:    { Fire: 1, Water: 1, Earth: 1, Air: 1, Beast: 1, Brainrot: 0.5, Sigma: 1, Chaos: 2, Steel: 2, Pasta: 1 },
  Chaos:    { Fire: 1, Water: 1, Earth: 1, Air: 1, Beast: 1, Brainrot: 2, Sigma: 0.5, Chaos: 1, Steel: 1, Pasta: 1 },
  Steel:    { Fire: 0.5, Water: 0.5, Earth: 0.5, Air: 2, Beast: 1, Brainrot: 1, Sigma: 1, Chaos: 1, Steel: 0.5, Pasta: 1 },
};

// Move pool. category: physical / special / status
const MOVES = {
  // generic
  TACKLE:        { name: "Skibidi Tackle",   type: "Beast",    power: 35, acc: 100, pp: 30, cat: "physical" },
  SCREECH:       { name: "Brainrot Screech", type: "Brainrot", power: 20, acc: 100, pp: 25, cat: "special", status: "atk_down" },
  // pasta
  AL_DENTE:      { name: "Al Dente Slam",    type: "Pasta",    power: 50, acc: 95,  pp: 20, cat: "physical" },
  CARBONARA:     { name: "Carbonara Spray",  type: "Pasta",    power: 65, acc: 90,  pp: 15, cat: "special" },
  RIGATONI_RUSH: { name: "Rigatoni Rush",    type: "Pasta",    power: 40, acc: 100, pp: 25, cat: "physical" },
  // fire
  EMBER:         { name: "Espresso Ember",   type: "Fire",     power: 45, acc: 100, pp: 25, cat: "special" },
  BOMBARDINO:    { name: "Bombardino Drop",  type: "Fire",     power: 80, acc: 85,  pp: 10, cat: "physical" },
  CAPPUCCINO:    { name: "Cappuccino Burn",  type: "Fire",     power: 55, acc: 95,  pp: 15, cat: "special" },
  // water
  TRALA_WAVE:    { name: "Tralala Wave",     type: "Water",    power: 60, acc: 100, pp: 15, cat: "special" },
  SHARK_BITE:    { name: "Nike Shark Bite",  type: "Water",    power: 70, acc: 90,  pp: 10, cat: "physical" },
  TOILET_FLUSH:  { name: "Toilet Flush",     type: "Water",    power: 50, acc: 95,  pp: 20, cat: "special" },
  // earth
  CACTUS_PUNCH:  { name: "Cactus Sandal",    type: "Earth",    power: 55, acc: 95,  pp: 20, cat: "physical" },
  FRIDGE_SLAM:   { name: "Frigo Slam",       type: "Earth",    power: 75, acc: 85,  pp: 10, cat: "physical" },
  // air
  GUSINI_DIVE:   { name: "Gusini Dive",      type: "Air",      power: 60, acc: 100, pp: 15, cat: "physical" },
  WHIRLWIND:     { name: "Pasta Whirlwind",  type: "Air",      power: 45, acc: 100, pp: 20, cat: "special" },
  // beast
  BANANA_HURL:   { name: "Banana Hurl",      type: "Beast",    power: 50, acc: 95,  pp: 20, cat: "physical" },
  TUNG_BAT:      { name: "Tung Tung Bat",    type: "Beast",    power: 70, acc: 90,  pp: 10, cat: "physical" },
  // brainrot
  GLORBO_BEAM:   { name: "Glorbo Beam",      type: "Brainrot", power: 75, acc: 90,  pp: 10, cat: "special" },
  CONFUSE_RAY:   { name: "Confuse Ray",      type: "Brainrot", power: 0,  acc: 100, pp: 20, cat: "status", status: "confuse" },
  // sigma
  SIGMA_STARE:   { name: "Sigma Stare",      type: "Sigma",    power: 0,  acc: 100, pp: 20, cat: "status", status: "atk_down" },
  ALPHA_PUNCH:   { name: "Alpha Punch",      type: "Sigma",    power: 80, acc: 80,  pp: 8,  cat: "physical" },
  // chaos
  OHIO_BOMB:     { name: "Ohio Final Bomb",  type: "Chaos",    power: 90, acc: 75,  pp: 5,  cat: "special" },
  RIZZ_CHARM:    { name: "Rizz Charm",       type: "Chaos",    power: 0,  acc: 100, pp: 20, cat: "status", status: "atk_down" },
  // steel
  TOILET_HEAD:   { name: "Toilet Headbutt",  type: "Steel",    power: 65, acc: 95,  pp: 15, cat: "physical" },
  CAMEL_KICK:    { name: "Camel Kick",       type: "Steel",    power: 60, acc: 100, pp: 15, cat: "physical" },
  // healing
  CAPPU_HEAL:    { name: "Cappuccino Sip",   type: "Pasta",    power: 0,  acc: 100, pp: 10, cat: "status", status: "heal" },
};

// Each species: ID, name, type1, type2, base stats, learnset (level->moveId), evolves
// stats roughly 30-90 base
const SPECIES = {
  // ---- STARTERS ----
  TRALALERO: {
    id: "TRALALERO",
    name: "Tralalero",
    flavor: "A three-legged shark in Nikes. Sings nonsense at incredible volume.",
    types: ["Water", "Beast"],
    base: { hp: 50, atk: 55, def: 45, spd: 65 },
    catchRate: 45,
    xpYield: 60,
    learn: [[1, "TACKLE"], [1, "TRALA_WAVE"], [6, "RIGATONI_RUSH"], [12, "SHARK_BITE"], [28, "OHIO_BOMB"]],
    evolvesTo: "TRALALERONE",
    evolvesAt: 18,
    color1: "#3da9ff", color2: "#ffffff", color3: "#ff6b3d",
  },
  TRALALERONE: {
    id: "TRALALERONE",
    name: "Tralalerone",
    flavor: "Evolved form. Wears Nikes on all four legs and three more on its tail.",
    types: ["Water", "Beast"],
    base: { hp: 75, atk: 80, def: 70, spd: 90 },
    catchRate: 25,
    xpYield: 130,
    learn: [[1, "TACKLE"], [1, "SHARK_BITE"], [24, "TRALA_WAVE"], [32, "ALPHA_PUNCH"], [40, "OHIO_BOMB"]],
    color1: "#1f7ad6", color2: "#ffe070", color3: "#ff3d6d",
  },

  BOMBARDINO: {
    id: "BOMBARDINO",
    name: "Bombardino",
    flavor: "A crocodile fused with a WW2 bomber. Drops espresso bombs.",
    types: ["Fire", "Air"],
    base: { hp: 60, atk: 65, def: 50, spd: 50 },
    catchRate: 45,
    xpYield: 65,
    learn: [[1, "TACKLE"], [1, "EMBER"], [6, "WHIRLWIND"], [14, "BOMBARDINO"], [22, "GUSINI_DIVE"], [30, "OHIO_BOMB"]],
    evolvesTo: "BOMBARDIRO",
    evolvesAt: 19,
    color1: "#5a3a2a", color2: "#7a5a3a", color3: "#ff6b3d",
  },
  BOMBARDIRO: {
    id: "BOMBARDIRO",
    name: "Bombardiro",
    flavor: "Now with twin engines AND a moustache. Carries way too many bombs.",
    types: ["Fire", "Air"],
    base: { hp: 85, atk: 95, def: 70, spd: 70 },
    catchRate: 25,
    xpYield: 140,
    learn: [[1, "BOMBARDINO"], [1, "EMBER"], [26, "ALPHA_PUNCH"], [34, "OHIO_BOMB"]],
    color1: "#3a261a", color2: "#a07040", color3: "#ff3d3d",
  },

  TUNGTUNG: {
    id: "TUNGTUNG",
    name: "Tung Sahur",
    flavor: "A wooden creature that won't stop banging its bat. Tung tung tung tung.",
    types: ["Beast", "Brainrot"],
    base: { hp: 70, atk: 60, def: 55, spd: 40 },
    catchRate: 45,
    xpYield: 65,
    learn: [[1, "TACKLE"], [1, "TUNG_BAT"], [7, "SCREECH"], [13, "AL_DENTE"], [21, "GLORBO_BEAM"], [29, "ALPHA_PUNCH"]],
    evolvesTo: "TUNGTUNGTUNG",
    evolvesAt: 20,
    color1: "#7a5230", color2: "#3a2818", color3: "#ffe070",
  },
  TUNGTUNGTUNG: {
    id: "TUNGTUNGTUNG",
    name: "Tung-Tung-Tung",
    flavor: "Three times the bat. Three times the noise. Approaches at 3am.",
    types: ["Beast", "Brainrot"],
    base: { hp: 95, atk: 90, def: 80, spd: 55 },
    catchRate: 25,
    xpYield: 145,
    learn: [[1, "TUNG_BAT"], [1, "GLORBO_BEAM"], [28, "ALPHA_PUNCH"], [36, "OHIO_BOMB"]],
    color1: "#5a3820", color2: "#1a1008", color3: "#c93dff",
  },

  // ---- WILD COMMON ----
  LIRILI: {
    id: "LIRILI",
    name: "Lirili Larila",
    flavor: "A cactus elephant in flip-flops. Tells jokes about time.",
    types: ["Earth"],
    base: { hp: 55, atk: 45, def: 60, spd: 30 },
    catchRate: 90,
    xpYield: 55,
    learn: [[1, "TACKLE"], [1, "CACTUS_PUNCH"], [10, "FRIDGE_SLAM"], [18, "AL_DENTE"]],
    color1: "#5fa84a", color2: "#ffd770", color3: "#3a6a8a",
  },

  GUSINI: {
    id: "GUSINI",
    name: "Bombombini Gusini",
    flavor: "A goose stuck inside a fighter jet. Honks at mach 2.",
    types: ["Air", "Fire"],
    base: { hp: 50, atk: 60, def: 40, spd: 75 },
    catchRate: 80,
    xpYield: 60,
    learn: [[1, "TACKLE"], [1, "GUSINI_DIVE"], [8, "EMBER"], [16, "BOMBARDINO"], [24, "OHIO_BOMB"]],
    color1: "#e8e8e8", color2: "#ffaa00", color3: "#404040",
  },

  PATAPIM: {
    id: "PATAPIM",
    name: "Brr Brr Patapim",
    flavor: "A baboon-tree creature with proboscis. Whispers cursed forest secrets.",
    types: ["Beast"],
    base: { hp: 65, atk: 55, def: 55, spd: 50 },
    catchRate: 80,
    xpYield: 60,
    learn: [[1, "TACKLE"], [1, "BANANA_HURL"], [10, "SCREECH"], [18, "TUNG_BAT"]],
    color1: "#5a8a3a", color2: "#7a5a3a", color3: "#3a2818",
  },

  CHIMPANZ: {
    id: "CHIMPANZ",
    name: "Chimpanzini Bananini",
    flavor: "A monkey crossed with a banana, peeled. Surprisingly fast.",
    types: ["Beast", "Pasta"],
    base: { hp: 50, atk: 60, def: 40, spd: 70 },
    catchRate: 90,
    xpYield: 55,
    learn: [[1, "TACKLE"], [1, "BANANA_HURL"], [9, "RIGATONI_RUSH"], [17, "AL_DENTE"]],
    color1: "#ffe070", color2: "#7a5a3a", color3: "#fff5b3",
  },

  CAPPUASS: {
    id: "CAPPUASS",
    name: "Cappuccino Assassino",
    flavor: "A cup of cappuccino with two katanas. Strikes from the steam.",
    types: ["Fire", "Sigma"],
    base: { hp: 50, atk: 75, def: 40, spd: 80 },
    catchRate: 60,
    xpYield: 75,
    learn: [[1, "CAPPUCCINO"], [1, "SIGMA_STARE"], [12, "ALPHA_PUNCH"], [20, "OHIO_BOMB"]],
    color1: "#5a3818", color2: "#ffe8c8", color3: "#9ea6b3",
  },

  BALLERINA: {
    id: "BALLERINA",
    name: "Ballerina Cappuccina",
    flavor: "Coffee cup wearing a tutu, pirouettes endlessly. Very judgemental.",
    types: ["Fire", "Pasta"],
    base: { hp: 55, atk: 50, def: 50, spd: 75 },
    catchRate: 70,
    xpYield: 65,
    learn: [[1, "CAPPUCCINO"], [1, "RIGATONI_RUSH"], [11, "WHIRLWIND"], [19, "RIZZ_CHARM"]],
    color1: "#5a3818", color2: "#ffc0cb", color3: "#fff5b3",
  },

  TRIPPI: {
    id: "TRIPPI",
    name: "Trippi Troppi",
    flavor: "Cat-shrimp hybrid that floats one inch off the ground. Confusing.",
    types: ["Water", "Brainrot"],
    base: { hp: 60, atk: 50, def: 55, spd: 60 },
    catchRate: 80,
    xpYield: 60,
    learn: [[1, "TRALA_WAVE"], [1, "SCREECH"], [12, "CONFUSE_RAY"], [20, "GLORBO_BEAM"]],
    color1: "#ff8aa8", color2: "#ffaa66", color3: "#3da9ff",
  },

  FRIGO: {
    id: "FRIGO",
    name: "Frigo Camelo",
    flavor: "A camel with a refrigerator for a torso. Always cold inside.",
    types: ["Steel", "Earth"],
    base: { hp: 80, atk: 55, def: 80, spd: 25 },
    catchRate: 65,
    xpYield: 70,
    learn: [[1, "TACKLE"], [1, "FRIDGE_SLAM"], [12, "CAMEL_KICK"], [22, "TOILET_HEAD"]],
    color1: "#dcdcdc", color2: "#a07040", color3: "#404a55",
  },

  BONECA: {
    id: "BONECA",
    name: "Boneca Ambalabu",
    flavor: "A frog wedged inside a tire with human legs. Walks regrettably.",
    types: ["Beast", "Steel"],
    base: { hp: 65, atk: 50, def: 70, spd: 35 },
    catchRate: 75,
    xpYield: 60,
    learn: [[1, "TACKLE"], [1, "TOILET_HEAD"], [13, "CAMEL_KICK"], [21, "FRIDGE_SLAM"]],
    color1: "#3a8a3a", color2: "#1a1a1a", color3: "#e8d8a8",
  },

  // ---- 2026 MEMES ----
  SKIBIDI: {
    id: "SKIBIDI",
    name: "Skibidi Toiletto",
    flavor: "A 2026 evolution. Toilet with a charismatic CEO head. Says 'aura'.",
    types: ["Steel", "Water"],
    base: { hp: 60, atk: 55, def: 65, spd: 50 },
    catchRate: 70,
    xpYield: 65,
    learn: [[1, "TACKLE"], [1, "TOILET_FLUSH"], [10, "TOILET_HEAD"], [18, "RIZZ_CHARM"]],
    evolvesTo: "SKIBIDINI", evolvesAt: 22,
    color1: "#f0f0f0", color2: "#ffd0a0", color3: "#3a5070",
  },
  SKIBIDINI: {
    id: "SKIBIDINI", name: "Skibidini Maximus",
    flavor: "Evolved Skibidi. The CEO head now wears a tiny crown. Says 'sigma aura'.",
    types: ["Steel", "Sigma"],
    base: { hp: 85, atk: 80, def: 85, spd: 75 },
    catchRate: 25, xpYield: 145,
    learn: [[1, "TOILET_FLUSH"], [1, "TOILET_HEAD"], [1, "SIGMA_STARE"], [28, "ALPHA_PUNCH"], [36, "OHIO_BOMB"]],
    color1: "#fffaf0", color2: "#ffd700", color3: "#1a1a3a",
  },

  GLORBO: {
    id: "GLORBO",
    name: "Glorbo Florbo",
    flavor: "A glowing translucent blob. Nobody knows what it is. It's 2026.",
    types: ["Brainrot"],
    base: { hp: 55, atk: 65, def: 50, spd: 55 },
    catchRate: 50,
    xpYield: 80,
    learn: [[1, "SCREECH"], [1, "GLORBO_BEAM"], [12, "CONFUSE_RAY"], [22, "OHIO_BOMB"]],
    evolvesTo: "GLORBNOXION", evolvesAt: 26,
    color1: "#c93dff", color2: "#ff8aff", color3: "#5a1a8a",
  },
  GLORBNOXION: {
    id: "GLORBNOXION", name: "Glorbnoxion",
    flavor: "Glorbo's final form. Now actively hostile to anything not glorbo.",
    types: ["Brainrot", "Chaos"],
    base: { hp: 90, atk: 100, def: 75, spd: 80 },
    catchRate: 15, xpYield: 170,
    learn: [[1, "GLORBO_BEAM"], [1, "OHIO_BOMB"], [1, "CONFUSE_RAY"], [32, "RIZZ_CHARM"]],
    legendary: true,
    color1: "#ff3dff", color2: "#9aa5ff", color3: "#ffff8a",
  },

  SIGMAWOLF: {
    id: "SIGMAWOLF",
    name: "Sigma Wolfini",
    flavor: "Lone wolf. Stares at you. Doesn't blink. Refuses pasta.",
    types: ["Sigma", "Beast"],
    base: { hp: 60, atk: 75, def: 55, spd: 65 },
    catchRate: 50,
    xpYield: 80,
    learn: [[1, "TACKLE"], [1, "SIGMA_STARE"], [14, "ALPHA_PUNCH"], [24, "OHIO_BOMB"]],
    color1: "#5a6080", color2: "#9aa5ff", color3: "#1a1a2a",
  },

  RIZZLER: {
    id: "RIZZLER",
    name: "Rizzler Maxxini",
    flavor: "Charismatic figure in a tiny hat. Will out-rizz you.",
    types: ["Chaos", "Sigma"],
    base: { hp: 55, atk: 70, def: 45, spd: 75 },
    catchRate: 45,
    xpYield: 90,
    learn: [[1, "RIZZ_CHARM"], [1, "ALPHA_PUNCH"], [16, "OHIO_BOMB"], [26, "GLORBO_BEAM"]],
    color1: "#ffc0cb", color2: "#5a3818", color3: "#ffd700",
  },

  OHIO: {
    id: "OHIO",
    name: "Ohio Skibidini",
    flavor: "A chaotic gremlin from somewhere unknowable. Reality bends near it.",
    types: ["Chaos", "Brainrot"],
    base: { hp: 70, atk: 80, def: 60, spd: 70 },
    catchRate: 25,
    xpYield: 150,
    learn: [[1, "OHIO_BOMB"], [1, "GLORBO_BEAM"], [1, "CONFUSE_RAY"], [1, "ALPHA_PUNCH"]],
    legendary: true,
    color1: "#ff3d9b", color2: "#c93dff", color3: "#ffd700",
  },

  // healing/utility wild
  LASAGNINI: {
    id: "LASAGNINI",
    name: "Lasagnini Pino",
    flavor: "A walking lasagna with sunglasses. Generous with cheese.",
    types: ["Pasta"],
    base: { hp: 70, atk: 50, def: 60, spd: 35 },
    catchRate: 80,
    xpYield: 60,
    learn: [[1, "AL_DENTE"], [1, "CARBONARA"], [12, "CAPPU_HEAL"], [20, "RIGATONI_RUSH"]],
    evolvesTo: "LASAGNONE",
    evolvesAt: 24,
    color1: "#f5b143", color2: "#ffe0a0", color3: "#9b3a1a",
  },

  // ---- EXPANDED ROSTER ----
  LASAGNONE: {
    id: "LASAGNONE",
    name: "Lasagnone Magno",
    flavor: "Now with extra ricotta and a top hat. Imposing yet hungry.",
    types: ["Pasta", "Earth"],
    base: { hp: 95, atk: 70, def: 85, spd: 40 },
    catchRate: 30, xpYield: 130,
    learn: [[1, "AL_DENTE"], [1, "CARBONARA"], [26, "FRIDGE_SLAM"], [34, "CAPPU_HEAL"]],
    color1: "#d49533", color2: "#ffd58a", color3: "#5b1a0a",
  },

  GELATO: {
    id: "GELATO", name: "Gelatissimo",
    flavor: "An ice-cream cone that yells 'GELATO' at strangers.",
    types: ["Water", "Air"],
    base: { hp: 50, atk: 60, def: 50, spd: 70 },
    catchRate: 75, xpYield: 60,
    learn: [[1, "TRALA_WAVE"], [1, "SCREECH"], [10, "WHIRLWIND"], [18, "TOILET_FLUSH"]],
    color1: "#fce4f0", color2: "#7a4a2a", color3: "#ffaad0",
  },

  PIZZADIRO: {
    id: "PIZZADIRO", name: "Pizzadiro Pepperoni",
    flavor: "A pizza with eight pepperoni eyes. Watches you eat. Always.",
    types: ["Fire", "Pasta"],
    base: { hp: 65, atk: 70, def: 55, spd: 50 },
    catchRate: 60, xpYield: 70,
    learn: [[1, "EMBER"], [1, "AL_DENTE"], [12, "CARBONARA"], [20, "BOMBARDINO"]],
    evolvesTo: "MARGHERITRON", evolvesAt: 22,
    color1: "#d44a2a", color2: "#ffe0a0", color3: "#8a1a0a",
  },

  MARGHERITRON: {
    id: "MARGHERITRON", name: "Margheritron Supreme",
    flavor: "A pizza with sentience and basil. Demands you say 'mamma mia'.",
    types: ["Fire", "Pasta"],
    base: { hp: 90, atk: 95, def: 75, spd: 65 },
    catchRate: 30, xpYield: 145,
    learn: [[1, "BOMBARDINO"], [1, "CARBONARA"], [28, "OHIO_BOMB"], [36, "ALPHA_PUNCH"]],
    color1: "#a3361f", color2: "#3aa83a", color3: "#fff5b3",
  },

  GNOCCHO: {
    id: "GNOCCHO", name: "Gnoccho Tomato",
    flavor: "A round potato dumpling who claims to be Caesar reborn.",
    types: ["Earth", "Pasta"],
    base: { hp: 75, atk: 55, def: 70, spd: 30 },
    catchRate: 80, xpYield: 60,
    learn: [[1, "TACKLE"], [1, "AL_DENTE"], [12, "CACTUS_PUNCH"], [20, "FRIDGE_SLAM"]],
    color1: "#f5d690", color2: "#d44a2a", color3: "#3aa83a",
  },

  MOSSARELLA: {
    id: "MOSSARELLA", name: "Mozzarella Mafiosa",
    flavor: "A cheese ball in a fedora. Will offer you a deal you can't refuse.",
    types: ["Sigma", "Pasta"],
    base: { hp: 60, atk: 70, def: 50, spd: 70 },
    catchRate: 55, xpYield: 80,
    learn: [[1, "TACKLE"], [1, "SIGMA_STARE"], [14, "ALPHA_PUNCH"], [22, "RIZZ_CHARM"]],
    color1: "#fcfcd0", color2: "#3a2218", color3: "#a3361f",
  },

  SHRIMPELO: {
    id: "SHRIMPELO", name: "Shrimpelo Frito",
    flavor: "A fried shrimp that defies death and gravity.",
    types: ["Water", "Fire"],
    base: { hp: 55, atk: 70, def: 45, spd: 75 },
    catchRate: 70, xpYield: 65,
    learn: [[1, "TRALA_WAVE"], [1, "EMBER"], [12, "SHARK_BITE"], [20, "BOMBARDINO"]],
    color1: "#ff8a4a", color2: "#ffd590", color3: "#a3361f",
  },

  TIRAMISU: {
    id: "TIRAMISU", name: "Tiramisu Magico",
    flavor: "A floating slice of tiramisu. Heals friends with espresso magic.",
    types: ["Brainrot", "Pasta"],
    base: { hp: 70, atk: 50, def: 65, spd: 55 },
    catchRate: 60, xpYield: 75,
    learn: [[1, "CAPPU_HEAL"], [1, "CONFUSE_RAY"], [14, "CAPPUCCINO"], [22, "GLORBO_BEAM"]],
    color1: "#5a3818", color2: "#fff5b3", color3: "#3a2218",
  },

  PASTANELLO: {
    id: "PASTANELLO", name: "Pastanello Volante",
    flavor: "A flying spaghetti with goggles and bomber jacket. WW1 vet.",
    types: ["Pasta", "Air"],
    base: { hp: 60, atk: 60, def: 55, spd: 80 },
    catchRate: 70, xpYield: 70,
    learn: [[1, "RIGATONI_RUSH"], [1, "WHIRLWIND"], [12, "AL_DENTE"], [22, "GUSINI_DIVE"]],
    color1: "#ffe070", color2: "#5a3a2a", color3: "#9aa5ff",
  },

  RAVIOLINO: {
    id: "RAVIOLINO", name: "Raviolino Ripieno",
    flavor: "A small ravioli with a face. Complains about its filling.",
    types: ["Pasta"],
    base: { hp: 60, atk: 45, def: 60, spd: 55 },
    catchRate: 90, xpYield: 50,
    learn: [[1, "TACKLE"], [1, "AL_DENTE"], [10, "RIGATONI_RUSH"]],
    evolvesTo: "RAVIOLINONE", evolvesAt: 16,
    color1: "#ffd49a", color2: "#a07040", color3: "#3aa83a",
  },

  RAVIOLINONE: {
    id: "RAVIOLINONE", name: "Raviolinone Stuffato",
    flavor: "Five times the ravioli, five times the filling. Heavy.",
    types: ["Pasta", "Earth"],
    base: { hp: 90, atk: 70, def: 85, spd: 40 },
    catchRate: 40, xpYield: 120,
    learn: [[1, "AL_DENTE"], [1, "CARBONARA"], [22, "FRIDGE_SLAM"], [30, "ALPHA_PUNCH"]],
    color1: "#d49b4b", color2: "#5a3818", color3: "#3aa83a",
  },

  ESPRESSITO: {
    id: "ESPRESSITO", name: "Espressito Bolt",
    flavor: "A tiny espresso shot bouncing at 200mph. Highly caffeinated.",
    types: ["Fire", "Sigma"],
    base: { hp: 40, atk: 55, def: 35, spd: 95 },
    catchRate: 80, xpYield: 60,
    learn: [[1, "EMBER"], [1, "CAPPUCCINO"], [12, "ALPHA_PUNCH"], [20, "OHIO_BOMB"]],
    evolvesTo: "ESPRESSEUR", evolvesAt: 22,
    color1: "#3a2218", color2: "#ffe0a0", color3: "#ff6b3d",
  },

  ESPRESSEUR: {
    id: "ESPRESSEUR", name: "Espresseur Royale",
    flavor: "Wears a tiny crown. Looks down on instant coffee. Justly.",
    types: ["Fire", "Sigma"],
    base: { hp: 70, atk: 90, def: 60, spd: 110 },
    catchRate: 25, xpYield: 145,
    learn: [[1, "ALPHA_PUNCH"], [1, "OHIO_BOMB"], [28, "RIZZ_CHARM"], [36, "GLORBO_BEAM"]],
    color1: "#1a1008", color2: "#ffd700", color3: "#ff3d3d",
  },

  POMODORO: {
    id: "POMODORO", name: "Pomodoro Bandito",
    flavor: "A tomato in a bandana. Wields salami daggers.",
    types: ["Earth", "Sigma"],
    base: { hp: 55, atk: 65, def: 50, spd: 60 },
    catchRate: 75, xpYield: 65,
    learn: [[1, "TACKLE"], [1, "SIGMA_STARE"], [12, "CACTUS_PUNCH"], [20, "ALPHA_PUNCH"]],
    color1: "#d44a2a", color2: "#3aa83a", color3: "#5a3818",
  },

  ZUCCHINI: {
    id: "ZUCCHINI", name: "Zucchini Spaccone",
    flavor: "A muscular zucchini who flexes. Refuses to be eaten.",
    types: ["Earth", "Beast"],
    base: { hp: 70, atk: 80, def: 60, spd: 50 },
    catchRate: 65, xpYield: 75,
    learn: [[1, "TACKLE"], [1, "CACTUS_PUNCH"], [14, "ALPHA_PUNCH"], [22, "FRIDGE_SLAM"]],
    color1: "#3aa83a", color2: "#1e6a30", color3: "#fff5b3",
  },

  PARMIGIANO: {
    id: "PARMIGIANO", name: "Parmigiano Reggiano",
    flavor: "A wheel of cheese. Rolls at high speed. Crushes everything.",
    types: ["Steel", "Pasta"],
    base: { hp: 95, atk: 75, def: 90, spd: 30 },
    catchRate: 35, xpYield: 130,
    learn: [[1, "TACKLE"], [1, "FRIDGE_SLAM"], [16, "CAMEL_KICK"], [28, "TOILET_HEAD"]],
    color1: "#f5d690", color2: "#d49533", color3: "#5a3818",
  },

  PROSCIUTTO: {
    id: "PROSCIUTTO", name: "Prosciutto Sniper",
    flavor: "A leg of cured ham with a rifle. Don't ask why.",
    types: ["Sigma", "Steel"],
    base: { hp: 60, atk: 90, def: 50, spd: 75 },
    catchRate: 35, xpYield: 100,
    learn: [[1, "SIGMA_STARE"], [1, "ALPHA_PUNCH"], [16, "OHIO_BOMB"], [26, "RIZZ_CHARM"]],
    color1: "#ff8a8a", color2: "#5a1a0a", color3: "#fce4d0",
  },

  GROCCO: {
    id: "GROCCO", name: "Grocco di Roma",
    flavor: "A crocodile in a Roman toga. Speaks Latin. Demands tribute.",
    types: ["Beast", "Sigma"],
    base: { hp: 80, atk: 75, def: 70, spd: 55 },
    catchRate: 55, xpYield: 90,
    learn: [[1, "TACKLE"], [1, "SHARK_BITE"], [16, "SIGMA_STARE"], [26, "ALPHA_PUNCH"]],
    color1: "#5a8a3a", color2: "#fff5b3", color3: "#d4a043",
  },

  CHEESETOPUS: {
    id: "CHEESETOPUS", name: "Cheesetopus",
    flavor: "An octopus made entirely of mozzarella. Stretches indefinitely.",
    types: ["Water", "Pasta"],
    base: { hp: 70, atk: 60, def: 60, spd: 60 },
    catchRate: 65, xpYield: 70,
    learn: [[1, "TRALA_WAVE"], [1, "AL_DENTE"], [14, "TOILET_FLUSH"], [22, "CARBONARA"]],
    color1: "#fffac8", color2: "#ffd58a", color3: "#3a78dc",
  },

  RIZZARDO: {
    id: "RIZZARDO", name: "Rizzardo da Vinci",
    flavor: "A renaissance-painter monster with infinite charisma.",
    types: ["Chaos", "Brainrot"],
    base: { hp: 65, atk: 65, def: 65, spd: 75 },
    catchRate: 35, xpYield: 110,
    learn: [[1, "RIZZ_CHARM"], [1, "GLORBO_BEAM"], [18, "CONFUSE_RAY"], [28, "OHIO_BOMB"]],
    color1: "#d4a043", color2: "#5a3818", color3: "#fff5b3",
  },

  CRINGEFLY: {
    id: "CRINGEFLY", name: "Cringefly",
    flavor: "A moth made of cringe energy. Attracted to vibes.",
    types: ["Brainrot", "Air"],
    base: { hp: 45, atk: 55, def: 45, spd: 80 },
    catchRate: 90, xpYield: 50,
    learn: [[1, "SCREECH"], [1, "CONFUSE_RAY"], [10, "WHIRLWIND"]],
    evolvesTo: "CRINGELORD", evolvesAt: 18,
    color1: "#9b6b9b", color2: "#5a1a8a", color3: "#ffaaff",
  },

  CRINGELORD: {
    id: "CRINGELORD", name: "Cringelord Patrician",
    flavor: "Has fully embraced the cringe. Now indistinguishable from based.",
    types: ["Brainrot", "Sigma"],
    base: { hp: 70, atk: 85, def: 60, spd: 100 },
    catchRate: 25, xpYield: 145,
    learn: [[1, "GLORBO_BEAM"], [1, "RIZZ_CHARM"], [26, "OHIO_BOMB"], [36, "ALPHA_PUNCH"]],
    color1: "#5a1a8a", color2: "#ffd700", color3: "#1a1a2a",
  },

  GIGACHEF: {
    id: "GIGACHEF", name: "Gigachef Mario",
    flavor: "A jacked chef monster. Punches dough. Out-rizzes Gordon Ramsay.",
    types: ["Sigma", "Fire"],
    base: { hp: 80, atk: 100, def: 70, spd: 65 },
    catchRate: 25, xpYield: 150,
    learn: [[1, "ALPHA_PUNCH"], [1, "BOMBARDINO"], [22, "OHIO_BOMB"], [34, "SIGMA_STARE"]],
    color1: "#ffd9a0", color2: "#3a2218", color3: "#d44a2a",
  },

  PIGEONORE: {
    id: "PIGEONORE", name: "Pigeonore di Venezia",
    flavor: "A pigeon that has seen things. Demands biscotti or it bites.",
    types: ["Air", "Brainrot"],
    base: { hp: 50, atk: 50, def: 45, spd: 85 },
    catchRate: 90, xpYield: 50,
    learn: [[1, "TACKLE"], [1, "WHIRLWIND"], [10, "GUSINI_DIVE"], [18, "SCREECH"]],
    color1: "#a0a0a0", color2: "#3a3a3a", color3: "#ffaa00",
  },

  TURBOFROGGO: {
    id: "TURBOFROGGO", name: "Turbofroggo",
    flavor: "A frog with a jetpack. Says ribbit at speeds breaking sound.",
    types: ["Beast", "Air"],
    base: { hp: 60, atk: 65, def: 50, spd: 95 },
    catchRate: 60, xpYield: 75,
    learn: [[1, "TACKLE"], [1, "GUSINI_DIVE"], [14, "TUNG_BAT"], [22, "ALPHA_PUNCH"]],
    color1: "#3aa83a", color2: "#8a4a2a", color3: "#ff6b3d",
  },

  SOGGYNINI: {
    id: "SOGGYNINI", name: "Soggynini Toast",
    flavor: "A perpetually wet piece of toast. Sad. Powerful.",
    types: ["Water", "Earth"],
    base: { hp: 75, atk: 50, def: 75, spd: 35 },
    catchRate: 75, xpYield: 65,
    learn: [[1, "TRALA_WAVE"], [1, "TOILET_FLUSH"], [14, "FRIDGE_SLAM"], [22, "CACTUS_PUNCH"]],
    color1: "#d4a043", color2: "#3a78dc", color3: "#fff5b3",
  },

  ZESTYBOI: {
    id: "ZESTYBOI", name: "Zestyboi Limone",
    flavor: "A muscular lemon that compliments your aura before fighting.",
    types: ["Earth", "Chaos"],
    base: { hp: 60, atk: 75, def: 55, spd: 65 },
    catchRate: 60, xpYield: 75,
    learn: [[1, "TACKLE"], [1, "RIZZ_CHARM"], [12, "CACTUS_PUNCH"], [22, "ALPHA_PUNCH"]],
    color1: "#ffe070", color2: "#fff5b3", color3: "#5a8a3a",
  },

  // PSEUDO-LEGENDARIES
  TRALATITAN: {
    id: "TRALATITAN", name: "Tralatitan",
    flavor: "An ancient sea-shark titan. Wears Air Force 1s the size of cars.",
    types: ["Water", "Sigma"],
    base: { hp: 100, atk: 105, def: 90, spd: 90 },
    catchRate: 10, xpYield: 200,
    learn: [[1, "SHARK_BITE"], [1, "TRALA_WAVE"], [1, "ALPHA_PUNCH"], [40, "OHIO_BOMB"]],
    legendary: true,
    color1: "#0d2c4a", color2: "#ffe070", color3: "#ff3d3d",
  },

  BRAINCORE: {
    id: "BRAINCORE", name: "Braincore Prime",
    flavor: "A pulsing brain encased in chrome. The source of all brainrot.",
    types: ["Brainrot", "Steel"],
    base: { hp: 95, atk: 100, def: 95, spd: 80 },
    catchRate: 10, xpYield: 200,
    learn: [[1, "GLORBO_BEAM"], [1, "OHIO_BOMB"], [1, "CONFUSE_RAY"], [1, "RIZZ_CHARM"]],
    legendary: true,
    color1: "#ff8aff", color2: "#9ea6b3", color3: "#5a1a8a",
  },

  // ============================================================
  // ITALIAN BRAINROT EXPANSION + 2026 MEMES
  // ============================================================
  VACCASATURN: {
    id: "VACCASATURN", name: "Vacca Saturno Saturnita",
    flavor: "A cow with the rings of Saturn around its torso. Moos in cosmic harmony.",
    types: ["Earth", "Sigma"],
    base: { hp: 90, atk: 70, def: 80, spd: 45 },
    catchRate: 35, xpYield: 110,
    learn: [[1, "TACKLE"], [1, "FRIDGE_SLAM"], [14, "SIGMA_STARE"], [22, "OHIO_BOMB"], [30, "ALPHA_PUNCH"]],
    evolvesTo: "VACCAGALAXIA", evolvesAt: 32,
    color1: "#fff5e0", color2: "#3a2218", color3: "#9aa5ff",
  },

  TRULIMERO: {
    id: "TRULIMERO", name: "Trulimero Trulicina",
    flavor: "A fish wearing a cat head. The ocean disagrees on what it is.",
    types: ["Water", "Beast"],
    base: { hp: 60, atk: 65, def: 50, spd: 70 },
    catchRate: 70, xpYield: 70,
    learn: [[1, "TRALA_WAVE"], [1, "BANANA_HURL"], [12, "SHARK_BITE"], [20, "ALPHA_PUNCH"]],
    color1: "#5a8aff", color2: "#ffaa66", color3: "#fff5b3",
  },

  TIGRILINI: {
    id: "TIGRILINI", name: "Tigrilini Watermelini",
    flavor: "A watermelon-striped tiger that is 90% water by volume.",
    types: ["Water", "Beast"],
    base: { hp: 70, atk: 75, def: 60, spd: 75 },
    catchRate: 50, xpYield: 90,
    learn: [[1, "SHARK_BITE"], [1, "TUNG_BAT"], [14, "TRALA_WAVE"], [24, "ALPHA_PUNCH"]],
    color1: "#3aa83a", color2: "#ff5e7a", color3: "#1e6a30",
  },

  TICTACSAURO: {
    id: "TICTACSAURO", name: "Tic-Tac Toc Sauro",
    flavor: "A small dinosaur with a clock for a stomach. Always running late.",
    types: ["Steel", "Brainrot"],
    base: { hp: 65, atk: 60, def: 70, spd: 65 },
    catchRate: 60, xpYield: 75,
    learn: [[1, "TACKLE"], [1, "TOILET_HEAD"], [12, "GLORBO_BEAM"], [22, "ALPHA_PUNCH"]],
    color1: "#3aa83a", color2: "#fff5b3", color3: "#5a3818",
  },

  CAPYMANCO: {
    id: "CAPYMANCO", name: "Capybara Manco",
    flavor: "A one-armed capybara. Compensates with charisma alone.",
    types: ["Beast", "Chaos"],
    base: { hp: 80, atk: 65, def: 65, spd: 50 },
    catchRate: 65, xpYield: 75,
    learn: [[1, "TACKLE"], [1, "RIZZ_CHARM"], [12, "BANANA_HURL"], [22, "ALPHA_PUNCH"]],
    color1: "#a07a4a", color2: "#5a3818", color3: "#ffd700",
  },

  COCOFANTO: {
    id: "COCOFANTO", name: "Cocofanto Elefanto",
    flavor: "An elephant whose head has been replaced by an enormous coconut.",
    types: ["Earth", "Beast"],
    base: { hp: 95, atk: 80, def: 85, spd: 35 },
    catchRate: 30, xpYield: 130,
    learn: [[1, "TACKLE"], [1, "CACTUS_PUNCH"], [14, "FRIDGE_SLAM"], [22, "ALPHA_PUNCH"], [30, "OHIO_BOMB"]],
    evolvesTo: "COCOFANTITAN", evolvesAt: 36,
    color1: "#7a5a3a", color2: "#a07040", color3: "#fff5b3",
  },

  DINDIN: {
    id: "DINDIN", name: "U Din Din Din Du",
    flavor: "A cat who is also a drum. Beats out propaganda 24/7.",
    types: ["Brainrot", "Sigma"],
    base: { hp: 55, atk: 70, def: 50, spd: 80 },
    catchRate: 60, xpYield: 75,
    learn: [[1, "TUNG_BAT"], [1, "SCREECH"], [12, "ALPHA_PUNCH"], [22, "GLORBO_BEAM"]],
    color1: "#d44a2a", color2: "#ffe070", color3: "#3a2218",
  },

  POLENTAPOU: {
    id: "POLENTAPOU", name: "Pou Pou Polenta",
    flavor: "A dog made entirely of polenta. Crumbles when sad.",
    types: ["Pasta", "Earth"],
    base: { hp: 65, atk: 55, def: 65, spd: 50 },
    catchRate: 80, xpYield: 60,
    learn: [[1, "TACKLE"], [1, "AL_DENTE"], [12, "CACTUS_PUNCH"], [20, "RIGATONI_RUSH"]],
    color1: "#ffe070", color2: "#d4a043", color3: "#5a3818",
  },

  SALAMINO: {
    id: "SALAMINO", name: "Salamino Penguino",
    flavor: "A penguin made of cured salami. Forbidden but undeniably a snack.",
    types: ["Steel", "Water"],
    base: { hp: 70, atk: 60, def: 60, spd: 55 },
    catchRate: 70, xpYield: 65,
    learn: [[1, "TACKLE"], [1, "TRALA_WAVE"], [12, "TOILET_FLUSH"], [22, "FRIDGE_SLAM"]],
    color1: "#a3361f", color2: "#ffaaaa", color3: "#fff5b3",
  },

  // ----- 2026 MEMES -----
  SEVENSEVEN: {
    id: "SEVENSEVEN", name: "Seven Seven Seven",
    flavor: "A walking slot machine that keeps hitting jackpot. 2026 lucky meme.",
    types: ["Chaos", "Steel"],
    base: { hp: 65, atk: 80, def: 60, spd: 70 },
    catchRate: 35, xpYield: 110,
    learn: [[1, "OHIO_BOMB"], [1, "ALPHA_PUNCH"], [16, "RIZZ_CHARM"], [26, "GLORBO_BEAM"]],
    color1: "#ffd700", color2: "#d44a2a", color3: "#3a2218",
  },

  FANUMTAX: {
    id: "FANUMTAX", name: "Fanum Taxxini",
    flavor: "Steals 30% of your snacks. Will not be reasoned with. 2026 menace.",
    types: ["Sigma", "Brainrot"],
    base: { hp: 55, atk: 75, def: 50, spd: 85 },
    catchRate: 55, xpYield: 80,
    learn: [[1, "RIZZ_CHARM"], [1, "ALPHA_PUNCH"], [14, "SIGMA_STARE"], [24, "OHIO_BOMB"]],
    color1: "#3a2a4a", color2: "#ffd700", color3: "#ff5e5e",
  },

  AURAFARM: {
    id: "AURAFARM", name: "Aurafarmer Goncho",
    flavor: "A creature that gathers aura points by staring meaningfully into the void.",
    types: ["Sigma", "Air"],
    base: { hp: 70, atk: 75, def: 65, spd: 75 },
    catchRate: 40, xpYield: 100,
    learn: [[1, "SIGMA_STARE"], [1, "WHIRLWIND"], [16, "ALPHA_PUNCH"], [26, "RIZZ_CHARM"]],
    color1: "#9aa5ff", color2: "#ffd700", color3: "#1a1a3a",
  },

  AISLOP: {
    id: "AISLOP", name: "AI Slopstein",
    flavor: "A creature generated by 2026 AI. Has 6 fingers. Smiles too much.",
    types: ["Brainrot", "Chaos"],
    base: { hp: 85, atk: 85, def: 80, spd: 65 },
    catchRate: 25, xpYield: 150,
    learn: [[1, "GLORBO_BEAM"], [1, "RIZZ_CHARM"], [1, "CONFUSE_RAY"], [22, "OHIO_BOMB"]],
    color1: "#ffaaff", color2: "#aaffff", color3: "#ff8a00",
  },

  // ----- EVOLUTIONS FOR NEW SPECIES -----
  VACCAGALAXIA: {
    id: "VACCAGALAXIA", name: "Vacca Galaxia",
    flavor: "Vacca Saturno's evolved form. The rings are now solid stardust.",
    types: ["Sigma", "Steel"],
    base: { hp: 110, atk: 90, def: 100, spd: 60 },
    catchRate: 15, xpYield: 175,
    learn: [[1, "FRIDGE_SLAM"], [1, "ALPHA_PUNCH"], [30, "OHIO_BOMB"], [40, "GLORBO_BEAM"]],
    color1: "#fff5e0", color2: "#1a0a3a", color3: "#ffd700",
  },
  COCOFANTITAN: {
    id: "COCOFANTITAN", name: "Cocofantitan",
    flavor: "An elephant whose entire body is now coconut. Solid as concrete.",
    types: ["Earth", "Steel"],
    base: { hp: 120, atk: 95, def: 110, spd: 30 },
    catchRate: 15, xpYield: 180,
    learn: [[1, "CACTUS_PUNCH"], [1, "FRIDGE_SLAM"], [1, "ALPHA_PUNCH"], [36, "OHIO_BOMB"]],
    color1: "#5a3818", color2: "#8a6028", color3: "#fff5b3",
  },

  // ----- MORE BRAINROT EXPANSION -----
  COCCODRILLO: {
    id: "COCCODRILLO", name: "Crocodillo Bombardillo",
    flavor: "A crocodile carrying a smaller bomber on its back. Confused but loyal.",
    types: ["Beast", "Fire"],
    base: { hp: 75, atk: 80, def: 65, spd: 55 },
    catchRate: 50, xpYield: 90,
    learn: [[1, "SHARK_BITE"], [1, "EMBER"], [14, "BOMBARDINO"], [24, "ALPHA_PUNCH"]],
    color1: "#3a6a30", color2: "#a07040", color3: "#ff6b3d",
  },
  GIRAFFA: {
    id: "GIRAFFA", name: "Giraffa Celeste",
    flavor: "A giraffe with a head in the clouds. Literally — its head pokes through.",
    types: ["Air", "Beast"],
    base: { hp: 75, atk: 65, def: 60, spd: 70 },
    catchRate: 60, xpYield: 80,
    learn: [[1, "TACKLE"], [1, "WHIRLWIND"], [14, "GUSINI_DIVE"], [22, "ALPHA_PUNCH"]],
    color1: "#ffd590", color2: "#a3361f", color3: "#cfe9ff",
  },
  GORLAMI: {
    id: "GORLAMI", name: "Gorlami Italiano",
    flavor: "Says 'gorlami' instead of any other word. Surprisingly polite.",
    types: ["Pasta", "Sigma"],
    base: { hp: 60, atk: 70, def: 60, spd: 80 },
    catchRate: 55, xpYield: 85,
    learn: [[1, "AL_DENTE"], [1, "SIGMA_STARE"], [14, "RIGATONI_RUSH"], [22, "ALPHA_PUNCH"]],
    color1: "#3aa83a", color2: "#fff5b3", color3: "#d44a2a",
  },
  TUFFOTUFFO: {
    id: "TUFFOTUFFO", name: "Tuffo Tuffo Mare",
    flavor: "A diving duckling that yells 'tuffo!' before every cannonball.",
    types: ["Water", "Air"],
    base: { hp: 55, atk: 60, def: 50, spd: 80 },
    catchRate: 75, xpYield: 65,
    learn: [[1, "TRALA_WAVE"], [1, "WHIRLWIND"], [12, "TOILET_FLUSH"], [22, "GUSINI_DIVE"]],
    color1: "#ffe070", color2: "#3a78dc", color3: "#ff8a4a",
  },
  GROOVYTOR: {
    id: "GROOVYTOR", name: "Groovytor 2026",
    flavor: "Permanently in dance mode. 2026's dance trend incarnate.",
    types: ["Chaos", "Air"],
    base: { hp: 60, atk: 70, def: 55, spd: 90 },
    catchRate: 50, xpYield: 95,
    learn: [[1, "RIZZ_CHARM"], [1, "WHIRLWIND"], [16, "ALPHA_PUNCH"], [26, "OHIO_BOMB"]],
    color1: "#ff3d9b", color2: "#ffd700", color3: "#9aa5ff",
  },
  // ----- POST-CHAMPION SECRET -----
  TUNGTITAN: {
    id: "TUNGTITAN", name: "Tung-Tung-Tung Sahur Maximus",
    flavor: "A 3am drum-titan. Has so many bats it's hard to count. Hidden in deep grass.",
    types: ["Beast", "Brainrot"],
    base: { hp: 105, atk: 110, def: 90, spd: 70 },
    catchRate: 8, xpYield: 220,
    learn: [[1, "TUNG_BAT"], [1, "ALPHA_PUNCH"], [1, "GLORBO_BEAM"], [1, "OHIO_BOMB"]],
    legendary: true,
    color1: "#5a3818", color2: "#1a0e08", color3: "#ff3d9b",
  },
};

// Encounter tables per zone
const ENCOUNTERS = {
  ROUTE_1: [
    { id: "LIRILI", weight: 22, minLvl: 2, maxLvl: 5 },
    { id: "PATAPIM", weight: 18, minLvl: 2, maxLvl: 5 },
    { id: "CHIMPANZ", weight: 13, minLvl: 3, maxLvl: 6 },
    { id: "BALLERINA", weight: 9, minLvl: 3, maxLvl: 6 },
    { id: "BONECA", weight: 9, minLvl: 2, maxLvl: 5 },
    { id: "TRIPPI", weight: 4, minLvl: 4, maxLvl: 7 },
    { id: "RAVIOLINO", weight: 9, minLvl: 2, maxLvl: 5 },
    { id: "POMODORO", weight: 4, minLvl: 4, maxLvl: 7 },
    { id: "POLENTAPOU", weight: 6, minLvl: 3, maxLvl: 6 },
    { id: "CAPYMANCO", weight: 6, minLvl: 4, maxLvl: 7 },
  ],
  ROUTE_2: [
    { id: "GUSINI", weight: 16, minLvl: 6, maxLvl: 10 },
    { id: "FRIGO", weight: 13, minLvl: 7, maxLvl: 11 },
    { id: "CAPPUASS", weight: 10, minLvl: 8, maxLvl: 12 },
    { id: "LASAGNINI", weight: 10, minLvl: 6, maxLvl: 10 },
    { id: "SKIBIDI", weight: 8, minLvl: 8, maxLvl: 12 },
    { id: "SIGMAWOLF", weight: 8, minLvl: 9, maxLvl: 13 },
    { id: "GLORBO", weight: 4, minLvl: 10, maxLvl: 14 },
    { id: "RIZZLER", weight: 3, minLvl: 13, maxLvl: 16 },
    { id: "ESPRESSITO", weight: 6, minLvl: 7, maxLvl: 11 },
    { id: "MOSSARELLA", weight: 6, minLvl: 8, maxLvl: 12 },
    { id: "TRULIMERO", weight: 8, minLvl: 7, maxLvl: 11 },
    { id: "DINDIN", weight: 6, minLvl: 9, maxLvl: 13 },
    { id: "TICTACSAURO", weight: 6, minLvl: 8, maxLvl: 12 },
    { id: "SALAMINO", weight: 5, minLvl: 9, maxLvl: 13 },
  ],
  FOREST_NORTH: [
    { id: "PATAPIM", weight: 16, minLvl: 6, maxLvl: 10 },
    { id: "CHIMPANZ", weight: 11, minLvl: 6, maxLvl: 10 },
    { id: "ZUCCHINI", weight: 11, minLvl: 7, maxLvl: 11 },
    { id: "TURBOFROGGO", weight: 8, minLvl: 8, maxLvl: 12 },
    { id: "PIGEONORE", weight: 11, minLvl: 5, maxLvl: 9 },
    { id: "CRINGEFLY", weight: 8, minLvl: 5, maxLvl: 9 },
    { id: "GROCCO", weight: 8, minLvl: 9, maxLvl: 13 },
    { id: "ZESTYBOI", weight: 5, minLvl: 8, maxLvl: 12 },
    { id: "TIGRILINI", weight: 6, minLvl: 9, maxLvl: 13 },
    { id: "COCOFANTO", weight: 5, minLvl: 10, maxLvl: 14 },
    { id: "GIRAFFA", weight: 6, minLvl: 8, maxLvl: 12 },
    { id: "COCCODRILLO", weight: 5, minLvl: 9, maxLvl: 13 },
  ],
  FOREST_EAST: [
    { id: "ZUCCHINI", weight: 18, minLvl: 8, maxLvl: 13 },
    { id: "TURBOFROGGO", weight: 18, minLvl: 8, maxLvl: 13 },
    { id: "PIGEONORE", weight: 15, minLvl: 7, maxLvl: 12 },
    { id: "CRINGEFLY", weight: 12, minLvl: 8, maxLvl: 12 },
    { id: "GROCCO", weight: 10, minLvl: 11, maxLvl: 15 },
    { id: "RIZZARDO", weight: 8, minLvl: 12, maxLvl: 16 },
    { id: "PASTANELLO", weight: 12, minLvl: 9, maxLvl: 13 },
    { id: "GIGACHEF", weight: 2, minLvl: 16, maxLvl: 20 },
    { id: "BRAINCORE", weight: 1, minLvl: 28, maxLvl: 32 },
  ],
  BEACH: [
    { id: "GELATO", weight: 16, minLvl: 10, maxLvl: 14 },
    { id: "SHRIMPELO", weight: 13, minLvl: 11, maxLvl: 15 },
    { id: "CHEESETOPUS", weight: 10, minLvl: 12, maxLvl: 16 },
    { id: "TRIPPI", weight: 8, minLvl: 10, maxLvl: 14 },
    { id: "SOGGYNINI", weight: 10, minLvl: 11, maxLvl: 15 },
    { id: "TRALALERO", weight: 7, minLvl: 13, maxLvl: 17 },
    { id: "SKIBIDI", weight: 9, minLvl: 12, maxLvl: 16 },
    { id: "PIGEONORE", weight: 7, minLvl: 10, maxLvl: 14 },
    { id: "TRALATITAN", weight: 1, minLvl: 30, maxLvl: 35 },
    { id: "TRALALERONE", weight: 5, minLvl: 18, maxLvl: 22 },
    { id: "TRULIMERO", weight: 8, minLvl: 12, maxLvl: 16 },
    { id: "SALAMINO", weight: 6, minLvl: 13, maxLvl: 17 },
    { id: "TIGRILINI", weight: 6, minLvl: 14, maxLvl: 18 },
    { id: "AURAFARM", weight: 4, minLvl: 16, maxLvl: 20 },
    { id: "TUFFOTUFFO", weight: 8, minLvl: 11, maxLvl: 15 },
    { id: "GROOVYTOR", weight: 4, minLvl: 14, maxLvl: 18 },
  ],
  GYM_GRASS: [
    { id: "RIZZARDO", weight: 15, minLvl: 14, maxLvl: 18 },
    { id: "CRINGELORD", weight: 8, minLvl: 17, maxLvl: 21 },
    { id: "PROSCIUTTO", weight: 12, minLvl: 14, maxLvl: 18 },
    { id: "PARMIGIANO", weight: 12, minLvl: 16, maxLvl: 20 },
    { id: "ESPRESSEUR", weight: 5, minLvl: 22, maxLvl: 26 },
    { id: "SIGMAWOLF", weight: 12, minLvl: 14, maxLvl: 18 },
    { id: "OHIO", weight: 3, minLvl: 18, maxLvl: 22 },
    { id: "GIGACHEF", weight: 5, minLvl: 20, maxLvl: 24 },
    { id: "GLORBO", weight: 12, minLvl: 14, maxLvl: 18 },
    { id: "RIZZLER", weight: 16, minLvl: 16, maxLvl: 20 },
  ],
  SOUTH_VALLEY: [
    { id: "OHIO", weight: 10, minLvl: 22, maxLvl: 28 },
    { id: "GIGACHEF", weight: 10, minLvl: 24, maxLvl: 30 },
    { id: "ESPRESSEUR", weight: 12, minLvl: 24, maxLvl: 30 },
    { id: "CRINGELORD", weight: 12, minLvl: 22, maxLvl: 28 },
    { id: "TUNGTUNGTUNG", weight: 9, minLvl: 25, maxLvl: 30 },
    { id: "TRALALERONE", weight: 9, minLvl: 25, maxLvl: 30 },
    { id: "BOMBARDIRO", weight: 9, minLvl: 25, maxLvl: 30 },
    { id: "RAVIOLINONE", weight: 7, minLvl: 22, maxLvl: 28 },
    { id: "LASAGNONE", weight: 5, minLvl: 22, maxLvl: 28 },
    { id: "MARGHERITRON", weight: 4, minLvl: 24, maxLvl: 30 },
    { id: "TRALATITAN", weight: 1, minLvl: 38, maxLvl: 44 },
    { id: "BRAINCORE", weight: 1, minLvl: 38, maxLvl: 44 },
    { id: "AISLOP", weight: 5, minLvl: 26, maxLvl: 32 },
    { id: "FANUMTAX", weight: 5, minLvl: 24, maxLvl: 30 },
    { id: "VACCASATURN", weight: 4, minLvl: 24, maxLvl: 30 },
    { id: "SEVENSEVEN", weight: 4, minLvl: 26, maxLvl: 32 },
    { id: "TUNGTITAN", weight: 1, minLvl: 40, maxLvl: 46 },
    { id: "VACCAGALAXIA", weight: 3, minLvl: 33, maxLvl: 38 },
    { id: "COCOFANTITAN", weight: 3, minLvl: 36, maxLvl: 42 },
    { id: "GROOVYTOR", weight: 5, minLvl: 22, maxLvl: 28 },
    { id: "GORLAMI", weight: 5, minLvl: 24, maxLvl: 30 },
    { id: "GIRAFFA", weight: 5, minLvl: 22, maxLvl: 28 },
    { id: "COCCODRILLO", weight: 5, minLvl: 24, maxLvl: 30 },
  ],
  MT_MOON: [
    { id: "FRIGO", weight: 18, minLvl: 9, maxLvl: 13 },
    { id: "BONECA", weight: 14, minLvl: 9, maxLvl: 12 },
    { id: "PARMIGIANO", weight: 8, minLvl: 11, maxLvl: 14 },
    { id: "GLORBO", weight: 10, minLvl: 10, maxLvl: 13 },
    { id: "POMODORO", weight: 10, minLvl: 9, maxLvl: 12 },
    { id: "GROCCO", weight: 8, minLvl: 11, maxLvl: 14 },
    { id: "ZUCCHINI", weight: 8, minLvl: 10, maxLvl: 13 },
    { id: "GNOCCHO", weight: 6, minLvl: 9, maxLvl: 12 },
    { id: "VACCASATURN", weight: 8, minLvl: 12, maxLvl: 15 },
    { id: "SEVENSEVEN", weight: 6, minLvl: 13, maxLvl: 16 },
    { id: "TICTACSAURO", weight: 8, minLvl: 11, maxLvl: 14 },
  ],
  EASTERN_WILDS: [
    { id: "ZESTYBOI", weight: 14, minLvl: 14, maxLvl: 18 },
    { id: "GROCCO", weight: 14, minLvl: 13, maxLvl: 17 },
    { id: "PIGEONORE", weight: 12, minLvl: 12, maxLvl: 16 },
    { id: "TURBOFROGGO", weight: 14, minLvl: 14, maxLvl: 18 },
    { id: "SHRIMPELO", weight: 12, minLvl: 14, maxLvl: 18 },
    { id: "POMODORO", weight: 12, minLvl: 12, maxLvl: 16 },
    { id: "RIZZARDO", weight: 8, minLvl: 16, maxLvl: 20 },
    { id: "MOSSARELLA", weight: 8, minLvl: 13, maxLvl: 17 },
    { id: "RIZZLER", weight: 4, minLvl: 18, maxLvl: 22 },
    { id: "OHIO", weight: 2, minLvl: 22, maxLvl: 26 },
  ],
};

// Trainers - simple NPCs with teams. badge >0 = gym leader.
const TRAINERS = {
  // Regular trainers
  RIVAL_1: {
    name: "Rival Marco",
    intro: "Marco: Yo! You picked your meme? Mine'll absolutely cook yours.",
    defeat: "Marco: WHAT?! That's so brainrot of you. I'll be back!",
    team: [{ id: "BONECA", lvl: 6 }, { id: "GUSINI", lvl: 7 }],
    reward: 100,
  },
  BEACH_BUM: {
    name: "Beach Bum Brad",
    intro: "Brad: Bruh you're harshing my vibe.",
    defeat: "Brad: That was, like, totally not chill of you.",
    team: [{ id: "SOGGYNINI", lvl: 13 }, { id: "GELATO", lvl: 13 }, { id: "TRALALERO", lvl: 14 }],
    reward: 320,
  },
  RIVAL_2: {
    name: "Rival Marco (Round 2)",
    intro: "Marco: I've been training. I've got 3 badges already. Pathetic.",
    defeat: "Marco: How... I had OHIO!",
    team: [{ id: "BONECA", lvl: 18 }, { id: "GUSINI", lvl: 19 }, { id: "BOMBARDINO", lvl: 20 }, { id: "OHIO", lvl: 22 }],
    reward: 800,
    requiresBadge: 3,
  },
  HIKER: {
    name: "Hiker Beppe",
    intro: "Beppe: Salve! I climbed Mount Everest in espadrilles!",
    defeat: "Beppe: My slippers... torn...",
    team: [{ id: "FRIGO", lvl: 10 }, { id: "PARMIGIANO", lvl: 11 }],
    reward: 280,
  },
  YOUNGSTER: {
    name: "Youngster Tito",
    intro: "Tito: I challenge you with my SHORTS!",
    defeat: "Tito: Aww, my mom's gonna laugh.",
    team: [{ id: "RAVIOLINO", lvl: 5 }, { id: "POMODORO", lvl: 6 }],
    reward: 80,
  },
  LASS: {
    name: "Lass Bianca",
    intro: "Bianca: My memes are the cutest! Don't underestimate cute!",
    defeat: "Bianca: My babies! Hmph!",
    team: [{ id: "BALLERINA", lvl: 8 }, { id: "TIRAMISU", lvl: 9 }],
    reward: 150,
  },
  CULTIST: {
    name: "Cultist Velvelo",
    intro: "Velvelo: GLORBO! GLORBO! He whom we serve!",
    defeat: "Velvelo: Glorbo... has forsaken me...",
    team: [{ id: "GLORBO", lvl: 16 }, { id: "TRIPPI", lvl: 16 }, { id: "RIZZARDO", lvl: 17 }],
    reward: 450,
    requiresBadge: 2,
  },

  // ----- GYM LEADERS (5) -----
  GYM_PASTA: {
    name: "Gym Leader Luigi",
    title: "The Al Dente Maestro",
    intro: "Luigi: Mamma mia! I am the leader of the Pasta Gym!\nYou must defeat me to earn the AL DENTE BADGE!",
    defeat: "Luigi: My pasta... is overcooked. You earned this badge.",
    team: [{ id: "RAVIOLINO", lvl: 10 }, { id: "LASAGNINI", lvl: 11 }, { id: "PIZZADIRO", lvl: 13 }],
    reward: 500, badge: 1, badgeName: "AL DENTE BADGE",
  },
  GYM_BIRD: {
    name: "Gym Leader Pia",
    title: "Mistress of the Skies",
    intro: "Pia: Coo! Welcome to the Aviary Gym. The wind tells me you've got 1 badge.\nLet's see if you can earn the GUSINI BADGE.",
    defeat: "Pia: My babies need cookies and tissues...",
    team: [{ id: "PIGEONORE", lvl: 14 }, { id: "GUSINI", lvl: 15 }, { id: "PASTANELLO", lvl: 16 }, { id: "CRINGEFLY", lvl: 14 }],
    reward: 800, badge: 2, badgeName: "GUSINI BADGE",
    requiresBadge: 1,
  },
  GYM_SIGMA: {
    name: "Gym Leader Kai",
    title: "The Sigma",
    intro: "Kai: I don't lose. Sigma rule #1. Earn the SIGMA BADGE if you can.",
    defeat: "Kai: That wasn't very alpha of you.",
    team: [{ id: "SIGMAWOLF", lvl: 18 }, { id: "MOSSARELLA", lvl: 19 }, { id: "CAPPUASS", lvl: 20 }, { id: "PROSCIUTTO", lvl: 21 }],
    reward: 1100, badge: 3, badgeName: "SIGMA BADGE",
    requiresBadge: 2,
  },
  GYM_BEACH: {
    name: "Gym Leader Tony",
    title: "The Sea Bait",
    intro: "Tony: I caught a tralalero this big once.\nThe TRALALERO BADGE will be your reward... if you reel me in.",
    defeat: "Tony: Hooked... by the bait... again...",
    team: [{ id: "SHRIMPELO", lvl: 22 }, { id: "TRIPPI", lvl: 22 }, { id: "CHEESETOPUS", lvl: 23 }, { id: "TRALALERO", lvl: 24 }, { id: "TRALALERONE", lvl: 25 }],
    reward: 1500, badge: 4, badgeName: "TRALALERO BADGE",
    requiresBadge: 3,
  },
  GYM_FIRE: {
    name: "Gym Leader Greg",
    title: "The 800-Degree Pizzaiolo",
    intro: "Greg: 800 degrees! Wood fired!\nThe BOMBARDINO BADGE awaits — if you survive the heat.",
    defeat: "Greg: The dough... fell flat...",
    team: [{ id: "PIZZADIRO", lvl: 26 }, { id: "MARGHERITRON", lvl: 27 }, { id: "BOMBARDINO", lvl: 28 }, { id: "ESPRESSEUR", lvl: 29 }, { id: "GIGACHEF", lvl: 30 }],
    reward: 2000, badge: 5, badgeName: "BOMBARDINO BADGE",
    requiresBadge: 4,
  },

  // ----- ESPRESSO FOUR (Elite) -----
  ELITE_1: {
    name: "Elite Cappuccino Marco",
    title: "Espresso Four #1",
    intro: "Cappuccino: I am steam. I am crema. I am inevitable.",
    defeat: "Cappuccino: I have been... decaffed.",
    team: [{ id: "CAPPUASS", lvl: 32 }, { id: "BALLERINA", lvl: 32 }, { id: "ESPRESSITO", lvl: 33 }, { id: "ESPRESSEUR", lvl: 35 }],
    reward: 3000, requiresBadge: 5,
  },
  ELITE_2: {
    name: "Elite Sigma Stella",
    title: "Espresso Four #2",
    intro: "Stella: My aura blocks pasta. Try me.",
    defeat: "Stella: Tch. Mid.",
    team: [{ id: "SIGMAWOLF", lvl: 33 }, { id: "MOSSARELLA", lvl: 34 }, { id: "PROSCIUTTO", lvl: 35 }, { id: "RIZZLER", lvl: 36 }],
    reward: 3000, requiresBadge: 5,
  },
  ELITE_3: {
    name: "Elite Lore Master Don",
    title: "Espresso Four #3",
    intro: "Don: I have studied the deepest brainrot. Have you?",
    defeat: "Don: ...The lore continues, despite me.",
    team: [{ id: "GLORBO", lvl: 35 }, { id: "RIZZARDO", lvl: 35 }, { id: "TIRAMISU", lvl: 36 }, { id: "CRINGELORD", lvl: 37 }],
    reward: 3000, requiresBadge: 5,
  },
  ELITE_4: {
    name: "Elite Chef Mario",
    title: "Espresso Four #4",
    intro: "Mario: It's-a me! I will-a cook you!",
    defeat: "Mario: Mamma mia... it's all over...",
    team: [{ id: "MARGHERITRON", lvl: 36 }, { id: "PARMIGIANO", lvl: 37 }, { id: "LASAGNONE", lvl: 38 }, { id: "GIGACHEF", lvl: 39 }],
    reward: 3000, requiresBadge: 5,
  },

  // ----- POST-GAME / SOUTH VALLEY -----
  POST_VETERAN: {
    name: "Veteran Carlo",
    intro: "Carlo: I've trained for 800 years. Show me your dedication.",
    defeat: "Carlo: 800 years... wasted...",
    team: [{ id: "BOMBARDIRO", lvl: 38 }, { id: "TRALALERONE", lvl: 38 }, { id: "PARMIGIANO", lvl: 39 }, { id: "GIGACHEF", lvl: 40 }],
    reward: 4000, requiresBadge: 5,
  },
  POST_CULT_LEADER: {
    name: "Cult Leader Vibrius",
    intro: "Vibrius: GLORBO! GLORBO! He has shown me visions of your defeat!",
    defeat: "Vibrius: Glorbo lied to me...",
    team: [{ id: "GLORBO", lvl: 40 }, { id: "RIZZARDO", lvl: 40 }, { id: "OHIO", lvl: 42 }, { id: "BRAINCORE", lvl: 44 }],
    reward: 5000, requiresBadge: 5,
  },
  POST_RIVAL: {
    name: "Final Marco",
    intro: "Marco: One. Last. Time.\nMarco: I have trained until my Boneca is built different.",
    defeat: "Marco: Well played, friend. We've come a long way.",
    team: [{ id: "BONECA", lvl: 42 }, { id: "BOMBARDIRO", lvl: 43 }, { id: "OHIO", lvl: 44 }, { id: "TRALATITAN", lvl: 46 }, { id: "MARGHERITRON", lvl: 45 }],
    reward: 8000, requiresBadge: 5,
  },
  EAST_HIKER: {
    name: "Easterner Mateo",
    intro: "Mateo: I'm climbing east. Like Marco Polo but worse.",
    defeat: "Mateo: I'll just sit here and rest.",
    team: [{ id: "FRIGO", lvl: 17 }, { id: "PARMIGIANO", lvl: 18 }, { id: "GROCCO", lvl: 19 }],
    reward: 600,
  },
  EAST_BEACH: {
    name: "Beachgoer Lucia",
    intro: "Lucia: Bro the rays here are SIGMA.",
    defeat: "Lucia: Sunscreen wasn't enough...",
    team: [{ id: "SHRIMPELO", lvl: 19 }, { id: "TRIPPI", lvl: 20 }, { id: "GELATO", lvl: 20 }],
    reward: 700,
  },
  AURA_FARMER: {
    name: "Aura Farmer Goncho",
    intro: "Goncho: Stares at you. Mid aura. Mid aura.",
    defeat: "Goncho: Your aura... is actually elite.",
    team: [{ id: "AURAFARM", lvl: 28 }, { id: "SIGMAWOLF", lvl: 28 }, { id: "RIZZLER", lvl: 30 }],
    reward: 2200, requiresBadge: 4,
  },
  AI_RESEARCHER: {
    name: "AI Researcher Synthia",
    intro: "Synthia: I trained on the entire internet. Beat my model.",
    defeat: "Synthia: My loss function... is loss-ing...",
    team: [{ id: "AISLOP", lvl: 30 }, { id: "GLORBO", lvl: 31 }, { id: "TICTACSAURO", lvl: 32 }, { id: "BRAINCORE", lvl: 34 }],
    reward: 3500, requiresBadge: 5,
  },
  COSMIC_RANCHER: {
    name: "Cosmic Rancher Saturno",
    intro: "Saturno: My cows orbit. Yours... do not.",
    defeat: "Saturno: A cosmic loss. Vast.",
    team: [{ id: "VACCASATURN", lvl: 32 }, { id: "COCOFANTO", lvl: 32 }, { id: "PARMIGIANO", lvl: 33 }, { id: "MOSSARELLA", lvl: 34 }],
    reward: 3200, requiresBadge: 4,
  },
  HIGH_ROLLER: {
    name: "High Roller Lucky",
    intro: "Lucky: I always hit triple sevens. Watch me.",
    defeat: "Lucky: Even the slot... is rigged against me now.",
    team: [{ id: "SEVENSEVEN", lvl: 30 }, { id: "FANUMTAX", lvl: 30 }, { id: "RIZZLER", lvl: 32 }, { id: "OHIO", lvl: 33 }],
    reward: 4000, requiresBadge: 5,
  },
  BIRD_LADY: {
    name: "Bird Lady Pia",
    intro: "Pia: Coooo! My birds will peck you into next week!",
    defeat: "Pia: My darlings... back to the nest...",
    team: [{ id: "PIGEONORE", lvl: 9 }, { id: "GUSINI", lvl: 10 }, { id: "CRINGEFLY", lvl: 9 }],
    reward: 240,
  },
  FISHER: {
    name: "Fisher Tony",
    intro: "Tony: I'll reel ya in! Catch of the day!",
    defeat: "Tony: The big one got away...",
    team: [{ id: "SHRIMPELO", lvl: 14 }, { id: "CHEESETOPUS", lvl: 14 }, { id: "TRALALERO", lvl: 16 }],
    reward: 380,
  },

  // ----- CHAMPION -----
  CHAMPION: {
    name: "Champion Brainrot Queen",
    title: "Embodiment of TikTok 2026",
    intro: "Queen: You've climbed far, challenger.\nThe lore deepest is mine alone.\nTralalero tralala... your final test begins.",
    defeat: "Queen: Impossible! You... understand the lore!",
    team: [
      { id: "GLORBO", lvl: 40 },
      { id: "OHIO", lvl: 41 },
      { id: "CRINGELORD", lvl: 42 },
      { id: "RIZZLER", lvl: 43 },
      { id: "GIGACHEF", lvl: 44 },
      { id: "BRAINCORE", lvl: 46 },
    ],
    reward: 10000, isChampion: true, requiresBadge: 5,
  },
};

// Items now sold by shopkeeper
const SHOP_ITEMS = [
  { key: "BRAINCELL", price: 50 },
  { key: "GREATCELL", price: 200 },
  { key: "ULTRACELL", price: 600 },
  { key: "CAPPUCCINO", price: 100 },
  { key: "ESPRESSO_DBL", price: 300 },
  { key: "ELIXIR", price: 1500 },
  { key: "ETEREO", price: 400 },
  { key: "PASTATONIC", price: 1800 },
];

// Items
const ITEMS = {
  BRAINCELL:    { name: "Brain Cell",     desc: "Throw to capture. Standard catch device.", catchMod: 1.0 },
  GREATCELL:    { name: "Great Cell",     desc: "Better capture rate.", catchMod: 1.5 },
  ULTRACELL:    { name: "Ultra Cell",     desc: "Excellent capture rate.", catchMod: 2.0 },
  CAPPUCCINO:   { name: "Cappuccino",     desc: "Heals 30 HP.", heal: 30 },
  ESPRESSO_DBL: { name: "Doppio Espresso",desc: "Heals 80 HP.", heal: 80 },
  ELIXIR:       { name: "Pasta Elixir",   desc: "Fully restores HP.", heal: 999 },
  // PP restore items — refill move PP without visiting a Cappuccino Bar
  ETEREO:       { name: "Etereo Espresso",desc: "Restores 10 PP to all moves of one mon.", ppHeal: 10 },
  PASTATONIC:   { name: "Pasta Tonic",    desc: "Fully restores PP for all moves of one mon.", ppHeal: 999 },
};

// Helpers
function statAt(species, level, stat) {
  // simple stat formula
  const base = species.base[stat];
  return Math.floor(((base * 2) * level) / 100) + (stat === "hp" ? level + 10 : 5);
}

function maxHp(species, level) { return statAt(species, level, "hp"); }

function xpForLevel(level) {
  // medium-fast
  return Math.floor(level * level * level);
}

function makeMon(speciesId, level) {
  const sp = SPECIES[speciesId];
  if (!sp) throw new Error("unknown species " + speciesId);
  const moves = [];
  const entries = (sp.learn || []).slice().sort((a,b) => a[0] - b[0]);
  for (const [lvl, mv] of entries) {
    if (lvl <= level && !moves.includes(mv)) {
      moves.push(mv);
      if (moves.length > 4) moves.shift();
    }
  }
  if (moves.length === 0) moves.push("TACKLE");
  return {
    species: speciesId,
    nickname: sp.name,
    level,
    xp: xpForLevel(level),
    hp: maxHp(sp, level),
    maxHp: maxHp(sp, level),
    moves: moves.map(id => ({ id, pp: MOVES[id].pp, maxPp: MOVES[id].pp })),
    statusEffect: null,
    statBoosts: { atk: 0, def: 0, spd: 0 },
    iv: Math.floor(Math.random()*16),
  };
}

function movesLearnedAt(species, level) {
  return (species.learn || []).filter(([lvl]) => lvl === level).map(([, mv]) => mv);
}

function getStat(mon, stat) {
  const sp = SPECIES[mon.species];
  let v = statAt(sp, mon.level, stat);
  if (stat === "hp") return v;
  const boost = mon.statBoosts[stat] || 0;
  if (boost >= 0) v = Math.floor(v * (2 + boost) / 2);
  else v = Math.floor(v * 2 / (2 - boost));
  return Math.max(1, v);
}

function typeEffectiveness(attackType, defenderTypes) {
  let mult = 1;
  for (const t of defenderTypes) {
    const m = (TYPE_CHART[attackType] || {})[t];
    if (m !== undefined) mult *= m;
  }
  return mult;
}
