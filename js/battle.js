// =====================================================
// Battle system - turn based
// =====================================================

const Battle = (() => {
  let state = null;

  const elText = () => document.getElementById("battle-text");
  const elActions = () => document.getElementById("battle-actions");
  const elMoveList = () => document.getElementById("move-list");
  const elBattleUi = () => document.getElementById("battle-ui");
  const elEnemyInfo = () => document.getElementById("enemy-info");
  const elPlayerInfo = () => document.getElementById("player-info");

  function start(playerTeam, opponent, opts = {}) {
    state = {
      playerTeam,
      isTrainer: !!opts.isTrainer,
      trainerName: opts.trainerName || "",
      trainerData: opts.trainerData || null,
      enemyTeam: opts.isTrainer ? opponent : null,
      enemyIdx: 0,
      enemyMon: opts.isTrainer ? opponent[0] : opponent,
      playerIdx: Math.max(0, playerTeam.findIndex(m => m.hp > 0)),
      phase: "intro",
      messageQueue: [],
      message: "",
      onEnd: opts.onEnd || (() => {}),
      caught: false,
      ranAway: false,
      pendingPlayerMove: null,
      pendingEnemyMove: null,
      turnOrder: [],
      turnIdx: 0,
      enemyShake: 0,
      playerShake: 0,
    };
    elBattleUi().classList.remove("hidden");
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
    if (state.isTrainer && state.trainerData) {
      enqueue(state.trainerData.intro);
      enqueue(`${state.trainerData.name} sent out ${SPECIES[state.enemyMon.species].name}!`);
    } else {
      enqueue(`A wild ${SPECIES[state.enemyMon.species].name} appeared!`);
    }
    enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
    state.phase = "intro";
    nextMessage();
    refreshInfo();
  }

  function playerMon() { return state.playerTeam[state.playerIdx]; }

  function enqueue(msg) { state.messageQueue.push(msg); }

  function nextMessage() {
    if (!state) return;
    if (state.messageQueue.length === 0) {
      state.message = "";
      onMessageEnd();
      return;
    }
    state.message = state.messageQueue.shift();
    elText().innerHTML = state.message;
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
    refreshInfo();
  }

  function onMessageEnd() {
    if (!state) return;
    refreshInfo();
    switch (state.phase) {
      case "intro":
        state.phase = "menu";
        showActions();
        break;
      case "midTurn":
        // check faints
        if (state.enemyMon.hp <= 0) { handleEnemyFaint(); return; }
        if (playerMon().hp <= 0) { handlePlayerFaint(); return; }
        // continue turn order
        doNextTurnAction();
        break;
      case "endTurn":
        state.phase = "menu";
        showActions();
        break;
      case "trainerSwap":
        state.phase = "menu";
        showActions();
        break;
      case "playerSwap":
        state.phase = "menu";
        showActions();
        break;
      case "wonBattle":
      case "lostBattle":
      case "ranAway":
      case "caughtMon":
        finish();
        break;
      default:
        break;
    }
  }

  function showActions() {
    if (!state) return;
    elText().innerHTML = `What will <b>${SPECIES[playerMon().species].name}</b> do?`;
    elActions().classList.remove("hidden");
    elMoveList().classList.add("hidden");
  }

  function showMoves() {
    const html = playerMon().moves.map((m, i) => {
      const mv = MOVES[m.id];
      return `<button data-move="${i}">${mv.name}<br><small>${mv.type} · ${m.pp}/${m.maxPp}</small></button>`;
    }).join("");
    elMoveList().innerHTML = html + `<button data-move="back">↩ BACK</button>`;
    elActions().classList.add("hidden");
    elMoveList().classList.remove("hidden");
  }

  function handleAction(action) {
    if (!state || state.phase !== "menu") return;
    if (action === "fight") showMoves();
    else if (action === "bag") throwBraincell();
    else if (action === "team") swapTeam();
    else if (action === "run") attemptRun();
  }

  function handleMove(idx) {
    if (!state) return;
    if (idx === "back") { showActions(); return; }
    const slot = playerMon().moves[+idx];
    if (!slot) return;
    if (slot.pp <= 0) {
      enqueue("No PP left for that move!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    state.pendingPlayerMove = slot;
    state.pendingEnemyMove = pickEnemyMove();
    const playerSpd = getStat(playerMon(), "spd");
    const enemySpd = getStat(state.enemyMon, "spd");
    const playerFirst = playerSpd >= enemySpd
      ? true
      : (playerSpd === enemySpd ? Math.random() < 0.5 : false);
    state.turnOrder = playerFirst ? ["player", "enemy"] : ["enemy", "player"];
    state.turnIdx = 0;
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
    doNextTurnAction();
  }

  function doNextTurnAction() {
    if (!state) return;
    if (state.turnIdx >= state.turnOrder.length) {
      state.phase = "endTurn";
      onMessageEnd();
      return;
    }
    const who = state.turnOrder[state.turnIdx++];
    if (who === "player") {
      if (playerMon().hp <= 0) { doNextTurnAction(); return; }
      executeMove(playerMon(), state.enemyMon, state.pendingPlayerMove, true);
    } else {
      if (state.enemyMon.hp <= 0) { doNextTurnAction(); return; }
      executeMove(state.enemyMon, playerMon(), state.pendingEnemyMove, false);
    }
    state.phase = "midTurn";
    nextMessage();
  }

  function executeMove(attacker, defender, moveSlot, isPlayer) {
    moveSlot.pp = Math.max(0, moveSlot.pp - 1);
    const move = MOVES[moveSlot.id];
    enqueue(`${SPECIES[attacker.species].name} used ${move.name}!`);
    if (Math.random() > move.acc / 100) {
      enqueue("...but it missed!");
      return;
    }
    if (move.cat === "status") {
      applyStatus(attacker, defender, move);
      return;
    }
    const dmg = computeDamage(attacker, defender, move);
    defender.hp = Math.max(0, defender.hp - dmg.amount);
    if (isPlayer) state.enemyShake = 8;
    else state.playerShake = 8;
    if (dmg.crit) enqueue("Critical rizz!");
    if (dmg.eff > 1) enqueue("It's super 2026 effective!");
    else if (dmg.eff < 1 && dmg.eff > 0) enqueue("It's not very brainrot...");
    else if (dmg.eff === 0) enqueue(`It doesn't affect ${SPECIES[defender.species].name}...`);
  }

  function applyStatus(attacker, defender, move) {
    if (move.status === "atk_down") {
      defender.statBoosts.atk = Math.max(-6, (defender.statBoosts.atk || 0) - 1);
      enqueue(`${SPECIES[defender.species].name}'s attack fell!`);
    } else if (move.status === "confuse") {
      defender.statusEffect = "confused";
      enqueue(`${SPECIES[defender.species].name} became confused!`);
    } else if (move.status === "heal") {
      const healed = Math.min(attacker.maxHp - attacker.hp, Math.floor(attacker.maxHp / 2));
      attacker.hp += healed;
      enqueue(`${SPECIES[attacker.species].name} sipped cappuccino. Restored ${healed} HP!`);
    }
  }

  function computeDamage(attacker, defender, move) {
    const atkSp = SPECIES[attacker.species];
    const defSp = SPECIES[defender.species];
    const atkStat = getStat(attacker, "atk");
    const defStat = getStat(defender, "def");
    const stab = atkSp.types.includes(move.type) ? 1.5 : 1;
    const eff = typeEffectiveness(move.type, defSp.types);
    const crit = Math.random() < 0.0625 ? 1.5 : 1;
    const rand = 0.85 + Math.random() * 0.15;
    let amount = (((2 * attacker.level) / 5 + 2) * move.power * (atkStat / Math.max(1, defStat))) / 50 + 2;
    amount = Math.floor(amount * stab * eff * crit * rand);
    if (eff === 0) amount = 0;
    return { amount, eff, crit: crit > 1 };
  }

  function pickEnemyMove() {
    const moves = state.enemyMon.moves.filter(m => m.pp > 0);
    if (moves.length === 0) return { id: "TACKLE", pp: 99, maxPp: 99 };
    return moves[Math.floor(Math.random() * moves.length)];
  }

  function handleEnemyFaint() {
    enqueue(`${SPECIES[state.enemyMon.species].name} fainted!`);
    const expGain = computeExp(state.enemyMon);
    enqueue(`${SPECIES[playerMon().species].name} gained ${expGain} XP!`);
    grantXp(playerMon(), expGain);
    if (state.isTrainer) {
      const next = state.enemyTeam.findIndex((m, i) => i > state.enemyIdx && m.hp > 0);
      if (next >= 0) {
        state.enemyIdx = next;
        state.enemyMon = state.enemyTeam[next];
        enqueue(`${state.trainerData.name} sent out ${SPECIES[state.enemyMon.species].name}!`);
        state.phase = "trainerSwap";
      } else {
        enqueue(state.trainerData.defeat);
        enqueue(`You defeated ${state.trainerData.name}!`);
        state.phase = "wonBattle";
      }
    } else {
      state.phase = "wonBattle";
    }
    nextMessage();
  }

  function handlePlayerFaint() {
    enqueue(`${SPECIES[playerMon().species].name} fainted!`);
    const next = state.playerTeam.findIndex(m => m.hp > 0);
    if (next < 0) {
      enqueue("You have no monsters left!");
      enqueue("You scurried back home, humiliated.");
      state.phase = "lostBattle";
    } else {
      state.playerIdx = next;
      enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
      state.phase = "playerSwap";
    }
    nextMessage();
  }

  function computeExp(defeated) {
    const sp = SPECIES[defeated.species];
    return Math.floor(((sp.xpYield || 60) * defeated.level) / 7);
  }

  function grantXp(mon, amount) {
    mon.xp += amount;
    while (mon.level < 50) {
      const needed = xpForLevel(mon.level + 1);
      if (mon.xp >= needed) levelUp(mon);
      else break;
    }
  }

  function levelUp(mon) {
    const sp = SPECIES[mon.species];
    const oldMax = mon.maxHp;
    mon.level++;
    mon.maxHp = maxHp(sp, mon.level);
    mon.hp += (mon.maxHp - oldMax);
    enqueue(`${SPECIES[mon.species].name} grew to Lv. ${mon.level}!`);
    for (const moveId of movesLearnedAt(sp, mon.level)) {
      if (mon.moves.find(m => m.id === moveId)) continue;
      if (mon.moves.length < 4) {
        mon.moves.push({ id: moveId, pp: MOVES[moveId].pp, maxPp: MOVES[moveId].pp });
        enqueue(`${SPECIES[mon.species].name} learned ${MOVES[moveId].name}!`);
      } else {
        const old = mon.moves[3];
        mon.moves[3] = { id: moveId, pp: MOVES[moveId].pp, maxPp: MOVES[moveId].pp };
        enqueue(`${SPECIES[mon.species].name} forgot ${MOVES[old.id].name} and learned ${MOVES[moveId].name}!`);
      }
    }
    if (sp.evolvesAt && mon.level >= sp.evolvesAt && sp.evolvesTo) {
      const newSp = SPECIES[sp.evolvesTo];
      enqueue(`What?! ${SPECIES[mon.species].name} is evolving!`);
      mon.species = sp.evolvesTo;
      mon.maxHp = maxHp(newSp, mon.level);
      mon.hp = mon.maxHp;
      enqueue(`${SPECIES[mon.species].name} evolved into ${newSp.name}!`);
    }
  }

  function attemptRun() {
    if (state.isTrainer) {
      enqueue("You can't run from a trainer battle!");
      enemyFreeTurn();
      return;
    }
    const ps = getStat(playerMon(), "spd");
    const es = getStat(state.enemyMon, "spd");
    const odds = (ps * 32) / Math.max(1, Math.floor(es / 4)) + 30;
    if (Math.random() * 256 < odds) {
      enqueue("Got away safely!");
      state.ranAway = true;
      state.phase = "ranAway";
      nextMessage();
    } else {
      enqueue("Couldn't escape!");
      enemyFreeTurn();
    }
  }

  // Player did something non-combat (item, swap, failed run); enemy gets free turn.
  function enemyFreeTurn() {
    state.pendingPlayerMove = null;
    state.pendingEnemyMove = pickEnemyMove();
    state.turnOrder = ["enemy"];
    state.turnIdx = 0;
    doNextTurnAction();
  }

  function throwBraincell() {
    if (state.isTrainer) {
      enqueue("That trainer would block your brain cells!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    if (!game_bag_consume("BRAINCELL")) {
      enqueue("You're out of Brain Cells!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    enqueue(`You hurled a Brain Cell!`);
    const sp = SPECIES[state.enemyMon.species];
    const catchRate = sp.catchRate || 50;
    const a = ((3 * state.enemyMon.maxHp - 2 * state.enemyMon.hp) * catchRate) / (3 * state.enemyMon.maxHp);
    let success = Math.random() * 255 < a;
    if (sp.legendary && Math.random() < 0.7) success = false;
    if (success) {
      enqueue(`Gotcha! ${sp.name} was caught!`);
      state.caught = true;
      state.phase = "caughtMon";
      nextMessage();
    } else {
      const shakes = Math.max(1, Math.min(3, Math.floor((a / 255) * 4)));
      enqueue(`(*${"shake ".repeat(shakes).trim()}*) ${sp.name} broke free!`);
      enemyFreeTurn();
    }
  }

  // bag is owned by game.js — this is a hook the game can override
  function game_bag_consume(itemKey) {
    if (typeof window.__brainrotBagConsume === "function") {
      return window.__brainrotBagConsume(itemKey);
    }
    return true;
  }

  function swapTeam() {
    const team = state.playerTeam;
    let idx = -1;
    for (let i = 1; i < team.length; i++) {
      const k = (state.playerIdx + i) % team.length;
      if (team[k].hp > 0 && k !== state.playerIdx) { idx = k; break; }
    }
    if (idx < 0) {
      enqueue("No other monsters can fight!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    enqueue(`Come back, ${SPECIES[playerMon().species].name}!`);
    state.playerIdx = idx;
    enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
    enemyFreeTurn();
  }

  function refreshInfo() {
    if (!state) return;
    const e = state.enemyMon;
    const eSp = SPECIES[e.species];
    elEnemyInfo().querySelector(".mon-name").textContent = eSp.name;
    elEnemyInfo().querySelector(".mon-lvl").textContent = "Lv. " + e.level;
    const eRatio = e.hp / e.maxHp;
    const eFill = elEnemyInfo().querySelector(".hp-fill");
    eFill.style.width = (eRatio * 100) + "%";
    eFill.classList.toggle("med", eRatio < 0.5 && eRatio >= 0.2);
    eFill.classList.toggle("low", eRatio < 0.2);

    const p = playerMon();
    const pSp = SPECIES[p.species];
    elPlayerInfo().querySelector(".mon-name").textContent = pSp.name;
    elPlayerInfo().querySelector(".mon-lvl").textContent = "Lv. " + p.level;
    const pRatio = p.hp / p.maxHp;
    const pFill = elPlayerInfo().querySelector(".hp-fill");
    pFill.style.width = (pRatio * 100) + "%";
    pFill.classList.toggle("med", pRatio < 0.5 && pRatio >= 0.2);
    pFill.classList.toggle("low", pRatio < 0.2);
    elPlayerInfo().querySelector(".hp-text").textContent = `${p.hp} / ${p.maxHp}`;

    const xpBase = xpForLevel(p.level);
    const xpNext = xpForLevel(p.level + 1);
    const xpRatio = (p.xp - xpBase) / Math.max(1, xpNext - xpBase);
    elPlayerInfo().querySelector(".xp-fill").style.width = Math.min(1, Math.max(0, xpRatio)) * 100 + "%";
  }

  function finish() {
    elBattleUi().classList.add("hidden");
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
    const cb = state.onEnd;
    const result = {
      caught: state.caught,
      ranAway: state.ranAway,
      defeatedTrainer: state.isTrainer && (!state.enemyTeam || state.enemyTeam.every(m => m.hp <= 0)),
      enemyMon: state.enemyMon,
    };
    state = null;
    cb(result);
  }

  function draw(ctx, time) {
    if (!state) return;
    const W = ctx.canvas.width, H = ctx.canvas.height;
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#5b2d8c");
    grad.addColorStop(0.7, "#2a8c4a");
    grad.addColorStop(1, "#4a3a2a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    // platforms
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(W*0.25, H*0.78, 80, 12, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(W*0.78, H*0.40, 65, 10, 0, 0, Math.PI*2);
    ctx.fill();

    const eShakeX = state.enemyShake > 0 ? (Math.random()*4-2) : 0;
    if (state.enemyShake > 0) state.enemyShake--;
    SpriteRenderer.drawMon(ctx, state.enemyMon.species, W*0.78 - 48 + eShakeX, H*0.18, 96, time);

    const pShakeX = state.playerShake > 0 ? (Math.random()*4-2) : 0;
    if (state.playerShake > 0) state.playerShake--;
    SpriteRenderer.drawMon(ctx, playerMon().species, W*0.25 - 64 + pShakeX, H*0.55, 128, time);
  }

  function handleKey(key) {
    if (!state) return false;
    if (state.phase === "menu") {
      if (key === "z" || key === "Enter") { handleAction("fight"); return true; }
      if (key === "x") { handleAction("run"); return true; }
      return true;
    }
    // any message-driven phase: advance on Z/Enter/space
    if (key === "z" || key === "Enter" || key === " ") {
      nextMessage();
      return true;
    }
    return true;
  }

  function isActive() { return state !== null; }

  return {
    start, draw, handleKey, isActive, handleAction, handleMove, refreshInfo,
  };
})();
