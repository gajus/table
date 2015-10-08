'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _makeStreamConfig = require('./makeStreamConfig');

var _makeStreamConfig2 = _interopRequireDefault(_makeStreamConfig);

var _drawRow = require('./drawRow');

var _drawRow2 = _interopRequireDefault(_drawRow);

var _drawBorder = require('./drawBorder');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _stringifyTableData = require('./stringifyTableData');

var _stringifyTableData2 = _interopRequireDefault(_stringifyTableData);

var _truncateTableData = require('./truncateTableData');

var _truncateTableData2 = _interopRequireDefault(_truncateTableData);

var _mapDataUsingRowHeightIndex = require('./mapDataUsingRowHeightIndex');

var _mapDataUsingRowHeightIndex2 = _interopRequireDefault(_mapDataUsingRowHeightIndex);

var _alignTableData = require('./alignTableData');

var _alignTableData2 = _interopRequireDefault(_alignTableData);

var _padTableData = require('./padTableData');

var _padTableData2 = _interopRequireDefault(_padTableData);

var _calculateRowHeightIndex = require('./calculateRowHeightIndex');

var _calculateRowHeightIndex2 = _interopRequireDefault(_calculateRowHeightIndex);

var create = undefined,
    append = undefined,
    calculateColumnWidthIndex = undefined,
    prepareData = undefined;

/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */
create = function (row, columnWidthIndex, config) {
    var output = undefined,
        rows = undefined,
        body = undefined;

    rows = prepareData([row], config);

    body = _lodash2['default'].map(rows, function (row) {
        return (0, _drawRow2['default'])(row, config.border);
    }).join("\n");

    output = '';
    output += (0, _drawBorder.drawBorderTop)(columnWidthIndex, config.border);
    output += body;
    output += (0, _drawBorder.drawBorderBottom)(columnWidthIndex, config.border);

    output = _lodash2['default'].trimRight(output);

    process.stdout.write(output);
};

/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */
append = function (row, columnWidthIndex, config) {
    var output = undefined,
        rows = undefined,
        body = undefined;

    rows = prepareData([row], config);

    body = _lodash2['default'].map(rows, function (row) {
        return (0, _drawRow2['default'])(row, config.border);
    }).join("\n");

    output = "\r\x1b[K";
    output += (0, _drawBorder.drawBorderJoin)(columnWidthIndex, config.border);
    output += body;
    output += (0, _drawBorder.drawBorderBottom)(columnWidthIndex, config.border);

    output = _lodash2['default'].trimRight(output);

    process.stdout.write(output);
};

/**
 * @param {string[][]} data
 * @param {Object} config
 * @returns {string[][]}
 */
prepareData = function (data, config) {
    var rows = undefined,
        rowHeightIndex = undefined;

    rows = (0, _stringifyTableData2['default'])(data);

    rows = (0, _truncateTableData2['default'])(data, config);

    rowHeightIndex = (0, _calculateRowHeightIndex2['default'])(rows, config);

    rows = (0, _mapDataUsingRowHeightIndex2['default'])(rows, rowHeightIndex, config);
    rows = (0, _alignTableData2['default'])(rows, config);
    rows = (0, _padTableData2['default'])(rows, config);

    return rows;
};

/**
 * @param {Object} userConfig
 * @return {Object}
 */

exports['default'] = function () {
    var userConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var config = undefined,
        columnWidthIndex = undefined,
        empty = undefined;

    config = (0, _makeStreamConfig2['default'])(userConfig);

    columnWidthIndex = _lodash2['default'].mapValues(config.columns, function (column) {
        return column.width + column.paddingLeft + column.paddingRight;
    });

    empty = true;

    return {
        /**
         * @param {string[]}
         * @returns {undefined}
         */
        write: function write(row) {
            if (row.length !== config.columnCount) {
                throw new Error('Row cell count does not match the config.columnCount.');
            }

            if (empty) {
                empty = false;

                return create(row, columnWidthIndex, config);
            } else {
                return append(row, columnWidthIndex, config);
            }
        }
    };
};

module.exports = exports['default'];
//# sourceMappingURL=createStream.js.map
