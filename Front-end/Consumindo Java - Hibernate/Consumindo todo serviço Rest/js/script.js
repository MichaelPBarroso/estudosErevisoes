$(Document).ready(function(){
	informacoesUsuario();
	eventos();
	mascaras();
	
	$("#tabelaListaCliente").DataTable({
		"displayLength": 7,
		/*"scrollX":true,*/
		"autoWidth": false,
		"lengthChange": false,
		"columnDefs":[
			{"targets":0, "width":"5%"},
			{"targets":1, "width":"45%"},
			{"targets":2, "width":"17%"},
			{"targets":3, "width":"18%"},
			{"targets":4, "width":"5%"},
			{"targets":5, "width":"5%"},
			{"targets":6, "width":"5%"}
		]
	});
	
	$("#tabelaListaProduto").DataTable({
		"displayLength": 7,
		/*"scrollX":true,*/
		"autoWidth": false,
		"lengthChange": false,
		"columnDefs":[
			{"targets":0, "width":"4%"},
			{"targets":1, "width":"20%"},
			{"targets":2, "width":"10%"},
			{"targets":3, "width":"57%"},
			{"targets":4, "width":"3%"},
			{"targets":5, "width":"3%"},
			{"targets":6, "width":"3%"}
		]
	});
});

function eventos(){
	$(".close").click(function(){
		resetConfigPainel();
	});
	$(".conteudo-menu").click(function(){
		resetConfigPainel();
	});
	$("#listarCliente").click(function(){
		$("#tituloModalCliente").text("Clientes cadastrados");
		$("#modalCliente").modal();
		
		$("#liCliente").addClass("active");
		$("#listaCliente").addClass("in active");
		
		$("#liCliente").css("display", "block");
		$("#liInformacoesCliente").css("display", "none");
		$("#liCadastroCliente").css("display", "none");
		
		var table = $("#tabelaListaCliente").DataTable();
		table.clear().draw();
		
		listar('cliente');
	});
	$("#listarProduto").click(function(){
		$("#tituloModalProduto").text("Produtos cadastrados");
		$("#modalProduto").modal();
		
		$("#liProduto").addClass("active");
		$("#listaProduto").addClass("in active");
		
		$("#liProduto").css("display", "block");
		$("#liInformacoesProduto").css("display", "none");
		$("#liCadastroProduto").css("display", "none");
		
		var table = $("#tabelaListaProduto").DataTable();
		table.clear().draw();
		
		listar('produto');
	});
	$("#cadastrarCliente").click(function(){
		$("#tituloModalCliente").text("Cadastrar novo cliente");
		$("#modalCliente").modal();
		
		$("#alterarCadastrarCliente").text("Cadastrar");
		$("#liCadastroCliente").addClass("active");
		$("#cadastroCliente").addClass("in active");
		
		$("#submitCadastroCliente").val("Cadastrar");
		$("#submitCadastroCliente").attr("data-tipo", "cadastrar");
		
		$("#liCliente").css("display", "none");
		$("#liInformacoesCliente").css("display", "none");
		$("#liCadastroCliente").css("display", "block");
		$("#codigoCliente").css("display", "none");
	});
	$("#cadastrarProduto").click(function(){
		$("#tituloModalProduto").text("Cadastrar novo produto");
		$("#modalProduto").modal();
		
		$("#alterarCadastrarProduto").text("Cadastrar");
		$("#liCadastroProduto").addClass("active");
		$("#cadastroProduto").addClass("in active");
		
		$("#submitCadastroProduto").val("Cadastrar");
		$("#submitCadastroProduto").attr("data-tipo", "cadastrar");
		
		$("#liProduto").css("display", "none");
		$("#liInformacoesProduto").css("display", "none");
		$("#liCadastroProduto").css("display", "block");
		$("#codigoProduto").css("display", "none");
	});
	$("#submitCadastroCliente").click(function(){
		var tipo = $(this).attr("data-tipo");
		
		if(tipo == 'cadastrar'){
			cadastrarCliente();
		}else if(tipo == 'alterar'){
			alterarCliente();
		}
	});
	$("#submitCadastroProduto").click(function(){
		var tipo = $(this).attr("data-tipo");
		
		if(tipo == 'cadastrar'){
			cadastrarProduto();
		}else if(tipo == 'alterar'){
			alterarProduto();
		}
	});
	$("#listaMenuProduto").click(function(){
		var table = $("#tabelaListaProduto").DataTable();
		table.clear().draw();
		
		listar('produto');
		
		$("#liInformacoesProduto").css("display", "none");
		$("#liCadastroProduto").css("display", "none");
	});
	$("#listaMenuCliente").click(function(){
		var table = $("#tabelaListaCliente").DataTable();
		table.clear().draw();
		
		listar('cliente');
		
		$("#liInformacoesCliente").css("display", "none");
		$("#liCadastroCliente").css("display", "none");
	});
	$("#btnInfoEditarProduto").click(function(){
		var codigo = $(this).attr("data-id");
		
		popularAlterarProduto(codigo);
		
		$("#liInformacoesProduto").css("display", "none");
		$("#liCadastroProduto").css("display", "block");
		$("#submitCadastroProduto").val("Alterar");
		$("#submitCadastroProduto").attr("data-tipo", "alterar");
		
		$("#alterarCadastrarProduto").text("Alterar");
		$("#alterarCadastrarProduto").trigger("click");
	});
	$("#btnInfoEditarCliente").click(function(){
		var codigo = $(this).attr("data-id");
		
		popularAlterarCliente(codigo);
		
		$("#liInformacoesCliente").css("display", "none");
		$("#liCadastroCliente").css("display", "block");
		$("#submitCadastroCliente").val("Alterar");
		$("#submitCadastroCliente").attr("data-tipo", "alterar");
		
		$("#alterarCadastrarCliente").text("Alterar");
		$("#alterarCadastrarCliente").trigger("click");
	});
}

function mascaras(){
	$("#inputClienteCpf").mask("999.999.999-99");
	$("#inputProdutoPreco").maskMoney({thousands:'.', decimal:',', prefix:'R$ '});
}

function informacoesUsuario(){
	$("#nomeFuncionario").text("Passarinho");
	$("#funcaoFuncionario").text("Acompanhante");
	$("#fraseFuncionario").text("BIP");
}

function cadastrarCliente(){
	var cliente = new Object();
	cliente.nome = $("#inputClienteNome").val();
	cliente.cpf = $("#inputClienteCpf").val();
	
	var data = new Date($("#inputClienteNascimento").val() + " 00:00:00");
	cliente.dataNascimento = formatarData(data);
	
	cadastrar('cliente', cliente);
}

function cadastrarProduto(){
	var produto = new Object();
	produto.nome = $("#inputProdutoNome").val();
	produto.preco = $("#inputProdutoPreco").maskMoney('unmasked')[0];
	produto.descricao = $("#inputProdutoDescricao").val();
	
	cadastrar('produto', produto);
}

function resetConfigPainel(){
	$(".tab-pane").removeClass("in active");
	$(".menuTab").removeClass("active");
}

function formatarData(d){
	var o = new Object();
	o.year = d.getFullYear();
	o.month = d.getMonth() + 1;
	o.dayOfMonth = d.getDate();
	o.hourOfDay = d.getHours();
	o.minute = d.getMinutes();
	o.second = d.getSeconds();
	return o;
}

function buscar(tipo,id){
	var dados;
	
	$.ajax({
		method	:	'GET',
		url 	:	'http://localhost:7070/Estudos_Hibernate_Rest_full/venda/' + tipo + '/' + id,
		async	:	false
	}).done(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
		
		dados = json;
	}).fail(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
		
		dados = json;
	});
	
	return dados;
}

function listar(tipo){
	$.ajax({
		method	:	'GET',
		url 	:	'http://localhost:7070/Estudos_Hibernate_Rest_full/venda/'+tipo,
		async	:	false
	}).done(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
		
		if(tipo == 'cliente'){
			montarTableCliente(json);
		}else if(tipo == 'produto'){
			montarTableProduto(json);
		}
	}).fail(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
	});
}

function cadastrar(tipo, dados){
	var dados = JSON.stringify(dados);
	$.ajax({
		method		:	'POST',
		url 		:	'http://localhost:7070/Estudos_Hibernate_Rest_full/venda/'+tipo,
		async		:	true,
		contentType	:	'application/json; charset=utf-8',
		data		:	dados
	}).done(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
	}).fail(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
	});
}

function alterar(tipo, dados){
	var dados = JSON.stringify(dados);
	$.ajax({
		method		:	'PUT',
		url 		:	'http://localhost:7070/Estudos_Hibernate_Rest_full/venda/'+tipo,
		async		:	true,
		contentType	:	'application/json; charset=utf-8',
		data		:	dados
	}).done(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
	}).fail(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
	});
}

function remover(tipo, id){
	$.ajax({
		method	:	'DELETE',
		url 	:	'http://localhost:7070/Estudos_Hibernate_Rest_full/venda/'+tipo+'/'+id,
		async	:	false
	}).done(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
	}).fail(function(json, status, resp){
		console.log(json);
		console.log(status);
		console.log(resp);
	});
}

function montarTableCliente(json){
	var table = $("#tabelaListaCliente").DataTable();
	
	$.each(json, function(c, comp){
		var array = [comp.id, comp.nome, comp.cpf, montarDataApresentar(comp.dataNascimento), '<a href="#" class="btnInfoCliente" data-id="' + comp.id + '"><span class="glyphicon glyphicon-plus"></span></a>', '<a href="#" class="btnEditarCliente" data-id="' + comp.id + '"><span class="glyphicon glyphicon-pencil"></span></a>', '<a href="#" class="btnExcluirCliente" data-id="' + comp.id + '"><span class="glyphicon glyphicon-trash"></span></a>'];
		
		table.row.add(array).draw();
	});
	
	eventosClientes();
	
	$(".paginate_button").click(function(){
		eventosClientes();
		eventosProdutos();
	});
	
	$("#tabelaListaCliente_filter label input").blur(function(){
		eventosClientes();
		eventosProdutos();
	});
}

function montarTableProduto(json){
	var table = $("#tabelaListaProduto").DataTable();
	
	$.each(json, function(c, comp){
		var array = [comp.id, comp.nome, comp.preco, converterVazioAjax(comp.descricao), '<a href="#" class="btnInfoProduto" data-id="' + comp.id + '"><span class="glyphicon glyphicon-plus"></span></a>', '<a href="#" class="btnEditarProduto" data-id="' + comp.id + '"><span class="glyphicon glyphicon-pencil"></span></a>', '<a href="#" class="btnExcluirProduto" data-id="' + comp.id + '"><span class="glyphicon glyphicon-trash"></span></a>'];
		
		table.row.add(array).draw();
	});
	
	eventosProdutos();
	
	$(".paginate_button").click(function(){
		eventosClientes();
		eventosProdutos();
	});
	
	$("#tabelaListaCliente_filter label input").blur(function(){
		eventosClientes();
		eventosProdutos();
	});
}

function montarDataApresentar(data){
	var d = data.dayOfMonth;
	var m = data.month;
	var y = data.year;
	
	if(d < 10) d = "0" + d;
	if(m < 10) m = "0" + m;
	
	return d + "/" + m + "/" + y;
}

function montarDataInput(data){
	var d = data.dayOfMonth;
	var m = data.month;
	var y = data.year;
	
	if(d < 10) d = "0" + d;
	if(m < 10) m = "0" + m;
	
	return y + "-" + m + "-" + d;
}


function converterVazioAjax(v){
	if(v == undefined || v == null) v = " ";
	return v;
}

function eventosProdutos(){
	$(".btnEditarProduto").click(function(){
		var codigo = $(this).attr("data-id");
		
		popularAlterarProduto(codigo);
		
		$("#codigoProduto").css("display", "block");
		$("#liCadastroProduto").css("display", "block");
		$("#alterarCadastrarProduto").text("Alterar");
		$("#submitCadastroProduto").val("Alterar");
		$("#alterarCadastrarProduto").trigger('click');
		
		$("#submitCadastroProduto").attr("data-tipo", "alterar");
	});
	$(".btnInfoProduto").click(function(){
		var codigo = $(this).attr("data-id");
		
		popularInfoProduto(codigo);
		
		$("#btnInfoEditarProduto").attr("data-id", codigo);
		$("#liInformacoesProduto").css("display", "block");
		$("#infoMenuProduto").trigger("click");
	});
	$(".btnExcluirProduto").click(function(){
		var codigo = $(this).data("id");
		
		excluirProduto(codigo);
	})
}

function eventosClientes(){
	$(".btnEditarCliente").click(function(){
		var codigo = $(this).attr("data-id");
		
		popularAlterarCliente(codigo);
		
		$("#codigoCliente").css("display", "block");
		$("#liCadastroCliente").css("display", "block");
		$("#alterarCadastrarCliente").text("Alterar");
		$("#submitCadastroCliente").val("Alterar");
		$("#alterarCadastrarCliente").trigger("click");
		
		$("#submitCadastroCliente").attr("data-tipo", "alterar");
	});
	$(".btnInfoCliente").click(function(){
		var codigo = $(this).attr("data-id");
		
		popularInfoCliente(codigo);
		
		$("#btnInfoEditarCliente").attr("data-id", codigo);
		$("#liInformacoesCliente").css("display", "block");
		$("#infoMenuCliente").trigger("click");
	});
	$(".btnExcluirCliente").click(function(){
		var codigo = $(this).data("id");
		
		excluirCliente(codigo);
	})
}

function popularAlterarProduto(id){
	var json = buscar('produto',id);
	
	$("#inputProdutoCodigo").val(json.id);
	$("#inputProdutoNome").val(json.nome);
	$("#inputProdutoPreco").val(json.preco);
	$("#inputProdutoDescricao").val(json.descricao);
}

function popularAlterarCliente(id){
	var json = buscar('cliente',id);
	
	$("#inputClienteCodigo").val(json.id);
	$("#inputClienteNome").val(json.nome);
	$("#inputClienteCpf").val(json.cpf);
	$("#inputClienteNascimento").val(montarDataInput(json.dataNascimento));
}

function alterarProduto(){
	var produto = new Object();
	produto.id = $("#inputProdutoCodigo").val();
	produto.nome = $("#inputProdutoNome").val();
	produto.preco = $("#inputProdutoPreco").maskMoney('unmasked')[0];
	produto.descricao = $("#inputProdutoDescricao").val();
	
	alterar('produto', produto);	
}

function alterarCliente(){
	var cliente = new Object();
	cliente.id = $("#inputClienteCodigo").val();
	cliente.nome = $("#inputClienteNome").val();
	cliente.cpf = $("#inputClienteCpf").val();
	
	var data = new Date($("#inputClienteNascimento").val() + " 00:00:00");
	cliente.dataNascimento = formatarData(data);
	
	alterar('cliente', cliente);
}

function popularInfoProduto(id){
	var json = buscar('produto', id);
	
	$("#spanProdutoCodigo").text(json.id);
	$("#spanProdutoNome").text(json.nome);
	$("#spanProdutoPreco").text(json.preco);
	$("#spanProdutoDescricao").text(json.descricao);
}

function popularInfoCliente(id){
	var json = buscar('cliente', id);
	
	$("#spanClienteCodigo").text(json.id);
	$("#spanClienteNome").text(json.nome);
	$("#spanClienteCpf").text(json.cpf);
	$("#spanClienteNascimento").text(montarDataApresentar(json.dataNascimento));
}

function excluirProduto(id){
	remover('produto', id);
	
	var table = $("#tabelaListaProduto").DataTable();
	table.clear().draw();

	listar('produto');
}

function excluirCliente(id){
	remover('cliente', id);
	
	var table = $("#tabelaListaCliente").DataTable();
	table.clear().draw();
		
	listar('cliente');
}