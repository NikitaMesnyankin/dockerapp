const generateInsertPair = (args_obj) => {
	return `(${Object.keys(args_obj).join(", ")}) VALUES (${Object.values(args_obj).map((arg) => {
		if (typeof arg === "string") {
			return `'${arg}'`;
		} else {
			return arg;
		}
	}).join(", ")})`;
};

module.exports = { generateInsertPair };
