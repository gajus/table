'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _alignString = require('./alignString');

var _alignString2 = _interopRequireDefault(_alignString);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */

exports['default'] = function (rows, config) {
    return _lodash2['default'].map(rows, function (cells, index0) {
        return _lodash2['default'].map(cells, function (value, index1) {
            var column = undefined;

            column = config.columns[index1];

            if ((0, _stringWidth2['default'])(value) === column.width) {
                return value;
            } else {
                return (0, _alignString2['default'])(value, column.width, column.alignment);
            }
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=alignTableData.js.map
