#!/usr/bin/env node
// Bundles index.html + css + js into a single play.html that runs from file://
const fs = require("fs");
const path = require("path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/style.css"), "utf8");

const jsFiles = ["js/data.js", "js/sprites.js", "js/world.js", "js/battle.js", "js/game.js"];
const js = jsFiles.map(f => `// ===== ${f} =====\n` + fs.readFileSync(path.join(root, f), "utf8")).join("\n\n");

let out = html
  .replace(/<link rel="stylesheet" href="css\/style\.css" \/>/, `<style>\n${css}\n</style>`)
  .replace(/(\s*<script src="js\/[^"]+"><\/script>)+/, `\n  <script>\n${js}\n  </script>`);

fs.writeFileSync(path.join(root, "play.html"), out);
console.log("Wrote play.html (" + (out.length / 1024).toFixed(1) + " KB)");
