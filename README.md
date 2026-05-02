# Brainrot Monsters: Tralalero Edition

A 2D Pokemon-style game built around Italian brain rot memes and 2026
internet creatures (Tralalero, Bombardino, Tung Tung Tung, Skibidi Toiletto,
Glorbo Florbo, Ohio Skibidini, and many more).

## How to play

### Easiest — just double-click `play.html`

`play.html` is a single self-contained file with all the JS and CSS
inlined. Open it in any modern browser and you're playing. No server,
no install.

### Or use the OS-specific launcher

These start a tiny local web server on port 8765 and open the game in
your browser automatically. Use this if `play.html` has any issue.

| OS              | Launcher       | How to run                                   |
| --------------- | -------------- | -------------------------------------------- |
| **macOS**       | `play.command` | Double-click in Finder (or `./play.command`) |
| **Linux**       | `play.sh`      | `./play.sh` in a terminal                    |
| **Windows**     | `play.bat`     | Double-click in Explorer                     |

> First time on Mac, macOS may ask permission to run an unsigned shell
> script. Right-click `play.command` → Open → Open to allow it once.

### Or do it yourself

```bash
python3 -m http.server 8765
# then open http://localhost:8765/index.html
```

## Controls

| Action      | Keyboard                | Touch       |
| ----------- | ----------------------- | ----------- |
| Move        | Arrow keys              | D-pad       |
| Confirm / A | `Z` or `Enter`          | A button    |
| Cancel / B  | `X` or `Esc`            | B button    |
| Open menu   | `X` (in overworld)      | B button    |
| Start game  | `Enter` on title screen | Tap title   |

In battle, click the `FIGHT` / `BAG` / `TEAM` / `RUN` buttons or press
`Z` to open Fight, then click a move.

## What's in it

- **50 meme creatures** with unique procedural sprites, types, base
  stats, learnable moves, and (for many) evolutions
- **3 starters**: Tralalero, Bombardino, Tung Sahur — each evolves
- **Type chart** with 10 types: Pasta, Fire, Water, Earth, Air, Beast,
  Brainrot, Sigma, Chaos, Steel
- **11 connected maps** in a Pokemon-Red-style overworld:
  Pallet → Route 1 → Viridian → Route 2 → Forest → Pewter →
  Route 3 → Mt. Moon → Cerulean → Route 4 → Vermilion
- **5 Gym Leaders** with named badges, each gated by the previous:
  Pasta Gym (Luigi), Aviary Gym (Pia), Sigma Gym (Kai),
  Sea Gym (Tony), Fire Gym (Greg)
- **Espresso Four** + **Champion Brainrot Queen** post-game gauntlet
- **Memedex** in the pause menu — tracks seen vs caught across all 50
- **Catch wild monsters** with Brain Cells (gen-1 style catch formula)
- **XP, leveling, evolution, move learning**
- **Two Cappuccino Bars** for healing, signs, save/load to localStorage

## Files

- `play.html` — single-file build, just open it
- `index.html` + `css/` + `js/` — split source for development
- `build.js` — re-bundles split source into `play.html` (`node build.js`)
- `play.sh` / `play.bat` — local-server launchers
