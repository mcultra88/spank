import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalStudents: 0,
    upcomingClasses: 0,
    averageAttendance: 0,
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      // For now, let's simulate API calls with setTimeout
      setTimeout(() => {
        setStats({
          totalStudents: 10,
          upcomingClasses: 5,
          averageAttendance: 85,
        });
        setRecentStudents([
          { _id: '1', firstName: 'John', lastName: 'Doe' },
          { _id: '2', firstName: 'Jane', lastName: 'Smith' },
        ]);
        setLoading(false);
      }, 1000);

      // Uncomment these lines when your backend is ready
      // const [statsResponse, studentsResponse] = await Promise.all([
      //   axios.get('/api/instructor/stats'),
      //   axios.get('/api/instructor/recent-students')
      // ]);
      // setStats(statsResponse.data);
      // setRecentStudents(studentsResponse.data);
      // setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(t('error.fetchDashboard'));
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return <div>{t('common.loading')}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      
      <section>
        <h2>{t('dashboard.stats')}</h2>
        <div>
          <p>{t('dashboard.totalStudents')}: {stats.totalStudents}</p>
          <p>{t('dashboard.upcomingClasses')}: {stats.upcomingClasses}</p>
          <p>{t('dashboard.averageAttendance')}: {stats.averageAttendance}%</p>
        </div>
      </section>

            <section>
        <h2>{t('dashboard.recentStudents')}</h2>
        <ul>
            {recentStudents.map((student) => (
            <li key={student._id}>
                <Link to={`/students/${student._id}`}>
                {student.firstName} {student.lastName}
                </Link>
            </li>
            ))}
        </ul>
        <Link to="/students">{t('dashboard.viewAllStudents')}</Link>
        </section>
    </div>
  );
};

export default Dashboard;