import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'ru' as const, label: 'RU' },
];

function baseLang(code: string | undefined) {
  return (code ?? 'en').split('-')[0];
}

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const active = baseLang(i18n.language);

  function switchTo(code: (typeof languages)[number]['code']) {
    if (code === active) return;
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  }

  return (
    <div className={styles.languageSwitcher} role="group" aria-label={t('common.languageGroup')}>
      <div className={styles.langTrack} data-active={active === 'ru' ? 'ru' : 'en'}>
        <div className={styles.langSlider} aria-hidden />
        {languages.map((lang) => {
          const isActive = active === lang.code;

          return (
            <button
              key={lang.code}
              type="button"
              className={`${styles.langOption}${isActive ? ` ${styles.langOptionActive}` : ''}`}
              onClick={() => switchTo(lang.code)}
              aria-pressed={isActive}
              aria-label={lang.code === 'en' ? t('common.langEnglish') : t('common.langRussian')}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
