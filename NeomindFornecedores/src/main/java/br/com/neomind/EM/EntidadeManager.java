package br.com.neomind.EM;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntidadeManager {
	
	private EntityManagerFactory factory = Persistence.createEntityManagerFactory("fornecedores");
	private EntityManager retorno = factory.createEntityManager();
	
	public EntityManager getEntityManager(){
		return retorno;
	}
	
}
