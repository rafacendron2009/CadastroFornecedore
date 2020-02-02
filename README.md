# CadastroFornecedore

Este projeto foi desenvolvido para testar as capacidades de desenvolvimento utilizando REST

Começar a usar
Para inicializar o projeto é necessário importar para o Eclispe e realizar algumas configurações.
Alterar  arquivo "Persistence.xml" que fica em "src/main/java/META-INF", e alterar credenciais de conexão de banco de dados 

Funcionalidades do projeto FrontEnd
Cadastra, lista e remove fornecedor.

Funcionalidades do projeto Backend
Cadastra fornecedores
lista todos os fornecedores
lista fornecedores especifico
remove fornecedor.
atualiza cadastro fornecedor

Tecnologias utilizadas
Backend:
Framework utilizado para criação REST: Jersey Versão 2.29.1 
Framework para persistência dos dados: Hibernate Versão 5.4.10.Final 

Frontend:
Framework para MVC: AngularJS Versão 1.7.9 
Estilização das páginas: Bootstrap v3.4.1
Dependência bootstrap: Jquery Versão 3.4.


Rotas API
/listar - Listas todos  fornecedores 
/listar/id - Lista conforme identificador do fornecedor 
/cadastrar -  cadastrar um fornecedor 
/alterar -Altera cadastro de um fornecedor 
/excluir/id - exclui fornecedor de acordo com o identificador 
