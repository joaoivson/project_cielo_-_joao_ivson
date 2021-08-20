var App = angular.module("App", ["ngRoute"]);
App.config(function ($routeProvider) {
  $routeProvider.when("/home", {
    templateUrl: "app/pages/home/home.html",
    controller: "HomeCtrl",
  });

  $routeProvider.when("/transacoes", {
    templateUrl: "app/pages/transacoes/transacoes.html",
    controller: "transacoesCtrl",
  });

  $routeProvider.otherwise({ redirectTo: "/home" });
});


/* Controllers */

App.controller("transacoesCtrl", function ($scope, $http) {
  let transacoes = "http://localhost:3001/items";

  $scope.titulomodulo = "Consulta de Transações";

  /* Carregar Lista de transacoess */
  $scope.carregartransacoess = $http.get(transacoes).then(
    function successCallback(response) {
      $scope.listatransacoes = response.data;
    },
    function errorCallback(response) {
      alert("Não existem dados cadastrados " + response);
      console.log(response);
    }
  );

  $scope.transacoes = {};

  $scope.classe = "selecionado";
  $scope.classe1 = "selecionado";
  $scope.classe2 = "negrito";

  $scope.ordenarPor = function (campo) {
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };

  /* Marca transacao selecionados */
  $scope.istransacoesSelecionado = function (listatransacoes) {
    return listatransacoes.some(function (transacoes) {
      return transacoes.selecionado;
    });
  };

  $scope.detalhesTransacoes = function (listatransacoes) {
    $scope.detalhes = true;
    $scope.dadosTransacao = listatransacoes;
  };

  $scope.showTransacoes = function () {
    $scope.detalhes = false;
    transacoes.selecionado = undefined;
  };
});
