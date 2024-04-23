import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [shipmentNumber, setShipmentNumber] = useState('');
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setShipmentNumber(e.target.value);
  };

  const submitHandler = () => {
    if (!shipmentNumber) {
      setErrors('Shipment number is required');
      return;
    }
    navigate(`shipment/${shipmentNumber}`);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-40 w-full">
      <input
        type="text"
        name="orderNumber"
        id="orderNumber"
        className="w-1/4 p-2 rounded-xl rounded-xl border-2 border-gray-100"
        placeholder="Shipment Number"
        onChange={inputHandler}
      />
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
      <button
        className="font-bold w-1/4 py-2 mt-5 rounded-xl bg-red-500"
        onClick={submitHandler}
      >
        Search
      </button>
    </div>
  );
}
