# Cadastro Fornecedores

Este projeto foi desenvolvido para testar as capacidades de desenvolvimento utilizando REST <br/>

# Começar a usar <br/>
Para inicializar o projeto é necessário importar para o Eclispe e realizar algumas configurações. <br/>
Alterar  arquivo "Persistence.xml" que fica em "src/main/java/META-INF", e alterar credenciais de conexão de banco de dados  <br/>

# Funcionalidades do projeto FrontEnd <br/>
Cadastra, lista e remove fornecedor.

# Funcionalidades do projeto Backend <br/>
Cadastra fornecedores <br/>
lista todos os fornecedores <br/>
lista fornecedores especifico <br/>
remove fornecedor. <br/>
atualiza cadastro fornecedor <br/>

# Tecnologias utilizadas <br/> 
Backend: <br/>
Framework utilizado para criação REST: Jersey Versão 2.29.1  <br/>
Framework para persistência dos dados: Hibernate Versão 5.4.10.Final 
 <br/>
Frontend: <br/>
Framework para MVC: AngularJS Versão 1.7.9  <br/>
Estilização das páginas: Bootstrap v3.4.1 <br/>
Dependência bootstrap: Jquery Versão 3.4. <br/>


# Rotas API
/listar - Listas todos  fornecedores  <br/>
/listar/id - Lista conforme identificador do fornecedor  <br/>
/cadastrar -  cadastrar um fornecedor  <br/>
/alterar -Altera cadastro de um fornecedor  <br/>
/excluir/id - exclui fornecedor de acordo com o identificador  <br/>
