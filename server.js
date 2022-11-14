const express = require("express");
const phones = require("./routes/phones");
const points = require("./routes/points");
const users = require("./routes/users");
const bodyParser = require("body-parser");

const app = express();
const port = 4040;

app.use(bodyParser.json());
app.use("/phones", phones.phonesRouter);
app.use("/users", users.usersRouter);
app.use("/points", points.pointsRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
