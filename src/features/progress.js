export const colorStateMap = {
  DELIVERED: 'is-delivered',
  SHIPPING: 'is-canceled',
  DELIVERED_TO_SENDER: 'is-back-sender',
  CANCELLED: 'is-canceled',
};

export const steps = ['DELIVERED', 'SHIPPING', 'LEFT_SELLER', 'CREATED'];

export function useProgressBarSetup(shipment, locale) {
  const progressData = {
    CREATED: {
      icon: '/icons/cart.svg',
      title: locale === 'en' ? 'Created' : 'تم انشاء الشحنه',
      note: '',
    },
    LEFT_SELLER: {
      icon: '/icons/cart.svg',
      title:
        locale === 'en'
          ? 'Was taken from seller'
          : 'تم استلام الشحنه من التاجر',
      note: '',
    },
    SHIPPING: {
      icon: '/icons/cart.svg',
      title: locale === 'en' ? 'Out for delivery' : 'الشحنه خرجت للتسليم',
      note: mapShippingNote(shipment.state, locale),
    },
    DELIVERED: {
      icon: '/icons/home.svg',
      title: locale === 'en' ? 'Delivered' : 'تم التسليم',
      note: '',
    },
  };

  return {
    progressData,
  };
}

export function mapShippingNote(state, locale) {
  let shippingNote = '';

  if (state === 'DELIVERED_TO_SENDER') {
    shippingNote =
      locale === 'en' ? 'Customer not in home' : 'العميل غير متواجد بالعنوان';
  }

  if (state === 'CANCELLED') {
    shippingNote =
      locale === 'en'
        ? 'Order was cancelled by seller'
        : 'تم الغاء الشحنه من التاجر';
  }
  return shippingNote;
}
