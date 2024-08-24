import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCar, FaCalendar, FaKey, FaTag, FaExclamationTriangle, FaFileAlt, FaImage } from 'react-icons/fa';

function FileClaim() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    claimIssue: '',
    carMake: '',
    carName: '',
    carModel: '',
    carYear: '',
    carBuyingdate: '',
    carNumber: '',
    claimStatus: 'Pending',
    vehicleInvoice: null,
    presentImage: null,
    carinsurance: {}
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const policyData = sessionStorage.getItem("Insurance");
    if (policyData) {
      try {
        const parsedPolicyData = JSON.parse(policyData);
        setFormData(prevState => ({
          ...prevState,
          carinsurance: parsedPolicyData 
        }));
      } catch (error) {
        console.error("Error parsing insurance data", error);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== 'vehicleInvoice' && key !== 'presentImage' && key !== 'carinsurance') {
        data.append(key, formData[key]);
      }
    });

    if (formData.vehicleInvoice) {
      data.append('vehicleInvoice', formData.vehicleInvoice);
    }

    if (formData.presentImage) {
      data.append('presentImage', formData.presentImage);
    }

    if (Object.keys(formData.carinsurance).length) {
      data.append('carinsurance', JSON.stringify(formData.carinsurance));
    }

    try {
      await axios.post('http://localhost:8060/claim', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Claim submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/success');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your claim.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-teal-600 text-white p-4 flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-200"
        >
          Go Back
        </button>
        <h1 className="text-2xl font-bold">Claim Form</h1>
      </div>

      <div className="flex-grow flex items-center justify-center bg-gray-100 p-6">
        <form
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4">
            <div className="flex items-center space-x-3">
              <FaExclamationTriangle className="text-teal-600 w-6 h-6" />
              <label htmlFor="claimIssue" className="flex-1 font-bold">
                Claim Issue:
              </label>
              <select
                id="claimIssue"
                name="claimIssue"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={formData.claimIssue}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, claimIssue: e.target.value }))
                }
                required
              >
                <option value="">Select Issue</option>
                <option value="Accident">Accident</option>
                <option value="Repair">Repair</option>
                <option value="Service">Service</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <FaCar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carMake" className="flex-1 font-bold">
                Car Make:
              </label>
              <input
                type="text"
                id="carMake"
                name="carMake"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={formData.carMake}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, carMake: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carName" className="flex-1 font-bold">
                Car Name:
              </label>
              <input
                type="text"
                id="carName"
                name="carName"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={formData.carName}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, carName: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carModel" className="flex-1 font-bold">
                Car Model:
              </label>
              <input
                type="text"
                id="carModel"
                name="carModel"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={formData.carModel}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, carModel: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCalendar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carYear" className="flex-1 font-bold">
                Car Year:
              </label>
              <input
                type="text"
                id="carYear"
                name="carYear"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={formData.carYear}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, carYear: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCalendar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carBuyingdate" className="flex-1 font-bold">
                Car Buying Date:
              </label>
              <input
                type="date"
                id="carBuyingdate"
                name="carBuyingdate"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={formData.carBuyingdate}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, carBuyingdate: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaKey className="text-teal-600 w-6 h-6" />
              <label htmlFor="carNumber" className="flex-1 font-bold">
                Car Number:
              </label>
              <input
                type="text"
                id="carNumber"
                name="carNumber"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={formData.carNumber}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, carNumber: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaFileAlt className="text-teal-600 w-6 h-6" />
              <label htmlFor="vehicleInvoice" className="flex-1 font-bold">
                Vehicle Invoice:
              </label>
              <input
                type="file"
                id="vehicleInvoice"
                name="vehicleInvoice"
                className="border border-gray-300 rounded-md p-2 flex-1"
                onChange={handleFileChange}
                accept="application/pdf,image/*"
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaImage className="text-teal-600 w-6 h-6" />
              <label htmlFor="presentImage" className="flex-1 font-bold">
                Present Image:
              </label>
              <input
                type="file"
                id="presentImage"
                name="presentImage"
                className="border border-gray-300 rounded-md p-2 flex-1"
                onChange={handleFileChange}
                accept="image/*" 
              />
            </div>

            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FileClaim;
