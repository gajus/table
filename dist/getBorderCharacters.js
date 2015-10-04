/**
 * @typedef border
 * @property {String} topBody
 * @property {String} topJoin
 * @property {String} topLeft
 * @property {String} topRight
 * @property {String} bottomBody
 * @property {String} bottomJoin
 * @property {String} bottomLeft
 * @property {String} bottomRight
 * @property {String} bodyLeft
 * @property {String} bodyRight
 * @property {String} bodyJoin
 * @property {String} joinBody
 * @property {String} joinLeft
 * @property {String} joinRight
 * @property {String} joinJoin
 */

/**
 * @param {String} name
 * @returns {border}
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

    if (name === "void") {
        return {
            topBody: "",
            topJoin: "",
            topLeft: "",
            topRight: "",

            bottomBody: "",
            bottomJoin: "",
            bottomLeft: "",
            bottomRight: "",

            bodyLeft: "",
            bodyRight: "",
            bodyJoin: "",

            joinBody: "",
            joinLeft: "",
            joinRight: "",
            joinJoin: ""
        };
    }

    throw new Error("Unknown border template \"" + name + "\".");
};

module.exports = exports["default"];
//# sourceMappingURL=getBorderCharacters.js.map
