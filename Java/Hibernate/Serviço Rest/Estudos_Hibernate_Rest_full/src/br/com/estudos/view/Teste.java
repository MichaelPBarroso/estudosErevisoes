package br.com.estudos.view;

import javax.persistence.EntityManager;

import br.com.estudos.dao.ClienteDAO;
import br.com.estudos.dao.impl.ClienteDAOImpl;
import br.com.estudos.entity.Cliente;
import br.com.estudos.singleton.EMFactorySingleton;

public class Teste {

	public static void main(String[] args) throws Exception {

		System.out.println("Iniciando...");
		
		EntityManager em = EMFactorySingleton.getInstance().createEntityManager();
		
		Cliente cliente1 = new Cliente("Michael", "334.334.345-34", null);
		Cliente cliente2 = new Cliente("Wilker", "566.656.345-34", null);
		Cliente cliente3 = new Cliente("Caique", "334.443.434-53", null);
		
		ClienteDAO clienteDAO = new ClienteDAOImpl(em);

		clienteDAO.insert(cliente1);
		clienteDAO.insert(cliente2);
		clienteDAO.insert(cliente3);
		
		System.out.println("Concluido.");
	}
}
