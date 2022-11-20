const castType = (item) => {
	return (typeof item === "string")
		? `'${item}'`
		: `${item}`;
};

const generateInsertPair = (args_obj) => {
	return `(${Object.keys(args_obj).join(", ")}) VALUES (${Object.values(args_obj).map((value) => {
		return castType(value);
	}).join(", ")})`;
};

const generateUpdateString = (args_obj) => {
	const updateChunks = [];
	Object.keys(args_obj).map((arg) => {
		updateChunks.push(`${arg} = ${castType(args_obj[arg])}`);
	});
	return updateChunks.join(", ");
};

const generateConditionClause = (args_obj) => {
	const conditionChunks = ["where true"];
	Object.keys(args_obj).map((arg) => {
		conditionChunks.push(`and ${arg} = ${castType(args_obj[arg])}`);
	});
	return conditionChunks.join(" ");
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

module.exports = { generateInsertPair, generateUpdateString, generateConditionClause, sendJsonData, sendError };
