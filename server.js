const express = require("express");
const phones = require("./routes/phones");
const points = require("./routes/points");
const users = require("./routes/users");
const orders = require("./routes/orders");
const bodyParser = require("body-parser");
const { getUserFromDB } = require("./queries/users");

const app = express();
const port = 4040;

app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(`Time: ${new Date().toISOString()} | Request: ${req.method} ${req.path} | Body: ${JSON.stringify(req.body)} | Query: ${JSON.stringify(req.query)}`);
	next();
});

app.use(async (req, res, next) => {
	req.dbResult = await getUserFromDB({ "login": req.query["login"] });
	next();
});

app.use("/phones", phones.phonesRouter);
app.use("/users", users.usersRouter);
app.use("/points", points.pointsRouter);
app.use("/orders", orders.ordersRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
