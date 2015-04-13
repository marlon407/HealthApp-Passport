'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PatientSchema = new Schema({
  FirstName: {
    type: String,
    index: true,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  PhoneNumber:{
    type: String,
    required: true
  },
  LastVisitDate: Date,
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Pre hook.
 */

PatientSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

/**
 * Statics
 */
PatientSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator', 'username').exec(cb);
  }
};

/**
 * Methods
 */

PatientSchema.statics.findByLastName = function (LastName, callback) {
  return this.find({ LastName: LastName }, callback);
}

PatientSchema.methods.expressiveQuery = function (creator, date, callback) {
  return this.find('creator', creator).where('date').gte(date).run(callback);
}

/**
 * Plugins
 */

function slugGenerator (options){
  options = options || {};
  var key = options.key || 'FirstName';

  return function slugGenerator(schema){
    schema.path(key).set(function(v){
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
};

PatientSchema.plugin(slugGenerator());

/**
 * Define model.
 */

mongoose.model('PatientModel', PatientSchema);

