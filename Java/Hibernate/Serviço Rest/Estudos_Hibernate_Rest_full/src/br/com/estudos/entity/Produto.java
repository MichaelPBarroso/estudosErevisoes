package br.com.estudos.entity;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="TB_PRODUTO")
@SequenceGenerator(name="seqProdutoEstudos", sequenceName="SEQ_PRODUTO_ESTUDOS", allocationSize=1)
public class Produto {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seqProdutoEstudos")
	@Column(name="ID_PRODUTO")
	private int id;
	
	@Column(name="NM_PRODUTO", nullable=false)
	private String nome;
	
	@Column(name="DS_PRODUTO")
	private String descricao;
	
	@Column(name="VL_PRECO", nullable=false)
	private double preco;
	
	@Temporal(TemporalType.DATE)
	@Column(name="DT_ALTERACAO")
	private Calendar dataAlteracao = Calendar.getInstance();

	public Produto(){
	}
	
	public Produto(String nome, String descricao, double preco, Calendar dataAlteracao){
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.dataAlteracao = dataAlteracao;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	public Calendar getDataAlteracao() {
		return dataAlteracao;
	}

	public void setDataAlteracao(Calendar dataAlteracao) {
		this.dataAlteracao = dataAlteracao;
	}
}
