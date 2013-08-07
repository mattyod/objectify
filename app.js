var _ = require('underscore');

// Imediate invoke so I can rapidly test
module.exports = (function (path, value) {
    var args = process.argv.slice(2).toString();
    value = 'hello';
    var model = {
        days: {
            monday: [
                {
                    test: "item",
                    op: "goodbye"
                }
            ]
        }
    };

    model = {};

    var arr = args.split(/[\[\]]+/)
        .filter(function (val) {
            return val;
        });
    //days[monday][0][time]
    var key = arr.pop();

    arr.reduce(function (prev, val, index, array) {
        // console.log(val)
        console.log(prev[val]);
        if (prev[val] === undefined) {
            if (!isNaN(parseInt(array[index + 1], 10))) {
                prev[val] = [];
            } else if (typeof array[index + 1] === 'string') {
                prev[val] = {};
            } else if (array[index + 1] === undefined) {
                console.log('array?', _.isArray(prev));
                if (_.isArray(prev)) {
                    var o = {};
                    o[key] = value;
                    prev[array[index -1]] = o;
                } else {
                    prev[key] = value;
                }
            }
        } else {
            console.log('I did not enter', prev[val]);
            if (_.isArray(prev) && array[index + 1] === undefined) {
                prev[val][key] = value;
                console.log('but I did update the key')
            }

        }

        return prev[val];
    }, model);
    // var value;
    // while (value = arr.shift()) {
    //     if (model === undefined)
    //     //ref += '[' + value + ']';
    //     console.log(ref);
    //     if (!model[ref]) {
    //         model[ref] = {};
    //     }
    // }

    console.log('model', model.days.monday);
    // var key = arr.pop();
    // arr.reduce(function (prev, val, index, array) {
    //     if (prev[val] === undefined) {
    //         prev[val] = {};
    //     }
    //         console.log('prev', prev);
    //         console.log('val', val);
    //         console.log('index', index);
    //         console.log('array', array);

    //         return prev[val];
    // }, model);
    //         model[val] = (Number(val)) ? [val] : {};


    //         console.log('prev', prev);
    //         console.log('val', val);
    //         console.log('index', index);
    //         console.log('array', array);
    //         return model[val];
    //     }, model)
    // console.log(model);
})();
