import { useContext } from 'react';
import { LocaleContext } from '../../context/LocaleContext';

export default function ShipmentEvents({ shipment }) {
  const { locale } = useContext(LocaleContext);

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
        <div className="event-item text-slate-500 py-4 px-10 border-2 border-gray-100 rounded-t-md  bg-gray-50 mt-5 font-bold text-right">
          <p>Details</p>
          <p>Time</p>
          <p>Date</p>
          <p>Location</p>
        </div>
      )}
      {shipment.transitEvents && (
        <div className="max-h-80 w-full overflow-y-auto rounded-b-md border-2 border-t-0 border-gray-100 no-scrollbar font-semibold text-right">
          {shipment.transitEvents.map((event, index) => (
            <div
              key={index}
              className={`event-item py-4 px-10 border-b-2 border-gray-100 ${
                index === shipment.transitEvents.length - 1 && 'border-b-0'
              }`}
            >
              <p>{event.eventState}</p>
              <p>{event.time}</p>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
