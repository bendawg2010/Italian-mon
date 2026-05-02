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
    color1: "#f0f0f0", color2: "#ffd0a0", color3: "#3a5070",
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
    color1: "#c93dff", color2: "#ff8aff", color3: "#5a1a8a",
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
};

// Encounter tables per zone
const ENCOUNTERS = {
  ROUTE_1: [
    { id: "LIRILI", weight: 25, minLvl: 2, maxLvl: 5 },
    { id: "PATAPIM", weight: 20, minLvl: 2, maxLvl: 5 },
    { id: "CHIMPANZ", weight: 15, minLvl: 3, maxLvl: 6 },
    { id: "BALLERINA", weight: 10, minLvl: 3, maxLvl: 6 },
    { id: "BONECA", weight: 10, minLvl: 2, maxLvl: 5 },
    { id: "TRIPPI", weight: 5, minLvl: 4, maxLvl: 7 },
    { id: "RAVIOLINO", weight: 10, minLvl: 2, maxLvl: 5 },
    { id: "POMODORO", weight: 5, minLvl: 4, maxLvl: 7 },
  ],
  ROUTE_2: [
    { id: "GUSINI", weight: 18, minLvl: 6, maxLvl: 10 },
    { id: "FRIGO", weight: 15, minLvl: 7, maxLvl: 11 },
    { id: "CAPPUASS", weight: 12, minLvl: 8, maxLvl: 12 },
    { id: "LASAGNINI", weight: 12, minLvl: 6, maxLvl: 10 },
    { id: "SKIBIDI", weight: 10, minLvl: 8, maxLvl: 12 },
    { id: "SIGMAWOLF", weight: 10, minLvl: 9, maxLvl: 13 },
    { id: "GLORBO", weight: 5, minLvl: 10, maxLvl: 14 },
    { id: "RIZZLER", weight: 3, minLvl: 13, maxLvl: 16 },
    { id: "ESPRESSITO", weight: 8, minLvl: 7, maxLvl: 11 },
    { id: "MOSSARELLA", weight: 7, minLvl: 8, maxLvl: 12 },
  ],
  FOREST_NORTH: [
    { id: "PATAPIM", weight: 20, minLvl: 6, maxLvl: 10 },
    { id: "CHIMPANZ", weight: 15, minLvl: 6, maxLvl: 10 },
    { id: "ZUCCHINI", weight: 15, minLvl: 7, maxLvl: 11 },
    { id: "TURBOFROGGO", weight: 10, minLvl: 8, maxLvl: 12 },
    { id: "PIGEONORE", weight: 15, minLvl: 5, maxLvl: 9 },
    { id: "CRINGEFLY", weight: 10, minLvl: 5, maxLvl: 9 },
    { id: "GROCCO", weight: 10, minLvl: 9, maxLvl: 13 },
    { id: "ZESTYBOI", weight: 5, minLvl: 8, maxLvl: 12 },
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
    { id: "GELATO", weight: 18, minLvl: 10, maxLvl: 14 },
    { id: "SHRIMPELO", weight: 15, minLvl: 11, maxLvl: 15 },
    { id: "CHEESETOPUS", weight: 12, minLvl: 12, maxLvl: 16 },
    { id: "TRIPPI", weight: 10, minLvl: 10, maxLvl: 14 },
    { id: "SOGGYNINI", weight: 12, minLvl: 11, maxLvl: 15 },
    { id: "TRALALERO", weight: 8, minLvl: 13, maxLvl: 17 },
    { id: "SKIBIDI", weight: 10, minLvl: 12, maxLvl: 16 },
    { id: "PIGEONORE", weight: 8, minLvl: 10, maxLvl: 14 },
    { id: "TRALATITAN", weight: 1, minLvl: 30, maxLvl: 35 },
    { id: "TRALALERONE", weight: 6, minLvl: 18, maxLvl: 22 },
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
};

// Trainers - simple NPCs with teams
const TRAINERS = {
  RIVAL_1: {
    name: "Rival Marco",
    intro: "Marco: Yo! You picked your meme? Mine'll absolutely cook yours.",
    defeat: "Marco: WHAT?! That's so brainrot of you. I'll be back!",
    team: [{ id: "BONECA", lvl: 6 }, { id: "GUSINI", lvl: 7 }],
    reward: 100,
  },
  TRAINER_1: {
    name: "Pasta Chef Luigi",
    intro: "Luigi: Mamma mia! Taste the al dente!",
    defeat: "Luigi: My pasta... she is overcooked...",
    team: [{ id: "LASAGNINI", lvl: 8 }, { id: "RAVIOLINO", lvl: 9 }, { id: "CHIMPANZ", lvl: 10 }],
    reward: 200,
  },
  TRAINER_2: {
    name: "Sigma Bro Kai",
    intro: "Kai: I don't lose. Sigma rule #1.",
    defeat: "Kai: Bro... that wasn't very alpha of you.",
    team: [{ id: "SIGMAWOLF", lvl: 11 }, { id: "CAPPUASS", lvl: 12 }, { id: "MOSSARELLA", lvl: 12 }],
    reward: 250,
  },
  BIRD_LADY: {
    name: "Bird Lady Pia",
    intro: "Pia: Coo coo! My babies will peck your eyes out!",
    defeat: "Pia: My babies... they need cookies now...",
    team: [{ id: "PIGEONORE", lvl: 9 }, { id: "GUSINI", lvl: 10 }, { id: "PASTANELLO", lvl: 11 }],
    reward: 220,
  },
  FISHER: {
    name: "Fisher Tony",
    intro: "Tony: I'll reel ya in good, kid!",
    defeat: "Tony: Bait... taken... by the BAITED.",
    team: [{ id: "SHRIMPELO", lvl: 12 }, { id: "TRIPPI", lvl: 13 }, { id: "CHEESETOPUS", lvl: 14 }],
    reward: 300,
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
    intro: "Marco: I've been training in the cave. I'm built different.",
    defeat: "Marco: I... I'll go meditate in the forest.",
    team: [{ id: "BONECA", lvl: 14 }, { id: "GUSINI", lvl: 15 }, { id: "BOMBARDINO", lvl: 16 }, { id: "OHIO", lvl: 17 }],
    reward: 600,
  },
  PIZZA_CHEF: {
    name: "Pizza Chef Greg",
    intro: "Greg: 800 degrees! Wood fired! YOU WILL BE CHARRED!",
    defeat: "Greg: I... need to lower the heat...",
    team: [{ id: "PIZZADIRO", lvl: 16 }, { id: "MARGHERITRON", lvl: 17 }],
    reward: 500,
  },
  ELITE_1: {
    name: "Elite Cappuccino Marco",
    intro: "Cappuccino: I am steam. I am crema. I am inevitable.",
    defeat: "Cappuccino: I have been... decaffed.",
    team: [{ id: "CAPPUASS", lvl: 22 }, { id: "BALLERINA", lvl: 22 }, { id: "ESPRESSEUR", lvl: 24 }],
    reward: 1500,
  },
  GYM_LEADER: {
    name: "Brainrot Queen Tralala",
    intro: "Queen: Welcome, challenger. I am the embodiment of TikTok 2026.",
    defeat: "Queen: Impossible! You... you understand the lore?!",
    team: [{ id: "GLORBO", lvl: 22 }, { id: "RIZZLER", lvl: 24 }, { id: "CRINGELORD", lvl: 26 }, { id: "OHIO", lvl: 28 }],
    reward: 3000,
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
];

// Items
const ITEMS = {
  BRAINCELL:    { name: "Brain Cell",     desc: "Throw to capture. Standard catch device.", catchMod: 1.0 },
  GREATCELL:    { name: "Great Cell",     desc: "Better capture rate.", catchMod: 1.5 },
  ULTRACELL:    { name: "Ultra Cell",     desc: "Excellent capture rate.", catchMod: 2.0 },
  CAPPUCCINO:   { name: "Cappuccino",     desc: "Heals 30 HP.", heal: 30 },
  ESPRESSO_DBL: { name: "Doppio Espresso",desc: "Heals 80 HP.", heal: 80 },
  ELIXIR:       { name: "Pasta Elixir",   desc: "Fully restores HP.", heal: 999 },
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
