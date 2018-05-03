'use strict';

angular.module('MineModelUseCase', ['ngStorage','ngRoute','angular-loading-bar'])
.config(['$routeProvider', '$httpProvider','$locationProvider', function ($routeProvider, $httpProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.
        when('/Dashboard', {
            templateUrl: 'partials/Dashboard.html',
            controller: 'DashboardController'
        }).
        otherwise({
            redirectTo: '/Dashboard'
        });
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    





}

])
.run(['$rootScope',function($rootScope){
$rootScope.showflag = false;
}
]);
