import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';

function ViewClaim() {
  const [records, setRecords] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClaims();
    fetchSettlements();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get("http://localhost:8060/claim/all");
      const sortedRecords = response.data.sort((a, b) => b.claimId - a.claimId);
      setRecords(sortedRecords);
    } catch (err) {
      console.error("Error fetching claims:", err);
      setError("Error fetching claims.");
    }
  };

  const fetchSettlements = async () => {
    try {
      const response = await axios.get("http://localhost:8060/settlement/all");
      setSettlements(response.data);
    } catch (err) {
      console.error("Error fetching settlements:", err);
      setError("Error fetching settlements.");
    }
  };

  const handleSettlementClick = (id, claim) => {
    navigate(`/payment/${id}`, { state: { claim } });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getSettlementStatus = (claimId) => {
    const settlement = settlements.find(s => s.insuranceclaim?.claimId === claimId);
    return settlement ? settlement.settlementStatus : null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-lg mb-6">
        <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Amount Settlement</h1>
      </header>

      {error && (
        <div className="p-4 text-red-600 bg-red-200">
          {error}
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {records.map((d, i) => {
            const settlementStatus = getSettlementStatus(d.claimId);
            const isSettled = settlementStatus === "Credited";
            const isRejected = d.claimStatus === "Rejected";
            const isDisabled = isRejected || isSettled;

            let buttonClass = "bg-teal-600 hover:bg-teal-700";
            let buttonText = "Settle Amount";

            if (isRejected) {
              buttonClass = "bg-red-600 cursor-not-allowed";
              buttonText = "Rejected";
            } else if (isSettled) {
              buttonClass = "bg-blue-600 cursor-not-allowed";
              buttonText = "Payment Done";
            }

            return (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-bold">Claim ID: {d.claimId}</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Claim Issue", value: d.claimIssue },
                    { label: "Customer Name", value: d.carinsurance?.customer?.customerName },
                    { label: "Customer Email", value: d.carinsurance?.customer?.customerEmail },
                    { label: "Customer Mobile", value: d.carinsurance?.customer?.customerMobile },
                    { label: "Car Brand", value: d.carMake },
                    { label: "Car Name", value: d.carName },
                    { label: "Car Model", value: d.carModel },
                    { label: "Car Year", value: d.carYear },
                    { label: "Car Registered On", value: d.carBuyingdate },
                    { label: "Car Number", value: d.carNumber },
                    { label: "Claim Status", value: d.claimStatus }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-gray-600">{item.label}:</span>
                      <span className={`font-semibold ${item.label === "Claim Status" && item.value === 'Rejected' ? 'text-red-600' : item.label === "Claim Status" && item.value === 'Credited' ? 'text-green-600' : item.label === "Claim Status" && item.value === 'Approved' ? 'text-blue-600' : 'text-gray-700'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    className={`w-full py-2 rounded-lg text-white ${buttonClass}`}
                    onClick={() => !isDisabled && handleSettlementClick(d.claimId, d)}
                    disabled={isDisabled}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewClaim;
