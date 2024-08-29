import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AddStudentForm from '../components/AddStudentForm';
import styles from './StudentList.module.css';

const StudentList = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(t('error.fetchStudents'));
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleStudentAdded = (newStudent) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  if (loading) return <div>{t('common.loading')}</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.studentList}>
      <h1>{t('student.list')}</h1>
      <AddStudentForm onStudentAdded={handleStudentAdded} />
      <ul className={styles.list}>
        {students.map((student) => (
          <li key={student._id} className={styles.listItem}>
            <Link to={`/students/${student._id}`} className={styles.link}>
              {student.firstName} {student.lastName}
            </Link>
            <span className={styles.skillLevel}>
              {t(`student.skillLevel.${student.skillLevel}`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;