'use strict';

angular.module('pea.controllers', []).
  controller('AppCtrl', function ($scope, persona, $rootScope, $http, $location) {
    $rootScope.isAuthenticated = false;

    if (localStorage.getItem('personaEmail')) {
      if (!$rootScope.email) {
        $http({
          url: '/login',
          method: 'GET'
        }).success(function (data) {

          $rootScope.isAuthenticated = true;
          $rootScope.email = data.email;
        }).error(function (data) {

          localStorage.removeItem('personaEmail')
          console.log('Login failed because ' + data);
        });
      }
    }

    $rootScope.login = function () {
      persona.login();
    };

    $rootScope.logout = function () {
      persona.logout();
    }
  }).
  controller('HomeCtrl', function ($scope, persona, $http) {
    console.log('home view');
  });
