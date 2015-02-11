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

	mocha.it('should remove other use strict pragmas.', function() {
		// Given.
		var codeStr = "function MyClass() {'use strict';}";

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, "'use strict';\n\nfunction MyClass() {\n}");
	});

	mocha.it('should remove other use strict pragmas in double quotes.', function() {
		// Given.
		var codeStr = 'function MyClass() {"use strict";\nvar t = 10;}';

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, "'use strict';\n\nfunction MyClass() {\n  var t = 10;\n}");
	});
});
