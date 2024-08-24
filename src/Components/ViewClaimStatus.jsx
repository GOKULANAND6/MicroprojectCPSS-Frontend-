import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewClaimStatus() {
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
      const fetchCustomerClaims = async () => {
        try {
          const response = await axios.get("http://localhost:8060/claim/all");
          const allClaims = response.data;

          const filteredClaims = allClaims.filter(claim => claim.carinsurance?.customer?.customerId === customerID);

          if (filteredClaims.length > 0) {
            setRecords(filteredClaims);
          } else {
            setError("No claims found for the customer.");
          }
        } catch (err) {
          console.error("Error fetching customer claims: ", err);
          setError("Error fetching claims.");
        }
      };

      fetchCustomerClaims();
    }
  }, [customerID]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const statusColors = {
    Pending: 'bg-yellow-300',
    Approved: 'bg-green-300',
    Rejected: 'bg-red-300',
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <p className="text-red-600">{error}</p>
          <button
            onClick={handleGoBack}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-teal-600 text-white p-4 flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-200"
        >
          Go Back
        </button>
        <h1 className="text-2xl font-bold">Claim Status</h1>
      </div>

      <div className="flex-grow flex flex-wrap gap-6 p-6 bg-gray-100">
        {records.map((claim) => (
          <div
            key={claim.id}
            className="bg-white rounded-lg p-2 w-full sm:h-80 md:w-70 lg:w-64 "
          >
            <div className={`p-3 rounded-md ${statusColors[claim.claimStatus]}`}>
              <h2 className="text-lg font-bold">Claim Status</h2>
              <p>Status: <span className="font-semibold">{claim.claimStatus}</span></p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {[
                { label: "Claim Issue", value: claim.claimIssue },
                { label: "Car Make", value: claim.carMake },
                { label: "Car Name", value: claim.carName },
                { label: "Car Model", value: claim.carModel },
                { label: "Car Year", value: claim.carYear },
                { label: "Car Buying Date", value: claim.carBuyingdate },
                { label: "Car Number", value: claim.carNumber },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-semibold">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewClaimStatus;
