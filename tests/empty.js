var objectify = require('../objectify'),
    _ = require('underscore');

var value, model;

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

        objectify('days[monday][0][time]', value, model);

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

        objectify('days[monday][0][op]', value, model);

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

        objectify('days[tuesday][0][time]', value, model);

        test.deepEqual(model, { days: {
            monday: [ { op: 'ON' } ],
            tuesday: [ { time: 'foobar' } ]
        } });

        test.done();
    }

};
