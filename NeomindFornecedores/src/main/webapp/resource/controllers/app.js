//Declaração do módulo app
var app = angular.module('app', []);

//Configuração para a prevenção de rejeições
app.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

function alerta(msg, tipo) {
	if(tipo==1){
	    var HTML = '<div class="alert alert-success" role="alert">'+msg+'</div>'
	        document.getElementById("resultado").innerHTML = HTML;
	}else{
		var HTML = '<div class="alert alert-danger" role="alert">'+msg+'</div>'
        document.getElementById("resultado").innerHTML = HTML;
	} 
}

//Controller da tela de listagem
app.controller('FornecedorListar', ['$scope', 'FornecedorWebService',
    function($scope, FornecedorWebService) {
	
     $scope.cadastrar = false;
     
	//lista fornecedores Cadastrados
	 FornecedorWebService.getFornecedores()
	 	.then(function success(response) {
     	 $scope.fornecedores = response.data;
          	
         },
         function error(response) {
             $scope.message = '';
             alert("Erro");
         });	
	 
	 //realiza a exclusão do fornecedor d
	 $scope.deleteFornecedor = function(fornecedor) {
		 FornecedorWebService.deleteFornecedor(fornecedor.id)
             .then(function error(response) {
                     alerta("Erro ao remover fornecedor!", "danger");
                     console.log(response)
                 },
                 function success(response) {
                     alerta("Fornecedor removido!", 1);
                  	 setTimeout(function(){location.reload(); }, 2000); 
                     FornecedorService.getFornecedores()
                         .then(function success(response) {
                        	    alerta("Fornecedor removido com sucesso!", 1);  
                             },
                             function error(response) {
                                 alerta("Erro ao remover fornecedor!", 2);
                                 console.log(response)
                             });
                 });
     }
	 
	 $scope.UpdateFornecedorFormulario = function() {
		 
		 setTimeout(function() {
			    window.location.href = "http://www.devmedia.com.br";
			}, 1000);
			//Validação do preenchimento dos campos
		    if ($scope.fornecedor != null && $scope.fornecedor.id && $scope.fornecedor.name && $scope.fornecedor.email && $scope.fornecedor.cnpj) {
		        FornecedorWebService.updateFornecedor($scope.fornecedor.id, $scope.fornecedor.name, $scope.fornecedor.email, $scope.fornecedor.comment, $scope.fornecedor.cnpj)
		            .then(function error(response) {
		                 alerta("Erro ao atualizar fornecedor!", "danger");
		                },
		                function success(response) {
		                    alerta("Pessoa atualizado!", "success");
		                    //Função para atualizar a lista de fornecedores
		                    FornecedorWebService.getFornecedores()
		                        .then(function success(response) {
		                                $scope.fornecedores = response.data;
		                            },
		                            function error(response) {
		                                alerta("Erro ao pesquisar fornecedores!", "danger");
		                            });
		                });
		    } else {
		        alerta("Por favor insira os dados corretamente", "danger");
		    }
		}
	 
	}]);


//Controller da tela de cadatro 
app.controller('FornecedorCadastra', ['$scope', 'FornecedorWebService',
    function($scope, FornecedorWebService) {
        $scope.cadastrar = true;
        $scope.addFornecedor = function() {
        	//Validação de preenchimento dos campos $scope.fornecedor.name,$scope.fornecedor.$scope.fornecedor.$scope.fornecedor.email,$scope.fornecedor.cidade,$scope.fornecedor.estado,$scope.fornecedor.pais,$scope.fornecedor.cnpj
            if (($scope.fornecedor != null)&&($scope.fornecedor.name != null)&&($scope.fornecedor.email != null)&&($scope.fornecedor.cidade != null)&&($scope.fornecedor.estado != null)&&($scope.fornecedor.pais != null)&&($scope.fornecedor.cnpj != null)) {      
            	FornecedorWebService.addFornecedor($scope.fornecedor.name, $scope.fornecedor.email,$scope.fornecedor.cidade,$scope.fornecedor.estado,$scope.fornecedor.pais, $scope.fornecedor.cnpj)
                    .then(function error(response) {
                            alerta("Por favor insira os dados corretamente", "danger");
                     },
                     
                     function success(response) {
                           
                            FornecedorWebService.getFornecedores()
                                .then(function success(response) {
                                	alerta("Fornecedor adicionado!", 1);
                                	setTimeout(function(){location.reload(); }, 2000);
                                	
                                    },
                                    function error(response) {
                                        alerta("Erro ao Adicionar o fornecedor", 2);
                                    });
                        });
            } else {
                alerta("Por favor insira os dados corretamente", 2);
            }
        }


    }
]);









//Declaração do serviço que vai ser responsável pela comunicação REST
app.service('FornecedorWebService', ['$http', function($http) {
	//Operação de GET para recuperar informação de um fornecedor
    this.getFornecedor = function getFornecedor(id) {
        return $http({
            method: 'GET',
          //Rota criada no backend
            url: 'FornecedoreNeomind/listar/' + id
        });
    }
    
    //Operação de POST para adicionar um fornecedor
    this.addFornecedor = function addFornecedor(name,email,cidade,estado,pais,cnpj) {
    	console.log(name,email,cidade,estado,pais,cnpj)
        return $http({
            method: 'POST',
            //Rota criada no backend
            url: 'FornecedoreNeomind/cadastrar',
            data: {
            	cidade: cidade,
            	cnpj: cnpj,
            	email: email,
            	estado: estado,
                name: name,
                pais: pais     
            }
        });
    }

    //Operação para atualização do fornecedor
    this.updateFornecedor = function updateFornecedor(id, name, email, comment, cnpj) {
        return $http({
            method: 'PUT',
            //Rota criada no backend
            url: 'FornecedoreNeomind/alterar',
            data: {
                id: parseInt(id),
                name: name,
                email: email,
                comment: comment,
                cnpj: cnpj
            }
        });
    }
    
    //Operação para remoção do fornecedor
    this.deleteFornecedor = function deleteFornecedor(id) {
        return $http({
            method: 'DELETE',
            //Rota criada no backend
            url: 'FornecedoreNeomind/excluir/' + id
        })
    }
    
    this.getFornecedores = function getFornecedores() {
        return $http({
            method: 'GET',
            url: 'FornecedoreNeomind/listar'
        });
    }
}]);

//Função para aparecer o alerta de erro / sucesso


/**   $scope.getFornecedores = function() {
FornecedorWebService.getFornecedores()
    .then(function success(response) {
            $scope.fornecedores = response.data;
        },
        function error(response) {
        
            alerta("Erro ao pesquisar fornecedores!", "danger");
        });
} 

//Função não utilizada, porém é para capturar o fornecedor pelo ID
$scope.getFornecedor = function() {
//Recebe o ID do input do formulário
var id = $scope.fornecedor.id;
//Chama a função getFornecedor passando o ID como parâmetro
FornecedorWebService.getFornecedor($scope.fornecedor.id)
	//Se a operação for realizada com sucesso, seta o conteúdo do formulário com as informações capturadas
    .then(function success(response) {
            $scope.fornecedor = response.data;
            $scope.fornecedor.id = id;
        },
        function error(response) {
            $scope.message = '';
            if (response.status === 404) {
                alerta("Fornecedor não encontrado", "danger");
            } else {
                alerta("Erro ao pegar fornecedor!", "danger");
            }
        });
};**/ 

//Função para adicionar um fornecedor
/*    //Função para atualização do fornecedor
$scope.updateFornecedor = function() {
	//Validação do preenchimento dos campos
    if ($scope.fornecedor != null && $scope.fornecedor.id && $scope.fornecedor.name && $scope.fornecedor.email && $scope.fornecedor.cnpj) {
        FornecedorWebService.updateFornecedor($scope.fornecedor.id, $scope.fornecedor.name, $scope.fornecedor.email, $scope.fornecedor.comment, $scope.fornecedor.cnpj)
            .then(function error(response) {
                 alerta("Erro ao atualizar fornecedor!", "danger");
                },
                function success(response) {
                    alerta("Pessoa atualizado!", "success");
                    //Função para atualizar a lista de fornecedores
                    FornecedorWebService.getFornecedores()
                        .then(function success(response) {
                                $scope.fornecedores = response.data;
                            },
                            function error(response) {
                                alerta("Erro ao pesquisar fornecedores!", "danger");
                            });
                });
    } else {
        alerta("Por favor insira os dados corretamente", "danger");
    }
}

//Função específica para pegar os dados da tabela e inserir no formulário para futura edição
$scope.UpdateFornecedorFormulario = function(fornecedor) {
	//Manipulação dos botões
    $scope.atualizar = true;
    $scope.cadastrar = false;
    $scope.cancelAtu = true;
    $scope.fornecedor = fornecedor;
    $scope.fornecedor.id = fornecedor.id;
}

//Função para realizar o cancelamento da atualização do fornecedor
$scope.cancelarUpdate = function() {
	//Manipulação dos botões
    $scope.atualizar = false;
    $scope.cadastrar = true;
    $scope.cancelAtu = false;
    $scope.fornecedor = null;
    //Função para atualização da tabela
    FornecedorWebService.getFornecedores()
        .then(function success(response) {
                $scope.fornecedores = response.data;
            },
            function error(response) {
                alerta("Erro ao pesquisar fornecedores!", "danger");
            });
}

//Função responsável pela exclusão de um fornecedor
$scope.deleteFornecedor = function(fornecedor) {
    FornecedorWebService.deleteFornecedor(fornecedor.id)
        .then(function error(response) {
                alerta("Erro ao remover fornecedor!", "danger");
            },
            function success(response) {
                alerta("Fornecedor removido!", "success");
                FornecedorWebService.getFornecedores()
                    .then(function success(response) {
                            $scope.fornecedores = response.data;
                        },
                        function error(response) {
                            alerta("Erro ao pesquisar fornecedores!", "danger");
                        });
            });
}
*/