'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);


  // Patients Routes
  var patients = require('../controllers/patients');
  app.get('/api/patients', patients.all);
  app.post('/api/patients', auth.ensureAuthenticated, patients.create);
  app.get('/api/patients/:patientId', patients.show);
  app.put('/api/patients/:patientId', auth.ensureAuthenticated, auth.patient.hasAuthorization, patients.update);
  app.del('/api/patients/:patientId', auth.ensureAuthenticated, auth.patient.hasAuthorization, patients.destroy);

  //Setting up the patientId param
  app.param('patientId', patients.patient);

  // Visits Routes
  var visits = require('../controllers/Visits');
  app.post('/api/visit', auth.ensureAuthenticated, visits.create);
  app.get('/api/visit/:patientId', visits.all);

  //Setting up the patientId param
  //app.param('patientId', visits.visitPatientId);

  // Angular Routes
  app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }

    res.render('index.html');
  });

}