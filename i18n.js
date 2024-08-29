import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            dashboard: 'Dashboard',
            students: 'Students'
          },
          error: {
            fetchDashboard: 'Error loading dashboard. Please try again.',
            fetchStudents: 'Error fetching students. Please try again.'
          },
          dashboard: {
            title: 'Instructor Dashboard',
            stats: 'Quick Stats',
            totalStudents: 'Total Students',
            upcomingClasses: 'Upcoming Classes',
            averageAttendance: 'Average Attendance',
            recentStudents: 'Recent Students',
            viewAllStudents: 'View All Students'
          },
          student: {
            list: 'Student List'
          },
          common: {
            loading: 'Loading...'
          }
        }
      },
      sl: {
        translation: {
          nav: {
            dashboard: 'Nadzorna plošča',
            students: 'Študenti'
          },
          error: {
            fetchDashboard: 'Napaka pri nalaganju nadzorne plošče. Prosimo, poskusite znova.',
            fetchStudents: 'Napaka pri pridobivanju študentov. Prosimo, poskusite znova.'
          },
          dashboard: {
            title: 'Nadzorna plošča inštruktorja',
            stats: 'Hitre statistike',
            totalStudents: 'Skupno število študentov',
            upcomingClasses: 'Prihajajoči tečaji',
            averageAttendance: 'Povprečna udeležba',
            recentStudents: 'Nedavni študenti',
            viewAllStudents: 'Poglej vse študente'
          },
          student: {
            list: 'Seznam študentov'
          },
          common: {
            loading: 'Nalaganje...'
          }
        }
      }
    },
    lng: 'sl', // Set default language to Slovenian
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;