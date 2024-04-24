import { useContext } from 'react';
import { LocaleContext } from '../../context/LocaleContext';

export default function ShipmentEvents({ shipment }) {
  const { locale, layout } = useContext(LocaleContext);

  return (
    <div className="flex flex-col">
      <h2
        className={`text-lg font-semibold ${
          locale === 'en' ? 'text-left' : 'text-right'
        }`}
      >
        {locale === 'en' ? 'Shipment Details' : 'تفاصيل الشحنه'}
      </h2>

      {shipment.transitEvents && (
        <div className="event-item hidden md:grid text-slate-500 py-4 px-10 border border-gray-100 rounded-t-md  bg-gray-50 mt-5 font-bold text-right">
          <p>{locale ? 'Details' : 'التفاصبل'}</p>
          <p>{locale ? 'Time' : 'الوقت'}</p>
          <p>{locale ? 'Date' : 'التاريخ'}</p>
          <p>{locale ? 'Location' : 'الموقع'}</p>
        </div>
      )}

      {shipment.transitEvents && (
        <div
          className={`max-h-80 w-full mt-5 md:mt-0 rounded-b-md border md:border-t-0 border-gray-100 no-scrollbar overflow-y-auto font-semibold text-right`}
        >
          {shipment.transitEvents.map((event, index) => (
            <div
              key={index}
              className={`event-item py-4 px-10  border-gray-100 ${
                index !== shipment.transitEvents.length - 1 && 'border-b'
              }`}
            >
              <p className="hidden md:block">{event.eventState}</p>
              <p className="hidden md:block">{event.time}</p>
              <p className="hidden md:block">{event.date}</p>
              <p className="hidden md:block">{event.location}</p>

              <div className="flex md:hidden flex-col justify-between items-center">
                <p className={`w-full ${layout} justify-between items-center`}>
                  <span className="text-slate-500 text-bold">
                    {locale === 'en' ? 'Details' : 'التفاصبل'}
                  </span>
                  <span>{event.eventState}</span>
                </p>
                <p className={`w-full ${layout} justify-between items-center`}>
                  <span className="text-slate-500 text-bold">
                    {locale === 'en' ? 'Time' : 'الوقت'}
                  </span>
                  <span>{event.time}</span>
                </p>
                <p className={`w-full ${layout} justify-between items-center`}>
                  <span className="text-slate-500 text-bold">
                    {locale === 'en' ? 'Date' : 'التاريخ'}
                  </span>
                  <span>{event.date}</span>
                </p>
                <p className={`w-full ${layout} justify-between items-center`}>
                  <span className="text-slate-500 text-bold">
                    {locale === 'en' ? 'Location' : 'الموقع'}
                  </span>
                  <span>{event.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
