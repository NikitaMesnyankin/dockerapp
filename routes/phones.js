const express = require("express");
const phones = require("../queries/phones");
const phonesRouter = express.Router();

phonesRouter.get("/", phones.getPhones);
phonesRouter.get("/:id", phones.getPhoneById);
phonesRouter.post("/", phones.createPhone);
phonesRouter.patch("/:id", phones.updatePhone);
phonesRouter.delete("/:id", phones.deletePhone);

module.exports = {
	phonesRouter
};
