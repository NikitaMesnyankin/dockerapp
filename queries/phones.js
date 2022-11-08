const { generateInsertPair } = require("../utils/utils");
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "root",
	host: "postgres",
	database: "root",
	password: "root",
	port: 5432,
});

const getPhones = (request, response) => {
	pool.query("SELECT * FROM phones ORDER BY id ASC", (error, results) => {
		if (error) {
			throw new Error("Database query failed!");
		}
		response.status(200).setHeader("Content-Type", "application/json").json(results.rows);
	});
};

const getPhoneById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query("SELECT * FROM phones WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).setHeader("Content-Type", "application/json").json(results.rows);
	});
};

const createPhone = (request, response) => {
	console.log(`INSERT INTO phones ${generateInsertPair(request.body)} returning *`);
	//TODO: validate request body
	pool.query(`INSERT INTO phones ${generateInsertPair(request.body)} returning *`, (error, results) => {
		if (error) {
			throw new Error(error.message);
		}
		response.status(201).setHeader("Content-Type", "application/json").send(results);
	});
};


module.exports = {
	getPhones,
	getPhoneById,
	createPhone
};