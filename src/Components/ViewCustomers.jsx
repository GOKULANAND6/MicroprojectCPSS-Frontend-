import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function ViewCustomer() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8060/customer/all')
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-lg mb-6">
        <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Customer Details</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pincode</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {records.map((d, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.customerId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.customerEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.customerMobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.customerAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.customerPincode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.customerDob}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Link to={`/viewpolicy/${d.customerId}`}>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300">
                      View Policy
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCustomer;
