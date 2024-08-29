import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const SkillAssessmentForm = ({ studentId, existingAssessment, onSubmit }) => {
  const { t } = useTranslation();
  const [assessment, setAssessment] = useState(existingAssessment || {
    skills: { balance: 1, turning: 1, speed: 1, technique: 1 },
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('skills.')) {
      const skill = name.split('.')[1];
      setAssessment(prev => ({
        ...prev,
        skills: { ...prev.skills, [skill]: parseInt(value) }
      }));
    } else {
      setAssessment(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (existingAssessment) {
        response = await axios.put(`/api/skill-assessments/${existingAssessment._id}`, assessment);
      } else {
        response = await axios.post('/api/skill-assessments', { ...assessment, studentId });
      }
      onSubmit(response.data.assessment);
    } catch (error) {
      console.error('Error submitting skill assessment:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{existingAssessment ? t('skillAssessment.update') : t('skillAssessment.create')}</h2>
      {['balance', 'turning', 'speed', 'technique'].map(skill => (
        <div key={skill}>
          <label htmlFor={`skills.${skill}`}>{t(`skillAssessment.skills.${skill}`)}</label>
          <select
            id={`skills.${skill}`}
            name={`skills.${skill}`}
            value={assessment.skills[skill]}
            onChange={handleChange}
          >
            <option value={1}>{t('skillAssessment.level.beginner')}</option>
            <option value={2}>{t('skillAssessment.level.intermediate')}</option>
            <option value={3}>{t('skillAssessment.level.advanced')}</option>
          </select>
        </div>
      ))}
      <div>
        <label htmlFor="notes">{t('skillAssessment.notes')}</label>
        <textarea
          id="notes"
          name="notes"
          value={assessment.notes}
          onChange={handleChange}
          maxLength={500}
        />
      </div>
      <button type="submit">{existingAssessment ? t('common.update') : t('common.create')}</button>
    </form>
  );
};

export default SkillAssessmentForm;