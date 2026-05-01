# Brainrot Monsters: Tralalero Edition

A 2D Pokemon-style game built around Italian brain rot memes and 2026
internet creatures (Tralalero, Bombardino, Tung Tung Tung, Skibidi Toiletto,
Glorbo Florbo, Ohio Skibidini, and many more).

## How to play

### Easiest — just double-click `play.html`

`play.html` is a single self-contained file with all the JS and CSS
inlined. Open it in any modern browser and you're playing. No server,
no install.

### Or run `play.sh` (Mac / Linux) / `play.bat` (Windows)

These start a tiny local web server on port 8765 and open the game in
your browser automatically. Use this if `play.html` has any issue.

```bash
./play.sh        # Mac / Linux
play.bat         # Windows
```

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

- **21 meme creatures** with unique procedural sprites, types, base
  stats, and learnable moves
- **3 starters**: Tralalero, Bombardino, Tung Sahur — each evolves
- **Type chart** with 10 types: Pasta, Fire, Water, Earth, Air, Beast,
  Brainrot, Sigma, Chaos, Steel
- **Trainer NPCs** including Rival Marco, Pasta Chef Luigi, Sigma Bro
  Kai, and the Brainrot Queen
- **Catch wild monsters** with Brain Cells (gen-1 style catch formula)
- **XP, leveling, evolution, move learning**
- **Cappuccino Bar** healer, signs, save/load to localStorage

## Files

- `play.html` — single-file build, just open it
- `index.html` + `css/` + `js/` — split source for development
- `build.js` — re-bundles split source into `play.html` (`node build.js`)
- `play.sh` / `play.bat` — local-server launchers
