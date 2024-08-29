const SkillAssessment = require('../models/SkillAssessment');
const Student = require('../models/Student');
const { validationResult } = require('express-validator');

exports.createSkillAssessment = async (req, res) => {
  const { t } = req; // for translations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { studentId, skills, notes } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: t('student.notFound') });
    }

    const newAssessment = new SkillAssessment({
      student: studentId,
      assessedBy: req.user.id, // Assuming we have authentication middleware
      skills,
      notes
    });

    await newAssessment.save();

    res.status(201).json({ 
      message: t('skillAssessment.created'),
      assessment: newAssessment 
    });
  } catch (error) {
    console.error('Error creating skill assessment:', error);
    res.status(500).json({ message: t('error.internalServer') });
  }
};

exports.getStudentAssessments = async (req, res) => {
  const { t } = req;
  try {
    const { studentId } = req.params;
    const assessments = await SkillAssessment.find({ student: studentId })
      .sort({ date: -1 })
      .populate('assessedBy', 'firstName lastName');

    res.json(assessments);
  } catch (error) {
    console.error('Error fetching student assessments:', error);
    res.status(500).json({ message: t('error.internalServer') });
  }
};

exports.updateSkillAssessment = async (req, res) => {
  const { t } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { skills, notes } = req.body;

    const assessment = await SkillAssessment.findById(id);
    if (!assessment) {
      return res.status(404).json({ message: t('skillAssessment.notFound') });
    }

    assessment.skills = skills;
    assessment.notes = notes;

    await assessment.save();

    res.json({ 
      message: t('skillAssessment.updated'),
      assessment 
    });
  } catch (error) {
    console.error('Error updating skill assessment:', error);
    res.status(500).json({ message: t('error.internalServer') });
  }
};