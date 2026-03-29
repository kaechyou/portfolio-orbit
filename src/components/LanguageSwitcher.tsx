import { useTranslation } from 'react-i18next';

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
    <div className="language-switcher" role="group" aria-label={t('common.languageGroup')}>
      <div className="lang-track" data-active={active === 'ru' ? 'ru' : 'en'}>
        <div className="lang-slider" aria-hidden />
        {languages.map((lang) => {
          const isActive = active === lang.code;

          return (
            <button
              key={lang.code}
              type="button"
              className={`lang-option${isActive ? ' lang-option--active' : ''}`}
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
