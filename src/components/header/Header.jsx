import { useContext } from 'react';
import './header.css';
import { LocaleContext } from '../../context/LocaleContext';

export default function Header() {
  const { locale, setLocale, layout } = useContext(LocaleContext);

  function changeLocale() {
    setLocale(locale === 'en' ? 'ar' : 'en');
  }

  return (
    <>
      <div
        className={`h-20 container mx-auto [ ${layout} items-center justify-between ]  font-bold text-lg`}
      >
        <img
          src={
            locale === 'en' ? '/images/bosta-en.png' : '/images/bosta-ar.png'
          }
          width="150px"
          alt="bosta logo"
        />

        <ul className={`gap-x-12 ${layout}`}>
          <li>{locale === 'en' ? 'Main' : 'الرئيسيه'}</li>
          <li>{locale === 'en' ? 'Prices' : 'الاسعار'}</li>
          <li>{locale === 'en' ? 'Contact Us' : 'كلم المبيعات'}</li>
        </ul>

        <section className={`${layout} gap-x-12`}>
          <p className={`${layout}`}>
            <span>{locale === 'en' ? 'Track Shipment' : 'تتبع شحنتك'}</span>
            <span className="bg-gray-100 h-100 w-[2px] mx-5"></span>
            <span>{locale === 'en' ? 'Login' : 'تسجيل دخول'}</span>
          </p>
          <p className="cursor-pointer text-red-500" onClick={changeLocale}>
            {locale === 'en' ? 'عربى' : 'ENG'}
          </p>
        </section>
      </div>
      <div className="w-100 bg-gray-100 h-[1px]"></div>
    </>
  );
}
