module.exports = function(app){
	app.get('/produtos', function(req, res){
		var mssql = require('mssql');
		var connection = mssql.createConnetion({
			host : 'NOTE-MICHAEL',
			user : 'userEstudos',
			password : 'senha123',
			database : 'Estudos'
		});
		
		connection.query('select * from livros', function(err, results){
			res.sender(results);
		});
		
		connection.end();
		res.render("produtos/lista");
	})
}