var asyncify = function (syncFn) {
	if (typeof syncFn !== 'function') {
		throw new Error('syncFn must be a function');
	}
	return function () {
		var args = Array.prototype.slice.call(arguments);
		var cb = args.pop();
		try {
			var val = syncFn.apply(this, args);
			cb(null, val);
		} catch (err) {
			cb(err);
		}
	};
};

asyncify.constant = nodeAsyncify.K = function (val) {
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

module.exports = asyncify;