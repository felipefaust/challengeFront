angular.module('desafiofront').controller('mainController',['$scope','cities', function($scope, cities){
  $scope.go = function(){
    alert($scope.testebotao);
  }
  $scope.states = cities.estados;
}]);
