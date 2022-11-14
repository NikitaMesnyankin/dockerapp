const express = require("express");
const points = require("../queries/points");
const pointsRouter = express.Router();

pointsRouter.use((req, res, next) => {
	console.log(`Time: ${Date.now()} | Request: ${req.method} ${req.path} | Body: ${req.body}`);
	next();
});

pointsRouter.get("/", points.getPoints);
pointsRouter.get("/:id", points.getPointById);
pointsRouter.post("/", points.createPoint);
pointsRouter.patch("/:id", points.updatePoint);
pointsRouter.delete("/:id", points.deletePoint);

module.exports = {
	pointsRouter
};
