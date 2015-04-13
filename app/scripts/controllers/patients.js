'use strict';

angular.module('angularPassportApp')
  .controller('PatientsCtrl', function ($scope, Patients, $location, $routeParams, $rootScope) {

    //Set patient for edit
    $scope.loadPage = function(){
      $scope.patient = new Patients();
      $scope.patient.LastVisitDate = ddmmyyyy(new Date(Date.now()))
    }

    //Load only the patients of a specific doc
    $scope.getPatientsByDocId = function(docId){
      var newList = [];
      Patients.query(function(patients) {
        for (var i = 0; i < patients.length; i++) {
          if(patients[i].creator._id == docId)
            newList.push(patients[i]);
        }
      });
      $scope.patients = newList;
    }

    //Get the patients by last name
    $scope.filter = function(text){
      Patients.query(function(patients) {
        $scope.patients = patients;
        if (text !="" && text != undefined){      
          var newList = [];
          for (var i in $scope.patients) {
            if ($scope.patients[i].LastName == text) {
              newList.push($scope.patients[i]);
            }
        }
        $scope.patients = newList;
      }
      });
    } 

    //Create new patient 
    $scope.create = function() {
      var patient = new Patients({
        FirstName: $scope.patient.FirstName,
        LastName: $scope.patient.LastName,
        LastVisitDate: $scope.patient.LastVisitDate,
        PhoneNumber: $scope.patient.PhoneNumber
      });

      patient.$save(function(response) {
        $location.path("patients/");
      });

      $scope.patient = new Patients();
    };

    //Remove a patient
    $scope.remove = function(patient) {
      patient.$remove();
      for (var i in $scope.patients) {
        if ($scope.patients[i] == patient) {
          $scope.patients.splice(i, 1);
        }
      }
      $location.path("patients/");
    };

    $scope.edit = function(patient){
      $location.path('patients/' + patient._id + '/edit');
    }

    //Load Visits of a patient
    $scope.visits = function(patient){
      $location.path('visit/' + patient._id);
    }

    $scope.update = function() {
      var patient = $scope.patient;
      patient.$update(function() {
        $location.path('patients/' + patient._id);
      });
    };

    //Find all patients
    $scope.find = function() {
      Patients.query(function(patients) {
        $scope.patients = patients;
      });
    };

    //Find a patient by ID
    $scope.findOne = function() {
      debugger;
      Patients.get({
        patientId: $routeParams.patientId
      }, function(patient) {
        var lastVDate = new Date(patient.LastVisitDate);
        var rightDate = ddmmyyyy(lastVDate)
        patient.LastVisitDate = rightDate;
        $scope.patient = patient;
      });
    };

  //show the date in a correct format
  var ddmmyyyy = function(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = (date.getDate()).toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' +  (dd[1]?dd:"0"+dd[0]); // padding
  };
  });
