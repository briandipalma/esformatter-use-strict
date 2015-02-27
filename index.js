'use strict';

var rocamboleToken = require('rocambole-token');

exports.stringAfter = function(formattedString) {
	var trailingLineBreaks = '\n\n';
	var firstCharacterIsNewline = formattedString.charAt(0) === '\n';
	var secondCharacterIsNewline = formattedString.charAt(1) === '\n';

	// If the module starts with newlines there is no need to add any after pragma
	if (firstCharacterIsNewline && secondCharacterIsNewline) {
		trailingLineBreaks = '';
	} else if (firstCharacterIsNewline) {
		trailingLineBreaks = '\n';
	}

	return "'use strict';" + trailingLineBreaks + formattedString;
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

		rocamboleToken.remove(token);
	}
};

function isUseStrictPragma(token) {
	return token.type === 'String' && (token.value === "'use strict'" || token.value === '"use strict"');
}
