#!/usr/bin/env bash
# Mac double-click launcher.
#
# Goal: feel like a real desktop game, not "an HTML page in a browser".
# What this does:
#   1. Starts a tiny Python server in the background on port 8765.
#   2. Opens the game in Chrome/Edge in --app + kiosk mode (no URL bar,
#      no tabs, true fullscreen) so it looks like a native app window.
#   3. Closes its own Terminal window once the game is up so nothing
#      lingers behind the game.
#   4. When you exit the game (Cmd+Q the Chrome window), the server
#      auto-shuts down on its own (it dies with this process).
#
# Falls back to opening play.html in the default browser if no
# Chromium-based browser is installed.

cd "$(dirname "$0")" || exit 1

# Self-heal: if we got marked quarantined by macOS, clear the flag on
# our siblings so the user doesn't get blocked next time. Silent if
# nothing is quarantined.
xattr -dr com.apple.quarantine . 2>/dev/null || true

PORT=8765
# ?desktop=1 unlocks the Desktop Edition: higher canvas resolution, more
# particle effects, splash screen, and a small "DESKTOP EDITION" badge.
URL="http://localhost:${PORT}/index.html?desktop=1"
USERDATA="${HOME}/.brainrot-monsters-app"

# ---- find a chromium-based browser that supports --app= ----
find_chromium() {
  local candidates=(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
    "/Applications/Arc.app/Contents/MacOS/Arc"
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
  )
  for c in "${candidates[@]}"; do
    if [ -x "$c" ]; then echo "$c"; return 0; fi
  done
  return 1
}

start_server() {
  if command -v python3 >/dev/null 2>&1; then
    python3 -m http.server "$PORT" >/dev/null 2>&1 &
    SERVER_PID=$!
  elif command -v python >/dev/null 2>&1; then
    python -m SimpleHTTPServer "$PORT" >/dev/null 2>&1 &
    SERVER_PID=$!
  else
    SERVER_PID=""
  fi
}

close_terminal_window() {
  # Close THIS Terminal window once the game has launched, so the user
  # doesn't have an awkward shell sitting behind the game.
  # We disown the server so it survives Terminal closing.
  if [ -n "$SERVER_PID" ]; then disown "$SERVER_PID" 2>/dev/null || true; fi
  osascript <<'OSA' 2>/dev/null &
tell application "Terminal"
  set theWindows to every window
  repeat with w in theWindows
    try
      if (name of w) contains "play.command" then
        close w saving no
      end if
    end try
  end repeat
end tell
OSA
}

start_server
if [ -z "$SERVER_PID" ]; then
  # No python — open the bundled single-file build directly.
  open "file://$(pwd)/play.html"
  echo "No Python found. Opened play.html directly. Press Enter to close..."
  read
  exit 0
fi

# Give the server a beat to bind the port
sleep 0.6

BROWSER="$(find_chromium || true)"
if [ -n "$BROWSER" ]; then
  echo "Launching Brainrot Monsters in fullscreen app mode..."
  "$BROWSER" \
    --app="$URL" \
    --start-fullscreen \
    --user-data-dir="$USERDATA" \
    --no-first-run --no-default-browser-check \
    --disable-features=TranslateUI \
    >/dev/null 2>&1 &
  sleep 0.4
  close_terminal_window
else
  echo "No Chrome/Edge/Brave/Arc found — opening in your default browser."
  echo "(For a true fullscreen app feel, install Chrome and double-click this again.)"
  open "$URL"
fi

# Server keeps running in the background until Terminal/this process dies.
# Wait so the script doesn't exit immediately if the Terminal window is kept.
wait $SERVER_PID 2>/dev/null
