var _ = require('underscore');

module.exports = function (path, value) {
    var arr, key, val, obj;

    var isArrayIndex = function (item) {
        return !isNaN(parseInt(item), 10);
    };

    var objType = function (item, parent) {
        if (!isNaN(parseInt(item), 10)) {
            return [];
        }
        if (!_.isArray(parent)) {
            return {};
        }
        return false;
    };

    obj = {};

    arr = path.split(/[\[\]]+/)
        .filter(function (val) {
            return val;
        });

    key = arr.pop();

    if (isArrayIndex(key)) {
        arr.push(key);
        key = value;
        value = false;
    }

    arr.reduce(function (prev, val, index, array) {
        var o = {};

        prev[val] = objType(array[index + 1], prev) || objType(array[index + 2], prev);

        if (!prev[val]) {
            if (value) {
                o[key] = value;
                prev[val] = o;
            } else {
                prev[val] = key;
            }
        }

        return prev[val];
    }, obj);

    return obj;
};
