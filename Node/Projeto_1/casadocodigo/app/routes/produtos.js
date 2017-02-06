module.exports = function(app){
	app.get('/produtos', function(req, res){
		var mysql = require('mysql');
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'user_estudos',
			password : 'estudos',
			database : 'estudos'
		});
		
		connection.query('select * from livros', function(err, results){
			res.send(results);
		});
		
		connection.end();

	});
}