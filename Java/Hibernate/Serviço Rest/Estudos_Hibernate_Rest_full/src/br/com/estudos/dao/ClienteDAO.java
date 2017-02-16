package br.com.estudos.dao;

import java.util.List;

import br.com.estudos.entity.Cliente;

public interface ClienteDAO extends GenericDAO<Cliente, Integer>{

	public List<Cliente> listar();
}
