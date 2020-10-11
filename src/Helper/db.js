const mysql = require('mysql')
require('dotenv/config')
    
var conn = mysql.createConnection({
	host : process.env.DB_HOST,
	user : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_DATABASE

})

conn.connect(function(err) {
	if (err) throw err;
	console.log("Database Connected!");
});



module.exports = conn;