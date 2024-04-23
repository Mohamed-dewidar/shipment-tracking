import axios from 'axios';
import { useState, useContext } from 'react';
import { LocaleContext } from '../context/LocaleContext';

let shipmentDateENG = '';
let deliveryDateENG = '';
let shipmentENG = [];
const DateOptions = {
  weekday: 'long',
  hour: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

const StatusMap = {
  DELIVERED_TO_SENDER: 'SHIPPING',
  CANCELLED: 'SHIPPING',
  DELIVERED: 'DELIVERED',
};

export function useShipment() {
  const [shipment, setShipment] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { locale } = useContext(LocaleContext);

  async function fetchShipment(shipmentNumber) {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://tracking.bosta.co/shipments/track/${shipmentNumber}`,
      );

      if (res.status >= 200 && res.status < 400 && res.data) {
        shipmentENG = res.data;
        shipmentDateENG = res.data.CurrentStatus.timestamp;
        deliveryDateENG = res.data.PromisedDate;
        setShipment(mapLocales(mapShipmentDetails(res.data), locale));
      }
    } catch (e) {
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    fetchShipment,
    setShipment,
    shipment,
    isLoading,
  };
}

export function mapShipmentDetails(apiItem) {
  if (!apiItem) return {};

  return {
    trackingNumber: apiItem.TrackingNumber || undefined,
    progressBarState: apiItem.CurrentStatus.state
      ? StatusMap[apiItem?.CurrentStatus?.state]
      : undefined,
    state: apiItem.CurrentStatus.state || undefined,
    time: apiItem.CurrentStatus.timestamp || undefined,
    seller: apiItem.provider || undefined,
    deliveryDate: apiItem.PromisedDate || undefined,
    transitEvents: apiItem.TransitEvents || [],
  };
}

export function mapLocales(shipment, locale) {
  if (!shipment) return {};

  return {
    ...shipment,
    time: new Date(shipmentDateENG).toLocaleDateString(
      locale === 'en' ? 'en-US' : 'ar-EG',
      DateOptions,
    ),
    deliveryDate: shipment.deliveryDate
      ? new Date(deliveryDateENG).toLocaleDateString(
          locale === 'en' ? 'en-US' : 'ar-EG',
          {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          },
        )
      : undefined,
    transitEvents: mapTransitEvents(shipmentENG.TransitEvents, locale),
  };
}

function mapTransitEvents(apiItem, locale) {
  if (!apiItem) return [];

  return apiItem.map((item) => ({
    eventState: mapTransitState(item.state, locale),
    location: locale === 'en' ? 'Nasr City' : 'مدينه نصر',
    date: item.timestamp
      ? new Date(item.timestamp).toLocaleDateString(
          locale === 'en' ? 'en-US' : 'ar-EG',
          { month: 'numeric', day: 'numeric', year: 'numeric' },
        )
      : undefined,
    time: item.timestamp
      ? new Date(item.timestamp).toLocaleTimeString(
          locale === 'en' ? 'en-US' : 'ar-EG',
          { hour: 'numeric', minute: 'numeric' },
        )
      : undefined,
  }));
}

function mapTransitState(apiItem, locale) {
  if (!apiItem) return '';

  const eventStateMapENG = {
    TICKET_CREATED: 'Created',
    IN_TRANSIT: 'In Transit',
    PACKAGE_RECEIVED: 'Received',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    WAITING_FOR_CUSTOMER_ACTION: 'Waiting for customer action',
    NOT_YET_SHIPPED: 'Not yet shipped',
    DELIVERED_TO_SENDER: 'Delivered  to sender',
    CANCELLED: 'Cancelled',
    DELIVERED: 'Delivered',
  };

  const eventStateMapAR = {
    TICKET_CREATED: 'تم انشاء نسخه',
    IN_TRANSIT: 'في مرحلة انتقالية',
    PACKAGE_RECEIVED: 'تلقى',
    OUT_FOR_DELIVERY: 'خارج للتوصيل',
    WAITING_FOR_CUSTOMER_ACTION: 'في انتظار إجراء العملاء',
    NOT_YET_SHIPPED: 'لم يتم شحنه بعد',
    DELIVERED_TO_SENDER: 'سلمت إلى المرسل',
    CANCELLED: 'تم الالغاء',
    DELIVERED: 'تم النوصيل',
  };

  return locale === 'en' ? eventStateMapENG[apiItem] : eventStateMapAR[apiItem];
}
