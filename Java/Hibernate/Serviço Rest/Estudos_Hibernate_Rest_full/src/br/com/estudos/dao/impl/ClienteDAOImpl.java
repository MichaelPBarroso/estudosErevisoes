package br.com.estudos.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import br.com.estudos.dao.ClienteDAO;
import br.com.estudos.entity.Cliente;

public class ClienteDAOImpl extends GenericDAOImpl<Cliente, Integer> implements ClienteDAO{
	
	public ClienteDAOImpl(EntityManager entityManager){
		super(entityManager);
	}
	
	public List<Cliente> listar(){
		TypedQuery<Cliente> query = em.createQuery("from Cliente", Cliente.class);
		
		return query.getResultList();
	}
}
