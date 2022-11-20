const {
	generateInsertPair,
	generateUpdateString,
	generateConditionClause,
	sendJsonData,
	sendError
} = require("../utils/utils");

const { userSchema } = require("../schemas/users");
const bcrypt = require("bcryptjs");
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "root",
	host: "postgres",
	database: "root",
	password: "root",
	port: 5432,
});

const getUserFromDB = async (params) => {
	console.log(params);
	try {
		const queryResult = await pool.query(`SELECT * FROM users ${generateConditionClause(params)} ORDER BY id`);
		return queryResult.rows;
	} catch (error) {
		return [];
	}
};

const getUsers = (request, response) => {
	pool.query(`SELECT * FROM users ${generateConditionClause(request.query)} ORDER BY id`, (error, results) => {
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

const createUser = async (request, response) => {
	try {
		const value = await userSchema.validateAsync(request.body);
		request.body.hash = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
		delete request.body.password;
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
	} catch (err) {
		sendError(response, err.message, 400);
	}
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
	getUserFromDB,
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
};