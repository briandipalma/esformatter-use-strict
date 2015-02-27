'use strict';

var rocamboleToken = require('rocambole-token');

exports.stringAfter = function(formattedString) {
	return "'use strict';\n\n" + formattedString;
};

exports.tokenBefore = function(token) {
	if (isUseStrictPragma(token)) {
		// Remove possible semicolon after 'use strict'
		if (rocamboleToken.isSemiColon(token.next)) {
			rocamboleToken.remove(token.next);
		}

		// Remove possible newline at end of 'use strict';
		if (rocamboleToken.isBr(token.next)) {
			rocamboleToken.remove(token.next);
		}

		// Remove possible spacing linebreak newline after 'use strict';
		if (rocamboleToken.isBr(token.next)) {
			rocamboleToken.remove(token.next);
		}

		rocamboleToken.remove(token);
	}
};

function isUseStrictPragma(token) {
	return token.type === 'String' && (token.value === "'use strict'" || token.value === '"use strict"');
}
