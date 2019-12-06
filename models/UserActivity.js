const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	time: [{
		type: Date,
		required: true,
		default: Date.now
	}]
});

module.exports = mongoose.model('UserActivity', activitySchema);
