const { generateInsertPair } = require("../utils/utils");
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "root",
	host: "postgres",
	database: "root",
	password: "root",
	port: 5432,
});

const getPoints = (request, response) => {
	pool.query("SELECT * FROM points ORDER BY id ASC", (error, results) => {
		if (error) {
			throw new Error("Database query failed!");
		}
		response.status(200).setHeader("Content-Type", "application/json").json(results.rows);
	});
};

const getPointById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query("SELECT * FROM points WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw new Error(error.message);
		}
		if (!results.rows) {
			response.status(404)
				.setHeader("Content-Type", "application/json")
				.send(`Requested point with id ${id} was not found!`);
		}
		response.status(200)
			.setHeader("Content-Type", "application/json")
			.json(results.rows);
	});
};

const createPoint = (request, response) => {
	console.log(`INSERT INTO points ${generateInsertPair(request.body)} returning *`);
	//TODO: validate request body
	pool.query(`INSERT INTO points ${generateInsertPair(request.body)} returning *`, (error, results) => {
		if (error) {
			throw new Error(error.message);
		}
		response.status(201).setHeader("Content-Type", "application/json").send(results);
	});
};

module.exports = {
	getPoints,
	getPointById,
	createPoint
};