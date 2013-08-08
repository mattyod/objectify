var objectify = require('./objectify');

var path = 'days[monday][0][op]';
var value = 'foobar';
var model = {};

module.exports = (function () {
    console.log(objectify(path, value, model));
})();
