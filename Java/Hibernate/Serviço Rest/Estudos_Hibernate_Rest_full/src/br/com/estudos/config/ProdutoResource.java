package br.com.estudos.config;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import br.com.estudos.bo.ProdutoBO;
import br.com.estudos.entity.Produto;

@Path("/produto")
public class ProdutoResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String listarProdutos(){
		ProdutoBO bo = new ProdutoBO();
		
		try{
			return new Gson().toJson(bo.listarProdutos());
		}catch(Exception e){
			return "Ocorreu um erro ao listar os produtos: " + e.getMessage();
		}
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String buscarProdutoPorId(@PathParam("id") int id){
		ProdutoBO bo = new ProdutoBO();
		Produto produto;
		
		try{
			produto =bo.buscarProduto(id);
			
			return new Gson().toJson(produto);
		}catch(Exception e){
			return "Ocorreu um erro ao buscar: " + e.getMessage(); 
		}
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response cadastrarProduto(String produtoJSON){
		Produto produto = new Gson().fromJson(produtoJSON, Produto.class);
		ProdutoBO bo = new ProdutoBO();
		
		try{
			bo.cadastrarProduto(produto);
			
			return Response.status(201).entity("Produto cadastrado com sucesso!").build();
		}catch(Exception e){
			return Response.status(203).entity("Ocorreu um erro ao cadastrar: " + e.getMessage()).build();
		}
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response atualizarProduto(String produtoJSON){
		Produto produto = new Gson().fromJson(produtoJSON, Produto.class);
		ProdutoBO bo = new ProdutoBO();
		
		try{
			bo.atualizarProduto(produto);
			
			return Response.status(201).entity("Produto atualizado com sucesso!").build();
		}catch(Exception e){
			return Response.status(203).entity("Ocorreu um erro ao atualizar o produto: " + e.getMessage()).build();
		}
	}
	
	@DELETE
	@Path("/{id}")
	public Response excluirProduto(@PathParam("id") int id){
		ProdutoBO bo = new ProdutoBO();
		
		try{
			bo.excluirProduto(id);
			
			return Response.status(200).entity("Produto excluido com sucesso!").build();
		}catch(Exception e){
			return Response.status(401).entity("Ocorreu um erro ao excluir o produto: " + e.getMessage()).build();
		}
	}
}