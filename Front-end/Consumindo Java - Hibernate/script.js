$(Document).ready(function () {
	painel();
	mascaraCampo();
});

function mascaraCampo(){
	$("#cadastroCpf").mask("999.999.999-99");
	$("#alterarCpf").mask("999.999.999-99");
}

function painel() {
	$("#statusLista").css("display", "none");
	limparCamposBuscar();
	limparCamposCadastrar();
	limparCamposAlterar();
	limparCamposExcluir();
	
	$("#home").click(function () {
		$("#tituloPainel").html("HOME");
	});
	$("#listar").click(function () {
		$("#statusLista").css("display", "none");
		$("#tituloPainel").html("Lista de clientes cadastrados");
		buscarListaClientes();
	});
	$("#buscar").click(function () {
		$("#tituloPainel").html("Buscar cliente");
		limparCamposBuscar();
	});
	$("#cadastrar").click(function () {
		$("#tituloPainel").html("Cadastrar novo cliente");
		limparCamposCadastrar();
	});
	$("#alterar").click(function () {
		$("#tituloPainel").html("Alterar cliente cadastrado");
		limparCamposAlterar();
	});
	$("#deletar").click(function () {
		$("#tituloPainel").html("Excluir cliente cadastrado");
		limparCamposExcluir();
	});
	$(".buttonBuscar").click(function () {
		var tipo = $(this).attr("data-tipo");
		if (tipo == "buscar") {
			$("#statusBusca").css("display", "none");
			var id = $("#idBuscar").val();
			if (id != 0 && id != null && id != undefined) {
				popularTelaBuscar(id, buscarClienteId(id));
			}
			else {
				$("#statusBusca").html("Por favor digite um codigo valido!");
			}
		}
		else if (tipo == "alterar") {
			$("#statusAlterar").css("display", "none");
			var id = $("#idBuscarAlterar").val();
			if (id != 0 && id != null && id != undefined) {
				popularTelaAlterar(id, buscarClienteId(id));
			}
			else {
				$("#statusAlterar").html("Por favor digite um codigo valido!");
			}
		}
	});
	$("#submitCadastro").click(function () {
		if(validarPreencimentoCadastrar()){
			$("#statusCadastrar").css("display", "none");
			
			var dadosCadastro = new Object();
			dadosCadastro.nome = $("#cadastroNome").val();
			dadosCadastro.cpf = $("#cadastroCpf").val();
			var data = new Date($("#cadastroNascimento").val() + " 00:00:00");
			dadosCadastro.dataNascimento = montarDataRest(data);
			
			cadastrarCliente(dadosCadastro);
		}else{
			$("#statusCadastrar").removeAttr("class");
			$("#statusCadastrar").text("Por favor preencha todas as informações!");
			$("#statusCadastrar").css("display", "block");
			$("#statusCadastrar").addClass("alert alert-danger");
		}
	});
	$("#submitAlterar").click(function () {
		if(validarPreencimentoAlterar()){
			$("#statusAlterar").css("display", "none");
			
			var dadosAlterar = new Object();
			dadosAlterar.id = $("#alterarId").val();
			dadosAlterar.nome = $("#alterarNome").val();
			dadosAlterar.cpf = $("#alterarCpf").val();
			var data = new Date($("#alterarNascimento").val() + " 00:00:00");
			dadosAlterar.dataNascimento = montarDataRest(data);
			
			alterarCliente(dadosAlterar);
		}else{
			$("#statusAlterar").removeAttr("class");
			$("#statusAlterar").text("Por favor preencha todas as informações!");
			$("#statusAlterar").css("display", "block");
			$("#statusAlterar").addClass("alert alert-danger");
		}
	});
	$("#buttonExcluir").click(function () {
		$("#modalExcluir").modal();
		$("#codigoExcluir").text($("#idExcluir").val());
	});
	$("#excluirCancelar").click(function(){
		$("#statusExcluir").css("display", "none");
	});
	$("#excluirConfirmar").click(function () {
		excluirCliente($("#idExcluir").val());
	});
}

function eventosLista(){
	$(".listaInformacoes").click(function(){
		var id = $(this).attr("data-id");
		$("#buscar").trigger("click");
		$("#idBuscar").val(id);
		$("#buttonGuiaBuscar").trigger("click");
	});
	$(".listaAlterar").click(function(){
		var id = $(this).attr("data-id");
		$("#alterar").trigger("click");
		$("#idBuscarAlterar").val(id);
		$("#buttonGuiaAlterar").trigger("click");
	});
	$(".listaRemover").click(function(){
		var id = $(this).attr("data-id");
		//$("#deletar").trigger("click");
		$("#idExcluir").val(id);
		$("#buttonExcluir").trigger("click");
		
		$("#listar").trigger("click");
	});
}

function formatarDataInput(y, m, d) {
	if (m < 10) m = "0" + m;
	if (d < 10) d = "0" + d;
	return y + "-" + m + "-" + d;
}

function montarDataRest(data) {
	var d = new Object();
	d.year = data.getFullYear();
	d.month = data.getMonth() + 1;
	d.dayOfMonth = data.getDate();
	d.hourOfDay = data.getHours();
	d.minute = data.getMinutes();
	d.second = data.getSeconds();
	return d
}

function buscarListaClientes() {
	$.ajax({
		method	:	'GET',
		url		:	'http://localhost:7070/Estudos_Hibernate_Rest_full/cliente/cadastro',
		async	:	true
	}).done(function (json) {
		var tabela = "";
		var dataNascimento = "";
		$.each(json, function (c, comp) {
			dataNascimento = "";
			if (comp.dataNascimento != undefined) {
				dataNascimento = comp.dataNascimento.dayOfMonth + "/" + comp.dataNascimento.month + "/" + comp.dataNascimento.year;
			}
			tabela += '<tr><td>' + comp.id + '</td><td>' + comp.nome + '</td><td>' + comp.cpf + '</td><td>' + dataNascimento + '</td>'+
				'<td><a href="#"><span class="glyphicon glyphicon-plus listaInformacoes" data-id="' + comp.id + '"></span></a></td>' + 
				'<td><a href="#"><span class="glyphicon glyphicon-pencil listaAlterar" data-id="' + comp.id + '"></span></a></td>' + 
				'<td><a href="#"><span class="glyphicon glyphicon-trash listaRemover" data-id="' + comp.id + '"></span></a></td>' + 
				'</tr>';
		});
		
		$("#tableLista").html(tabela);
		
		eventosLista();
	}).fail(function (msg) {
		if(msg.status == 0){
			$("#statusLista").html("Não foi possivel buscar a lista de usuários!");	
		}else{
			$("#statusLista").html(msg);
		}
		
		$("#statusLista").css("display", "block");
		$("#statusLista").addClass("alert alert-danger");
	});
}

function buscarClienteId(id) {
	var cliente;
	$.ajax({
		method	:	'GET',
		url		:	'http://localhost:7070/Estudos_Hibernate_Rest_full/cliente/cadastro/' + id,
		async	:	false
	}).done(function (json) {
		cliente = json;
	}).fail(function (json, status) {
		cliente = status;
	});
	return cliente;
}

function popularTelaBuscar(id, json) {
	if (json == null) {
		$("#statusBusca").html("Não foi localizando nenhum cliente com o código " + id + "!");
		$("#tableBuscar").html("");
		$("#statusBusca").css("display", "block");
		$("#statusBusca").addClass("alert alert-danger");
	}
	else if (json == "error") {
		$("#statusBusca").html("Não foi localizando nenhum cliente!");
		$("#tableBuscar").html("");
		$("#statusBusca").css("display", "block");
		$("#statusBusca").addClass("alert alert-danger");
	}
	else {
		var dataNascimento = "";
		if (json.dataNascimento != undefined) {
			dataNascimento = json.dataNascimento.dayOfMonth + "/" + json.dataNascimento.month + "/" + json.dataNascimento.year;
		}

		$("#buscarNome").text(json.nome);
		$("#buscarCodigo").text(json.id);
		$("#buscarCpf").text(json.cpf);
		$("#buscarNascimento").text(dataNascimento);
	}
}

function cadastrarCliente(dados) {
	var dadosEnviar = JSON.stringify(dados);
	$.ajax({
		method		:	'POST',
		url			:	'http://localhost:7070/Estudos_Hibernate_Rest_full/cliente/cadastro',
		async		:	true,
		contentType	:	'application/json; charset=utf-8',
		data		:	dadosEnviar
	}).done(function (msg, status, resposta) {
		respostaAjax(resposta, "statusCadastrar");
	}).fail(function (msg, status, resposta) {
		respostaAjax(resposta, "statusCadastrar");
	})
}

function popularTelaAlterar(id, json) {
	if (json == null) {
		$("#statusAlterar").html("Não foi localizando nenhum cliente com o código " + id + "!");
		$("#statusAlterar").css("display", "block");
		$("#statusAlterar").addClass("alert alert-danger");
	}
	else if (json == "error") {
		$("#statusAlterar").html("Não foi localizando nenhum cliente!");
		$("#statusAlterar").css("display", "block");
		$("#statusAlterar").addClass("alert alert-danger");
	}
	else {
		$("#alterarId").val(json.id);
		$("#alterarNome").val(json.nome);
		$("#alterarCpf").val(json.cpf);
		var data = formatarDataInput(json.dataNascimento.year, json.dataNascimento.month, json.dataNascimento.dayOfMonth);
		$("#alterarNascimento").val(data);
		$("#formularioAlterar").css("display", "block");
	}
}

function alterarCliente(dados) {
	var dadosEnviar = JSON.stringify(dados);
	$.ajax({
		method		:	'PUT',
		url			:	'http://localhost:7070/Estudos_Hibernate_Rest_full/cliente/cadastro',
		async		:	true,
		contentType	:	'application/json; charset=utf-8',
		data		:	dadosEnviar
	}).done(function (msg, status, resposta) {
		respostaAjax(resposta, "statusAlterar");
	}).fail(function (msg, status, resposta) {
		respostaAjax(resposta, "statusAlterar");
	})
}

function excluirCliente(id) {
	$.ajax({
		method	:	'DELETE',
		url		:	'http://localhost:7070/Estudos_Hibernate_Rest_full/cliente/cadastro/' + id,
		async	:	false
	}).done(function (resposta) {
		respostaAjax(resposta, "statusExcluir");
	}).fail(function (resposta) {
		respostaAjax(resposta, "statusExcluir");
	});
	
	buscarListaClientes();
}

function respostaAjax(json, id){
	$("#" + id).removeAttr("class");
	$("#" + id).css("display", "block");
	
	if(json.status == 200 || json.status == 201){
		$("#" + id).addClass("alert alert-success");
		$("#" + id).text(json.responseText);
	}else{
		$("#" + id).addClass("alert alert-danger");
		$("#" + id).text(json.responseText);
	}
}

function limparCamposBuscar(){
	$("#idBuscar").val("");
	$("#statusBusca").css("display", "none");
	$("#buscarNome").text("");
	$("#buscarCodigo").text("");
	$("#buscarCpf").text("");
	$("#buscarNascimento").text("");
}

function limparCamposCadastrar(){
	$("#statusCadastrar").css("display", "none");
	$("#cadastroNome").val("");
	$("#cadastroCpf").val("");
	$("#cadastroNascimento").val("");
}

function limparCamposAlterar(){
	$("#formularioAlterar").css("display", "none");
	$("#statusAlterar").css("display", "none");
	$("#idBuscarAlterar").val("");
	$("#alterarId").val("");
	$("#alterarNome").val("");
	$("#alterarCpf").val("");
	$("#alterarNascimento").val("");
}

function limparCamposExcluir(){
	$("#statusExcluir").css("display", "none");
	$("#idExcluir").val("");
}

function validarPreencimentoCadastrar(){
	var preenchimento = false;
	
	if(verificaVazio($("#cadastroNome").val()) == true || 
	   verificaVazio($("#cadastroCpf").val()) == true || 
	   verificaVazio($("#cadastroNascimento").val()) == true){
		preenchimento = false;
	}else{
		preenchimento = true;
	}
	
	return preenchimento;
}

function validarPreencimentoAlterar(){
	var preenchimento = false;
	
	if(verificaVazio($("#alterarId").val()) == true || 
	   verificaVazio($("#alterarNome").val()) == true || 
	   verificaVazio($("#alterarCpf").val()) == true || 
	   verificaVazio($("#alterarNascimento").val()) == true){
		preenchimento = false;
	}else{
		preenchimento = true;
	}
	
	return preenchimento;
}

function verificaVazio(v){
	if(v == null || v == undefined || v == ""){
		return true;
	}else{
		return false;
	}
}