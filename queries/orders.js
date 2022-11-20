const { generateInsertPair, generateUpdateString, sendJsonData, sendError } = require("../utils/utils");
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "root",
	host: "postgres",
	database: "root",
	password: "root",
	port: 5432,
});

const getOrders = (request, response) => {
	pool.query("SELECT * FROM orders ORDER BY id", (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			sendJsonData(response, results.rows, 200);
		}
	});
};

const getOrderById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(`SELECT * FROM orders WHERE id = ${id}`, (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			if (results.rows.length) {
				sendJsonData(response, results.rows[0], 200);
			} else {
				sendError(response, `Requested order with id ${id} was not found!`, 404);
			}
		}
	});
};

const createOrder = (request, response) => {
	pool.query(`INSERT INTO orders ${generateInsertPair(request.body)} returning *`, (error, results) => {
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

const updateOrder = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(
		`UPDATE orders SET ${generateUpdateString(request.body)} where id = ${id} returning *`, (error, results) => {
			if (error) {
				sendError(response, error.message, 500);
			} else {
				if (results.rows.length) {
					sendJsonData(response, results.rows[0], 200);
				} else {
					sendError(response, `Requested order with id ${id} was not found!`, 404);
				}
			}
		}
	);
};

const deleteOrder = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(`DELETE FROM orders WHERE id = ${id} returning *`, (error, results) => {
		if (error) {
			sendError(response, error.message, 500);
		} else {
			if (results.rows.length) {
				sendJsonData(response, null, 204);
			} else {
				sendError(response, `Requested order with id ${id} was not found!`, 404);
			}
		}
	});
};

module.exports = {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder
};