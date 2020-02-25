const RESET = "\x1b[0m";

const BLACK = "\x1b[30m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";
const WHITE = "\x1b[37m";

const _color = (color, text) => {
    return color + text + RESET;
}

const _print = (text, color) => {
    if(color == null){
        color = WHITE;
    }

    console.log(_color(color, text))
}

module.exports = {
    BLACK,
    RED,
    GREEN,
    YELLOW,
    BLUE,
    MAGENTA,
    CYAN,
    WHITE,

    color: _color,
    print: _print
}