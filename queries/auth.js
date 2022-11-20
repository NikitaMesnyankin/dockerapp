const users = require("../queries/users");

const permit = (...permittedRoles) => {
	return (request, response, next) => {
		if (request.dbResult.length && permittedRoles[0].includes(request.dbResult[0].role)) {
			delete request.dbResult;
			next(); // role is allowed, so continue on the next middleware
		} else {
			response.status(403).json({ message: "Forbidden" }); // user is forbidden
		}
	};
};

module.exports = { permit };
