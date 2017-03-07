package br.com.estudos.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import br.com.estudos.dao.ProdutoDAO;
import br.com.estudos.entity.Produto;

public class ProdutoDAOImpl extends GenericDAOImpl<Produto, Integer> implements ProdutoDAO {

	public ProdutoDAOImpl(EntityManager entityManager) {
		super(entityManager);
	}

	public List<Produto> listar(){
		TypedQuery<Produto> query = em.createQuery("from Produto order by id", Produto.class);
		
		return query.getResultList();
	}
	
}
