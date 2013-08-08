module.exports = function (path, value, extendObject) {
    var ob = (extendObject = extendObject || {});
    var splitPath = path.match(/([^\[\]]+)/g);

    splitPath.forEach(function (el, i) {
        if (splitPath.length === i + 1) {
            ob[el] = value;
        } else {
            var nextEl = splitPath[i + 1];
            ob = (ob[el] = ob[el] || (Number.isNaN(Number(nextEl)) ? {} : []));
        }
    });
    return extendObject;
};