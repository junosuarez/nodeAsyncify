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
    var val;
    try {
      val = syncFn.apply(this, args);
    } catch (err) {
      return cb(err);
    }
    cb(null, val);
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

asyncify.partial = function(fn /*, ...partialArgs[]*/) {
  var partialArgs = toArray(arguments).slice(1);
  return function (cb) {
    fn.apply(this, partialArgs.concat(cb));
  };
};

asyncify.call = function(fn, ctx /*, ...partialArgs[]*/) {
  var partialArgs = toArray(arguments).slice(1);
  return function (cb) {
    fn.apply(ctx, partialArgs.concat(cb));
  };
};

module.exports = asyncify;
