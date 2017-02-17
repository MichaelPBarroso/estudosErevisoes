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

import br.com.estudos.bo.ClienteBO;
import br.com.estudos.entity.Cliente;

@Path("/cadastro")
public class ClienteResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String buscarCliente(){
		ClienteBO bo = new ClienteBO();
		
		return new Gson().toJson(bo.listarClientes());
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String buscarClientePorId(@PathParam("id") int id){
		ClienteBO bo = new ClienteBO();
		Cliente cliente;
		
		try {
			cliente = bo.buscarCliente(id);
			
			return new Gson().toJson(cliente);
		} catch (Exception e) {
			return "Ocorreu um erro ao buscar";
		}
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response cadastrarCliente(String clienteJSON){
		Cliente cliente = new Gson().fromJson(clienteJSON, Cliente.class);

		ClienteBO bo = new ClienteBO();
		
		try{
			bo.cadastrarCliente(cliente);
			
			return Response.status(201).entity("Cliente cadastrado com sucesso!").build();
		}catch(Exception e){
			return Response.status(203).entity("Ocorreu um erro ao cadastrar: " + e.getMessage()).build(); 
		}
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response atualizarCliente(String clienteJSON){
		
		Cliente cliente = new Gson().fromJson(clienteJSON, Cliente.class);
		
		ClienteBO bo = new ClienteBO();
	
		try{
			bo.atualizarCliente(cliente);
		
			return Response.status(201).entity("Cliente atualizado com sucesso!").build();
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(203).entity("Ocorreu um erro ao atualizar: " + e.getMessage()).build();
		}
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response excluirCliente(@PathParam("id") int id){
		
		ClienteBO bo = new ClienteBO();
		
		try{
			bo.excluirCliente(id);
			return Response.status(200).entity("Cliente excluido com sucesso!").build();
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(401).entity("Não foi possivel excluir o cliente: " + e.getMessage()).build();
		}
	}
}
