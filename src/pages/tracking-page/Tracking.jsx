import { useEffect } from 'react';
import ShipmentDetails from '../../components/shipment-details/ShipmentDetails';
import { useShipment } from '../../features/tracking';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';

export default function Tracking() {
  const { shipment, isLoading, fetchShipment, setShipment } = useShipment();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fetchShipment(id);
  }, []);

  return (
    <>
      {(isLoading && <Spinner />) ||
        (shipment.trackingNumber && (
          <ShipmentDetails shipment={shipment} setShipment={setShipment} />
        )) || (
          <p className="font-bold text-lg text-gray-500 text-center mt-20">
            Did not find a shipment with that number
          </p>
        )}
    </>
  );
}
