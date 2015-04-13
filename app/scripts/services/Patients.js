'use strict';

angular.module('angularPassportApp')
  .factory('Patients', function ($resource) {
    return $resource('api/patients/:patientId', {
      patientId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
  });
});