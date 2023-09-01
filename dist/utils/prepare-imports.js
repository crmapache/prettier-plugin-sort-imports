"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareImports = void 0;
var prepareImports = function (importGroups) {
    var result = '';
    for (var _i = 0, _a = importGroups.libraries; _i < _a.length; _i++) {
        var importData = _a[_i];
        result += "".concat(importData.raw, "\n");
    }
    result += '\n';
    for (var _b = 0, _c = importGroups.aliases; _b < _c.length; _b++) {
        var importData = _c[_b];
        result += "".concat(importData.raw, "\n");
    }
    result += '\n';
    for (var _d = 0, _e = importGroups.relatives; _d < _e.length; _d++) {
        var importData = _e[_d];
        result += "".concat(importData.raw, "\n");
    }
    if (importGroups.directRelatives.length > 0) {
        result += '\n';
        for (var _f = 0, _g = importGroups.directRelatives; _f < _g.length; _f++) {
            var importData = _g[_f];
            result += "".concat(importData.raw, "\n");
        }
    }
    return result;
};
exports.prepareImports = prepareImports;
