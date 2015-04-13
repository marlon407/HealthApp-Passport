'use strict';

var mongoose = require('mongoose'),
  Visit = mongoose.model('Visit');

/**
 * Find Visit by id
 */
exports.visitPatientId = function(req, res, next, id) {
  Visit.load(id, function(err, patient) {
    if (err) return next(err);
    //if (!patient) return next(new Error('Failed to load patient ' + id));
    req.patient = patient;
    next();
  });
};

/**
 * Create a Visit
 */
exports.create = function(req, res) {
  console.log(req.body);
  var patient = new Patient(req.body);
  patient.creator = req.user;

  patient.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(patient);
    }
  });
};

/**
 * Update a Visit
 */
exports.update = function(req, res) {
  var patient = req.patient;
  patient.FirstName = req.body.FirstName;
  patient.LastName = req.body.LastName;
  patient.PhoneNumber = req.body.PhoneNumber;
  patient.LastVisitDate = req.body.LastVisitDate;
  patient.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(patient);
    }
  });
};

/**
 * Delete a Visit
 */
exports.destroy = function(req, res) {
  var patient = req.patient;

  patient.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(patient);
    }
  });
};

/**
 * Show a Visit
 */
exports.show = function(req, res) {
  res.json(req.patient);
};

/**
 * List of Visit
 */
exports.all = function(req, res, PatientId) {
  Visit.find({Patient : ObjectId(PatientId)}).exec(function(err, visits){
    if (err) {
      res.json(500, err);
    } else {
      res.json(visits);
    }
  });
};
