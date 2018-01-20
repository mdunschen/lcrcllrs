const lcrcllrsRoutes = require('./lcrcllrs_routes');
console.log('index.js');

module.exports = function(app, db) {
	  console.log('calling lcrcllrsRoutes');
	  lcrcllrsRoutes(app, db);
	  // Other route groups could go here, in the future
	};
