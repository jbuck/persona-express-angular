'use strict';

angular.module('pea.factories', []).
  factory('persona', function ($rootScope, $http) {
    var login = function () {
      navigator.id.get(function (assertion) {
        if (!assertion) {
          console.log('No assertion provided');
          return;
        }

        $http({
          url: '/persona/verify',
          method: 'POST',
          data: { assertion: assertion }
        }).success(function (data) {

          if (data.status === 'okay') {
            localStorage.setItem('personaEmail', data.email);
            $rootScope.isAuthenticated = true;

            $http({
              url: '/login',
              method: 'GET'
            }).success(function (data) {

              $rootScope.email = data.email;
            }).error(function (data) {

              console.log('Login failed because ' + data);
            });
          } else {
            console.log('Login failed because ' + data.reason);
          }
        }).error(function (data) {

          console.log('error logging in: ', data);
        });
      });
    };

    var logout = function () {
      $http({
        url: '/persona/logout',
        method: 'POST'
      }).success(function (data) {

        if (data.status === 'okay') {
          localStorage.removeItem('personaEmail');
          $rootScope.isAuthenticated = false;
          document.location.href = '/logout';
        } else {
          console.log('Logout failed because ' + data.reason);
        }
      }).error(function (data) {

        console.log('error logging out: ', data);
      })
    };

    return {
      login: login,
      logout: logout
    };
  });
