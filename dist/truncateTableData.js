'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */

exports['default'] = function (rows, config) {
    return _lodash2['default'].map(rows, function (cells) {
        return _lodash2['default'].map(cells, function (content, index) {
            return _lodash2['default'].trunc(content, {
                length: config.columns[index].truncate
            });
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=truncateTableData.js.map
