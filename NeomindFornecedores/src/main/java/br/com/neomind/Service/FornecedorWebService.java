package br.com.neomind.Service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.neomind.EM.EntidadeManager;
import br.com.neomind.Model.Fornecedor;

@Path("/")
public class FornecedorWebService {
	
		private EntidadeManager JPAEM = new EntidadeManager();
		private EntityManager objeto = JPAEM.getEntityManager();
		
        //metodo para pegar valores do banco de dados e retornar para o usuario do service
	    @GET
	    @Path("/listar")
	    @Produces(MediaType.APPLICATION_JSON)//informa o retorno para o usuario 
	    public List<Fornecedor> listarFornecedores() {    	
			try {
				Query query = objeto.createQuery("select f from Fornecedor f", Fornecedor.class);
				@SuppressWarnings("unchecked")
				List<Fornecedor> fornecedores = query.getResultList();
				objeto.close();
				return fornecedores;
			} catch (Exception e) {
				throw new WebApplicationException(500);
			}
	    }
	   
	    //retorna fornecedor conforme id
	    @GET
	    @Path("/listar/{id}")
	    @Produces(MediaType.APPLICATION_JSON)
	    public Fornecedor buscar(@PathParam("id") int id) {
	    	try {
	    		Fornecedor fornecedor = objeto.find(Fornecedor.class, id);
	    		objeto.close();
	    		return fornecedor;
			} catch (Exception e) {
	    		throw new WebApplicationException(500);
			}
	    }
	    
	    //Rota respons�vel por cadastrar o fornecedor
	    @POST
	    @Path("/cadastrar")
	    @Consumes(MediaType.APPLICATION_JSON)
	    public Response cadastrar(Fornecedor objFornecedor) {
	    	try {
	    		objeto.getTransaction().begin();
	    		objeto.persist(objFornecedor);
	    		objeto.getTransaction().commit();
	    		objeto.close();
	    		return Response.status(Response.Status.OK).entity("Fornecedor cadastrado").build();
	    	} catch (Exception e) {
	    		throw new WebApplicationException(500);
	    	}
	    }
	    
	    //Rota respons�vel por atualizar o fornecedor
	    @PUT
	    @Path("/alterar")
	    @Consumes(MediaType.APPLICATION_JSON)
	    public Response alterar(Fornecedor objFornecedor) {
	    	try {
	    		objeto.getTransaction().begin();
	    		objeto.merge(objFornecedor);
	    		objeto.getTransaction().commit();
	    		objeto.close();
	    		return Response.status(Response.Status.OK).entity("Fornecedor alterado").build();
	    	} catch (Exception e) {
	    		throw new WebApplicationException(500);
	    	}
	    }
	    
	    //Rota respons�vel pela exclus�o do fornecedor
	    @DELETE
	    @Path("/excluir/{id}")
	    public Response excluir(@PathParam("id") int id) {
	    	try {
	    		Fornecedor objFornecedor = objeto.find(Fornecedor.class, id);	
	    		objeto.getTransaction().begin();
	    		objeto.remove(objFornecedor);
	    		objeto.getTransaction().commit();
	    		objeto.close();
	    		return Response.status(Response.Status.OK).entity("Fornecedor removido").build();
	    	} catch (Exception e) {
	    		throw new WebApplicationException(500);
	    	}
	    }
	}