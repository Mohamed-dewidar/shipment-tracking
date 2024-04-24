import { useContext, useState } from 'react';
import './header.css';
import { LocaleContext } from '../../context/LocaleContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { locale, setLocale, layout } = useContext(LocaleContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const navigate = useNavigate();

  function changeLocale() {
    setLocale(locale === 'en' ? 'ar' : 'en');
  }

  function toggleSideMenu() {
    setOpenSideMenu(!openSideMenu);
  }

  function goHome() {
    navigate('/');
  }

  return (
    <>
      <div className="hidden md:block">
        <div
          className={`h-20 container mx-auto [ ${layout} items-center justify-between ]  font-bold text-lg`}
        >
          <img
            src={
              locale === 'en' ? '/images/bosta-en.png' : '/images/bosta-ar.png'
            }
            width="150px"
            alt="bosta logo"
            className="object-cover"
            onClick={goHome}
          />

          <ul className={`gap-x-12 ${layout}`}>
            <li onClick={goHome}>{locale === 'en' ? 'Main' : 'الرئيسيه'}</li>
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
      </div>

      <div
        className={`side-menu md:hidden fixed top-10 border border-gray-100 w-[140px] h-[400px] p-5 rounded-r-xl bg-white z-50 shadow-md [ flex flex-col justify-between items-center] ${
          openSideMenu ? 'side-menu-open' : 'side-menu-close'
        }`}
      >
        <img
          src={
            locale === 'en' ? '/images/bosta-en.png' : '/images/bosta-ar.png'
          }
          width="70px"
          alt="bosta logo"
          className="mx-auto object-cover"
          onClick={goHome}
        />

        <p className="flex flex-col gap-y-6 font-bold">
          <span onClick={goHome}>{locale === 'en' ? 'Main' : 'الرئيسيه'}</span>
          <span>{locale === 'en' ? 'Prices' : 'الاسعار'}</span>
          <span>{locale === 'en' ? 'Contact Us' : 'كلم المبيعات'}</span>
        </p>

        <span className="bg-red-100 h-[2px] w-full"></span>

        <p className="flex flex-col gap-y-6 font-bold">
          <span>{locale === 'en' ? 'Track Shipment' : 'تتبع شحنتك'}</span>
          <span>{locale === 'en' ? 'Login' : 'تسجيل دخول'}</span>
        </p>

        <span className="bg-red-100 h-[2px] w-full"></span>

        <p
          className="cursor-pointer text-red-500 font-bold"
          onClick={changeLocale}
        >
          {locale === 'en' ? 'عربى' : 'ENG'}
        </p>

        <div
          className={`absolute w-7 h-16 rounded-r-md bg-orange-500 z-50 -right-7 flex flex-col justify-center items-center gap-y-3`}
          onClick={toggleSideMenu}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </>
  );
}
