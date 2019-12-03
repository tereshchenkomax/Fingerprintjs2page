const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

module.exports = uniqueNamesGenerator({
	dictionaries: [colors, adjectives, animals],
	style: 'capital'
}); // Red_Big_Donkey
