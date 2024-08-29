import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../App.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('sl')}>Slovenščina</button>
    </div>
  );
};

export default LanguageSwitcher;