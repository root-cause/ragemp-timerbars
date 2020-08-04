const { textJustification, getColorFromValue, drawTextLabel } = require("timerbars/util");
const { initialX, textOffset, textScale, textWrap } = require("timerbars/coordsAndSizes");
const TimerBarBase = require("timerbars/classes/TimerBarBase");

exports = class TextTimerBar extends TimerBarBase {
    constructor(title, text) {
        super(title);

        this._textGxtName = `TMRB_TEXT_${this._id}`;
        this._text = text;

        this.textDrawParams = {
            font: 0,
            color: [240, 240, 240, 255],
            scale: textScale,
            justification: textJustification.right,
            wrap: textWrap
        };

        mp.game.gxt.set(this._textGxtName, text);
    }

    // Properties
    get text() {
        return this._text;
    }

    get textColor() {
        return this.textDrawParams.color;
    }

    set text(value) {
        this._text = value;
        mp.game.gxt.set(this._textGxtName, value);
    }

    set textColor(value) {
        this.textDrawParams.color = getColorFromValue(value);
    }

    set color(value) {
        this.titleColor = value;
        this.textColor = value;
    }

    // Functions
    draw(y) {
        super.draw(y);

        y += textOffset;
        drawTextLabel(this._textGxtName, [initialX, y], this.textDrawParams);
    }

    resetGxt() {
        super.resetGxt();
        mp.game.gxt.reset(this._textGxtName);
    }
};