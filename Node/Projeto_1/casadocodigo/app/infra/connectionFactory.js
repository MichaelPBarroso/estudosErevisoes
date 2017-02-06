var mySql = require('mysql');

//Função anonima
var connectionMYSQL = function(){
	return 	mySql.createConnection({
			host : 'localhost',
			user : 'user_estudos',
			password : 'estudos',
			database : 'estudos'
	});
}

//Wrapper
module.exports = function(){
	return connectionMYSQL;
}