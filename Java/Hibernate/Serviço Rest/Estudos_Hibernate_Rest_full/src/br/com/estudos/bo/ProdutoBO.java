package br.com.estudos.bo;

import java.util.List;

import javax.persistence.EntityManager;

import br.com.estudos.dao.ProdutoDAO;
import br.com.estudos.dao.impl.ProdutoDAOImpl;
import br.com.estudos.entity.Produto;
import br.com.estudos.singleton.EMFactorySingleton;

public class ProdutoBO {

	EntityManager em;
	ProdutoDAO produtoDAO;
	
	public ProdutoBO(){
		produtoDAO = new ProdutoDAOImpl(EMFactorySingleton.getInstance().createEntityManager());
	}
	
	public List<Produto> listarProdutos() throws Exception{
		return produtoDAO.listar();
	}
	
	public Produto buscarProduto(int id) throws Exception{
		return produtoDAO.findById(id);
	}
	
	public void cadastrarProduto(Produto produto) throws Exception{
		produtoDAO.insert(produto);
	}
	
	public void atualizarProduto(Produto produto) throws Exception{
		produtoDAO.update(produto);
	}
	
	public void excluirProduto(int id) throws Exception{
		produtoDAO.delete(id);
	}
}
