const { generateInsertPair, generateUpdateString, sendJsonData, sendError } = require("../utils/utils");
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "root",
	host: "postgres",
	database: "root",
	password: "root",
	port: 5432,
});

const getPhones = (request, response) => {
	pool.query("SELECT * FROM phones ORDER BY id", (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			sendJsonData(response, results.rows, 200);
		}
	});
};

const getPhoneById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(`SELECT * FROM phones WHERE id = ${id}`, (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			if (results.rows.length) {
				sendJsonData(response, results.rows[0], 200);
			} else {
				sendError(response, `Requested phone with id ${id} was not found!`, 404);
			}
		}
	});
};

const createPhone = (request, response) => {
	pool.query(`INSERT INTO phones ${generateInsertPair(request.body)} returning *`, (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			if (!results.rows.length) {
				sendError(response, "Database error occured!", 409);
			} else {
				sendJsonData(response, results.rows[0], 201);
			}
		}
	});
};

const updatePhone = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(
		`UPDATE phones SET ${generateUpdateString(request.body)} where id = ${id} returning *`, (error, results) => {
			if (error) {
				sendError(response, error.message, 500);
			} else {
				if (results.rows.length) {
					sendJsonData(response, results.rows[0], 200);
				} else {
					sendError(response, `Requested phone with id ${id} was not found!`, 404);
				}
			}
		}
	);
};

const deletePhone = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(`DELETE FROM phones WHERE id = ${id} returning *`, (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			if (results.rows.length) {
				sendJsonData(response, null, 204);
			} else {
				sendError(response, `Requested phone with id ${id} was not found!`, 404);
			}
		}
	});
};

module.exports = {
	getPhones,
	getPhoneById,
	createPhone,
	updatePhone,
	deletePhone
};