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
@Table(name="TB_CLIENTE")
@SequenceGenerator(name="seqClienteEstudos", sequenceName="SEQ_CLIENTE_ESTUDOS", allocationSize=1)
public class Cliente {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seqClienteEstudos")
	@Column(name="ID_CLIENTE")
	private int id;

	@Column(nullable=false, name="NM_CLIENTE")
	private String nome;
	
	@Column(nullable=false, name="NM_CPF", length=14)
	private String cpf;
	
	@Temporal(TemporalType.DATE)
	@Column(name="DT_NASCIMENTO")
	private Calendar dataNascimento;

	public Cliente(String nome, String cpf, Calendar dataNascimento){
		this.nome = nome;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
	}
	
	public Cliente(){
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Calendar getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Calendar dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	
	public String toString(){
		return this.nome;
	}
}
