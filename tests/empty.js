var objectify = require('../objectify');
    _ = require('underscore');

var value,
    model;

// Deep extend from: https://gist.github.com/kurtmilam/1868955
var deepExtend = function(obj) {
    var parentRE = /#{\s*?_\s*?}/,
        slice = Array.prototype.slice,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    _.each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
            if (hasOwnProperty.call(source, prop)) {
                if (_.isUndefined(obj[prop]) || _.isFunction(obj[prop]) || _.isNull(source[prop])) {
                    obj[prop] = source[prop];
                }
                else if (_.isString(source[prop]) && parentRE.test(source[prop])) {
                    if (_.isString(obj[prop])) {
                        obj[prop] = source[prop].replace(parentRE, obj[prop]);
                    }
                }
                else if (_.isArray(obj[prop]) || _.isArray(source[prop])){
                    if (!_.isArray(obj[prop]) || !_.isArray(source[prop])){
                        throw 'Error: Trying to combine an array with a non-array (' + prop + ')';
                    } else {
                        obj[prop] = _.reject(_.deepExtend(obj[prop], source[prop]), function (item) { return _.isNull(item);});
                    }
                }
                else if (_.isObject(obj[prop]) || _.isObject(source[prop])){
                    if (!_.isObject(obj[prop]) || !_.isObject(source[prop])){
                        throw 'Error: Trying to combine an object with a non-object (' + prop + ')';
                    } else {
                        obj[prop] = _.deepExtend(obj[prop], source[prop]);
                    }
                } else {
                    obj[prop] = source[prop];
                }
            }
        }
    });
    return obj;
};

_.mixin({deepExtend: deepExtend});

module.exports = {

    setUp: function (callback) {
        value = 'foobar';
        model = {};

        callback();
    },

    test1: function (test) {
        _.extend(model, objectify('days[monday][0][time]', value));

        test.deepEqual(model, {days: { monday: [ { time: 'foobar' } ] } });

        test.done();
    },

    test2: function (test) {
        _.extend(model, objectify('days[0][time]', value));

        test.deepEqual(model, { days: [ { time: 'foobar'} ] });

        test.done();
    },

    test3: function (test) {
        _.extend(model, objectify('days[0][time][0][foo]', value));

        test.deepEqual(model, { days: [ { time: [ { foo: 'foobar' } ] } ] });

        test.done();
    },

    test4: function (test) {
        _.extend(model, objectify('days[1][time]', value));

        test.deepEqual(model, { days: [ , { time: 'foobar'} ] });

        test.done();
    },

    test5: function (test) {
        _.extend(model, objectify('days[1][time][1][foo]', value));

        test.deepEqual(model, { days: [ , { time: [ , { foo: 'foobar' } ] } ] });

        test.done();
    },

    test6: function (test) {
        _.extend(model, objectify('days[0]', value));

        test.deepEqual(model, { days: [ 'foobar' ] });

        test.done();
    },

    test7: function (test) {
        _.extend(model, objectify('days[0][0][0]', value));

        test.deepEqual(model, { days: [ [ [ 'foobar' ] ] ] });

        test.done();
    },

    test8: function (test) {
        _.extend(model, objectify('days[0][0][0][time]', value));

        test.deepEqual(model, { days: [ [ [ { time: 'foobar' } ] ] ] });

        test.done();
    },

    test9: function (test) {
        var model = { days: {
                monday: [
                    { op: 'ON' }
                ]
            }
        };

        _.deepExtend(model, objectify('days[monday][0][time]', value));

        test.deepEqual(model, { days: { monday: [ { op: 'ON', time: 'foobar' } ] } });

        test.done();
    },

    test10: function (test) {
        var model = { days: {
                monday: [
                    { op: 'ON' }
                ]
            }
        };

        _.deepExtend(model, objectify('days[monday][0][op]', value));

        test.deepEqual(model, { days: { monday: [ { op: 'foobar' } ] } });

        test.done();
    },

    test11: function (test) {
        var model = { days: {
                monday: [
                    { op: 'ON' }
                ]
            }
        };

        _.deepExtend(model, objectify('days[tuesday][0][time]', value));

        test.deepEqual(model, { days: {
            monday: [ { op: 'ON' } ],
            tuesday: [ { time: 'foobar' } ]
        } });

        test.done();
    }

};
