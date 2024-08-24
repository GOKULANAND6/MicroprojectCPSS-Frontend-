import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaIdCard, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import Logo from './back.png';

function ViewAdminProfile() {
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8060/admin/all')
      .then((response) => {
        console.log(response.data); 
        if (Array.isArray(response.data) && response.data.length > 0) {
          setRecord(response.data[0]);
        } else {
          console.log('No data available');
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-lg mb-6">
        <button className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold">Admin Info</h1>
      </header>

      {record ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Profile Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaIdCard className="inline mr-2" />
                    Admin ID:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.adminId}
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaUser className="inline mr-2" />
                    Admin Name:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.adminName}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaPhone className="inline mr-2" />
                    Admin Mobile:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.adminMobile}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-semibold">No profile data available</div>
      )}
    </div>
  );
}

export default ViewAdminProfile;
