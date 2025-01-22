import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ViewCars from './ViewCars';

function ProcessClaim() {
  const [carNumber, setCarNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [claimId, setClaimId] = useState(null);
  const navigate = useNavigate();
  
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const carNumberFromUrl = queryParams.get('carNumber');
    
    if (carNumberFromUrl) {
      setCarNumber(carNumberFromUrl);
    }
  }, [location.search]);

  const handleCarNumberChange = (event) => {
    setCarNumber(event.target.value);
  };

  const handleSearch = () => {
    const result = searchResults.find(car => car.carNumber === carNumber);
    if (result) {
      setClaimId(result.claimId);

      Swal.fire({
        title: 'Valid Car Number',
        icon: 'success',
        text: 'The car number is valid. Proceed to update the status.',
        confirmButtonText: 'Update Status',
        confirmButtonColor: '#28a745',
      }).then((result) => {
        if (result.isConfirmed) {
          handleSettleAmount(result.claimId);
        }
      });
    } else {
      Swal.fire({
        title: 'Invalid Car Number',
        icon: 'error',
        text: 'The car number is not found.',
        confirmButtonText: 'Update Status',
        confirmButtonColor: '#dc3545',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#6c757d',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/viewprocessedclaim");
        }
      });
    }
  };

  const handleSettleAmount = (claimId) => {
    navigate("/viewprocessedclaim");
  };

  const handleCarNumbersFetched = (carRecords) => {
    setSearchResults(carRecords);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ViewCars onCarNumbersFetched={handleCarNumbersFetched} />

      <div className="bg-gray-100 flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Search Car by Number</h2>
          <div className="mt-6">
            <label htmlFor="carNumber" className="block text-lg font-semibold text-gray-700 mb-2">Car Number</label>
            <div className="flex">
              <input
                id="carNumber"
                type="text"
                value={carNumber}
                onChange={handleCarNumberChange}
                className="border border-gray-300 rounded-lg p-2 flex-1 mr-2"
                placeholder="Enter car number"
              />
              <button
                onClick={handleSearch}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              >
                Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessClaim;
