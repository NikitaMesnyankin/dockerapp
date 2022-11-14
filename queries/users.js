const { generateInsertPair, generateUpdateString, sendJsonData, sendError } = require("../utils/utils");
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "root",
	host: "postgres",
	database: "root",
	password: "root",
	port: 5432,
});

const getUsers = (request, response) => {
	pool.query("SELECT * FROM users ORDER BY id", (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			sendJsonData(response, results.rows, 200);
		}
	});
};

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			if (results.rows.length) {
				sendJsonData(response, results.rows[0], 200);
			} else {
				sendError(response, `Requested user with id ${id} was not found!`, 404);
			}
		}
	});
};

const createUser = (request, response) => {
	pool.query(`INSERT INTO users ${generateInsertPair(request.body)} returning *`, (error, results) => {
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

const updateUser = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(
		`UPDATE users SET ${generateUpdateString(request.body)} where id = ${id} returning *`, (error, results) => {
			if (error) {
				sendError(response, error.message, 500);
			} else {
				if (results.rows.length) {
					sendJsonData(response, results.rows[0], 200);
				} else {
					sendError(response, `Requested user with id ${id} was not found!`, 404);
				}
			}
		}
	);
};

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(`DELETE FROM users WHERE id = ${id} returning *`, (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			if (results.rows.length) {
				sendJsonData(response, null, 204);
			} else {
				sendError(response, `Requested user with id ${id} was not found!`, 404);
			}
		}
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
};