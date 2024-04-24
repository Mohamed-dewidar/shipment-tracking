import { useContext, useEffect } from 'react';
import { LocaleContext } from '../../context/LocaleContext';
import { mapLocales } from '../../features/tracking';
import Progress from '../progress/Progress';
import './shipmentDetails.css';
import ShipmentEvents from '../shipment-events/ShipmentEvents';
import { colorStateMap } from '../../features/progress';

export default function ShipmentDetails({ shipment, setShipment }) {
  const { locale, layout } = useContext(LocaleContext);

  useEffect(() => {
    setShipment(mapLocales(shipment, locale));
    console.log(shipment);
  }, [locale]);

  return (
    <>
      <div
        className={`hidden md:flex container mx-auto w-100 mt-16 p-8 rounded-t-md border border-gray-100 [ ${layout} justify-between items-center ]`}
      >
        <p className="flex flex-col gap-y-2">
          <span className="text-gray-500">
            {locale === 'en'
              ? `Shipment #${shipment.trackingNumber}`
              : `رقم الشحنه #${shipment.trackingNumber}`}
          </span>
          <span
            className={`font-bold text-lg
            ${locale === 'en' ? 'text-left' : 'text-right'}
            ${colorStateMap[shipment.state]} bg-white`}
          >
            {shipment.title}
          </span>
        </p>

        <p className="flex flex-col gap-y-2">
          <span className="text-gray-500">
            {locale === 'en' ? `Last Update` : `اخر تحديث`}
          </span>
          <span className="font-bold text-lg">{shipment.time}</span>
        </p>

        <p className="flex flex-col gap-y-2">
          <span className="text-gray-500">
            {locale === 'en' ? `Seller` : `اسم التاجر`}
          </span>
          <span className="font-bold text-lg">{shipment.seller}</span>
        </p>

        <p className="flex flex-col gap-y-2">
          <span className="text-gray-500">
            {locale === 'en' ? `Delivery Within` : `موعد التسليم`}
          </span>
          <span className="font-bold text-lg">
            {shipment.deliveryDate ? shipment.deliveryDate : '-----------'}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-y-3 mx-5 md:hidden p-5 mt-16 rounded-t-md border border-gray-100 text-sm">
        <p className={`${layout} justify-between items-center`}>
          <span className="text-gray-500">
            {locale === 'en'
              ? `Shipment #${shipment.trackingNumber}`
              : `رقم الشحنه #${shipment.trackingNumber}`}
          </span>
          <span
            className={`font-bold text-right  ${
              colorStateMap[shipment.state]
            } bg-white`}
          >
            {shipment.title}
          </span>
        </p>

        <p className={`${layout} justify-between items-center`}>
          <span className="text-gray-500">
            {locale === 'en' ? `Last Update` : `اخر تحديث`}
          </span>
          <span className="font-bold text-right ">{shipment.time}</span>
        </p>

        <p className={`${layout} justify-between items-center`}>
          <span className="text-gray-500">
            {locale === 'en' ? `Seller` : `اسم التاجر`}
          </span>
          <span className="font-bold text-right">{shipment.seller}</span>
        </p>

        <p className={`${layout} justify-between items-center`}>
          <span className="text-gray-500">
            {locale === 'en' ? `Delivery Within` : `موعد التسليم`}
          </span>
          <span className="font-bold text-right">
            {shipment.deliveryDate ? shipment.deliveryDate : '-----------'}
          </span>
        </p>
      </div>

      <Progress shipment={shipment} />

      <section className="events-container px-5 mt-10 md:px-0 container mx-auto">
        <div className="flex flex-col order-last md:order-none mb-5 md:mb-0">
          <h2
            className={`text-lg font-semibold ${
              locale === 'en' ? 'text-left' : 'text-right'
            }`}
          >
            {locale === 'en' ? 'Shipping Address' : 'عنوان التسليم'}
          </h2>
          <p className="mt-5 p-7 font-semibold text-base bg-gray-50 border border-gray-100 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A molestias
            atque dolor ex rerum ducimus ad repellat quas ab tempora? Quis
          </p>

          <div className=" w-full mt-5 p-5 bg-gray-50 border border-gray-100 rounded-md flex flex-row justify-between">
            <div className="flex flex-col justify-around">
              <p className="font-bold text-sm">
                {locale === 'en'
                  ? 'Any issues with your shipment ?!'
                  : 'هل توجد مشكله فى شحنتك ؟!'}
              </p>
              <button className="text-white text-sm bg-red-500 rounded-xl py-2">
                {locale === 'en' ? 'Report about the issue' : 'ابلاغ عن مشكله'}
              </button>
            </div>
            <img src="/images/issues.png" alt="Any issues" width="100px" />
          </div>
        </div>

        {(shipment.transitEvents && <ShipmentEvents shipment={shipment} />) || (
          <p className="text-center font-bold mt-20 text-gray-500 text-lg">
            {locale === 'en'
              ? 'No Transit Events found'
              : 'لا يوجد بينات للشحنه'}
          </p>
        )}
      </section>
    </>
  );
}
