import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SkillAssessmentList from '../components/SkillAssessmentList';


const StudentDetailPage = () => {
  const { t } = useTranslation();
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  if (!student) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div>
      <h1>{t('student.details')}</h1>
      <div>
        <h2>{student.firstName} {student.lastName}</h2>
        <p>{t('student.email')}: {student.email}</p>
        <p>{t('student.skillLevel')}: {t(`student.skillLevel.${student.skillLevel}`)}</p>
        {/* Add more student details as needed */}
      </div>
      <SkillAssessmentList studentId={studentId} />
    </div>
  );
};

export default StudentDetailPage;