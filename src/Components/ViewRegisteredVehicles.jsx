import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function ViewPolicies() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get('http://localhost:8060/registervehicles/all');
        const profiles = response.data;
        
        const userPolicies = profiles.filter(prod => prod.customer.customerId === parseInt(id));
        if (userPolicies.length > 0) {
          setRecords(userPolicies);
        } else {
          setError('No vehicles found for this customer');
        }
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError('Error fetching policies');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-lg mb-6">
        <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Your Vehicle's</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          <div className="text-center text-gray-700 col-span-2">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 col-span-2">{error}</div>
        ) : (
          records.length > 0 ? (
            records.map((record, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Vehicle Brand:</strong>
                    <span className="text-gray-600">{record.vehicleMake}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Vehicle Name:</strong>
                    <span className="text-gray-600">{record.vehicleName}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Vehicle Model:</strong>
                    <span className="text-gray-600">{record.vehicleModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Vehicle Year:</strong>
                    <span className="text-gray-600">{record.vehicleYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Bought On:</strong>
                    <span className="text-gray-600">{record.vehicleBuyingdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Vehicle Number:</strong>
                    <span className="text-gray-600">{record.vehicleNumber}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-700 col-span-2">No vehicles found for this customer</div>
          )
        )}
      </div>
    </div>
  );
}

export default ViewPolicies;
