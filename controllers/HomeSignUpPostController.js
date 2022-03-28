const { generateCrypt } = require("../modules/bcrypt");
const { SignUpValidation } = require("../modules/validations");

module.exports = async function HomeSignUpPostController(req, res) {
	try {
		const data = await SignUpValidation.validateAsync(req.body);

		let user = await req.db.users.findOne({
			email: data.email.toLowerCase(),
		});

		let users = await req.db.users.find().toArray()

		if (user || users.length) throw new Error("Email or Admin already exists");

		user = await req.db.users.insertOne({
			...data,
			password: await generateCrypt(data.password),
		});

		res.redirect("/login.html");
	} catch (error) {
		res.render("register", {
			error,
		});
	}
};
