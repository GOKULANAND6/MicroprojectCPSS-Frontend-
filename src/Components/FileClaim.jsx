import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCar, FaCalendar, FaKey, FaExclamationTriangle, FaFileAlt, FaImage } from 'react-icons/fa';
import Logo from './back.png';

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
  const [insuranceAvailable, setInsuranceAvailable] = useState(false);
  const [carOptions, setCarOptions] = useState([]); // New state to store car options

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
        setInsuranceAvailable(true);
      } catch (error) {
        console.error("Error parsing insurance data", error);
        setInsuranceAvailable(false);
      }
    } else {
      setInsuranceAvailable(false);
    }

    axios.get("http://localhost:8060/registervehicles/all")
      .then(response => {
        setCarOptions(response.data);
      })
      .catch(err => console.error('Error fetching car options:', err));
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

  const handleCarNumberChange = (e) => {
    const carNumber = e.target.value;
    setFormData(prevState => ({ ...prevState, carNumber: carNumber }));

    if (carNumber) {
      // Find the selected car details from carOptions
      const selectedCar = carOptions.find(vehicle => vehicle.vehicleNumber === carNumber);

      if (selectedCar) {
        setFormData(prevState => ({
          ...prevState,
          carMake: selectedCar.vehicleMake || "",
          carName: selectedCar.vehicleName || "",
          carModel: selectedCar.vehicleModel || "",
          carYear: selectedCar.vehicleYear || "",
          carBuyingdate: selectedCar.vehicleBuyingdate || ""
        }));
      } else {
        console.error('Car details not found');
      }
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
        navigate('/landingpage2');
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
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-md mb-6">
        <button className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold">File a Claim</h1>
      </header>

      <div className="flex-grow flex items-center justify-center bg-gray-100 p-6">
        {insuranceAvailable ? (
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
                <label htmlFor="carNumber" className="flex-1 font-bold">
                  Car Number:
                </label>
                <select
                  id="carNumber"
                  name="carNumber"
                  className="border border-gray-300 rounded-md p-2 flex-1"
                  value={formData.carNumber}
                  onChange={handleCarNumberChange}
                  required
                >
                  <option value="">Select Car Number</option>
                  {carOptions.map((car) => (
                    <option key={car.vehicleNumber} value={car.vehicleNumber}>
                      {car.vehicleNumber}
                    </option>
                  ))}
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  accept=".pdf, .jpg, .jpeg, .png"
                  required
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
                  accept=".jpg, .jpeg, .png"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700 transition-colors"
              >
                Submit Claim
              </button>
            </div>
          </form>
        ) : (
          <p className="text-red-500 font-bold">
            No active insurance policy found. Please ensure you have an active policy.
          </p>
        )}
      </div>
    </div>
  );
}

export default FileClaim;
