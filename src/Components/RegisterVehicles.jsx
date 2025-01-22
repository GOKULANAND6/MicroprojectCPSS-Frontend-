import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCar, FaCalendar, FaKey } from 'react-icons/fa';
import Logo from './back.png';

function RegisterVehicles() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    vehicleMake: '',
    vehicleName: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleBuyingdate: '',
    vehicleNumber: '',
    customer: {}
  });
  useEffect(() => {
    const customerData = sessionStorage.getItem("loggedInUser");

    if (customerData) {
      const parsedCustomerData = JSON.parse(customerData);
      setInputData(prevState => ({
        ...prevState,
        customer: parsedCustomerData
      }));
      console.log(parsedCustomerData);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateValues(inputData);

    if (result) {
      axios
        .post("http://localhost:8060/registervehicles", inputData)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem('Insurance', JSON.stringify(res.data)); 
          Swal.fire({
            title: 'Success!',
            text: 'Successfully added your vehicle',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate("/landingpage2");
          });
        })
        .catch((err) => console.error('Error submitting the form:', err));
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter valid inputs!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const validateValues = (data) => {
    if (!data.vehicleName) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a Vehicle name!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (!data.vehicleMake) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter Vehicle Brand!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else {
      return true;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-md mb-6">
        <button className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold">Vehicle Registration</h1>
      </header>

      <div className="flex-grow flex items-center justify-center bg-gray-100 p-6">
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="flex items-center space-x-3">
              <FaCar className="text-teal-600 w-6 h-6" />
              <label htmlFor="vehicleMake" className="flex-1 font-bold">Vehicle Make:</label>
              <input
                type="text"
                id="vehicleMake"
                name="vehicleMake"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.vehicleMake}
                onChange={(e) =>
                    setInputData({ ...inputData, vehicleMake: e.target.value })
                  }
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCar className="text-teal-600 w-6 h-6" />
              <label htmlFor="vehicleName" className="flex-1 font-bold">Vehicle Name:</label>
              <input
                type="text"
                id="vehicleName"
                name="vehicleName"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.vehicleName}
                onChange={(e) =>
                    setInputData({ ...inputData, vehicleName: e.target.value })
                  }
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCar className="text-teal-600 w-6 h-6" />
              <label htmlFor="vehicleModel" className="flex-1 font-bold">Vehicle Model:</label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.vehicleModel}
                onChange={(e) =>
                    setInputData({ ...inputData, vehicleModel: e.target.value })
                  }
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCalendar className="text-teal-600 w-6 h-6" />
              <label htmlFor="vehicleYear" className="flex-1 font-bold">Vehicle Year:</label>
              <input
                type="number"
                id="vehicleYear"
                name="vehicleYear"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.vehicleYear}
                onChange={(e) =>
                    setInputData({ ...inputData, vehicleYear: e.target.value })
                  }
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCalendar className="text-teal-600 w-6 h-6" />
              <label htmlFor="vehicleBuyingdate" className="flex-1 font-bold">Vehicle Buying Date:</label>
              <input
                type="date"
                id="vehicleBuyingdate"
                name="vehicleBuyingdate"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.vehicleBuyingdate}
                onChange={(e) =>
                    setInputData({ ...inputData, vehicleBuyingdate: e.target.value })
                  }
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaKey className="text-teal-600 w-6 h-6" />
              <label htmlFor="vehicleNumber" className="flex-1 font-bold">Vehicle Registration Number:</label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.vehicleNumber}
                onChange={(e) =>
                    setInputData({ ...inputData, vehicleNumber: e.target.value })
                  }
              />
            </div>

            <button
              type="submit"
              className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterVehicles;
