const generateInsertPair = (args_obj) => {
	return `(${Object.keys(args_obj).join(", ")}) VALUES (${Object.values(args_obj).map((arg) => {
		if (typeof arg === "string") {
			return `'${arg}'`;
		} else {
			return arg;
		}
	}).join(", ")})`;
};

const generateUpdateString = (args_obj) => {
	const updateChunks = [];
	Object.keys(args_obj).map((arg) => {
		updateChunks.push(`${arg} = ${typeof args_obj[arg] === "string"
			? `'${args_obj[arg]}'`
			: args_obj[arg]}`);
	});
	return updateChunks.join(", ");
};

const sendJsonData = (response, data, code) => {
	response.status(code)
		.setHeader("Content-Type", "application/json")
		.json(data);
};

const sendError = (response, message, code) => {
	response.status(code)
		.setHeader("Content-Type", "application/json")
		.json({
			message: message
		});
};

module.exports = { generateInsertPair, generateUpdateString, sendJsonData, sendError };
