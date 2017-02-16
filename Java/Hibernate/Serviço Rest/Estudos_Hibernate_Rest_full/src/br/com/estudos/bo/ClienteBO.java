package br.com.estudos.bo;

import java.util.List;

import javax.persistence.EntityManager;

import br.com.estudos.dao.ClienteDAO;
import br.com.estudos.dao.impl.ClienteDAOImpl;
import br.com.estudos.entity.Cliente;
import br.com.estudos.singleton.EMFactorySingleton;

public class ClienteBO {

	EntityManager em;
	
	public ClienteBO(){
		em = EMFactorySingleton.getInstance().createEntityManager();
	}
	
	public List<Cliente> listarClientes(){
		ClienteDAO clienteDAO = new ClienteDAOImpl(em);
		
		return clienteDAO.listar();
	}
	
	public Cliente buscarCliente(int id) throws Exception{
		ClienteDAO clienteDAO = new ClienteDAOImpl(em);
		
		return clienteDAO.findById(id);
	}
	
	public void cadastrarCliente(Cliente cliente) throws Exception{
		ClienteDAO clienteDAO = new ClienteDAOImpl(em);
		
		clienteDAO.insert(cliente);
	}
	
	public void excluirCliente(int id) throws Exception{
		ClienteDAO clienteDAO = new ClienteDAOImpl(em);
		
		clienteDAO.delete(id);
	}
}
