const express = require("express");
const phones = require("../queries/phones");
// const jsonschema = require("jsonschema");
// const phoneSchema = require("../routes/phones");
// const { generateInsertString } = require("../utils/utils");


//const validator = new jsonschema.Validator();
//validator.addSchema(phoneSchema, "/phones");
const phonesRouter = express.Router();

phonesRouter.use((req, res, next) => {
	console.log(`Time: ${Date.now()} | Request: ${req.body}`);
	next();
});

phonesRouter.get("/", phones.getPhones);
phonesRouter.get("/:id", phones.getPhoneById);
phonesRouter.post("/", phones.createPhone);

// router.post("/", async (client, req, res) => {
// 	try {
// 		//validator.validate(req.body, phoneSchema, { "allowUnknownAttributes": false, "throwError": true });
// 		const results = await client
// 			.query(`insert into public.phones values ${generateInsertString(Object.values(req.body))} returning *`)
// 			.then((payload) => {
// 				return payload.rows;
// 			})
// 			.catch(() => {
// 				throw new Error("Database query failed!");
// 			});
// 		res.setHeader("Content-Type", "application/json");
// 		res.status(200);
// 		res.send(JSON.stringify(results));
// 	} catch(err) {
// 		res.status(400);
// 		res.send("Invalid body format: " + err.message);
// 	}
// });


module.exports = {
	phonesRouter
};