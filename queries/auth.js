const users = require("../queries/users");

const permit = (...permittedRoles) => {
	return (request, response, next) => {
		if (
			request.dbResult.length //if user exists and role is allowed
				&& permittedRoles[0].includes(request.dbResult[0].role)
		) {
			delete request.dbResult;//delete check info
			next(); // role is allowed, so continue on the next middleware (entity is allowed)
		} else {
			response.status(403).json({ message: "Forbidden" }); // user action is forbidden (entity is forbidden)
		}
	};
};

module.exports = { permit };
