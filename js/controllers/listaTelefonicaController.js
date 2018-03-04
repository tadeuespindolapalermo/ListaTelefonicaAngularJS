angular.module("listaTelefonica").controller("listaTelefonicaController", function ($scope, $filter, $http) {

    $scope.titulo = "Lista Telefônica com AngularJS";

    $scope.contatos = [];

    $scope.operadoras = [];

    /*$scope.contatos = [
        {nome: $filter('uppercase')("Pedro"), telefone: "99865-9865", data: new Date(), cor: "blue", operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}},
        {nome: "Ana", telefone: "98654-3246", data: new Date(), cor: "yellow", operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}},
        {nome: "Maria", telefone: "98974-2298", data: new Date(), cor: "red", operadora: {nome: "Tim", codigo: 41, categoria: "Celular"}},
        {nome: "Tadeu", telefone: "98647-3913", data: new Date(), cor: "brown", operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}},
        {nome: "Yure", telefone: "98647-3913", data: new Date(), cor: "blue", operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}}
    ];*/

    /*$scope.operadoras = [
        {nome: "Oi", codigo: 14, categoria: "Celular", preco: 1},
        {nome: "Vivo", codigo: 15, categoria: "Celular", preco: 3},
        {nome: "Tim", codigo: 41, categoria: "Celular", preco: 2},
        {nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
        {nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 1}
    ];*/

    var carregarContatos = function() {
        $http.get("http://localhost:3412/contatos").then(function (response) {
            $scope.contatos = response.data;
        }).catch(function (response, status) {
            $scope.message = "Aconteceu um problema: " + response.data;
        });
    };

    var carregarOperadoras = function() {
        $http.get("http://localhost:3412/operadoras").then(function (response) {
            $scope.operadoras = response.data;
        });
    };

    $scope.adicionarContato = function (contato) {
        //$scope.contatos.push(angular.copy(contato));
        contato.data = new Date();
        contato.cor = "black";
        $http.post("http://localhost:3412/contatos", contato).then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };

    $scope.apagarContatos = function(contatos) {
        $scope.contatos = contatos.filter(function(contato) {
            if (!contato.selecionado) return contato;
        });
    };

    $scope.isContatoSelecionado = function(contatos) {
        return contatos.some(function(contato) {
            return contato.selecionado;
        });
    };

    $scope.ordenarPor = function(campo) {
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
    carregarContatos();
    carregarOperadoras();
});
