angular.module('desafiofront',['ngCookies']).controller('mainController',['$scope','cities', 'weatherApi','$cookie',
function($scope, cities, weatherApi, $cookie){

  $scope.states = cities.estados;
  const vm = $scope;
  vm.showFirstWeather = showFirstWeather;
  vm.showWeather = showWeather;
  vm.getFavorite = getFavorite;
  vm.setFavorite = setFavorite;
  function onInit(){
     vm.showFirstWeather();
     vm.showWeather();
     vm.setFavorite();
     vm.getFavorite();
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
      console.log($scope.weatherInfo.previsoes);
    },
    function(err) {
        $scope.messageErr = "Não foi possível obter as informações de tempo para a cidade desejada."
    });
   }
   
   function setFavorite(){
    $cookie.put("state",$scope.state);
    $cookie.put("cityname", $scope.cityName);
   }

   function getFavorite(){
    $scope.state =$cookieStore.get("state");
    $scope.cityName =$cookie.get("cityname"); 
    $window.alert($cookie.get("state"));
   }

   function showFirstWeather() {
    $scope.state = $scope.states[23];
    $scope.cityName = "Blumenau";
   }
   
   
}]);
