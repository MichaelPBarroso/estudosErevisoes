package br.com.estudos.dao;

/**
 * Interface Generic com o CRUD que será utilizada pela classe generica do Hibernate
 * 
 * @author Michael
 * 
 * @param <T> - Classe da Entidade
 * @param <K> - Classe do Tipo da chave primária
 */
public interface GenericDAO<T, K> {

	public void insert(T entity) throws Exception;
	public void update(T entity) throws Exception;
	public void delete(K id) throws Exception;
	public T findById(K id) throws Exception;
	
}
