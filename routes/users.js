const express = require("express");
const points = require("../queries/users");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
	console.log(`Time: ${Date.now()} | Request: ${req.body}`);
	next();
});

usersRouter.get("/", points.getPoints);
usersRouter.get("/:id", points.getPointById);
usersRouter.post("/", points.createPoint);

module.exports = {
	usersRouter
};
