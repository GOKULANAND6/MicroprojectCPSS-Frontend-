import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { FaIdCard, FaUser, FaEnvelope, FaPhone, FaHome, FaMapPin, FaCalendar, FaBirthdayCake } from "react-icons/fa";
import Logo from './back.png';

function ViewCustomerProfile() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8060/customer/all");
        const profiles = response.data;
        const profile = profiles.find(prod => prod.customerId === parseInt(id));
        if (profile) {
          setRecord(profile);
        } else {
          setError("Customer not found");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-lg mb-6">
        <button className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold">Your Info's</h1>
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
                    Customer Id:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.customerId}
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaUser className="inline mr-2" />
                    Customer Name:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.customerName}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaEnvelope className="inline mr-2" />
                    Customer Email:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.customerEmail}
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaPhone className="inline mr-2" />
                    Customer Mobile:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.customerMobile}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaHome className="inline mr-2" />
                    Customer Address:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.customerAddress}
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaMapPin className="inline mr-2" />
                    Customer Pincode:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.customerPincode}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    <FaBirthdayCake className="inline mr-2" />
                    Customer DOB:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {record.customerDob}
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

export default ViewCustomerProfile;
