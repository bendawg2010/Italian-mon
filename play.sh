#!/usr/bin/env bash
# Launcher: starts a local server and opens the game in a chromeless
# Chrome/Edge "app window" so it feels like a desktop game.

cd "$(dirname "$0")"

PORT=8765
URL="http://localhost:${PORT}/index.html"

# Find a chromium-based browser that supports --app=
find_app_browser() {
  for cmd in google-chrome chrome chromium chromium-browser brave brave-browser microsoft-edge edge \
             "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
             "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
             "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
             "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
    if command -v "$cmd" >/dev/null 2>&1 || [ -x "$cmd" ]; then
      echo "$cmd"; return 0
    fi
  done
  return 1
}

open_in_browser() {
  local url="$1"
  local browser
  browser="$(find_app_browser || true)"
  if [ -n "$browser" ]; then
    echo "Opening as fullscreen desktop app via: $browser"
    "$browser" --app="$url" --start-fullscreen --kiosk \
      --user-data-dir="${HOME}/.brainrot-monsters-app" \
      >/dev/null 2>&1 &
    return
  fi
  # fallback to default browser
  case "$(uname -s)" in
    Darwin*) open "$url" ;;
    Linux*)  xdg-open "$url" >/dev/null 2>&1 || sensible-browser "$url" >/dev/null 2>&1 || true ;;
    MINGW*|MSYS*|CYGWIN*) start "$url" ;;
    *) echo "Open this in your browser: $url" ;;
  esac
}

start_server() {
  if command -v python3 >/dev/null 2>&1; then
    echo "Starting Python server on http://localhost:${PORT}"
    python3 -m http.server "$PORT" > /dev/null 2>&1 &
    SERVER_PID=$!
  elif command -v python >/dev/null 2>&1; then
    python -m SimpleHTTPServer "$PORT" > /dev/null 2>&1 &
    SERVER_PID=$!
  elif command -v node >/dev/null 2>&1; then
    node -e "require('http').createServer((q,s)=>{const f=require('fs'),p=require('path');let u=q.url==='/'?'/index.html':q.url;const fp=p.join(__dirname,u);if(!fp.startsWith(__dirname))return s.end();f.readFile(fp,(e,d)=>{if(e){s.writeHead(404);s.end('not found');return;}const ext=p.extname(fp);const m={'.html':'text/html','.js':'application/javascript','.css':'text/css'}[ext]||'application/octet-stream';s.writeHead(200,{'Content-Type':m});s.end(d);});}).listen(${PORT})" > /dev/null 2>&1 &
    SERVER_PID=$!
  else
    SERVER_PID=""
  fi
}

trap 'echo; echo "Shutting down..."; if [ -n "$SERVER_PID" ]; then kill $SERVER_PID 2>/dev/null; fi; exit 0' INT TERM

start_server
if [ -z "$SERVER_PID" ]; then
  echo "No Python or Node found — opening single-file build directly."
  open_in_browser "file://$(pwd)/play.html"
  echo "Press Enter to exit..."; read; exit 0
fi

sleep 1
open_in_browser "$URL"
echo "Game running at $URL"
echo "Close the app window or press Ctrl+C here to stop."
wait $SERVER_PID
