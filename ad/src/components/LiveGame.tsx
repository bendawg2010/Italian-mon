import {
  IFrame,
  delayRender,
  continueRender,
  cancelRender,
} from "remotion";
import { useEffect, useRef, useState } from "react";

// Renders the LIVE deployed Brainrot Monsters game inside an iframe.
// Uses the ?scene= URL params we added to game.js so each variant of
// this component shows a specific in-game state (title / starter / etc).
//
// We delay Remotion rendering until the iframe load event fires so the
// first captured frame isn't a blank background.
type Scene = "title" | "starter" | "overworld" | "battle" | "catch";

const BASE_URL = "https://brainrot-monsters.pages.dev/";

export const LiveGame: React.FC<{
  scene: Scene;
  /** Force a settle delay (ms) after iframe load before continuing render. */
  settleMs?: number;
}> = ({ scene, settleMs = 800 }) => {
  const [handle] = useState(() => delayRender(`live-game-${scene}`));
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      // Hard timeout — never block the render forever even if onLoad
      // never fires (iframes can be flaky in headless Chromium).
      try { continueRender(handle); } catch (e) {}
    }, 5000);
    return () => clearTimeout(t);
  }, [handle]);

  return (
    <IFrame
      ref={iframeRef}
      src={`${BASE_URL}?scene=${scene}&desktop=1&embed=1`}
      style={{
        width: "100%",
        height: "100%",
        border: 0,
        display: "block",
      }}
      onLoad={() => {
        // Wait an extra beat so the game's intro animations settle.
        setTimeout(() => {
          try { continueRender(handle); } catch (e) {}
        }, settleMs);
      }}
      onError={(e) => {
        cancelRender(e);
      }}
    />
  );
};
