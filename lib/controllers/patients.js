'use strict';

var mongoose = require('mongoose'),
  Patient = mongoose.model('PatientModel');

/**
 * Find patient by id
 */
exports.patient = function(req, res, next, id) {
  Patient.load(id, function(err, patient) {
    if (err) return next(err);
    if (!patient) return next(new Error('Failed to load patient ' + id));
    req.patient = patient;
    next();
  });
};

/**
 * Create a patient
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
 * Update a patient
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
 * Delete a patient
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
 * Show a patient
 */
exports.show = function(req, res) {
  res.json(req.patient);
};

/**
 * List of patients
 */
exports.all = function(req, res) {
  Patient.find().sort('-created').populate('creator', 'username').exec(function(err, patients) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(patients);
    }
  });
};
