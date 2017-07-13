angular.module('desafiofront').controller('mainController',['$scope','cities', 'weatherApi',function($scope, cities, weatherApi){
  $scope.states = cities.estados;

  $scope.showWeather = function(){
      $scope.weatherInfo = false;

     if(!$scope.state || !$scope.cityName) {
             $scope.messageErr = 'missingState';
             return;
      }

    weatherApi.consult($scope.cityName, $scope.state.sigla)
    .then(function(result) {
      var arr = [];
      result.data.list.forEach(function(weather){
        var dt = new Date(weather.dt * 1000);
        arr.push({
          data: dt,
          descricao: weather.weather[0].description,
          imagem: weather.weather[0].icon,
          temperatura_min: weather.temp.min,
          temperatura_max: weather.temp.max
        });
      });
      result.data.previsoes = arr;
      $scope.weatherInfo = result.data;
      console.log($scope.weatherInfo.previsoes);
    },
    function(err) {
        $scope.messageErr = "Não foi possível obter as informações de tempo para a cidade desejada."
    });



   }
}]);
