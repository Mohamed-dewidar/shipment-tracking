import { createContext, useState, useEffect } from 'react';

export const LocaleContext = createContext();

export default function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');

  let [layout, setLayout] = useState('');

  useEffect(() => {
    // headerLayout.current =
    //   locale === 'en' ? 'flex flex-row' : 'flex flex-row-revers';
    setLayout(locale === 'en' ? 'flex flex-row' : 'flex flex-row-reverse');
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, layout, setLayout }}>
      {children}
    </LocaleContext.Provider>
  );
}
