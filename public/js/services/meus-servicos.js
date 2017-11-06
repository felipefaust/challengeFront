angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function($resource) {

        return $resource('api.openweathermap.org/data/2.5/forecast/daily?id=:idCidade&cnt=10', null, {
            'update' : { 
                method: 'PUT'
            }
        });
    })