const express = require("express");
const phones = require("../queries/phones");
const { permit } = require("../queries/auth");
const phonesRouter = express.Router();

phonesRouter.get("/", permit(["ADMIN", "ASSEMBLER", "CLIENT"]), phones.getPhones);
phonesRouter.get("/:id", permit(["ADMIN", "ASSEMBLER", "CLIENT"]), phones.getPhoneById);
phonesRouter.post("/", permit(["ADMIN", "ASSEMBLER"]), phones.createPhone);
phonesRouter.patch("/:id", permit(["ADMIN", "ASSEMBLER"]), phones.updatePhone);
phonesRouter.delete("/:id", permit(["ADMIN", "ASSEMBLER"]), phones.deletePhone);

module.exports = {
	phonesRouter
};
