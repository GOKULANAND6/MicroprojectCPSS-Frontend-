import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';

function ViewProcessedClaims() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8060/claim/all")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <header className="bg-teal-500 text-white py-4 px-6 flex items-center justify-between">
      <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold">Applied Claim Details</h1>
      </header>

      <div className="flex-grow p-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Registered On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((d, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.claimId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.carMake}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.carName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.carModel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.carYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.carBuyingdate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.carNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.claimStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/updatestatus/${d.claimId}`}>
                      <button 
                        className={`px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 ${d.claim_status === "Approved" ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'}`}
                        disabled={d.claim_status === "Approved"}
                      >
                        {d.claim_status === "Approved" ? "Approved" : "Process"}
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewProcessedClaims;
