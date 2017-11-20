'use strict'
app.controller('mainController', [ '$scope', '$cookies', '$filter', 'cities', 'weatherApi',
function($scope, $cookies, $filter, cities, weatherApi){

  $scope.states = cities.estados;
  const vm = $scope;
  var stateDefault = $scope.states[23];
  var cityDefault = "Blumenau";
  vm.showWeather = showWeather;
  vm.getFavorite = getFavorite;
  vm.setFavorite = setFavorite;
  

  function onInit(){
     vm.getFavorite();
     vm.showWeather();
    }

   onInit();

   function showWeather(){
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
      //console.log($scope.weatherInfo.previsoes);
    },
    function(err) {
        $scope.messageErr = "Não foi possível obter as informações de tempo para a cidade desejada."
    });
   }
   
   function setFavorite(){
    $cookies.put("state",$scope.state.sigla);
    $cookies.put("cityname", $scope.cityName);
   }

   function getFavorite(){
    var state =  $filter('filter')($scope.states, {'sigla':$cookies.get("state")})[0];
    $scope.state = state || stateDefault;
    $scope.cityName = $cookies.get("cityname") || cityDefault;
   }

}]);
