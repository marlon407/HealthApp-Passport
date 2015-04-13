'use strict';

angular.module('angularPassportApp')
  .factory('Visits', function ($resource) {
    return $resource('api/visits/:patientId', {
      patientId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
  });
});