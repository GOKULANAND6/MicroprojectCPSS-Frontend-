import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineFileImage } from "react-icons/ai";
import { Link } from "react-router-dom";

function ViewClaimNotification() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8060/claim/all")
      .then((response) => {
        setRecords(response.data);
        setFilteredRecords(response.data); // Initialize filtered records
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch records");
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = records.filter((claim) =>
        claim.carinsurance?.customer?.customerName.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  }, [searchTerm, records]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
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
        <div className="flex flex-grow justify-center">
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full max-w-md"
          />
        </div>
        <h1 className="text-2xl font-bold ml-auto">Applied for Insurance Claim</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((claim, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold mb-2">{claim.claimIssue}</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Customer Name:</span>
                <span className="text-gray-600">{claim.carinsurance?.customer?.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Customer Email:</span>
                <span className="text-gray-600">{claim.carinsurance?.customer?.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Customer Mobile:</span>
                <span className="text-gray-600">{claim.carinsurance?.customer?.customerMobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Car Brand:</span>
                <span className="text-gray-600">{claim.carMake}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Car Name:</span>
                <span className="text-gray-600">{claim.carName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Car Model:</span>
                <span className="text-gray-600">{claim.carModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Car Year:</span>
                <span className="text-gray-600">{claim.carYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Car Registered On:</span>
                <span className="text-gray-600">{claim.carBuyingdate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Car Number:</span>
                <span className="text-gray-600">{claim.carNumber}</span>
              </div>
              <div className={`text-center py-2 rounded-full ${claim.claimStatus === 'Approved' ? 'bg-green-500 text-white' : claim.claimStatus === 'Rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                {claim.claimStatus}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <AiOutlineFileImage size={20} className="text-gray-700" />
                  <span className="font-bold text-gray-700">Vehicle Invoice:</span>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal(`data:image/jpeg;base64,${claim.vehicleInvoice}`)}
                  >
                    View Image
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <AiOutlineFileImage size={20} className="text-gray-700" />
                  <span className="font-bold text-gray-700">Present Image:</span>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal(`data:image/jpeg;base64,${claim.presentImage}`)}
                  >
                    View Image
                  </button>
                </div>
              </div>
              
              <Link to={`/processclaim?carNumber=${claim.carNumber}`}>
                <button
                  className={`w-full py-2 mt-2 rounded-lg text-white font-bold bg-sky-500 hover:bg-sky-600`}
                >
                  Process
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}

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

export default ViewClaimNotification;
