const express = require("express");
const phones = require("./routes/phones");
const bodyParser = require("body-parser");
const app = express();
const port = 4040;

app.use(bodyParser.json());
//app.use(express.static("public"));
app.use("/phones", phones.phonesRouter);


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

