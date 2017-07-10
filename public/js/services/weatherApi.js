'use strict';
app.service('weatherApi', ['$http', function($http){

  this.consult = function(city, state) {
    return  $http.get('http://api.openweathermap.org/data/2.5/weather?q=blumenau,br&mode=json&units=metric&APPID=78192eebc1863801146921a23b842ed2', {cache: true});
  }
}]);
