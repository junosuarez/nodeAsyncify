function toArray(arrLike) {
  return Array.prototype.slice.call(arrLike);
}

var asyncify = function (syncFn) {
  if (typeof syncFn !== 'function') {
    throw new Error('syncFn must be a function');
  }
  return function () {
    var args = toArray(arguments);
    var cb = args.pop();
    try {
      var val = syncFn.apply(this, args);
      cb(null, val);
    } catch (err) {
      cb(err);
    }
  };
};

asyncify.constant = asyncify.K = function (val) {
  return function () {
    var cb = arguments[arguments.length - 1];
    cb(null, val);
  };
};

asyncify.error = function (err) {
  if (!(err instanceof Error)) {
    err = new Error(err);
  }
  return function () {
    var cb = arguments[arguments.length - 1];
    cb(err);
  };
};

asyncify.errorFirstify = function(valueFirstCbReturningFn) {
  return function () {
    var args = toArray(arguments);
    var cb = args.pop();
    valueFirstCbReturningFn.apply(this, args.concat(function () {
      var cbArgs = [null].concat(toArray(arguments));
      cb.apply(this, cbArgs);
    }));
  };
};

module.exports = asyncify;