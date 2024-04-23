import { useContext, useEffect, useState } from 'react';
import './progressStyles.css';
import {
  colorStateMap,
  steps,
  useProgressBarSetup,
} from '../../features/progress';
import { LocaleContext } from '../../context/LocaleContext';

export default function Progress({ shipment }) {
  const [current, setCurrent] = useState('');
  const { locale } = useContext(LocaleContext);
  const { progressData } = useProgressBarSetup(shipment, locale);

  useEffect(() => {
    setCurrent(steps.findIndex((step) => step === shipment.progressBarState));
  }, [shipment, locale]);

  return (
    <>
      <ul
        className={`progress-bar container mx-auto h-28 flex items-stretch px-4 pb-10 border-2 border-t-0 border-gray-100 rounded-b-md ${
          locale === 'en' ? 'text-left' : 'text-right'
        }`}
      >
        {steps.map((step, index) => (
          <li key={step} className="relative flex items-center justify-center">
            <div
              className={`relative flex flex-col items-center gap-y-2  text-xs font-bold `}
            >
              <img
                src={
                  index > current || current + 3 !== steps.length
                    ? '/icons/check.svg'
                    : progressData[step].icon
                }
                alt="logo"
                className={`rounded-full flex items-center justify-center  ${
                  colorStateMap[shipment.state]
                } ${
                  index > current || current + 3 !== steps.length
                    ? 'p-1'
                    : 'p-2'
                } ${
                  index >= current
                    ? colorStateMap[shipment.state]
                    : 'bg-gray-100'
                }`}
                width={
                  index > current || current + 3 !== steps.length
                    ? '20px'
                    : '40px'
                }
              />

              <p
                className={`absolute w-40 top-12 flex flex-col justify-start items-center ${
                  index === steps.length - 1 && locale === 'ar' && '-left-28'
                }`}
              >
                <span>{progressData[step].title}</span>
                <span className="text-red-500">{progressData[step].note}</span>
              </p>
            </div>
            <div
              className={`h-2 -mx-14 ${index === steps.length - 2 && 'mr-0'}  ${
                index >= steps.length - 1 && 'hidden'
              } ${
                index >= current ? colorStateMap[shipment.state] : 'bg-gray-100'
              } `}
            ></div>
          </li>
        ))}
      </ul>
    </>
  );
}
