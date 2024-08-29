import React from 'react';
import { useTranslation } from 'react-i18next';

const AttendancePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('attendance.title')}</h1>
      <p>{t('attendance.notImplemented')}</p>
    </div>
  );
};

export default AttendancePage;