#!/usr/bin/env bash
# Easy launcher: opens the game in your default browser.
# Tries Python, Node, or just opens play.html directly.

cd "$(dirname "$0")"

PORT=8765
URL="http://localhost:${PORT}/index.html"

open_browser() {
  case "$(uname -s)" in
    Darwin*) open "$1" ;;
    Linux*)  xdg-open "$1" >/dev/null 2>&1 || sensible-browser "$1" >/dev/null 2>&1 || true ;;
    MINGW*|MSYS*|CYGWIN*) start "$1" ;;
    *) echo "Open this in your browser: $1" ;;
  esac
}

if command -v python3 >/dev/null 2>&1; then
  echo "Starting Python server on http://localhost:${PORT}"
  echo "(Press Ctrl+C to stop)"
  ( sleep 1 && open_browser "$URL" ) &
  python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  echo "Starting Python server on http://localhost:${PORT}"
  ( sleep 1 && open_browser "$URL" ) &
  python -m SimpleHTTPServer "$PORT"
elif command -v node >/dev/null 2>&1; then
  echo "Starting Node server on http://localhost:${PORT}"
  ( sleep 1 && open_browser "$URL" ) &
  node -e "require('http').createServer((q,s)=>{const f=require('fs'),p=require('path');let u=q.url==='/'?'/index.html':q.url;const fp=p.join(__dirname,u);if(!fp.startsWith(__dirname))return s.end();f.readFile(fp,(e,d)=>{if(e){s.writeHead(404);s.end('not found');return;}const ext=p.extname(fp);const m={'.html':'text/html','.js':'application/javascript','.css':'text/css'}[ext]||'application/octet-stream';s.writeHead(200,{'Content-Type':m});s.end(d);});}).listen(${PORT})"
else
  echo "No Python or Node found. Opening play.html (single-file build) directly..."
  open_browser "file://$(pwd)/play.html"
fi
