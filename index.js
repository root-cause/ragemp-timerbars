const { hideHudComponents } = require("timerbars/util");
const { gfxAlignWidth, gfxAlignHeight, initialY, initialBusySpinnerY, timerBarMargin, timerBarThinMargin } = require("timerbars/coordsAndSizes");
const { setScriptGfxAlign, setScriptGfxAlignParams, resetScriptGfxAlign } = mp.game.graphics;
const { busyspinnerIsOn } = mp.game.hud;
const TimerBarBase = require("timerbars/classes/TimerBarBase");

let timerBarPool = [];

// Request texture dictionary
mp.game.graphics.requestStreamedTextureDict("timerbars", true);

// Rendering
mp.events.add("render", () => {
    const max = timerBarPool.length;
    if (max === 0) {
        return;
    }

    // Hide HUD items that appear near timerbars
    hideHudComponents();

    // Apply drawing config
    setScriptGfxAlign(82, 66);
    setScriptGfxAlignParams(0.0, 0.0, gfxAlignWidth, gfxAlignHeight);

    // Draw
    for (let i = 0, drawY = (busyspinnerIsOn() ? initialBusySpinnerY : initialY); i < max; i++) {
        timerBarPool[i].draw(drawY);
        drawY -= timerBarPool[i]._thin ? timerBarThinMargin : timerBarMargin;
    }

    // Reset drawing config
    resetScriptGfxAlign();
});

// API
exports = {
    add: function(...args) {
        const validTimerBars = args.filter(arg => arg instanceof TimerBarBase);
        timerBarPool.push(...validTimerBars);
    },

    has: function(timerBar) {
        return timerBarPool.includes(timerBar);
    },

    remove: function(timerBar) {
        const idx = timerBarPool.indexOf(timerBar);
        if (idx === -1) {
            return;
        }

        timerBarPool.splice(idx, 1);
    },

    clear: function() {
        timerBarPool = [];
    }
};