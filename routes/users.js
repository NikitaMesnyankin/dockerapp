const express = require("express");
const users = require("../queries/users");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
	console.log(`Time: ${Date.now()} | Request: ${req.method} ${req.path} | Body: ${req.body}`);
	next();
});

usersRouter.get("/", users.getUsers);
usersRouter.get("/:id", users.getUserById);
usersRouter.post("/", users.createUser);
usersRouter.patch("/:id", users.updateUser);
usersRouter.delete("/:id", users.deleteUser);

module.exports = {
	usersRouter
};
