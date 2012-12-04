# node-asyncify
use plain old functions asynchronously as node-style callbacks

## Installation

    $ npm install node-asyncify

## Usage example

    var asyncify = require('node-asyncify');
    var async = require('async');
    var fs = require('fs');

    function foo() {
    	console.log('unmitigated ungulate usurpers');
    }

    async.parallel([
    		function (__) {
    			fs.readdir(__dirname, __);
    		},
    		asyncify(foo)
    	],
    	function () {
    		console.log('indefatigable idolatry');
    });

This will output:

		unmitigated ungulate usurpers
		indefatigable idolatry

and thrash your harddrisk in between.

## API

		asyncify(syncFunction)

Takes a synchronous function `syncFunction` and returns it wrapped as a node-style async function which takes an (err, val) => any callback as its last parameter. The function is invoked with the original arguments. If `syncFunction` throws an error, it is used for the first argument `err` of the callback. Otherwise, `err` is null and the return value is the second parameter of the callback.


		asyncify.constant(val)
		// alias
		asyncify.K(val)

Takes a constant value `val` and returns it wrapped as a node-style async function which takes an (err, val) => any callback as its last parameter. The callback is invoked with `err` null and `val` as the second parameter.


		asyncify.error(err)

Takes a constant error `err` and returns it wrapped as a node-style async function which takes an (err, val) => any callback as its last parameter.

If `err` is an instanceof Error, it is used. Otherwise, a new Error is created with `err` as the parameter. For example, `asyncify.error('invalid foo')` is equivalent to `asyncify.error(new Error('invalid foo'))`.

The callback is invoked with `err` as its first parameter.


    asyncify.errorFirstify(fn)

Takes a call-back last style function that does not pass the error as the first callback parameter and wraps it so that it provides a (null) error first, followed by all of the original arguments. Callbacks should be (somewhat) consistent: cb(err, val) - for great justice. This does that.

## License

MIT. (c) 2012 jden - Jason Denizac <jason@denizac.org>