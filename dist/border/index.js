/**
 * @param {String} name
 * @return {Object}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (name) {
    if (name === "honeywell") {
        return {
            topBody: "═",
            topJoin: "╤",
            topLeft: "╔",
            topRight: "╗",

            bottomBody: "═",
            bottomJoin: "╧",
            bottomLeft: "╚",
            bottomRight: "╝",

            bodyLeft: "║",
            bodyRight: "║",
            bodyJoin: "│",

            joinBody: "─",
            joinLeft: "╟",
            joinRight: "╢",
            joinJoin: "┼"
        };
    }

    if (name === "norc") {
        return {
            topBody: "─",
            topJoin: "┬",
            topLeft: "┌",
            topRight: "┐",

            bottomBody: "─",
            bottomJoin: "┴",
            bottomLeft: "└",
            bottomRight: "┘",

            bodyLeft: "│",
            bodyRight: "│",
            bodyJoin: "│",

            joinBody: "─",
            joinLeft: "├",
            joinRight: "┤",
            joinJoin: "┼"
        };
    }

    if (name === "ramac") {
        return {
            topBody: "-",
            topJoin: "+",
            topLeft: "+",
            topRight: "+",

            bottomBody: "-",
            bottomJoin: "+",
            bottomLeft: "+",
            bottomRight: "+",

            bodyLeft: "|",
            bodyRight: "|",
            bodyJoin: "|",

            joinBody: "-",
            joinLeft: "|",
            joinRight: "|",
            joinJoin: "|"
        };
    }

    throw new Error("Unknown border template \"" + name + "\".");
};

module.exports = exports["default"];
//# sourceMappingURL=../border/index.js.map