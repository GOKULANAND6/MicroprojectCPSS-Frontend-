import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ViewCars({ onCarNumbersFetched }) {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8060/car/all")
      .then((response) => {
        const fetchedRecords = response.data;
        setRecords(fetchedRecords);
        const fetchedCarNumbers = fetchedRecords.map(car => car.carNumber);
        onCarNumbersFetched(fetchedRecords); // Pass full records
      })
      .catch((error) => console.error(error));
  }, [onCarNumbersFetched]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="bg-gray-100 p-6">
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-lg mb-6">
        <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Vehicle Database</h1>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Car Id</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Car Brand</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Car Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Car Model</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Car Year</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Car Registered On</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Car Number</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-600">{d.carId}</td>
                <td className="py-3 px-4 text-gray-600">{d.carMake}</td>
                <td className="py-3 px-4 text-gray-600">{d.carName}</td>
                <td className="py-3 px-4 text-gray-600">{d.carModel}</td>
                <td className="py-3 px-4 text-gray-600">{d.carYear}</td>
                <td className="py-3 px-4 text-gray-600">{new Date(d.carBuyingdate).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-gray-600">{d.carNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCars;
