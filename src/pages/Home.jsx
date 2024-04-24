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
    <div className="container mx-auto flex flex-col px-5 md:px-0 items-center justify-center mt-40 w-full">
      <div className="w-full h-20 mx-auto relative flex flex-col justify-center items-start md:items-center">
        <input
          type="text"
          name="orderNumber"
          id="orderNumber"
          className="w-full md:w-1/4 p-2 rounded-xl rounded-xl border border-gray-100"
          placeholder="Shipment Number"
          onChange={inputHandler}
        ></input>
        {errors && (
          <p className="mt-2 text-left text-red-500 text-sm">{errors}</p>
        )}
      </div>
      <button
        className="font-bold w-full md:w-1/4 py-2 mt-5 rounded-xl bg-red-500"
        onClick={submitHandler}
      >
        Search
      </button>
    </div>
  );
}
