@echo off
REM Easy launcher for Windows. Opens the game in your default browser.
cd /d "%~dp0"

set PORT=8765

where python >nul 2>nul
if %errorlevel%==0 (
  echo Starting Python server on http://localhost:%PORT%
  start "" "http://localhost:%PORT%/index.html"
  python -m http.server %PORT%
  goto :end
)

where node >nul 2>nul
if %errorlevel%==0 (
  echo Starting Node server on http://localhost:%PORT%
  start "" "http://localhost:%PORT%/index.html"
  node -e "require('http').createServer((q,s)=>{const f=require('fs'),p=require('path');let u=q.url==='/'?'/index.html':q.url;const fp=p.join(__dirname,u);if(!fp.startsWith(__dirname))return s.end();f.readFile(fp,(e,d)=>{if(e){s.writeHead(404);s.end();return;}const ext=p.extname(fp);const m={'.html':'text/html','.js':'application/javascript','.css':'text/css'}[ext]||'application/octet-stream';s.writeHead(200,{'Content-Type':m});s.end(d);});}).listen(%PORT%)"
  goto :end
)

echo No Python or Node found. Opening play.html directly...
start "" "play.html"

:end
pause
