'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {
    $scope.menu = [{
      "title": "Patients",
      "link": "patients"
    }];

    $scope.authMenu = [{
      "title": "Create New Patient",
      "link": "patients/create"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
