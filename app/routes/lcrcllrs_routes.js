var request=require('request');

module.exports = function(app, db) {
  app.post('/lcrcllrs', function(req, res) {
	  console.log("database = " + db);
	  console.log("req = " + req);
	  console.log("req.body.postcode = " + req.body.postcode);
	  
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
	
	if (req.body.postcode) {
		// https://api.postcodes.io/postcodes?q=L258RF
		var url = 'https://api.postcodes.io/postcodes?q=' + encodeURI(req.body.postcode.replace(/\"/g, ""));
		console.log(url);
		request.get(url, [], function(err, res0, body){
			  console.log(res0.statusCode);
			  if(err) {
				  throw err;
			  } //TODO: handle err
			  if(res0.statusCode == 200 ){
				  var r = JSON.parse(body);
				  sqlQuery(res, r.result[0].admin_ward.replace("'", ""), r.result[0].admin_district);				  
			  }
		});
	} else {
	      sqlQuery(res, req.body.wardName, req.body.district);
	}

	});

  app.post('/editcllrs', function(req, res) {
	  console.log("database = " + db);
	  console.log("req = " + req);
	  console.log("req.body.id = " + req.body.id);
	  console.log("req.body.cllrName = " + req.body.cllrName);
	  console.log("req.body.cllrTwitterURL = " + req.body.cllrTwitterURL);
	  if (!req.body.id) {
		  // send all entries
		  var councillors = db.all("SELECT * FROM cllrs", [], function(err, rows) {
			if (err) {
				throw err;
			}
			res.send(rows);
	 
		});
	  }
	  else {
		  console.log("wants to edit id = " + req.body.id  + ", url = " + req.body.cllrTwitterURL + ", twitterName" + req.body.cllrTwitter);
		  
		  db.run("UPDATE cllrs SET cllrTwitterURL = ?, cllrTwitter = ? WHERE id = ?", [req.body.cllrTwitterURL.replace(/\"/g, ""), req.body.cllrTwitter.replace(/\"/g, ""), req.body.id], function(err) {
			  if (err) {
				  throw err;
			  }
			  console.log("Success.");
			  db.all("SELECT * FROM cllrs", [], function(err, rows) {
				if (err) {
					throw err;
				}
				res.send(rows);
				  
			  });
		  });
	  }
	});

};
