const express = require("express");
const users = require("../queries/users");
const { permit } = require("../queries/auth");
const usersRouter = express.Router();

usersRouter.get("/", permit(["ADMIN"]), users.getUsers);
usersRouter.get("/:id", permit(["ADMIN", "ASSEMBLER", "CLIENT", "COURIER", "MANAGER"]), users.getUserById);
usersRouter.post("/", permit(["ADMIN"]), users.createUser);
usersRouter.patch("/:id", permit(["ADMIN", "ASSEMBLER", "CLIENT", "COURIER", "MANAGER"]), users.updateUser);
usersRouter.delete("/:id", permit(["ADMIN", "ASSEMBLER", "CLIENT", "COURIER", "MANAGER"]), users.deleteUser);

module.exports = {
	usersRouter
};
