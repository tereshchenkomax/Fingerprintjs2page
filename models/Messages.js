const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messagesSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	msg: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Messages', messagesSchema);
