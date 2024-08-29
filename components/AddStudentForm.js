import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import styles from './AddStudentForm.module.css';

const AddStudentForm = ({ onStudentAdded }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    skillLevel: 'beginner'
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/students', formData);
      onStudentAdded(response.data);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        skillLevel: 'beginner'
      });
      setError(null);
    } catch (err) {
      console.error('Error adding student:', err);
      setError(t('error.addStudent'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{t('student.add')}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="firstName">{t('student.firstName')}</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName">{t('student.lastName')}</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">{t('student.email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="skillLevel">{t('student.skillLevel')}</label>
        <select
          id="skillLevel"
          name="skillLevel"
          value={formData.skillLevel}
          onChange={handleChange}
          required
        >
          <option value="beginner">{t('student.skillLevel.beginner')}</option>
          <option value="intermediate">{t('student.skillLevel.intermediate')}</option>
          <option value="advanced">{t('student.skillLevel.advanced')}</option>
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>{t('common.add')}</button>
    </form>
  );
};

export default AddStudentForm;