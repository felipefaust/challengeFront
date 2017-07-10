angular.module('desafiofront').controller('mainController',['$scope','cities', 'weatherApi',function($scope, cities, weatherApi){
  $scope.go = function(){
    alert($scope.testebotao);
  }
  $scope.states = cities.estados;


   $scope.showWeather = function(){

     if(!$scope.state || !$scope.cityName) {
             $scope.messageErr = 'missingState';
             return;
      }

      weatherApi.consult()
         .then(function(result) {
           console.log(result);
         })

   }
}]);
