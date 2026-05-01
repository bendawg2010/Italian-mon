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
    color1: "#f5b143", color2: "#ffe0a0", color3: "#9b3a1a",
  },
};

// Encounter tables per zone
const ENCOUNTERS = {
  GRASS_ROUTE_1: [
    { id: "LIRILI", weight: 30, minLvl: 2, maxLvl: 4 },
    { id: "PATAPIM", weight: 25, minLvl: 2, maxLvl: 4 },
    { id: "CHIMPANZ", weight: 20, minLvl: 3, maxLvl: 5 },
    { id: "BALLERINA", weight: 10, minLvl: 3, maxLvl: 5 },
    { id: "BONECA", weight: 10, minLvl: 2, maxLvl: 4 },
    { id: "TRIPPI", weight: 5, minLvl: 4, maxLvl: 6 },
  ],
  GRASS_ROUTE_2: [
    { id: "GUSINI", weight: 25, minLvl: 5, maxLvl: 8 },
    { id: "FRIGO", weight: 20, minLvl: 6, maxLvl: 9 },
    { id: "CAPPUASS", weight: 15, minLvl: 7, maxLvl: 10 },
    { id: "LASAGNINI", weight: 15, minLvl: 5, maxLvl: 8 },
    { id: "SKIBIDI", weight: 10, minLvl: 7, maxLvl: 10 },
    { id: "SIGMAWOLF", weight: 10, minLvl: 8, maxLvl: 11 },
    { id: "GLORBO", weight: 4, minLvl: 9, maxLvl: 12 },
    { id: "RIZZLER", weight: 1, minLvl: 12, maxLvl: 15 },
  ],
};

// Trainers - simple NPCs with teams
const TRAINERS = {
  RIVAL_1: {
    name: "Rival Marco",
    intro: "Marco: Yo! You picked your meme? Mine'll absolutely cook yours.",
    defeat: "Marco: WHAT?! That's so brainrot of you. I'll be back!",
    team: [{ id: "BONECA", lvl: 5 }],
  },
  TRAINER_1: {
    name: "Pasta Chef Luigi",
    intro: "Luigi: Mamma mia! Taste the al dente!",
    defeat: "Luigi: My pasta... she is overcooked...",
    team: [{ id: "LASAGNINI", lvl: 6 }, { id: "CHIMPANZ", lvl: 7 }],
  },
  TRAINER_2: {
    name: "Sigma Bro Kai",
    intro: "Kai: I don't lose. Sigma rule #1.",
    defeat: "Kai: Bro... that wasn't very alpha of you.",
    team: [{ id: "SIGMAWOLF", lvl: 9 }, { id: "CAPPUASS", lvl: 10 }],
  },
  GYM_LEADER: {
    name: "Gym Leader Brainrot Queen",
    intro: "Queen: Welcome, challenger. I am the embodiment of TikTok 2026.",
    defeat: "Queen: Impossible! You... you understand the lore?!",
    team: [{ id: "GLORBO", lvl: 12 }, { id: "RIZZLER", lvl: 14 }, { id: "OHIO", lvl: 16 }],
  },
};

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
