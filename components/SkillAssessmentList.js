import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SkillAssessmentForm from './SkillAssessmentForm';

const SkillAssessmentList = ({ studentId }) => {
  const { t } = useTranslation();
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const fetchAssessments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/skill-assessments/student/${studentId}`);
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching skill assessments:', error);
      // Handle error (e.g., show error message to user)
    }
  }, [studentId]);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  const handleAssessmentSubmit = (newAssessment) => {
    if (selectedAssessment) {
      setAssessments(assessments.map(a => a._id === newAssessment._id ? newAssessment : a));
    } else {
      setAssessments([newAssessment, ...assessments]);
    }
    setSelectedAssessment(null);
  };

  return (
    <div>
      <h2>{t('skillAssessment.list')}</h2>
      <SkillAssessmentForm
        studentId={studentId}
        existingAssessment={selectedAssessment}
        onSubmit={handleAssessmentSubmit}
      />
      <ul>
        {assessments.map(assessment => (
          <li key={assessment._id}>
            <p>{new Date(assessment.date).toLocaleDateString()}</p>
            <ul>
              {Object.entries(assessment.skills).map(([skill, level]) => (
                <li key={skill}>
                  {t(`skillAssessment.skills.${skill}`)}: {t(`skillAssessment.level.${level}`)}
                </li>
              ))}
            </ul>
            <p>{assessment.notes}</p>
            <button onClick={() => setSelectedAssessment(assessment)}>
              {t('common.edit')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillAssessmentList;