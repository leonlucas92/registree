var app = angular.module("registree", ["ngAnimate", "ui.bootstrap"]);

app.controller("registreeController", function($scope){

    /**Lista de usuários */
    $scope.userList = [
        {name: "Teste",
        lastname: "Testencio",
        email: "teste@testmail.com",
        phone: "98888-9999",
        state: "SC",
        city: "Joinville",
        adress: "Rua Teste, 123",
        neighborhood: "Vila Teste"}
    ];

    /**usuário alvo */
    $scope.userForm = {};
    /**variável de controle de edição de usuário */
    $scope.isEdit = false;
    /**Mensagens */
    $scope.message = "";
    /**Informações do usuário selecionado */
    $scope.selectedUser = {};
    /**Índice do usuário selecionado */
    $scope.selectedIndex;
    /**Verificador do checkbox para manter dialog aberta para vários registros */
    $scope.keepOpen = false;

    $scope.submitted = false;

    /**função salvar com validação*/
    $scope.saveUser = function(isValid){
        console.log(isValid);
        $scope.submitted = true;
        if(isValid){
            if($scope.isEdit){
                $scope.userList[$scope.selectedIndex] = $scope.userForm;
                $scope.message = "Usuário alterado com sucesso!";
            }else{
                $scope.userList.push($scope.userForm);
                $scope.message = "Usuário criado com sucesso!";
            }
            
            $scope.userForm = {};
            $scope.isEdit = false;

            if(!$scope.keepOpen){
                $("#userModal").modal("hide");
            }
            
        }else{
            console.log("INVALIDO");
            console.log($scope.submitted);
            //console.log()
            //form.classList.add('was-validated');
        }
    };

    /**função selecionar usuário alvo */
    $scope.selectUser = function(user){
        $scope.keepOpen = false;
        $scope.title = "Editar";

        var userInfo = {};
        userInfo.name = user.name;
        userInfo.lastname = user.lastname;
        userInfo.email = user.email;
        userInfo.phone = user.phone;
        userInfo.state = user.state;
        userInfo.city = user.city;
        userInfo.adress = user.adress;
        userInfo.neighborhood = user.neighborhood;

        $scope.selectedIndex = $scope.userList.indexOf(user);

        $scope.isEdit = true;
        $scope.userForm = userInfo;
        //$scope.userForm = user;

        $scope.selectedUser = user;
    };

    
    /**função deletar usuário */
    $scope.deleteUser = function(){
        $scope.userList.splice($scope.userList.indexOf($scope.selectedUser), 1);
        $scope.message = "Usuário excluido com sucesso!";
    };

    /**função limpar usuário alvo selecionado */
    $scope.scopeClear = function(){
        $scope.userForm = {};
        $scope.isEdit = false;
        $scope.title = "Novo";
        $scope.keepOpen = false;
    };

    /**função limpar mensagem */
    $scope.clearMessage = function(){
        $scope.message = "";
    };
});