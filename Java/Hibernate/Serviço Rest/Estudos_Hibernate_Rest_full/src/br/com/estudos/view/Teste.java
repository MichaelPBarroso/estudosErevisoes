package br.com.estudos.view;

import javax.persistence.EntityManager;

import com.google.gson.Gson;

import br.com.estudos.dao.ClienteDAO;
import br.com.estudos.dao.impl.ClienteDAOImpl;
import br.com.estudos.entity.Cliente;
import br.com.estudos.singleton.EMFactorySingleton;

public class Teste {

	public static void main(String[] args) throws Exception {

		System.out.println("Iniciando...");
		
		EntityManager em = EMFactorySingleton.getInstance().createEntityManager();
		
		ClienteDAO clienteDAO = new ClienteDAOImpl(em);
		
//		System.out.println("Cadastrando...");
		
//		Cliente cliente1 = new Cliente("Michael", "334.334.345-34", null);
//		Cliente cliente2 = new Cliente("Wilker", "566.656.345-34", null);
//		Cliente cliente3 = new Cliente("Caique", "334.443.434-53", null);

//		clienteDAO.insert(cliente1);
//		clienteDAO.insert(cliente2);
//		clienteDAO.insert(cliente3);
		
		System.out.println("Buscando...");
		
		System.out.println(new Gson().toJson(clienteDAO.findById(1)));
		System.out.println(new Gson().toJson(clienteDAO.listar()));
		
		System.out.println("Atualizando...");
		
		Cliente cliente1 = new Cliente();
		cliente1.setNome("Wilker Ramalho");
		cliente1.setId(5);
		cliente1.setCpf("777.777.777-77");
		//cliente1.setDataNascimento("11-09-1123");
		
		clienteDAO.update(cliente1);
		
		System.out.println(new Gson().toJson(clienteDAO.listar()));
		
		System.out.println("Excluir...");
		
//		clienteDAO.delete(8);
		
//		System.out.println(new Gson().toJson(clienteDAO.listar()));
		
		System.out.println("Concluido.");
	}
}
