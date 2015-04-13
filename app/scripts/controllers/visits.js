'use strict';

angular.module('angularPassportApp')
  .controller('VisitCtrl', function ($scope, Visits, $location, $routeParams, $rootScope) {

    $scope.loadPage = function(){
      $scope.visit = new Visits();
    }

    $scope.create = function() {
      debugger;
      var visit = new Visits({
        Complaint: $scope.visit.Complaint,
        Bililng: $scope.visit.Bililng,
        Patient: $routeParams.patientId
      });

      visit.$save(function(response) {
        $location.path("visit/" + $routeParams.patientId);
      });

      $scope.visit = new Visits();
    };

    $scope.createLink = function(){
      $location.path("visit/" + $routeParams.patientId + "/create");
    }

    $scope.find = function(patientId) {
      
    };

  });
