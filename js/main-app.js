var app = angular.module("registree", ["ngAnimate", "ui.bootstrap"]);

app.controller("registreeController", function($scope, $timeout){

    /**Lista de usuários */
    $scope.userList = [
        {name: "Teste",
        lastname: "Testencio",
        email: "teste@testmail.com",
        phone: "(47) 98888-9999",
        state: 24,
        city: "Joinville",
        adress: "Rua Teste, 123",
        neighborhood: "Vila Teste"}
    ]; 

    /**Lista de estados */
    $scope.stateList = [
        {stateId:  1, stateName: "AC"},
        {stateId:  2, stateName: "AL"},
        {stateId:  3, stateName: "AP"},
        {stateId:  4, stateName: "AM"},
        {stateId:  5, stateName: "BA"},
        {stateId:  6, stateName: "CE"},
        {stateId:  7, stateName: "DF"},
        {stateId:  8, stateName: "ES"},
        {stateId:  9, stateName: "GO"},
        {stateId: 10, stateName: "MA"},
        {stateId: 11, stateName: "MS"},
        {stateId: 12, stateName: "MT"},
        {stateId: 13, stateName: "MG"},
        {stateId: 14, stateName: "PA"},
        {stateId: 15, stateName: "PB"},
        {stateId: 16, stateName: "PR"},
        {stateId: 17, stateName: "PE"},
        {stateId: 18, stateName: "PI"},
        {stateId: 19, stateName: "RJ"},
        {stateId: 20, stateName: "RN"},
        {stateId: 21, stateName: "RS"},
        {stateId: 22, stateName: "RO"},
        {stateId: 23, stateName: "RR"},
        {stateId: 24, stateName: "SC"},
        {stateId: 25, stateName: "SP"},
        {stateId: 26, stateName: "SE"},
        {stateId: 27, stateName: "TO"}
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
    /**Variável de controle do submit do form */
    $scope.submitted = false;

    /**função salvar com validação*/
    $scope.saveUser = function(isValid){
        $scope.submitted = true;
        if(isValid){
            if($scope.isEdit){
                $scope.userList[$scope.selectedIndex] = $scope.userForm;
                $scope.message = "Usuário alterado com sucesso!";
                $scope.clearMessage();
            }else{
                $scope.userList.push($scope.userForm);
                $scope.message = "Usuário criado com sucesso!";
                $scope.clearMessage();
                $scope.userListSize();
            }
            $scope.userForm = {};
            $scope.isEdit = false;

            if(!$scope.keepOpen){
                $("#userModal").modal("hide");
            }
        }
    };

    /**função selecionar usuário alvo */
    $scope.selectUser = function(user){
        $scope.keepOpen = false;
        $scope.title = "Editar";

        var userInfo = {};

        let inputNames = Object.keys(user).filter(key => key.indexOf('$') !== 0);
        for(let input of inputNames){
            userInfo[input] = user[input];
        }

        $scope.selectedIndex = $scope.userList.indexOf(user);

        $scope.isEdit = true;
        $scope.userForm = userInfo;

        $scope.selectedUser = user;
    };
    
    /**função deletar usuário */
    $scope.deleteUser = function(){
        $scope.userList.splice($scope.userList.indexOf($scope.selectedUser), 1);
        $scope.message = "Usuário excluido com sucesso!";
        $scope.clearMessage();

        $scope.userListSize();
    };

    /**função limpar form */
    $scope.formClear = function(form){
        $scope.userForm = {};
        $scope.isEdit = false;
        $scope.title = "Novo";
        $scope.keepOpen = false;
        $scope.submitted = false;
        form.$setPristine();
        form.$setUntouched();
    };

    /**função limpar mensagem */
    $scope.clearMessage = function(){
        $scope.isVisible = true;
        $timeout.cancel(time);

        var time = $timeout(function() {
            $scope.isVisible = "";
            //$scope.message = "";
        }, 3000);
    };

    /**Função que verifica se a tabela possui registro */
    $scope.userListSize = function(){
        $scope.empty = $scope.userList.length == 0;
    }
});