var objectify = require('./objectify'),
    _ = require('underscore');

var path = 'days[monday][0][op]';
var value = 'foobar';
var model = {};

//console.log('extended: ', _.extend(model, test));

module.exports = (function () {
    _.extend(model, objectify(path, value));
    console.log('ended up with: ', model.days);
})();
