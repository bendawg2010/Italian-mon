#!/usr/bin/env bash
# Mac double-clickable launcher.
# Finder runs .command files in Terminal, but with cwd = $HOME, so we
# explicitly cd to where this file lives first, then hand off to play.sh.

cd "$(dirname "$0")" || exit 1

if [ -x "./play.sh" ]; then
  exec ./play.sh
elif [ -f "./play.sh" ]; then
  exec /bin/bash ./play.sh
else
  echo "Could not find play.sh next to this launcher."
  echo "Are you running this from inside the Italian-mon folder?"
  echo "Press Enter to close..."
  read
  exit 1
fi
