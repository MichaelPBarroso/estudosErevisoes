package br.com.estudos.bo;

import java.util.List;

import javax.persistence.EntityManager;

import br.com.estudos.dao.ClienteDAO;
import br.com.estudos.dao.impl.ClienteDAOImpl;
import br.com.estudos.entity.Cliente;
import br.com.estudos.singleton.EMFactorySingleton;

public class ClienteBO {

	EntityManager em;
	ClienteDAO clienteDAO;
	
	public ClienteBO(){
		clienteDAO = new ClienteDAOImpl(EMFactorySingleton.getInstance().createEntityManager());
	}
	
	public List<Cliente> listarClientes(){		
		return clienteDAO.listar();
	}
	
	public Cliente buscarCliente(int id) throws Exception{
		return clienteDAO.findById(id);
	}
	
	public void cadastrarCliente(Cliente cliente) throws Exception{
		clienteDAO.insert(cliente);
	}
	
	public void atualizarCliente(Cliente cliente) throws Exception{
		clienteDAO.update(cliente);
	}
	
	public void excluirCliente(int id) throws Exception{
		clienteDAO.delete(id);
	}
}
