import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from './back.png';

function ViewSettlementStatus() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [customerID, setCustomerID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedInsurance = sessionStorage.getItem("loggedInUser");
    if (storedInsurance) {
      const parsedInsurance = JSON.parse(storedInsurance);
      setCustomerID(parsedInsurance.customerId); 
    } else {
      setError("No customer ID found in session storage.");
    }
  }, []);

  useEffect(() => {
    if (customerID) {
      const fetchCustomerSettlements = async () => {
        try {
          const response = await axios.get("http://localhost:8060/settlement/all");
          const allSettlements = response.data;

          const filteredSettlements = allSettlements.filter(settlement => settlement?.insuranceclaim?.carinsurance?.customer?.customerId === customerID);

          if (filteredSettlements.length > 0) {
            setRecords(filteredSettlements);
          } else {
            setError("No settlements found for the customer.");
          }
        } catch (err) {
          console.error("Error fetching settlements: ", err);
          setError("Error fetching settlements.");
        }
      };

      fetchCustomerSettlements();
    }
  }, [customerID]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-md mb-6">
        <button className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold">Settlement Status</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {records.length > 0 ? (
          records.map((record, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{record.insuranceclaim?.carinsurance?.policyName}</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Car Brand:</span>
                  <span className="text-gray-900">{record.insuranceclaim?.carMake}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Car Name:</span>
                  <span className="text-gray-900">{record.insuranceclaim?.carName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Settlement Amount:</span>
                  <span className="text-green-600 font-semibold">{record.settlementAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Settlement Status:</span>
                  <span className={`text-sm font-medium ${record.settlementStatus === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.settlementStatus}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-semibold text-gray-700">{error || "No settlement records available."}</div>
        )}
      </div>
    </div>
  );
}

export default ViewSettlementStatus;
