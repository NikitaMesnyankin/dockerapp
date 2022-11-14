const express = require("express");
const phones = require("../queries/phones");
const phonesRouter = express.Router();

phonesRouter.use((req, res, next) => {
	console.log(`Time: ${Date.now()} | Request: ${req.method} ${req.path} | Body: ${req.body}`);
	next();
});

phonesRouter.get("/", phones.getPhones);
phonesRouter.get("/:id", phones.getPhoneById);
phonesRouter.post("/", phones.createPhone);
phonesRouter.patch("/:id", phones.updatePhone);
phonesRouter.delete("/:id", phones.deletePhone);

module.exports = {
	phonesRouter
};
