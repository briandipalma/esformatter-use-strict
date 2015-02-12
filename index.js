'use strict';

var rocamboleToken = require('rocambole-token');

exports.stringAfter = function(formattedString) {
	return "'use strict';\n\n" + formattedString;
};

exports.tokenBefore = function(token) {
	if (isUseStrictPragma(token)) {
		if (rocamboleToken.isSemiColon(token.next)) {
			rocamboleToken.remove(token.next);
		}

		if (rocamboleToken.isBr(token.next)) {
			rocamboleToken.remove(token.next);
		}

		rocamboleToken.remove(token);
	}
};

function isUseStrictPragma(token) {
	return token.type === 'String' && (token.value === "'use strict'" || token.value === '"use strict"');
}
