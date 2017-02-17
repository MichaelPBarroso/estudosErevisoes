package br.com.estudos.dao.impl;

import java.lang.reflect.ParameterizedType;

import javax.persistence.EntityManager;

import br.com.estudos.dao.GenericDAO;

public class GenericDAOImpl<T, K> implements GenericDAO<T, K>{

	protected EntityManager em;
	
	private Class<T> classe;
	
	@SuppressWarnings("unchecked")
	public GenericDAOImpl(EntityManager em){
		this.em = em;
		classe = (Class<T>)((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}
	
	@Override
	public void insert(T entity) throws Exception {
		try{
			em.getTransaction().begin();
			em.persist(entity);
			em.getTransaction().commit();
		}catch(Exception e){
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			
			throw new Exception("Ocorreu um erro ao inserir");
		}
	}

	@Override
	public void update(T entity) throws Exception {
		try{
			em.getTransaction().begin();
			em.merge(entity);
			em.getTransaction().commit();
		}catch(Exception e){
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			
			throw new Exception("Ocorreu um erro ao atualizar: " + e.getMessage());
		}
	}

	@Override
	public void delete(K id) throws Exception {
		T entity = findById(id);
		if(entity == null)
			throw new Exception("Ocorreu um erro ao deletar");
		
		try{
			em.getTransaction().begin();
			em.remove(entity);
			em.getTransaction().commit();
		}catch(Exception e){
			if(em.getTransaction().isActive())
				em.getTransaction().rollback();
			
			throw new Exception("Ocorreu um erro ao deletar");
		}
	}

	@Override
	public T findById(K id) throws Exception {
		return em.find(classe, id);
	}

}