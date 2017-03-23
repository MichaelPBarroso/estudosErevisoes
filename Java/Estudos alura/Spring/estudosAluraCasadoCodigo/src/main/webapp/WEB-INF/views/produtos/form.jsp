<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Livros Java, Android, IPhone, PHP, Ruby, e muito mais - Casa do codigo</title>
</head>
<body>
	<form action="/estudosAluraCasadoCodigo/produtos" method="post">
		<div>
			<label>Titulo:</label>
			<input type="text" name="titulo"/>
		</div>
		<div>
			<label>Descrição:</label>
			<textarea rows="10" cols="20" name="descricao"></textarea>
		</div>
		<div>
			<label>Páginas:</label>
			<input type="text" name="paginas"/>
		</div>
		<button type="submit">cadastrar</button>
	</form>
</body>
</html>