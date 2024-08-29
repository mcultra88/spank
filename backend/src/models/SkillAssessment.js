const mongoose = require('mongoose');

const skillAssessmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  assessedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  skills: {
    balance: {
      type: Number,
      min: 1,
      max: 3,
      required: true
    },
    turning: {
      type: Number,
      min: 1,
      max: 3,
      required: true
    },
    speed: {
      type: Number,
      min: 1,
      max: 3,
      required: true
    },
    technique: {
      type: Number,
      min: 1,
      max: 3,
      required: true
    }
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

const SkillAssessment = mongoose.model('SkillAssessment', skillAssessmentSchema);

module.exports = SkillAssessment;