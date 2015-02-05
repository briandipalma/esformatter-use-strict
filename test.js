'use strict';

var assert = require('assert');

var mocha = require('mocha');
var esformatter = require('esformatter');

var useStrictPlugin = require('./');

esformatter.register(useStrictPlugin);

mocha.describe('use strict plugin', function() {
	mocha.it('should add use strict to top of module.', function() {
		// Given.
		var codeStr = 'function MyClass() {}';

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, "'use strict';\n\nfunction MyClass() {\n}");
	});
});
