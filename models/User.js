const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		userAgent: {
			type: String
		},
		webdriver: {
			type: String
		},
		language: {
			type: String
		},
		colorDepth: {
			type: Number
		},
		deviceMemory: {
			type: String
		},
		hardwareConcurrency: {
			type: String
		},
		screenResolution: {
			type: Array
		},
		availableScreenResolution: {
			type: Array
		},
		timezoneOffset: {
			type: Number
		},
		timezone: {
			type: String
		},
		sessionStorage: {
			type: Boolean
		},
		localStorage: {
			type: Boolean
		},
		indexedDb: {
			type: Boolean
		},
		addBehavior: {
			type: Boolean
		},
		openDatabase: {
			type: Boolean
		},
		cpuClass: {
			type: String
		},
		platform: {
			type: String
		},
		webglVendorAndRenderer: {
			type: String
		},
		adBlock: {
			type: Boolean
		},
		hasLiedLanguages: {
			type: Boolean
		},
		hasLiedResolution: {
			type: Boolean
		},
		hasLiedOs: {
			type: Boolean
		},
		hasLiedBrowser: {
			type: Boolean
		},
		touchSupport: {
			type: Array
		},
		audio: {
			type: String
		},
		// THE ONES REQUIRE MORE RESOURCES
		webgl: {
			type: Array
		},
		canvas: {
			type: Array
		},
		plugins: {
			type: Array
		},
		fonts: {
			type: Array
		},

	},
	{
		timestamps: true
	});

module.exports = mongoose.model('User', UserSchema);
