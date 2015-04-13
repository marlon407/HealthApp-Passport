'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VisiSchema = new Schema({
  
  Complaint: {
    type: String,
    index: true,
    required: true
  },
  Bililng: {
    type: Number,
    required: true
  },
  Patient: {
    type: Schema.ObjectId,
    ref: 'Patient'
  }
});

VisiSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator', 'username').exec(cb);
  }
};

mongoose.model('Visit', VisiSchema);