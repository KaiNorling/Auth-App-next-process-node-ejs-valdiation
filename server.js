require("dotenv").config();

const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes/routes");
const mongodb = require("./modules/mongo");
const UserMiddleware = require("./middlewares/UserMiddleware");

server.listen(PORT, () => {
	console.log(`SERVER READY AT ${PORT}`);
});

// Middlewares
server.use(express.json());
server.use(
	express.urlencoded({
		extended: true,
	})
);
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));

// Settings
server.set("view engine", "ejs");

(async () => {
	const db = await mongodb();
	try {
		await	server.use((req, res, next) => {
			req.db = db;
			next();
		});
		await server.use(UserMiddleware)
	} catch (error) {
		console.log(error);
	} finally {
		await routes(server);
	}
})();
