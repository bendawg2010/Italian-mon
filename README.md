# Brainrot Monsters: Tralalero Edition

A 2D Pokemon-style game built around Italian brain rot memes and 2026
internet creatures (Tralalero, Bombardino, Tung Tung Tung, Skibidi Toiletto,
Glorbo Florbo, Ohio Skibidini, and many more).

## How to play

### Play in your browser

The game is live at **[brainrot-monsters.pages.dev](https://brainrot-monsters.pages.dev/)** — no install, just open and play. Your save lives in browser localStorage; don't clear site data for that domain or you'll lose your progress.

### Easiest local install — just double-click `play.html`

`play.html` is a single self-contained file with all the JS and CSS
inlined. Open it in any modern browser and you're playing. No server,
no install.

### Or use the OS-specific launcher

These start a tiny local web server on port 8765 and open the game in
fullscreen "app mode" (no URL bar, no tabs — feels like a desktop app)
when Chrome / Edge / Brave / Arc is installed. Falls back to the default
browser otherwise.

| OS              | Launcher                   | How to run                                       |
| --------------- | -------------------------- | ------------------------------------------------ |
| **macOS**       | `BrainrotMonsters.app`     | Double-click — true Mac app, no Terminal window  |
| **macOS**       | `play.command`             | Double-click in Finder (Terminal flashes briefly)|
| **Linux**       | `play.sh`                  | `./play.sh` in a terminal                        |
| **Windows**     | `play.bat`                 | Double-click in Explorer                         |

> **First-run on macOS — fix the "Apple could not verify" popup:**
> Brainrot Monsters isn't signed with an Apple Developer ID, so when
> you download the repo as a zip macOS marks the `.app` as
> quarantined. Two ways to fix:
>
> 1. **Easy:** double-click `Trust Brainrot Monsters.command` once.
>    It clears the quarantine flag from the `.app` and the launcher
>    scripts. After that, double-click `BrainrotMonsters.app` works
>    normally.
> 2. **Manual:** in Terminal, run
>    `xattr -dr com.apple.quarantine /path/to/BrainrotMonsters.app`
>
> If macOS blocks the trust script itself, right-click it → **Open**
> → **Open**. You only need to do this once per download.

### Or do it yourself

```bash
python3 -m http.server 8765
# then open http://localhost:8765/index.html
```

## Controls

| Action          | Keyboard                | Touch       |
| --------------- | ----------------------- | ----------- |
| Move            | Arrow keys              | D-pad       |
| Confirm / A     | `Z` or `Enter`          | A button    |
| Cancel / B      | `X` or `Esc`            | B button    |
| Open menu       | `X` (in overworld)      | B button    |
| Quick-heal      | `H` (in battle)         | —           |
| Toggle fullscr. | `F`                     | —           |
| Start game      | `Enter` on title screen | Tap title   |

In battle, click the `FIGHT` / `BAG` / `TEAM` / `RUN` buttons or press
`Z` to open Fight, then click a move. `H` instantly uses your strongest
heal item on the active mon.

## What's in it

- **73 meme creatures** with unique procedural sprites (many hand-tuned
  for flagship mons), types, base stats, learnable moves, and evolutions
- **PC Box** — when your team is full (6/6) caught mons go here. Open
  the BOX from the pause menu to view, swap, or release stored mons.
- **Move-forgetting prompt** — when a mon learns its 5th move, you
  pick which one to forget (or skip) instead of slot 4 being silently
  overwritten.
- **Memedex filter** — cycle ALL / SEEN / CAUGHT / MISSING with ←/→.
- **Quick-heal** in battle (`H`) and **PP-restore items** (Etereo
  Espresso, Pasta Tonic) to skip extra Cappuccino Bar trips.
- **Stats screen** — steps, battles, captures, session + total playtime.
- **Catch animation** — real ball-throw arc + shake count + sparkle on
  capture, instead of a text-only message.
- **Desktop Edition** — launch via `BrainrotMonsters.app` / `play.command` /
  `play.bat` for a splash screen, persistent "DESKTOP EDITION" badge,
  denser title-screen mon drift, and 2 free PP-restore items at start.
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
