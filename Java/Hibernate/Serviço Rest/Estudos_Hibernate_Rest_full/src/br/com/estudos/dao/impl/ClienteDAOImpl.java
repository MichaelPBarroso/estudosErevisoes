package br.com.estudos.dao.impl;

import javax.persistence.EntityManager;

import br.com.estudos.dao.ClienteDAO;
import br.com.estudos.entity.Cliente;

public class ClienteDAOImpl extends GenericDAOImpl<Cliente, Integer> implements ClienteDAO{
	
	public ClienteDAOImpl(EntityManager entityManager){
		super(entityManager);
	}
}
