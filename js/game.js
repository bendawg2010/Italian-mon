// =====================================================
// Main game loop, input, state management
// =====================================================

(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // Game state
  const game = {
    mode: "title", // title | starter | overworld | battle | dialog | menu
    player: {
      tileX: 8,
      tileY: 16,
      pixelX: 8 * 16,
      pixelY: 16 * 16,
      facing: "down",
      moving: false,
      moveProgress: 0,
      moveSpeed: 6, // pixels per frame
      animFrame: 0,
      stepCounter: 0,
    },
    team: [],
    box: [], // overflow caught monsters
    bag: { BRAINCELL: 8, GREATCELL: 2, CAPPUCCINO: 3 },
    cam: { x: 0, y: 0 },
    inputs: {},
    dialog: null,
    starterIdx: 0,
    queueAfterDialog: null,
    encounterCooldown: 0,
    flashTime: 0,
    badges: 0,
  };

  // ----- Input -----
  const keys = {};
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","Enter","z","x","Z","X"].includes(e.key)) {
      e.preventDefault();
    }
    keys[e.key] = true;
    onKeyDown(e.key);
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  // touch buttons
  document.querySelectorAll("#touch-controls button").forEach(btn => {
    const k = btn.dataset.key;
    const press = (e) => { e.preventDefault(); keys[k] = true; onKeyDown(k); };
    const release = (e) => { e.preventDefault(); keys[k] = false; };
    btn.addEventListener("touchstart", press);
    btn.addEventListener("touchend", release);
    btn.addEventListener("mousedown", press);
    btn.addEventListener("mouseup", release);
    btn.addEventListener("mouseleave", release);
  });

  // battle ui buttons
  document.querySelectorAll("#battle-actions button").forEach(btn => {
    btn.addEventListener("click", () => Battle.handleAction(btn.dataset.action));
  });
  document.getElementById("move-list").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      Battle.handleMove(e.target.dataset.move);
    }
  });

  // tap title
  document.getElementById("title-screen").addEventListener("click", () => {
    if (game.mode === "title") startGame();
  });

  function onKeyDown(key) {
    if (game.mode === "title") {
      if (key === "Enter" || key === "z" || key === " ") startGame();
      return;
    }
    if (game.mode === "starter") {
      if (key === "ArrowLeft") cycleStarter(-1);
      else if (key === "ArrowRight") cycleStarter(1);
      else if (key === "Enter" || key === "z") confirmStarter();
      return;
    }
    if (game.mode === "battle") {
      Battle.handleKey(key);
      return;
    }
    if (game.mode === "dialog") {
      if (key === "z" || key === "Enter" || key === " ") advanceDialog();
      return;
    }
    if (game.mode === "menu") {
      if (key === "x" || key === "Escape") closeMenu();
      else if (key === "ArrowUp") menuMove(-1);
      else if (key === "ArrowDown") menuMove(1);
      else if (key === "Enter" || key === "z") menuSelect();
      return;
    }
    if (game.mode === "overworld") {
      if (key === "x" || key === "Escape") openMenu();
      else if (key === "z" || key === "Enter") interact();
    }
  }

  // ----- Title / starter -----
  function startGame() {
    document.getElementById("title-screen").classList.add("hidden");
    // show touch ctrls if mobile
    const isTouch = matchMedia("(pointer: coarse)").matches;
    if (isTouch) document.getElementById("touch-controls").classList.remove("hidden");

    // load save?
    if (loadSave()) {
      game.mode = "overworld";
      showDialog([`Welcome back!\nYou have ${game.team.length} monsters in your team.`], () => {});
      return;
    }
    game.mode = "starter";
    game.starterIdx = 0;
    showDialog([
      "PROFESSOR PARMIGIANO:",
      "Ah! A new challenger! In this world, brain rot creatures roam the lands.",
      "Capture them. Train them. Defeat the Brainrot Queen.",
      "Pick your starter, my dear traveler:",
    ], () => {
      game.mode = "starter";
    });
  }

  const STARTERS = ["TRALALERO", "BOMBARDINO", "TUNGTUNG"];
  const STARTER_INFO = {
    TRALALERO: "Water/Beast — speedy attacker.",
    BOMBARDINO: "Fire/Air — heavy hitter.",
    TUNGTUNG: "Beast/Brainrot — defensive bruiser.",
  };

  function cycleStarter(d) {
    game.starterIdx = (game.starterIdx + d + STARTERS.length) % STARTERS.length;
  }

  function confirmStarter() {
    const id = STARTERS[game.starterIdx];
    const mon = makeMon(id, 5);
    game.team.push(mon);
    game.mode = "dialog";
    showDialog([
      `You chose ${SPECIES[id].name}!`,
      `"${SPECIES[id].flavor}"`,
      "Professor: Now go! And remember — when in doubt, say 'tralalero'.",
    ], () => {
      game.mode = "overworld";
      saveGame();
    });
  }

  // ----- Dialog -----
  function showDialog(lines, onEnd) {
    game.mode = "dialog";
    game.dialog = { lines: [...lines], idx: 0, onEnd: onEnd || (() => {}) };
    const el = document.getElementById("dialog");
    el.classList.remove("hidden");
    document.getElementById("dialog-text").innerHTML = lines[0];
  }

  function advanceDialog() {
    if (!game.dialog) return;
    game.dialog.idx++;
    if (game.dialog.idx >= game.dialog.lines.length) {
      const cb = game.dialog.onEnd;
      game.dialog = null;
      document.getElementById("dialog").classList.add("hidden");
      cb();
      if (game.mode === "dialog") game.mode = "overworld";
    } else {
      document.getElementById("dialog-text").innerHTML = game.dialog.lines[game.dialog.idx];
    }
  }

  // ----- Menu -----
  let menuState = null;
  function openMenu() {
    menuState = {
      items: ["TEAM", "BAG", "SAVE", "CLOSE"],
      idx: 0,
    };
    game.mode = "menu";
    renderMenu();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeMenu() {
    document.getElementById("menu").classList.add("hidden");
    menuState = null;
    game.mode = "overworld";
  }
  function menuMove(d) {
    if (!menuState) return;
    menuState.idx = (menuState.idx + d + menuState.items.length) % menuState.items.length;
    renderMenu();
  }
  function renderMenu() {
    const ul = document.getElementById("menu-list");
    ul.innerHTML = menuState.items.map((it, i) =>
      `<li class="${i === menuState.idx ? "selected" : ""}">${it}</li>`
    ).join("");
  }
  function menuSelect() {
    const choice = menuState.items[menuState.idx];
    if (choice === "CLOSE") { closeMenu(); return; }
    if (choice === "SAVE") {
      saveGame();
      closeMenu();
      showDialog(["Game saved successfully!"], () => {});
      return;
    }
    if (choice === "TEAM") {
      closeMenu();
      const lines = game.team.length === 0 ? ["You have no monsters."] :
        game.team.map(m => {
          const sp = SPECIES[m.species];
          return `${sp.name} Lv.${m.level} HP:${m.hp}/${m.maxHp}\nMoves: ${m.moves.map(mv => MOVES[mv.id].name).join(", ")}`;
        });
      showDialog(lines, () => {});
      return;
    }
    if (choice === "BAG") {
      closeMenu();
      const lines = Object.entries(game.bag).map(([k, v]) =>
        `${ITEMS[k].name} x${v}\n${ITEMS[k].desc}`
      );
      showDialog(lines.length ? lines : ["Bag is empty."], () => {});
      return;
    }
  }

  // ----- Overworld interaction -----
  function interact() {
    const p = game.player;
    let tx = p.tileX, ty = p.tileY;
    if (p.facing === "up") ty--;
    else if (p.facing === "down") ty++;
    else if (p.facing === "left") tx--;
    else if (p.facing === "right") tx++;
    const npc = World.npcAt(tx, ty);
    if (npc) {
      if (npc.type === "trainer") {
        if (npc.defeated) {
          showDialog([`${npc.dialog[0].split(":")[0]}: I have been bested. Move along.`], () => {});
          return;
        }
        showDialog(npc.dialog, () => {
          startTrainerBattle(npc);
        });
      } else if (npc.type === "healer") {
        showDialog(npc.dialog, () => {
          for (const m of game.team) {
            m.hp = m.maxHp;
            for (const mv of m.moves) mv.pp = mv.maxPp;
          }
          saveGame();
        });
      } else if (npc.type === "sign") {
        showDialog(npc.dialog, () => {});
      } else {
        showDialog(npc.dialog || ["..."], () => {});
      }
    }
  }

  function startTrainerBattle(npc) {
    const data = TRAINERS[npc.trainerKey];
    const team = data.team.map(({id, lvl}) => makeMon(id, lvl));
    game.mode = "battle";
    Battle.start(game.team, team, {
      isTrainer: true,
      trainerName: data.name,
      trainerData: data,
      onEnd: (result) => {
        if (result.defeatedTrainer) {
          npc.defeated = true;
          if (npc.trainerKey === "GYM_LEADER") {
            game.badges++;
            showDialog([
              "You defeated the Brainrot Queen!",
              "You receive the BRAINROT BADGE.",
              "...The credits would roll, but the lore continues. Train more!",
            ], () => {});
          }
        }
        game.mode = "overworld";
        saveGame();
      },
    });
  }

  function startWildBattle() {
    const tableId = World.encounterTableAt(game.player.tileX, game.player.tileY);
    const table = ENCOUNTERS[tableId];
    const total = table.reduce((s, e) => s + e.weight, 0);
    let r = Math.random() * total;
    let chosen = table[0];
    for (const e of table) { r -= e.weight; if (r <= 0) { chosen = e; break; } }
    const lvl = chosen.minLvl + Math.floor(Math.random() * (chosen.maxLvl - chosen.minLvl + 1));
    const enemy = makeMon(chosen.id, lvl);
    game.mode = "battle";
    game.flashTime = 12;
    Battle.start(game.team, enemy, {
      isTrainer: false,
      onEnd: (result) => {
        if (result.caught) {
          if (game.team.length < 6) game.team.push(result.enemyMon);
          else game.box.push(result.enemyMon);
        }
        game.mode = "overworld";
        saveGame();
      },
    });
  }

  // ----- Movement -----
  function tryStartMove() {
    const p = game.player;
    if (p.moving) return;
    let dx = 0, dy = 0, facing = p.facing;
    if (keys["ArrowUp"]) { dy = -1; facing = "up"; }
    else if (keys["ArrowDown"]) { dy = 1; facing = "down"; }
    else if (keys["ArrowLeft"]) { dx = -1; facing = "left"; }
    else if (keys["ArrowRight"]) { dx = 1; facing = "right"; }
    else return;
    p.facing = facing;
    const nx = p.tileX + dx, ny = p.tileY + dy;
    if (!World.isWalkable(nx, ny)) {
      // bonk - can still face that way
      return;
    }
    p.targetX = nx;
    p.targetY = ny;
    p.moving = true;
    p.moveProgress = 0;
    p.dx = dx;
    p.dy = dy;
  }

  function updateMovement() {
    const p = game.player;
    if (!p.moving) return;
    p.moveProgress += p.moveSpeed;
    p.pixelX = p.tileX * 16 + p.dx * p.moveProgress;
    p.pixelY = p.tileY * 16 + p.dy * p.moveProgress;
    if (p.moveProgress >= 16) {
      p.tileX = p.targetX;
      p.tileY = p.targetY;
      p.pixelX = p.tileX * 16;
      p.pixelY = p.tileY * 16;
      p.moving = false;
      p.stepCounter++;
      p.animFrame = (p.animFrame + 1) % 2;
      // trigger encounter?
      if (World.isEncounterTile(p.tileX, p.tileY)) {
        if (game.encounterCooldown <= 0 && Math.random() < 0.10) {
          game.encounterCooldown = 4;
          startWildBattle();
          return;
        }
      }
      // healing tile
      if (World.isHealerTile(p.tileX, p.tileY)) {
        // do nothing; healing happens through nurse interaction
      }
      if (game.encounterCooldown > 0) game.encounterCooldown--;
    }
  }

  // ----- Camera -----
  function updateCamera() {
    const p = game.player;
    const W = canvas.width, H = canvas.height;
    let cx = p.pixelX + 8 - W / 2;
    let cy = p.pixelY + 8 - H / 2;
    cx = Math.max(0, Math.min(World.WIDTH * 16 - W, cx));
    cy = Math.max(0, Math.min(World.HEIGHT * 16 - H, cy));
    game.cam.x = cx;
    game.cam.y = cy;
  }

  // ----- Save / Load -----
  function saveGame() {
    const data = {
      team: game.team,
      box: game.box,
      bag: game.bag,
      player: { tileX: game.player.tileX, tileY: game.player.tileY, facing: game.player.facing },
      badges: game.badges,
      defeated: World.npcs.filter(n => n.defeated).map(n => n.id),
    };
    try { localStorage.setItem("brainrot_save_v1", JSON.stringify(data)); } catch(e) {}
  }
  function loadSave() {
    try {
      const raw = localStorage.getItem("brainrot_save_v1");
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.team || data.team.length === 0) return false;
      game.team = data.team;
      game.box = data.box || [];
      game.bag = data.bag || { BRAINCELL: 8 };
      game.player.tileX = data.player.tileX;
      game.player.tileY = data.player.tileY;
      game.player.pixelX = game.player.tileX * 16;
      game.player.pixelY = game.player.tileY * 16;
      game.player.facing = data.player.facing || "down";
      game.badges = data.badges || 0;
      const defeatedIds = data.defeated || [];
      for (const n of World.npcs) if (defeatedIds.includes(n.id)) n.defeated = true;
      return true;
    } catch(e) { return false; }
  }

  // expose for debugging
  window.__brainrot = { game, saveGame, loadSave, World, SPECIES, makeMon };

  // Hook used by battle to consume items
  window.__brainrotBagConsume = function(itemKey) {
    if ((game.bag[itemKey] || 0) <= 0) return false;
    game.bag[itemKey]--;
    return true;
  };

  // ----- Render starter screen -----
  function drawStarterScreen(time) {
    ctx.fillStyle = "#0d0d18";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // title
    ctx.fillStyle = "#ffcb05";
    ctx.font = "bold 14px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("CHOOSE YOUR STARTER", canvas.width/2, 28);
    // mons
    const slots = [
      { x: canvas.width/2 - 160 },
      { x: canvas.width/2 - 48 },
      { x: canvas.width/2 + 64 },
    ];
    for (let i = 0; i < STARTERS.length; i++) {
      const s = slots[i];
      const isSel = i === game.starterIdx;
      if (isSel) {
        ctx.fillStyle = "rgba(255,203,5,0.2)";
        ctx.fillRect(s.x - 8, 50, 112, 112);
        ctx.strokeStyle = "#ffcb05";
        ctx.lineWidth = 2;
        ctx.strokeRect(s.x - 8, 50, 112, 112);
      }
      SpriteRenderer.drawMon(ctx, STARTERS[i], s.x, 60, 96, time);
    }
    // info
    ctx.fillStyle = "#fff";
    ctx.font = "10px Courier New";
    const sel = STARTERS[game.starterIdx];
    ctx.fillText(SPECIES[sel].name, canvas.width/2, 190);
    ctx.fillStyle = "#ffd";
    const flavor = SPECIES[sel].flavor;
    wrapText(ctx, flavor, canvas.width/2, 210, 360, 12);
    ctx.fillStyle = "#cfe9ff";
    wrapText(ctx, STARTER_INFO[sel], canvas.width/2, 250, 360, 12);
    ctx.fillStyle = "#aaa";
    ctx.fillText("◀ ▶ to choose · Z / Enter to confirm", canvas.width/2, 295);
  }

  function wrapText(ctx, text, x, y, maxW, lh) {
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(line, x, yy);
        line = w + " ";
        yy += lh;
      } else line = test;
    }
    ctx.fillText(line, x, yy);
  }

  // ----- Main loop -----
  let lastTime = 0;
  function loop(t) {
    const dt = t - lastTime;
    lastTime = t;
    update(t);
    render(t);
    requestAnimationFrame(loop);
  }

  function update(time) {
    if (game.mode === "overworld") {
      tryStartMove();
      updateMovement();
      updateCamera();
    }
    if (game.flashTime > 0) game.flashTime--;
  }

  function render(time) {
    if (game.mode === "title") return; // overlay handles it
    if (game.mode === "starter") {
      drawStarterScreen(time);
      return;
    }
    if (game.mode === "battle") {
      Battle.draw(ctx, time);
      Battle.refreshInfo();
      return;
    }
    // overworld / dialog / menu
    World.draw(ctx, game.cam, time);
    // player
    SpriteRenderer.drawPlayer(
      ctx,
      game.player.pixelX - game.cam.x,
      game.player.pixelY - game.cam.y,
      game.player.facing,
      game.player.animFrame
    );
    if (game.flashTime > 0) {
      ctx.fillStyle = `rgba(255,255,255,${game.flashTime / 12})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // hud minicorner
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(4, 4, 108, 16);
    ctx.fillStyle = "#fff";
    ctx.font = "10px Courier New";
    ctx.textAlign = "left";
    ctx.fillText(`Team:${game.team.length}/6  Badge:${game.badges}`, 8, 16);
  }

  requestAnimationFrame(loop);
})();
