const User = require('../models/User');
require('../helpers/nameGenerator');

async function getUser(req, res) {
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
		res.send({name : user.name});
	} catch (e) {
		console.log(e);
	}
}

async function getAllUsers(req, res) {
	try {

	} catch (e) {
		console.log(e);
	}
}

const arrayToObjReducer = (accumulator, currentValue) => {
	accumulator[currentValue.key] = currentValue.value;
	return accumulator
};

module.exports = {
	getUser,
	getAllUsers
};
