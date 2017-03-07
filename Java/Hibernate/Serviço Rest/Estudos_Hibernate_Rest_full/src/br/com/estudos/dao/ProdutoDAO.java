package br.com.estudos.dao;

import java.util.List;

import br.com.estudos.entity.Produto;

public interface ProdutoDAO extends GenericDAO<Produto, Integer>{

	public List<Produto> listar();
	
}
