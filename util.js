const {
    hideComponentThisFrame,
    getColour,
    beginTextCommandDisplayText,
    setTextFont,
    setTextScale,
    setTextColour,
    setTextJustification,
    setTextWrap,
    setTextDropShadow,
    setTextOutline,
    endTextCommandDisplayText
} = mp.game.hud;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersLength = characters.length;
const textJustification = {
    center: 0,
    left: 1,
    right: 2
};

function generateRandomString(length = 8) {
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters[ Math.floor(Math.random() * charactersLength) ];
    }

    return result;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function hideHudComponents() {
    hideComponentThisFrame(6); // HUD_VEHICLE_NAME
    hideComponentThisFrame(7); // HUD_AREA_NAME
    hideComponentThisFrame(8); // HUD_VEHICLE_CLASS
    hideComponentThisFrame(9); // HUD_STREET_NAME
}

function getColorFromValue(value) {
    if (Array.isArray(value)) {
        return value;
    } else {
        const result = getColour(value, 0, 0, 0, 0);
        return [result.r, result.g, result.b, result.a];
    }
}

function drawTextLabel(label, position, options) {
    const { font = 0, color = [240, 240, 240, 255], scale = 0.5, justification = textJustification.center, wrap, shadow, outline } = options || {};

    setTextFont(font);
    setTextScale(0.0, scale);
    setTextColour(color[0], color[1], color[2], color[3]); // red, green, blue, alpha
    setTextJustification(justification);

    if (wrap) {
        setTextWrap(0.0, wrap);
    }

    if (shadow) {
        setTextDropShadow();
    }

    if (outline) {
        setTextOutline();
    }

    beginTextCommandDisplayText(label);
    endTextCommandDisplayText(position[0], position[1]);
}

exports = {
    textJustification,

    // Functions
    generateRandomString,
    clamp,
    hideHudComponents,
    getColorFromValue,
    drawTextLabel
};