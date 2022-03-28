const HomeLoginPostController = require("../controllers/HomeLoginPostController");
const HomeSignUpPostController = require("../controllers/HomeSignUpPostController");

const router = require("express").Router();

router.get(["/", "/index.html", "/index"], (req, res) => {
	res.render("index",{user:req.user,});
});

router.get(["/register.html", "/register"], (req, res) => {
	res.render("register",{user:req.user,});
}); 

router.get(["/login.html", "/login"], (req, res) => {
	res.render("login",{user:req.user,});
});

router.post(["/login.html", "/login"], HomeLoginPostController);
router.post(["/register.html", "/register"], HomeSignUpPostController);

module.exports = {
	router,
	path: "/",
};
