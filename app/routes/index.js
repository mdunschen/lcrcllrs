const lcrcllrsRoutes = require('./lcrcllrs_routes');

module.exports = function(app, db) {
	  lcrcllrsRoutes(app, db);
	  // Other route groups could go here, in the future
	};
