package br.com.estudos.singleton;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EMFactorySingleton {
	
	private static EntityManagerFactory factory;
	
	private EMFactorySingleton(){};
	
	public static EntityManagerFactory getInstance(){
		if(factory == null){
			factory = Persistence.createEntityManagerFactory("CLIENTE_ORACLE");
		}
		
		return factory;
	}
}
