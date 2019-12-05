const User = require('../models/User');
const arrayToObjReducer = require('../helpers/arrayToObject')

const UsersController = {
	async getUser(req, res) {
		try {
			let fingerprintArray = req.body;
			const fingerprintObject = fingerprintArray.reduce(arrayToObjReducer, {});
			let user = await User.findOne(
				{...fingerprintObject}
			);
			if (!user) {
				console.log('creating the new user');
				user = await User.create({
					name: require('../helpers/nameGenerator'),
					...fingerprintObject
				})
			}
			res.send({name: user.name});
		} catch (e) {
			console.log(e);
		}
	},
	async getAllUsers(req, res) {
		try {
			let users = await User.find({}, 'name _id userAgent timezone cpuClass platform deviceMemory').sort();
			console.log(users);
			res.send({users})
		} catch (e) {
			console.log(e);
		}
	}
};

module.exports = UsersController;
