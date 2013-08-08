var _ = require('underscore');

module.exports = function (path, value, model) {
    var arr, key;

    model = _.extend({}, model);

    arr = path.split(/[\[\]]+/)
        .filter(function (val) {
            return val;
        });

    key = arr.pop();

    arr.reduce(function (prev, val, index, array) {
        var obj = {};

        if (prev[val] === undefined) {
            if (!isNaN(parseInt(array[index + 1], 10))) {
                prev[val] = [];
            } else if (typeof array[index + 1] === 'string') {
                prev[val] = {};
            } else if (array[index + 1] === undefined) {
                if (_.isArray(prev)) {
                    obj[key] = value;
                    prev[array[index -1]] = obj;
                } else {
                    prev[key] = value;
                }
            }
        } else {
            if (_.isArray(prev) && array[index + 1] === undefined) {
                prev[val][key] = value;
            }
        }

        return prev[val];
    }, model);

    return model;
};
