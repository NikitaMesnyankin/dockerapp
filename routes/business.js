const express = require("express");
const business = require("../queries/business");
const { permit } = require("../queries/auth");
const businessRouter = express.Router();

businessRouter.get("/", permit(["ADMIN", "CLIENT", "MANAGER"]), business.getReport);

module.exports = {
	businessRouter
};
