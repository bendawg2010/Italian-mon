#!/usr/bin/env bash
# One-time fix for macOS Gatekeeper: removes the quarantine flag from
# BrainrotMonsters.app so you can double-click it without seeing the
# "Apple could not verify" warning.
#
# Why this is needed:
#   When macOS downloads a file from the internet (or unzips a .zip
#   that came from the internet), it tags the file with the
#   com.apple.quarantine extended attribute. For unsigned apps,
#   Gatekeeper then refuses to launch them by double-click.
#
# This script clears that flag for the .app sitting next to it. Run
# it ONCE after downloading/extracting the project, then never again.

cd "$(dirname "$0")" || exit 1

APP="BrainrotMonsters.app"

if [ ! -d "$APP" ]; then
  echo
  echo "  Could not find $APP next to this script."
  echo "  Make sure 'Trust Brainrot Monsters.command' lives in the"
  echo "  same folder as BrainrotMonsters.app."
  echo
  read -n 1 -s -r -p "  Press any key to close..."
  exit 1
fi

echo "  Clearing Gatekeeper quarantine flag from $APP ..."
xattr -dr com.apple.quarantine "$APP" 2>/dev/null
xattr -dr com.apple.quarantine "play.command" 2>/dev/null
xattr -dr com.apple.quarantine "Trust Brainrot Monsters.command" 2>/dev/null

# Make sure the binaries are executable (zip extraction can lose +x)
chmod +x "$APP/Contents/MacOS/brainrot" 2>/dev/null
chmod +x "play.command" 2>/dev/null
chmod +x "play.sh" 2>/dev/null

echo
echo "  ✓ Done. You can now double-click BrainrotMonsters.app to play."
echo
read -n 1 -s -r -p "  Press any key to close this window..."
echo
