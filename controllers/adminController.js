const AdminController = {
	async login(req, res) {
		try {
			const creds = req.body;
			console.log(creds);
			if (creds.userName === 'admin' || creds.userPass === process.env.ADMINPW) {
				return res.send(true)
			}
			return res.send(false)
		} catch (e) {
			console.log(e);
		}
	}
};

module.exports = AdminController;
