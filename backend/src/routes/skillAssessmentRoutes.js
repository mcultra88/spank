const express = require('express');
const { body } = require('express-validator');
const skillAssessmentController = require('../controllers/skillAssessmentController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have this

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  [
    body('studentId').isMongoId(),
    body('skills.balance').isInt({ min: 1, max: 3 }),
    body('skills.turning').isInt({ min: 1, max: 3 }),
    body('skills.speed').isInt({ min: 1, max: 3 }),
    body('skills.technique').isInt({ min: 1, max: 3 }),
    body('notes').optional().isString().isLength({ max: 500 })
  ],
  skillAssessmentController.createSkillAssessment
);

router.get(
  '/student/:studentId',
  authMiddleware,
  skillAssessmentController.getStudentAssessments
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('skills.balance').isInt({ min: 1, max: 3 }),
    body('skills.turning').isInt({ min: 1, max: 3 }),
    body('skills.speed').isInt({ min: 1, max: 3 }),
    body('skills.technique').isInt({ min: 1, max: 3 }),
    body('notes').optional().isString().isLength({ max: 500 })
  ],
  skillAssessmentController.updateSkillAssessment
);

module.exports = router;