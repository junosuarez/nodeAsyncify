# node-asyncify
use plain old functions asynchronously as node-style callbacks

## Installation

    $ npm install nodeasyncify

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

		node-asyncify(syncFunction)

Takes a synchronous function `syncFunction` and returns it wrapped as a node-style async function which takes an (err, val) => any callback as its last parameter. The function is invoked with the original arguments. If `syncFunction` throws an error, it is used for the first argument `err` of the callback. Otherwise, `err` is null and the return value is the second parameter of the callback.


		node-asyncify.constant(val)
		// alias
		node-asyncify.K(val)

Takes a constant value `val` and returns it wrapped as a node-style async function which takes an (err, val) => any callback as its last parameter. The callback is invoked with `err` null and `val` as the second parameter.


		node-asyncify.error(err)

Takes a constant error `err` and returns it wrapped as a node-style async function which takes an (err, val) => any callback as its last parameter.

If `err` is an instanceof Error, it is used. Otherwise, a new Error is created with `err` as the parameter. For example, `nodeAsyncify.error('invalid foo')` is equivalent to `nodeAsyncify.error(new Error('invalid foo'))`.

The callback is invoked with `err` as its first parameter.

## License

MIT. (c) 2012 jden - Jason Denizac <jason@denizac.org>