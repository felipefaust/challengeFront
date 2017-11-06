'use strict';
app.service('weatherApi', ['$http', function($http){

  this.consult = function(city, state) {
    return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city.toLowerCase()+',br&cnt=10&units=metric&APPID=78192eebc1863801146921a23b842ed2');
  //return  $http.get('http://api.openweathermap.org/data/2.5/daily?q='+city.toLowerCase()+',br&cnt=5&lang=pt&mode=json&units=metric&APPID=78192eebc1863801146921a23b842ed2', {cache: true});
  }
}]);
