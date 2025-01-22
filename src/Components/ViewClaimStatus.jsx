import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './back.png';

function ViewClaimStatus() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [customerID, setCustomerID] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
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

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage('');
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
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-md mb-6">
        <button className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold">Claim Status</h1>
      </header>

      <div className="flex-grow flex flex-wrap gap-6 p-6 bg-gray-100">
        {records.map((claim) => (
          <div
            key={claim.id}
            className="bg-white rounded-lg p-2 flex flex-col w-full sm:w-80 md:w-80 lg:w-64"
          >
            <div className={`p-3 rounded-md ${statusColors[claim.claimStatus]}`}>
              <h2 className="text-lg font-bold">Claim Status</h2>
              <p>Status: <span className="font-semibold">{claim.claimStatus}</span></p>
            </div>
            <div className="mt-4 flex flex-col gap-2 flex-grow">
              {[
                { label: "Claim Issue", value: claim.claimIssue },
                { label: "Car Make", value: claim.carMake },
                { label: "Car Name", value: claim.carName },
                { label: "Car Model", value: claim.carModel },
                { label: "Car Year", value: claim.carYear },
                { label: "Car Buying Date", value: claim.carBuyingdate },
                { label: "Car Number", value: claim.carNumber },
                { label: "Vehicle Invoice", value: <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(`data:image/jpeg;base64,${claim.vehicleInvoice}`)}
                    >
                      View Image
              </button>},
                { label: "Present Image", value: <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(`data:image/jpeg;base64,${claim.presentImage}`)}
                    >
                      View Image
            </button>}
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
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 text-white rounded p-2 hover:bg-red-700 transition-colors"
              aria-label="Close Modal"
            >
              &times;
            </button>
            <img src={selectedImage} alt="Modal Content" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewClaimStatus;
