// =====================================================
// Battle system - turn based, animated
// =====================================================

const Battle = (() => {
  let state = null;

  const elText = () => document.getElementById("battle-text");
  const elActions = () => document.getElementById("battle-actions");
  const elMoveList = () => document.getElementById("move-list");
  const elBattleUi = () => document.getElementById("battle-ui");
  const elEnemyInfo = () => document.getElementById("enemy-info");
  const elPlayerInfo = () => document.getElementById("player-info");

  // tween animation system
  function makeTween() {
    return { active: false, from: 0, to: 0, t0: 0, dur: 0, value: 0, onDone: null };
  }
  function startTween(tw, from, to, dur, onDone) {
    tw.active = true;
    tw.from = from;
    tw.to = to;
    tw.value = from;
    tw.t0 = performance.now();
    tw.dur = dur;
    tw.onDone = onDone || null;
  }
  function updateTween(tw, now) {
    if (!tw.active) return;
    const t = Math.min(1, (now - tw.t0) / tw.dur);
    tw.value = tw.from + (tw.to - tw.from) * t;
    if (t >= 1) {
      tw.active = false;
      tw.value = tw.to;
      const cb = tw.onDone;
      tw.onDone = null;
      if (cb) cb();
    }
  }

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
      typedText: "",
      typeIdx: 0,
      typeTimer: 0,
      typing: false,
      onEnd: opts.onEnd || (() => {}),
      caught: false,
      ranAway: false,
      pendingPlayerMove: null,
      pendingEnemyMove: null,
      turnOrder: [],
      turnIdx: 0,
      enemyShake: 0,
      playerShake: 0,
      enemyFlash: 0,
      playerFlash: 0,
      enemyOffsetX: 200, // slide-in from right
      playerOffsetX: -240, // slide-in from left
      enemyOffsetY: 0,
      playerOffsetY: 0,
      enemyFainted: false,
      playerFainted: false,
      enemyHpTween: makeTween(),
      playerHpTween: makeTween(),
      visualEnemyHp: 0,
      visualPlayerHp: 0,
      uiBlocked: false, // true while animation running
      attackAnimT: 0, // attacker forward bounce
      attackAnimWho: null,
      shakeMagX: 0,
      catchShakes: 0,
      catchAnimT: 0,
    };
    state.visualEnemyHp = state.enemyMon.hp;
    state.visualPlayerHp = playerMon().hp;
    elBattleUi().classList.remove("hidden");
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");

    Audio.play("encounter");
    // slide in
    state.uiBlocked = true;
    setTimeout(() => {
      state.enemyOffsetX = 0;
      state.playerOffsetX = 0;
      setTimeout(() => {
        state.uiBlocked = false;
        if (state.isTrainer && state.trainerData) {
          enqueue(state.trainerData.intro);
          enqueue(`${state.trainerData.name} sent out ${SPECIES[state.enemyMon.species].name}!`);
        } else {
          enqueue(`A wild ${SPECIES[state.enemyMon.species].name} appeared!`);
        }
        enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
        nextMessage();
      }, 50);
    }, 600);

    refreshInfo(true);
  }

  function playerMon() { return state.playerTeam[state.playerIdx]; }

  function enqueue(msg) { state.messageQueue.push(msg); }

  function nextMessage() {
    if (!state) return;
    if (state.messageQueue.length === 0) {
      state.message = "";
      state.typedText = "";
      state.typing = false;
      onMessageEnd();
      return;
    }
    state.message = state.messageQueue.shift();
    state.typedText = "";
    state.typeIdx = 0;
    state.typeTimer = 0;
    state.typing = true;
    elText().textContent = "";
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
  }

  function tickTypewriter(now, dt) {
    if (!state || !state.typing) return;
    state.typeTimer += dt;
    const speed = 22; // chars per second... bumped to 30
    const charsPerMs = 0.030;
    const want = Math.floor(state.typeTimer * charsPerMs);
    while (state.typeIdx < state.message.length && state.typeIdx < want) {
      const c = state.message[state.typeIdx];
      state.typedText += c;
      state.typeIdx++;
      if (state.typeIdx % 2 === 0 && c !== " " && c !== "\n") Audio.play("text");
    }
    if (state.typeIdx >= state.message.length) state.typing = false;
    elText().textContent = state.typedText;
  }

  function fastForwardTypewriter() {
    if (!state || !state.typing) return false;
    state.typedText = state.message;
    state.typeIdx = state.message.length;
    state.typing = false;
    elText().textContent = state.typedText;
    return true;
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
        if (state.enemyMon.hp <= 0) { handleEnemyFaint(); return; }
        if (playerMon().hp <= 0) { handlePlayerFaint(); return; }
        doNextTurnAction();
        break;
      case "endTurn":
      case "trainerSwap":
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
    Audio.play("select");
    const html = playerMon().moves.map((m, i) => {
      const mv = MOVES[m.id];
      return `<button data-move="${i}">${mv.name}<br><small>${mv.type} · ${m.pp}/${m.maxPp}</small></button>`;
    }).join("");
    elMoveList().innerHTML = html + `<button data-move="back">↩ BACK</button>`;
    elActions().classList.add("hidden");
    elMoveList().classList.remove("hidden");
  }

  function handleAction(action) {
    if (!state || state.phase !== "menu" || state.uiBlocked) return;
    if (action === "fight") showMoves();
    else if (action === "bag") openBagFromBattle();
    else if (action === "team") openTeamFromBattle();
    else if (action === "run") attemptRun();
  }

  function handleMove(idx) {
    if (!state) return;
    if (state.uiBlocked || state.phase !== "menu" || state.typing) return;
    if (idx === "back") { Audio.play("cancel"); showActions(); return; }
    const slot = playerMon().moves[+idx];
    if (!slot) return;
    if (slot.pp <= 0) {
      Audio.play("cancel");
      enqueue("No PP left for that move!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    Audio.play("confirm");
    state.pendingPlayerMove = slot;
    state.pendingEnemyMove = pickEnemyMove();
    const playerSpd = getStat(playerMon(), "spd");
    const enemySpd = getStat(state.enemyMon, "spd");
    const playerFirst = playerSpd > enemySpd ||
      (playerSpd === enemySpd && Math.random() < 0.5);
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
    // attack lunge animation
    state.attackAnimWho = isPlayer ? "player" : "enemy";
    state.attackAnimT = 1;
    if (Math.random() > move.acc / 100) {
      enqueue("...but it missed!");
      Audio.play("miss");
      return;
    }
    if (move.cat === "status") {
      applyStatus(attacker, defender, move);
      return;
    }
    const dmg = computeDamage(attacker, defender, move);
    const before = defender.hp;
    defender.hp = Math.max(0, defender.hp - dmg.amount);
    // schedule HP tween + flash + shake
    const tween = isPlayer ? state.enemyHpTween : state.playerHpTween;
    startTween(tween, before, defender.hp, 700);
    if (isPlayer) state.visualEnemyHp = before;
    else state.visualPlayerHp = before;
    if (isPlayer) { state.enemyShake = 12; state.enemyFlash = 12; }
    else { state.playerShake = 12; state.playerFlash = 12; }
    if (dmg.amount === 0) {
      Audio.play("miss");
    } else if (dmg.eff > 1) {
      Audio.play("superHit");
      enqueue("It's super 2026 effective!");
    } else if (dmg.eff < 1 && dmg.eff > 0) {
      Audio.play("weakHit");
      enqueue("It's not very brainrot...");
    } else {
      Audio.play("hit");
    }
    if (dmg.eff === 0) enqueue(`It doesn't affect ${SPECIES[defender.species].name}...`);
    if (dmg.crit && dmg.amount > 0) enqueue("Critical rizz!");
  }

  function applyStatus(attacker, defender, move) {
    if (move.status === "atk_down") {
      defender.statBoosts.atk = Math.max(-6, (defender.statBoosts.atk || 0) - 1);
      enqueue(`${SPECIES[defender.species].name}'s attack fell!`);
      Audio.play("weakHit");
    } else if (move.status === "confuse") {
      defender.statusEffect = "confused";
      enqueue(`${SPECIES[defender.species].name} became confused!`);
      Audio.play("weakHit");
    } else if (move.status === "heal") {
      const healed = Math.min(attacker.maxHp - attacker.hp, Math.floor(attacker.maxHp / 2));
      const before = attacker.hp;
      attacker.hp += healed;
      const isPlayer = attacker === playerMon();
      const tween = isPlayer ? state.playerHpTween : state.enemyHpTween;
      startTween(tween, before, attacker.hp, 700);
      if (isPlayer) state.visualPlayerHp = before;
      else state.visualEnemyHp = before;
      enqueue(`${SPECIES[attacker.species].name} sipped cappuccino. Restored ${healed} HP!`);
      Audio.play("heal");
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
    Audio.play("faint");
    state.enemyFainted = true;
    enqueue(`${SPECIES[state.enemyMon.species].name} fainted!`);
    const expGain = computeExp(state.enemyMon);
    enqueue(`${SPECIES[playerMon().species].name} gained ${expGain} XP!`);
    grantXp(playerMon(), expGain);
    if (state.isTrainer) {
      const next = state.enemyTeam.findIndex((m, i) => i > state.enemyIdx && m.hp > 0);
      if (next >= 0) {
        state.enemyIdx = next;
        state.enemyMon = state.enemyTeam[next];
        state.enemyFainted = false;
        state.enemyOffsetX = 200;
        state.visualEnemyHp = state.enemyMon.hp;
        setTimeout(() => { state.enemyOffsetX = 0; }, 100);
        enqueue(`${state.trainerData.name} sent out ${SPECIES[state.enemyMon.species].name}!`);
        state.phase = "trainerSwap";
      } else {
        enqueue(state.trainerData.defeat);
        enqueue(`You defeated ${state.trainerData.name}!`);
        Audio.play("victory");
        state.phase = "wonBattle";
      }
    } else {
      Audio.play("victory");
      state.phase = "wonBattle";
    }
    nextMessage();
  }

  function handlePlayerFaint() {
    Audio.play("faint");
    state.playerFainted = true;
    enqueue(`${SPECIES[playerMon().species].name} fainted!`);
    const next = state.playerTeam.findIndex(m => m.hp > 0);
    if (next < 0) {
      enqueue("You have no monsters left!");
      enqueue("You scurried back home, humiliated.");
      state.phase = "lostBattle";
    } else {
      state.playerIdx = next;
      state.playerFainted = false;
      state.playerOffsetX = -240;
      state.visualPlayerHp = playerMon().hp;
      setTimeout(() => { state.playerOffsetX = 0; }, 100);
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
    Audio.play("levelUp");
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
      Audio.play("evolve");
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
      Audio.play("cancel");
      enqueue("Got away safely!");
      state.ranAway = true;
      state.phase = "ranAway";
      nextMessage();
    } else {
      Audio.play("bump");
      enqueue("Couldn't escape!");
      enemyFreeTurn();
    }
  }

  function enemyFreeTurn() {
    state.pendingPlayerMove = null;
    state.pendingEnemyMove = pickEnemyMove();
    state.turnOrder = ["enemy"];
    state.turnIdx = 0;
    doNextTurnAction();
  }

  function throwBraincell(itemKey = "BRAINCELL") {
    if (state.isTrainer) {
      enqueue("That trainer would block your brain cells!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    if (!game_bag_consume(itemKey)) {
      enqueue(`You're out of ${ITEMS[itemKey].name}!`);
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    Audio.play("catch");
    const sp = SPECIES[state.enemyMon.species];
    const catchRate = sp.catchRate || 50;
    const mod = ITEMS[itemKey]?.catchMod || 1;
    const a = ((3 * state.enemyMon.maxHp - 2 * state.enemyMon.hp) * catchRate * mod) / (3 * state.enemyMon.maxHp);
    let success = Math.random() * 255 < a;
    if (sp.legendary && Math.random() < 0.6) success = false;
    enqueue(`You hurled a ${ITEMS[itemKey].name}!`);
    if (success) {
      state.catchShakes = 3;
      enqueue(`Gotcha! ${sp.name} was caught!`);
      Audio.play("captured");
      state.caught = true;
      state.phase = "caughtMon";
      nextMessage();
    } else {
      const shakes = Math.max(1, Math.min(3, Math.floor((a / 255) * 4)));
      state.catchShakes = shakes;
      enqueue(`(*${"shake ".repeat(shakes).trim()}*) ${sp.name} broke free!`);
      Audio.play("breakOut");
      enemyFreeTurn();
    }
  }

  function game_bag_consume(itemKey) {
    if (typeof window.__brainrotBagConsume === "function") {
      return window.__brainrotBagConsume(itemKey);
    }
    return true;
  }

  function useHealItemInBattle(itemKey) {
    const item = ITEMS[itemKey];
    if (!item || !item.heal) return false;
    if (!game_bag_consume(itemKey)) {
      enqueue(`You're out of ${item.name}!`);
      state.phase = "endTurn";
      nextMessage();
      return true;
    }
    Audio.play("heal");
    const mon = playerMon();
    if (mon.hp >= mon.maxHp) {
      enqueue(`${SPECIES[mon.species].name} is already at full HP.`);
      state.phase = "endTurn";
      nextMessage();
      return true;
    }
    const before = mon.hp;
    mon.hp = Math.min(mon.maxHp, mon.hp + item.heal);
    state.visualPlayerHp = before;
    startTween(state.playerHpTween, before, mon.hp, 700);
    enqueue(`Used ${item.name}! Restored ${mon.hp - before} HP.`);
    enemyFreeTurn();
    return true;
  }

  function openBagFromBattle() {
    if (typeof window.__brainrotOpenBag === "function") {
      window.__brainrotOpenBag(true);
    }
  }

  function openTeamFromBattle() {
    if (typeof window.__brainrotOpenTeam === "function") {
      window.__brainrotOpenTeam(true);
    }
  }

  function switchActiveMon(idx) {
    if (idx === state.playerIdx) {
      Audio.play("cancel");
      enqueue("Already in battle!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    if (state.playerTeam[idx].hp <= 0) {
      enqueue("That monster has fainted!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    Audio.play("confirm");
    enqueue(`Come back, ${SPECIES[playerMon().species].name}!`);
    state.playerIdx = idx;
    state.playerOffsetX = -240;
    state.visualPlayerHp = playerMon().hp;
    setTimeout(() => { state.playerOffsetX = 0; }, 100);
    enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
    enemyFreeTurn();
  }

  function refreshInfo(forceVisual) {
    if (!state) return;
    const e = state.enemyMon;
    const eSp = SPECIES[e.species];
    elEnemyInfo().querySelector(".mon-name").textContent = eSp.name;
    elEnemyInfo().querySelector(".mon-lvl").textContent = "Lv. " + e.level;
    const eShown = forceVisual ? e.hp : state.visualEnemyHp;
    const eRatio = eShown / e.maxHp;
    const eFill = elEnemyInfo().querySelector(".hp-fill");
    eFill.style.width = (Math.max(0, eRatio) * 100) + "%";
    eFill.classList.toggle("med", eRatio < 0.5 && eRatio >= 0.2);
    eFill.classList.toggle("low", eRatio < 0.2);

    const p = playerMon();
    const pSp = SPECIES[p.species];
    elPlayerInfo().querySelector(".mon-name").textContent = pSp.name;
    elPlayerInfo().querySelector(".mon-lvl").textContent = "Lv. " + p.level;
    const pShown = forceVisual ? p.hp : state.visualPlayerHp;
    const pRatio = pShown / p.maxHp;
    const pFill = elPlayerInfo().querySelector(".hp-fill");
    pFill.style.width = (Math.max(0, pRatio) * 100) + "%";
    pFill.classList.toggle("med", pRatio < 0.5 && pRatio >= 0.2);
    pFill.classList.toggle("low", pRatio < 0.2);
    elPlayerInfo().querySelector(".hp-text").textContent = `${Math.max(0, Math.round(pShown))} / ${p.maxHp}`;

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

  function update(now, dt) {
    if (!state) return;
    tickTypewriter(now, dt);
    // hp tweens
    updateTween(state.enemyHpTween, now);
    updateTween(state.playerHpTween, now);
    if (state.enemyHpTween.active) state.visualEnemyHp = state.enemyHpTween.value;
    if (state.playerHpTween.active) state.visualPlayerHp = state.playerHpTween.value;
    // shake
    if (state.enemyShake > 0) state.enemyShake--;
    if (state.playerShake > 0) state.playerShake--;
    if (state.enemyFlash > 0) state.enemyFlash--;
    if (state.playerFlash > 0) state.playerFlash--;
    // attack lunge animation
    if (state.attackAnimT > 0) {
      state.attackAnimT = Math.max(0, state.attackAnimT - dt / 220);
    }
    // sliding offsets approach 0
    state.enemyOffsetX = approach(state.enemyOffsetX, 0, dt * 0.6);
    state.playerOffsetX = approach(state.playerOffsetX, 0, dt * 0.6);
    // faint slide-down
    if (state.enemyFainted) state.enemyOffsetY = approach(state.enemyOffsetY, 60, dt * 0.3);
    if (state.playerFainted) state.playerOffsetY = approach(state.playerOffsetY, 80, dt * 0.3);
    // visible hp text
    refreshInfo();
  }

  function approach(v, target, max) {
    const d = target - v;
    if (Math.abs(d) <= max) return target;
    return v + Math.sign(d) * max;
  }

  function draw(ctx, time) {
    if (!state) return;
    const W = ctx.canvas.width, H = ctx.canvas.height;
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#3a1a5c");
    grad.addColorStop(0.5, "#5b2d8c");
    grad.addColorStop(1, "#2a8c4a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    // grid floor
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const yy = H * 0.55 + i * 8;
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.lineTo(W, yy);
      ctx.stroke();
    }
    // platforms
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(W*0.25, H*0.78, 80, 12, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(W*0.78, H*0.40, 65, 10, 0, 0, Math.PI*2);
    ctx.fill();

    // attack lunges
    let enemyLungeX = 0, playerLungeX = 0;
    if (state.attackAnimT > 0) {
      const t = state.attackAnimT;
      const lunge = Math.sin((1 - t) * Math.PI) * 18;
      if (state.attackAnimWho === "enemy") enemyLungeX = -lunge;
      else playerLungeX = lunge;
    }
    const eShakeX = state.enemyShake > 0 ? (Math.random()*6-3) : 0;
    const pShakeX = state.playerShake > 0 ? (Math.random()*6-3) : 0;

    // enemy mon
    const ex = W*0.78 - 48 + state.enemyOffsetX + eShakeX + enemyLungeX;
    const ey = H*0.18 + state.enemyOffsetY;
    if (!state.enemyFainted || state.enemyOffsetY < 50) {
      drawMonWithFlash(ctx, state.enemyMon.species, ex, ey, 96, time, state.enemyFlash);
    }
    // player mon
    const px = W*0.25 - 64 + state.playerOffsetX + pShakeX + playerLungeX;
    const py = H*0.55 + state.playerOffsetY;
    if (!state.playerFainted || state.playerOffsetY < 70) {
      drawMonWithFlash(ctx, playerMon().species, px, py, 128, time, state.playerFlash);
    }

    // typing arrow indicator
    if (state.message && !state.typing && state.messageQueue.length >= 0) {
      const cy = H - 30;
      const cx = W - 28;
      ctx.fillStyle = "#ffcb05";
      const bob = Math.sin(time * 0.008) * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy + bob);
      ctx.lineTo(cx + 8, cy + bob);
      ctx.lineTo(cx + 4, cy + 4 + bob);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawMonWithFlash(ctx, species, x, y, size, time, flash) {
    SpriteRenderer.drawMon(ctx, species, x, y, size, time);
    if (flash > 0) {
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgba(255,255,255,${flash / 24})`;
      ctx.fillRect(x, y, size, size);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function handleKey(key) {
    if (!state) return false;
    if (state.uiBlocked) return true;
    // typewriter fast-forward
    if (state.typing) {
      if (key === "z" || key === "Enter" || key === " ") {
        fastForwardTypewriter();
        return true;
      }
      return true;
    }
    if (state.phase === "menu") {
      if (key === "z" || key === "Enter") { handleAction("fight"); return true; }
      if (key === "x") { handleAction("run"); return true; }
      return true;
    }
    if (key === "z" || key === "Enter" || key === " ") {
      nextMessage();
      return true;
    }
    return true;
  }

  function isActive() { return state !== null; }
  function isMessageDone() { return state && !state.typing && state.messageQueue.length === 0; }

  return {
    start, draw, update, handleKey, isActive, handleAction, handleMove, refreshInfo,
    switchActiveMon, useHealItemInBattle, throwBraincell,
  };
})();
