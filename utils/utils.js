const generateInsertString = (args) => {
	args = args.map((arg) => {
		if (typeof arg === "string") {
			return `'${arg}'`;
		} else {
			return arg;
		}
	});
	// console.log(`(${args.join(", ")})`);
	return `(${args.join(", ")})`;
};

module.exports = { generateInsertString };