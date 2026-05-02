// =====================================================
// Main game loop, input, state management
// =====================================================

(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const game = {
    mode: "title", // title | starter | overworld | battle | dialog | menu | team | bag | shop
    player: {
      tileX: 9, tileY: 22,
      pixelX: 9 * 16, pixelY: 22 * 16,
      facing: "down",
      moving: false,
      moveProgress: 0,
      moveSpeed: 6,
      animFrame: 0,
      stepCounter: 0,
    },
    team: [],
    box: [],
    bag: { BRAINCELL: 8, GREATCELL: 1, CAPPUCCINO: 3 },
    money: 500,
    cam: { x: 0, y: 0 },
    dialog: null,
    dialogTyping: { active: false, text: "", target: "", t: 0 },
    starterIdx: 0,
    encounterCooldown: 0,
    flashTime: 0,
    badges: 0,
  };

  const keys = {};
  let lastTime = 0;
  let nowTime = 0;

  window.addEventListener("keydown", (e) => {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","Enter","z","x","Z","X","Escape"].includes(e.key)) {
      e.preventDefault();
    }
    keys[e.key.toLowerCase()] = true;
    keys[e.key] = true;
    Audio.unlock();
    onKeyDown(e.key);
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
    keys[e.key] = false;
  });

  document.querySelectorAll("#touch-controls button").forEach(btn => {
    const k = btn.dataset.key;
    const press = (e) => { e.preventDefault(); Audio.unlock(); keys[k] = true; onKeyDown(k); };
    const release = (e) => { e.preventDefault(); keys[k] = false; };
    btn.addEventListener("touchstart", press, {passive: false});
    btn.addEventListener("touchend", release, {passive: false});
    btn.addEventListener("mousedown", press);
    btn.addEventListener("mouseup", release);
    btn.addEventListener("mouseleave", release);
  });

  document.querySelectorAll("#battle-actions button").forEach(btn => {
    btn.addEventListener("click", () => { Audio.unlock(); Battle.handleAction(btn.dataset.action); });
  });
  document.getElementById("move-list").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") { Audio.unlock(); Battle.handleMove(e.target.dataset.move); }
  });

  document.getElementById("title-screen").addEventListener("click", () => {
    Audio.unlock();
    if (game.mode === "title") startGame();
  });
  document.getElementById("title-screen").addEventListener("touchstart", (e) => {
    e.preventDefault();
    Audio.unlock();
    if (game.mode === "title") startGame();
  });

  function onKeyDown(key) {
    const k = key.length === 1 ? key.toLowerCase() : key;
    if (game.mode === "title") {
      if (key === "Enter" || k === "z" || key === " ") startGame();
      return;
    }
    if (game.mode === "starter") {
      if (key === "ArrowLeft") { Audio.play("select"); cycleStarter(-1); }
      else if (key === "ArrowRight") { Audio.play("select"); cycleStarter(1); }
      else if (key === "Enter" || k === "z") confirmStarter();
      return;
    }
    if (game.mode === "battle") {
      Battle.handleKey(k);
      return;
    }
    if (game.mode === "dialog") {
      if (k === "z" || key === "Enter" || key === " ") advanceDialog();
      return;
    }
    if (game.mode === "menu") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeMenu(); }
      else if (key === "ArrowUp") { Audio.play("select"); menuMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); menuMove(1); }
      else if (key === "Enter" || k === "z") menuSelect();
      return;
    }
    if (game.mode === "team") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeTeamMenu(); }
      else if (key === "ArrowUp") { Audio.play("select"); teamMenuMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); teamMenuMove(1); }
      else if (key === "Enter" || k === "z") teamMenuSelect();
      return;
    }
    if (game.mode === "bag") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeBagMenu(); }
      else if (key === "ArrowUp") { Audio.play("select"); bagMenuMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); bagMenuMove(1); }
      else if (key === "Enter" || k === "z") bagMenuSelect();
      return;
    }
    if (game.mode === "shop") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeShop(); }
      else if (key === "ArrowUp") { Audio.play("select"); shopMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); shopMove(1); }
      else if (key === "Enter" || k === "z") shopBuy();
      return;
    }
    if (game.mode === "overworld") {
      if (k === "x" || key === "Escape") openMenu();
      else if (k === "z" || key === "Enter") interact();
    }
  }

  function startGame() {
    Audio.play("confirm");
    document.getElementById("title-screen").classList.add("hidden");
    const isTouch = matchMedia("(pointer: coarse)").matches;
    if (isTouch) document.getElementById("touch-controls").classList.remove("hidden");

    if (loadSave()) {
      game.mode = "overworld";
      showDialog([`Welcome back!\nYou have ${game.team.length} monster${game.team.length===1?'':'s'} in your team.`], () => {});
      return;
    }
    game.mode = "starter";
    game.starterIdx = 0;
    showDialog([
      "PROFESSOR PARMIGIANO:",
      "Ah! A new challenger! In this world, brain rot creatures roam the lands.",
      "Capture them. Train them. Climb the Espresso Four.\nDefeat the Brainrot Queen.",
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
    Audio.play("confirm");
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

  // ----- Dialog with typewriter -----
  function showDialog(lines, onEnd) {
    game.mode = "dialog";
    game.dialog = { lines: [...lines], idx: 0, onEnd: onEnd || (() => {}) };
    const el = document.getElementById("dialog");
    el.classList.remove("hidden");
    startTypewriter(lines[0]);
  }

  function startTypewriter(text) {
    game.dialogTyping.active = true;
    game.dialogTyping.text = "";
    game.dialogTyping.target = text;
    game.dialogTyping.t = 0;
    document.getElementById("dialog-text").textContent = "";
    document.getElementById("dialog-arrow").style.opacity = 0;
  }

  function tickDialogTypewriter(dt) {
    if (!game.dialogTyping.active) return;
    game.dialogTyping.t += dt;
    const want = Math.floor(game.dialogTyping.t * 0.030);
    while (game.dialogTyping.text.length < game.dialogTyping.target.length && game.dialogTyping.text.length < want) {
      const c = game.dialogTyping.target[game.dialogTyping.text.length];
      game.dialogTyping.text += c;
      if (game.dialogTyping.text.length % 2 === 0 && c !== " " && c !== "\n") Audio.play("text");
    }
    document.getElementById("dialog-text").textContent = game.dialogTyping.text;
    if (game.dialogTyping.text.length >= game.dialogTyping.target.length) {
      game.dialogTyping.active = false;
      document.getElementById("dialog-arrow").style.opacity = 1;
    }
  }

  function fastForwardDialog() {
    if (!game.dialogTyping.active) return false;
    game.dialogTyping.text = game.dialogTyping.target;
    game.dialogTyping.active = false;
    document.getElementById("dialog-text").textContent = game.dialogTyping.text;
    document.getElementById("dialog-arrow").style.opacity = 1;
    return true;
  }

  function advanceDialog() {
    if (!game.dialog) return;
    if (fastForwardDialog()) return;
    Audio.play("text");
    game.dialog.idx++;
    if (game.dialog.idx >= game.dialog.lines.length) {
      const cb = game.dialog.onEnd;
      game.dialog = null;
      document.getElementById("dialog").classList.add("hidden");
      cb();
      if (game.mode === "dialog") game.mode = "overworld";
    } else {
      startTypewriter(game.dialog.lines[game.dialog.idx]);
    }
  }

  // ----- Pause Menu -----
  let menuState = null;
  function openMenu() {
    Audio.play("open");
    menuState = { items: ["TEAM", "BAG", "SAVE", "MUTE", "CLOSE"], idx: 0 };
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
    const cash = `$${game.money}  Badge:${game.badges}`;
    ul.innerHTML = `<li class="header">${cash}</li>` + menuState.items.map((it, i) => {
      const label = it === "MUTE" ? (Audio.isMuted() ? "UNMUTE" : "MUTE") : it;
      return `<li class="${i === menuState.idx ? "selected" : ""}">${label}</li>`;
    }).join("");
  }
  function menuSelect() {
    Audio.play("confirm");
    const choice = menuState.items[menuState.idx];
    if (choice === "CLOSE") { closeMenu(); return; }
    if (choice === "SAVE") {
      saveGame();
      closeMenu();
      showDialog(["Game saved successfully!"], () => {});
      return;
    }
    if (choice === "MUTE") {
      Audio.setMuted(!Audio.isMuted());
      renderMenu();
      return;
    }
    if (choice === "TEAM") { closeMenu(); openTeamMenu(false); return; }
    if (choice === "BAG") { closeMenu(); openBagMenu(false); return; }
  }

  // ----- TEAM Menu -----
  let teamMenuState = null;
  function openTeamMenu(fromBattle) {
    if (game.team.length === 0) return;
    Audio.play("open");
    teamMenuState = { idx: 0, fromBattle, swapMode: fromBattle, useItem: null };
    game.mode = "team";
    renderTeamMenu();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeTeamMenu() {
    document.getElementById("menu").classList.add("hidden");
    if (teamMenuState && teamMenuState.fromBattle) {
      // returning to battle UI
      game.mode = "battle";
      teamMenuState = null;
      return;
    }
    teamMenuState = null;
    game.mode = "overworld";
  }
  function teamMenuMove(d) {
    if (!teamMenuState) return;
    teamMenuState.idx = (teamMenuState.idx + d + game.team.length) % game.team.length;
    renderTeamMenu();
  }
  function renderTeamMenu() {
    const ul = document.getElementById("menu-list");
    const t = game.team;
    ul.innerHTML = `<li class="header">YOUR TEAM</li>` + t.map((m, i) => {
      const sp = SPECIES[m.species];
      const hpRatio = m.hp / m.maxHp;
      const hpColor = hpRatio < 0.2 ? "#ff5e5e" : hpRatio < 0.5 ? "#ffe070" : "#5cd765";
      const fainted = m.hp <= 0 ? " ❌" : "";
      return `<li class="${i === teamMenuState.idx ? "selected" : ""}">
        <b>${sp.name}</b>${fainted} <small>Lv.${m.level}</small><br>
        <span style="color:${hpColor}">HP: ${m.hp}/${m.maxHp}</span>
        <small style="opacity:.7"> · ${sp.types.join("/")}</small>
      </li>`;
    }).join("") + `<li class="footer"><small>X = back · Z = ${teamMenuState.swapMode ? "switch" : (teamMenuState.useItem ? "use here" : "details")}</small></li>`;
  }
  function teamMenuSelect() {
    if (!teamMenuState) return;
    const idx = teamMenuState.idx;
    Audio.play("confirm");
    if (teamMenuState.useItem) {
      // apply item to selected mon
      const item = ITEMS[teamMenuState.useItem];
      const mon = game.team[idx];
      if (!item || !item.heal) {
        teamMenuState.useItem = null;
        renderTeamMenu();
        return;
      }
      if (mon.hp >= mon.maxHp) {
        showDialogOver(["That monster is at full HP."], () => { renderTeamMenu(); });
        return;
      }
      if (mon.hp <= 0 && item.heal < 999) {
        showDialogOver(["That monster has fainted. Use a stronger heal."], () => { renderTeamMenu(); });
        return;
      }
      // consume
      if ((game.bag[teamMenuState.useItem] || 0) <= 0) {
        showDialogOver(["You're out of that item."], () => { renderTeamMenu(); });
        return;
      }
      game.bag[teamMenuState.useItem]--;
      const before = mon.hp;
      mon.hp = Math.min(mon.maxHp, mon.hp + item.heal);
      Audio.play("heal");
      teamMenuState.useItem = null;
      saveGame();
      showDialogOver([`Healed ${SPECIES[mon.species].name} by ${mon.hp - before} HP!`], () => { renderTeamMenu(); });
      return;
    }
    if (teamMenuState.swapMode) {
      // attempt to switch active mon in battle
      Battle.switchActiveMon(idx);
      document.getElementById("menu").classList.add("hidden");
      teamMenuState = null;
      game.mode = "battle";
      return;
    }
    // details
    const m = game.team[idx];
    const sp = SPECIES[m.species];
    const lines = [
      `${sp.name} — Lv.${m.level}`,
      `Type: ${sp.types.join(" / ")}\n"${sp.flavor}"`,
      `HP: ${m.hp}/${m.maxHp}\nXP to next: ${Math.max(0, xpForLevel(m.level + 1) - m.xp)}`,
      `Moves:\n${m.moves.map(mv => `· ${MOVES[mv.id].name} (${mv.pp}/${mv.maxPp})`).join("\n")}`,
    ];
    showDialogOver(lines, () => { renderTeamMenu(); });
  }
  // dialog while menu is open
  function showDialogOver(lines, onEnd) {
    const prevMode = game.mode;
    game.mode = "dialog";
    game.dialog = {
      lines: [...lines], idx: 0,
      onEnd: () => { game.mode = prevMode; if (onEnd) onEnd(); },
    };
    document.getElementById("dialog").classList.remove("hidden");
    startTypewriter(lines[0]);
  }

  // ----- BAG Menu -----
  let bagMenuState = null;
  function openBagMenu(fromBattle) {
    Audio.play("open");
    const items = Object.entries(game.bag).filter(([k, v]) => v > 0);
    bagMenuState = { idx: 0, fromBattle, items };
    if (items.length === 0) {
      bagMenuState = null;
      showDialog(["Bag is empty."], () => {});
      return;
    }
    game.mode = "bag";
    renderBagMenu();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeBagMenu() {
    document.getElementById("menu").classList.add("hidden");
    if (bagMenuState && bagMenuState.fromBattle) {
      game.mode = "battle";
      bagMenuState = null;
      return;
    }
    bagMenuState = null;
    game.mode = "overworld";
  }
  function bagMenuMove(d) {
    if (!bagMenuState) return;
    bagMenuState.idx = (bagMenuState.idx + d + bagMenuState.items.length) % bagMenuState.items.length;
    renderBagMenu();
  }
  function renderBagMenu() {
    const ul = document.getElementById("menu-list");
    const items = bagMenuState.items;
    ul.innerHTML = `<li class="header">BAG · $${game.money}</li>` + items.map(([k, v], i) => {
      const it = ITEMS[k];
      return `<li class="${i === bagMenuState.idx ? "selected" : ""}">
        <b>${it.name}</b> ×${v}<br><small>${it.desc}</small>
      </li>`;
    }).join("") + `<li class="footer"><small>X = back · Z = use</small></li>`;
  }
  function bagMenuSelect() {
    if (!bagMenuState) return;
    Audio.play("confirm");
    const [key] = bagMenuState.items[bagMenuState.idx];
    const item = ITEMS[key];
    if (bagMenuState.fromBattle) {
      // catch ball or heal
      if (key === "BRAINCELL" || key === "GREATCELL" || key === "ULTRACELL") {
        document.getElementById("menu").classList.add("hidden");
        bagMenuState = null;
        game.mode = "battle";
        Battle.throwBraincell(key);
        return;
      }
      if (item && item.heal) {
        document.getElementById("menu").classList.add("hidden");
        bagMenuState = null;
        game.mode = "battle";
        Battle.useHealItemInBattle(key);
        return;
      }
      return;
    }
    // overworld use: heal items
    if (item && item.heal) {
      // open team menu with useItem set
      document.getElementById("menu").classList.add("hidden");
      const itemKey = key;
      bagMenuState = null;
      // open team menu but with item-use mode
      Audio.play("open");
      teamMenuState = { idx: 0, fromBattle: false, swapMode: false, useItem: itemKey };
      game.mode = "team";
      renderTeamMenu();
      document.getElementById("menu").classList.remove("hidden");
      return;
    }
    showDialogOver(["You can't use that here."], () => { renderBagMenu(); });
  }

  // ----- SHOP -----
  let shopState = null;
  function openShop() {
    Audio.play("open");
    shopState = { idx: 0, items: SHOP_ITEMS };
    game.mode = "shop";
    renderShop();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeShop() {
    document.getElementById("menu").classList.add("hidden");
    shopState = null;
    game.mode = "overworld";
  }
  function shopMove(d) {
    if (!shopState) return;
    shopState.idx = (shopState.idx + d + shopState.items.length) % shopState.items.length;
    renderShop();
  }
  function renderShop() {
    const ul = document.getElementById("menu-list");
    ul.innerHTML = `<li class="header">SHOP · $${game.money}</li>` + shopState.items.map((it, i) => {
      const item = ITEMS[it.key];
      return `<li class="${i === shopState.idx ? "selected" : ""}">
        <b>${item.name}</b> — $${it.price}<br><small>${item.desc}</small>
      </li>`;
    }).join("") + `<li class="footer"><small>X = leave · Z = buy</small></li>`;
  }
  function shopBuy() {
    if (!shopState) return;
    const it = shopState.items[shopState.idx];
    if (game.money < it.price) {
      Audio.play("cancel");
      showDialogOver(["Not enough cash!"], () => { renderShop(); });
      return;
    }
    Audio.play("confirm");
    game.money -= it.price;
    game.bag[it.key] = (game.bag[it.key] || 0) + 1;
    saveGame();
    renderShop();
  }

  // ----- Interact -----
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
          Audio.play("cancel");
          showDialog([`${npc.dialog[0].split(":")[0]}: I have been bested. Move along.`], () => {});
          return;
        }
        Audio.play("encounter");
        showDialog(npc.dialog, () => {
          startTrainerBattle(npc);
        });
      } else if (npc.type === "healer") {
        Audio.play("heal");
        showDialog(npc.dialog, () => {
          for (const m of game.team) {
            m.hp = m.maxHp;
            for (const mv of m.moves) mv.pp = mv.maxPp;
          }
          saveGame();
        });
      } else if (npc.type === "shop") {
        showDialog(npc.dialog, () => { openShop(); });
      } else if (npc.type === "item") {
        if (npc.consumed) return;
        Audio.play("captured");
        showDialog(npc.dialog, () => {
          game.bag[npc.itemKey] = (game.bag[npc.itemKey] || 0) + 1;
          npc.consumed = true;
          saveGame();
        });
      } else if (npc.type === "sign" || npc.type === "npc") {
        showDialog(npc.dialog || ["..."], () => {});
      }
    }
  }

  function startTrainerBattle(npc) {
    Audio.play("encounter");
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
          if (data.reward) {
            game.money += data.reward;
          }
          if (npc.trainerKey === "GYM_LEADER") {
            game.badges++;
            showDialog([
              "You defeated the Brainrot Queen!",
              `Earned $${data.reward} prize money.`,
              "You receive the BRAINROT BADGE.",
              "...The credits would roll, but the lore continues.",
              "Hidden legendaries lurk in the deep grass. Hunt them!",
            ], () => {});
          } else if (data.reward) {
            showDialog([`You earned $${data.reward}!`], () => {});
          }
        }
        game.mode = "overworld";
        saveGame();
      },
    });
  }

  function startWildBattle() {
    Audio.play("encounter");
    const tableId = World.encounterTableAt(game.player.tileX, game.player.tileY);
    const table = ENCOUNTERS[tableId] || ENCOUNTERS.ROUTE_1;
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
      Audio.play("bump");
      return;
    }
    p.targetX = nx;
    p.targetY = ny;
    p.moving = true;
    p.moveProgress = 0;
    p.dx = dx;
    p.dy = dy;
    Audio.play("step");
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
      if (World.isEncounterTile(p.tileX, p.tileY)) {
        if (game.encounterCooldown <= 0 && Math.random() < 0.10) {
          game.encounterCooldown = 4;
          startWildBattle();
          return;
        }
      }
      if (game.encounterCooldown > 0) game.encounterCooldown--;
    }
  }

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

  function saveGame() {
    const data = {
      team: game.team,
      box: game.box,
      bag: game.bag,
      money: game.money,
      player: { tileX: game.player.tileX, tileY: game.player.tileY, facing: game.player.facing },
      badges: game.badges,
      defeated: World.npcs.filter(n => n.defeated).map(n => n.id),
      consumed: World.npcs.filter(n => n.consumed).map(n => n.id),
    };
    try { localStorage.setItem("brainrot_save_v2", JSON.stringify(data)); } catch(e) {}
  }
  function loadSave() {
    try {
      const raw = localStorage.getItem("brainrot_save_v2");
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.team || data.team.length === 0) return false;
      game.team = data.team;
      game.box = data.box || [];
      game.bag = data.bag || { BRAINCELL: 8 };
      game.money = data.money ?? 500;
      game.player.tileX = data.player.tileX;
      game.player.tileY = data.player.tileY;
      game.player.pixelX = game.player.tileX * 16;
      game.player.pixelY = game.player.tileY * 16;
      game.player.facing = data.player.facing || "down";
      game.badges = data.badges || 0;
      const defeatedIds = data.defeated || [];
      const consumedIds = data.consumed || [];
      for (const n of World.npcs) {
        if (defeatedIds.includes(n.id)) n.defeated = true;
        if (consumedIds.includes(n.id)) n.consumed = true;
      }
      return true;
    } catch(e) { return false; }
  }

  window.__brainrot = { game, saveGame, loadSave, World, SPECIES, makeMon, Battle, Audio };

  window.__brainrotBagConsume = function(itemKey) {
    if ((game.bag[itemKey] || 0) <= 0) return false;
    game.bag[itemKey]--;
    return true;
  };
  window.__brainrotOpenBag = function(fromBattle) { openBagMenu(fromBattle); };
  window.__brainrotOpenTeam = function(fromBattle) { openTeamMenu(fromBattle); };

  // ----- Title screen drawing (animated mons) -----
  function drawTitleAnimation(time) {
    // animated mons floating across title bg (drawn behind DOM title-screen)
  }

  function drawStarterScreen(time) {
    ctx.fillStyle = "#0d0d18";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // animated bg
    for (let i = 0; i < 30; i++) {
      const t = time * 0.0005 + i;
      const x = ((Math.sin(t) * 0.5 + 0.5) * canvas.width);
      const y = ((Math.cos(t * 1.3 + i) * 0.5 + 0.5) * canvas.height);
      ctx.fillStyle = `rgba(255,203,5,${0.04 + (i%3)*0.02})`;
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.fillStyle = "#ffcb05";
    ctx.font = "bold 14px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("CHOOSE YOUR STARTER", canvas.width/2, 28);
    const slots = [
      { x: canvas.width/2 - 160 },
      { x: canvas.width/2 - 48 },
      { x: canvas.width/2 + 64 },
    ];
    for (let i = 0; i < STARTERS.length; i++) {
      const s = slots[i];
      const isSel = i === game.starterIdx;
      const bob = isSel ? Math.sin(time * 0.005) * 3 : 0;
      if (isSel) {
        ctx.fillStyle = "rgba(255,203,5,0.2)";
        ctx.fillRect(s.x - 8, 50, 112, 112);
        ctx.strokeStyle = "#ffcb05";
        ctx.lineWidth = 2;
        ctx.strokeRect(s.x - 8, 50, 112, 112);
      }
      SpriteRenderer.drawMon(ctx, STARTERS[i], s.x, 60 + bob, 96, time);
    }
    ctx.fillStyle = "#fff";
    ctx.font = "12px Courier New";
    const sel = STARTERS[game.starterIdx];
    ctx.fillText(SPECIES[sel].name, canvas.width/2, 190);
    ctx.fillStyle = "#ffd";
    ctx.font = "10px Courier New";
    const flavor = SPECIES[sel].flavor;
    wrapText(ctx, flavor, canvas.width/2, 210, 360, 12);
    ctx.fillStyle = "#cfe9ff";
    wrapText(ctx, STARTER_INFO[sel], canvas.width/2, 250, 360, 12);
    ctx.fillStyle = "#aaa";
    ctx.fillText("◀ ▶ choose · Z / Enter to confirm", canvas.width/2, 295);
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

  // animated title background
  const titleMons = [];
  function setupTitleMons() {
    const ids = Object.keys(SPECIES);
    for (let i = 0; i < 8; i++) {
      titleMons.push({
        id: ids[Math.floor(Math.random() * ids.length)],
        x: Math.random() * 480,
        y: Math.random() * 320,
        vx: (Math.random()-0.5) * 0.4,
        vy: (Math.random()-0.5) * 0.4,
        size: 32 + Math.random() * 32,
        op: 0.2 + Math.random() * 0.3,
      });
    }
  }
  setupTitleMons();
  function drawTitleScreen(time) {
    ctx.fillStyle = "#0d0625";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // mons drifting
    ctx.globalAlpha = 0.5;
    for (const m of titleMons) {
      m.x += m.vx;
      m.y += m.vy;
      if (m.x < -64) m.x = 480;
      if (m.x > 480) m.x = -64;
      if (m.y < -64) m.y = 320;
      if (m.y > 320) m.y = -64;
      ctx.globalAlpha = m.op;
      SpriteRenderer.drawMon(ctx, m.id, m.x, m.y, m.size, time);
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    const dt = Math.min(80, t - lastTime);
    lastTime = t;
    nowTime = t;
    update(t, dt);
    render(t);
    requestAnimationFrame(loop);
  }

  function update(time, dt) {
    if (game.mode === "overworld") {
      tryStartMove();
      updateMovement();
      updateCamera();
    }
    if (game.mode === "battle") {
      Battle.update(time, dt);
    }
    if (game.mode === "dialog") tickDialogTypewriter(dt);
    if (game.flashTime > 0) game.flashTime--;
  }

  function render(time) {
    if (game.mode === "title") {
      drawTitleScreen(time);
      return;
    }
    if (game.mode === "starter") { drawStarterScreen(time); return; }
    if (game.mode === "battle") { Battle.draw(ctx, time); Battle.refreshInfo(); return; }
    World.draw(ctx, game.cam, time);
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
    // hud
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(4, 4, 156, 18);
    ctx.fillStyle = "#fff";
    ctx.font = "10px Courier New";
    ctx.textAlign = "left";
    ctx.fillText(`Team:${game.team.length}/6  $${game.money}  Bdg:${game.badges}`, 8, 16);
  }

  requestAnimationFrame(loop);
})();
