import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';

function ViewClaim() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = () => {
    axios
      .get("http://localhost:8060/claim/all")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log("Error fetching claims:", err);
        setError("Error fetching claims.");
      });
  };

  const handleSettlementClick = (id, claim) => {
    navigate(`/payment/${id}`, { state: { claim } });
  };

  const handleGoBack = () => {
    navigate(-1);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {records.map((d, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold">Claim ID: {d.claimId}</h2>
              </div>
              <div className="space-y-2">
                <div>
                  <strong className="font-medium">Claim Issue:</strong> {d.claimIssue}
                </div>
                <div>
                  <strong className="font-medium">Customer Name:</strong> {d.carinsurance?.customer?.customerName}
                </div>
                <div>
                  <strong className="font-medium">Customer Email:</strong> {d.carinsurance?.customer?.customerEmail}
                </div>
                <div>
                  <strong className="font-medium">Customer Mobile:</strong> {d.carinsurance?.customer?.customerMobile}
                </div>
                <div>
                  <strong className="font-medium">Car Brand:</strong> {d.carMake}
                </div>
                <div>
                  <strong className="font-medium">Car Name:</strong> {d.carName}
                </div>
                <div>
                  <strong className="font-medium">Car Model:</strong> {d.carModel}
                </div>
                <div>
                  <strong className="font-medium">Car Year:</strong> {d.carYear}
                </div>
                <div>
                  <strong className="font-medium">Car Registered On:</strong> {d.carBuyingdate}
                </div>
                <div>
                  <strong className="font-medium">Car Number:</strong> {d.carNumber}
                </div>
                <div>
                  <strong className="font-medium">Claim Status:</strong>
                  <span className={`font-semibold ${d.claimStatus === 'Credited' ? 'text-green-600' : d.claimStatus === 'Approved' ? 'text-blue-600' : 'text-gray-700'}`}>
                    {d.claimStatus}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className={`w-full py-2 rounded-lg text-white ${d.claimStatus === "Credited" ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
                  onClick={() => handleSettlementClick(d.claimId, d)}
                >
                  {d.claimStatus === "Credited" ? "Payment Done" : "Settle Amount"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewClaim;
