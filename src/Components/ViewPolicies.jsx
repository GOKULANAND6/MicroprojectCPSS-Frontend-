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
        const response = await axios.get('http://localhost:8060/carinsurance/all');
        const profiles = response.data;
        
        const userPolicies = profiles.filter(prod => prod.customer.customerId === parseInt(id));
        if (userPolicies.length > 0) {
          setRecords(userPolicies);
        } else {
          setError('No policies found for this customer');
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
        <h1 className="text-2xl font-bold">Insurance Policy Details</h1>
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
                <div className="border-b border-gray-200 mb-4 pb-4">
                  <h2 className="text-lg font-semibold mb-2">Policy ID: {record.policyId}</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Policy Name:</strong>
                    <span className="text-gray-600">{record.policyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Policy Scheme:</strong>
                    <span className="text-gray-600">{record.policyScheme}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Customer Name:</strong>
                    <span className="text-gray-600">{record.customer?.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Customer Mobile:</strong>
                    <span className="text-gray-600">{record.customer?.customerMobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Customer Email:</strong>
                    <span className="text-gray-600">{record.customer?.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Car Make:</strong>
                    <span className="text-gray-600">{record.carMake}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Car Name:</strong>
                    <span className="text-gray-600">{record.carName}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Car Model:</strong>
                    <span className="text-gray-600">{record.carModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Year:</strong>
                    <span className="text-gray-600">{record.carYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Registered On:</strong>
                    <span className="text-gray-600">{record.carBuyingdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Car Number:</strong>
                    <span className="text-gray-600">{record.carNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong className="text-gray-700">Total Amount Paid:</strong>
                    <span className="text-gray-600">{record.policyAmount}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-700 col-span-2">No policies found for this customer</div>
          )
        )}
      </div>
    </div>
  );
}

export default ViewPolicies;
