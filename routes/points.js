const express = require("express");
const points = require("../queries/points");
const { permit } = require("../queries/auth");
const pointsRouter = express.Router();

pointsRouter.get("/", permit(["ADMIN", "CLIENT", "COURIER"]), points.getPoints);
pointsRouter.get("/:id", permit(["ADMIN", "CLIENT", "COURIER"]), points.getPointById);
pointsRouter.post("/", permit(["ADMIN", "CLIENT", "COURIER"]), points.createPoint);
pointsRouter.patch("/:id", permit(["ADMIN", "CLIENT"]), points.updatePoint);
pointsRouter.delete("/:id", permit(["ADMIN", "CLIENT"]), points.deletePoint);

module.exports = {
	pointsRouter
};
