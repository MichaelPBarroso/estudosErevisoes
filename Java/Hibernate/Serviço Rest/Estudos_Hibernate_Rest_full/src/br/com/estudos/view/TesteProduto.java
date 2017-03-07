package br.com.estudos.view;

import java.util.Calendar;

import javax.persistence.EntityManager;

import br.com.estudos.dao.ProdutoDAO;
import br.com.estudos.dao.impl.ProdutoDAOImpl;
import br.com.estudos.entity.Produto;
import br.com.estudos.singleton.EMFactorySingleton;

public class TesteProduto {

	public static void main(String[] args) {
		System.out.println("Iniciando...");
		
		EntityManager em = EMFactorySingleton.getInstance().createEntityManager();
		
		ProdutoDAO dao = new ProdutoDAOImpl(em);
		
		System.out.println("Cadastrando...");
		
		Produto produto1 = new Produto("Pizza 1", "Pizza numero 1", 11.11, Calendar.getInstance());
		Produto produto2 = new Produto("Pizza 2", "Pizza numero 2", 22.22, Calendar.getInstance());
		Produto produto3 = new Produto("Pizza 3", "Pizza numero 3", 33.33, Calendar.getInstance());
		
		try{
			dao.insert(produto1);
			dao.insert(produto2);
			dao.insert(produto3);
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
	}
}
