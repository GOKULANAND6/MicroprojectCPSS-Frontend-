import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateStatus() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8060/claim/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => console.log("Error fetching data:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", data);

    axios.put("http://localhost:8060/claim", data)
      .then((res) => {
        console.log("Update response:", res);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Status Updated Successfully',
        }).then(() => {
          navigate("/landingpage3");
        });
      })
      .catch((err) => {
        console.error("Error updating claim:", err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update status. Please try again.',
        });
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <header className="bg-teal-500 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Update the Claim Status</h1>
      </header>

      <div className="flex-grow p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="claim_id" className="block text-lg font-medium text-gray-700">Claim Id:</label>
              <input
                type="text"
                id="claim_id"
                name="claim_id"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
                disabled
                value={data.claimId || ''}
              />
            </div>

            <div>
              <label htmlFor="claim_issue" className="block text-lg font-medium text-gray-700">Car Owner:</label>
              <input
                type="text"
                id="claim_issue"
                name="claim_issue"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
                disabled
                value={data?.carinsurance?.customer?.customerName || ''}
              />
            </div>

            <div>
              <label htmlFor="car_number" className="block text-lg font-medium text-gray-700">Car Number:</label>
              <input
                type="text"
                id="car_number"
                name="car_number"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
                disabled
                value={data.carNumber || ''}
              />
            </div>

            <div>
              <label htmlFor="claim_status" className="block text-lg font-medium text-gray-700">Claim Status:</label>
              <select
                id="claim_status"
                name="claim_status"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900"
                value={data.claimStatus || ''}
                onChange={(e) => setData({ ...data, claimStatus: e.target.value })}
              >
                <option value="" disabled>Select Status</option>
                <option value="Verifying">Verifying</option>
                <option value="Validating">Validating</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatus;
