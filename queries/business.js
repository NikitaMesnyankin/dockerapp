const { generateInsertPair, generateUpdateString, sendJsonData, sendError } = require("../utils/utils");
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "root",
	host: "postgres",
	database: "root",
	password: "root",
	port: 5432,
});

const getReport = (request, response) => {
	pool.query("SELECT * FROM phones_sales_report", (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			sendJsonData(response, results.rows, 200);
		}
	});
};

module.exports = {
	getReport
};