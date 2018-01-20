var request=require('request');

module.exports = function(app, db) {
  app.get('/lcrcllrs', function(req, res) {
	  console.log("database = " + db);
	  console.log(req.query);
	  
	function sqlQuery(res, wardName, district) {
	  console.log("before query, wardName = " + wardName)
	  console.log("district = " + district)
	  var sql = "SELECT * FROM cllrs WHERE LOWER(wardName) = ? AND LOWER(city) = ?";
	  
	  var councillors = db.all(sql, [wardName.toLowerCase(), district.toLowerCase()], function(err, rows) {
		if (err) {
			throw err;
		}
		res.send(rows);
 
		});
	};
	
	if (req.query.postcode) {
		// https://api.postcodes.io/postcodes?q=L258RF
		var url = 'https://api.postcodes.io/postcodes?q=' + req.query.postcode;
		console.log(url);
		request.get(url, [], function(err,res0,body){
			  console.log(res.statusCode);
			  if(err) {
				  throw err;
			  } //TODO: handle err
			  if(res0.statusCode == 200 ){
				  var r = JSON.parse(body);
				  sqlQuery(res, r.result[0].admin_ward, r.result[0].admin_district);
				  
			  }
		});
	} else {
	      sqlQuery(res, req.query.wardName, req.query.district);
	}

	});
};
