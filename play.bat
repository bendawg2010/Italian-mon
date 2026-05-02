@echo off
REM Launcher: starts a local server and opens the game in a chromeless
REM Chrome/Edge "app window" so it feels like a desktop game.

cd /d "%~dp0"
set PORT=8765
REM ?desktop=1 unlocks Desktop Edition extras (higher-res, splash, badge).
set URL=http://localhost:%PORT%/index.html?desktop=1

REM Find a chromium-based browser
set "BROWSER="
for %%C in (
  "%LocalAppData%\Google\Chrome\Application\chrome.exe"
  "%ProgramFiles%\Google\Chrome\Application\chrome.exe"
  "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
  "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
  "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
  "%LocalAppData%\BraveSoftware\Brave-Browser\Application\brave.exe"
) do (
  if exist %%C set "BROWSER=%%~C"
)

REM Pick a server runtime
set "SRVCMD="
where python >nul 2>nul && set "SRVCMD=python -m http.server %PORT%"
if not defined SRVCMD where node >nul 2>nul && set "SRVCMD=node -e require('http').createServer((q,s)=>{const f=require('fs'),p=require('path');let u=q.url==='/'?'/index.html':q.url;const fp=p.join(process.cwd(),u);f.readFile(fp,(e,d)=>{if(e){s.writeHead(404);s.end();return;}const ext=p.extname(fp);const m={'.html':'text/html','.js':'application/javascript','.css':'text/css'}[ext]||'application/octet-stream';s.writeHead(200,{'Content-Type':m});s.end(d);});}).listen(%PORT%)"

if not defined SRVCMD goto :nopython

echo Starting server on http://localhost:%PORT%
start "Brainrot Server" /MIN cmd /c %SRVCMD%
timeout /t 1 /nobreak >nul

if defined BROWSER (
  echo Opening fullscreen as desktop app via "%BROWSER%"
  start "" "%BROWSER%" --app=%URL% --start-fullscreen --kiosk --user-data-dir="%TEMP%\brainrot-monsters-app"
) else (
  echo Browser not found; opening default browser
  start "" %URL%
)

echo.
echo Close the game window when finished.
echo Press any key here to stop the server...
pause >nul
taskkill /FI "WINDOWTITLE eq Brainrot Server*" /F >nul 2>nul
goto :eof

:nopython
echo No Python or Node found. Opening play.html directly.
start "" "play.html"
pause
