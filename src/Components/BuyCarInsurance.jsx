import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaShieldAlt, FaCar, FaTag, FaCalendar, FaKey, FaMoneyBillWave, FaCarSide } from 'react-icons/fa';

function BuyCarInsurance() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    policyName: "",
    policyScheme: "",
    carMake: "",
    carName: "",
    carModel: "",
    carYear: "",
    carBuyingdate: "",
    carNumber: "",
    policyAmount: "", 
    customer: {}
  });

  const handleGoBack = () => {
    navigate(-1);
  };

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

  const handlePolicyChange = (e) => {
    const policyName = e.target.value;
    let policyAmount = "";

    switch (policyName) {
      case "Standalone Own Car Insurance Policy":
        policyAmount = "10000";
        break;
      case "Comprehensive Car Insurance Policy":
        policyAmount = "20000";
        break;
      case "Third Party Car Insurance Policy":
        policyAmount = "30000";
        break;
      default:
        policyAmount = "";
    }

    setInputData({
      ...inputData,
      policyName: policyName,
      policyAmount: policyAmount
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateValues(inputData);

    if (result) {
      axios
        .post("http://localhost:8060/carinsurance", inputData)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem('Insurance', JSON.stringify(res.data)); 
          Swal.fire({
            title: 'Success!',
            text: 'Successfully filed a Policy',
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
    if (!data.policyName) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a policy name!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (!data.policyScheme) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter policy scheme!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (!data.carMake) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter your car brand name!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (!data.carName) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter your car model name!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (!data.carNumber) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter your car registration number!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else {
      return true;
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
        <h1 className="text-2xl font-bold">Car Insurance Filing Form</h1>
      </div>

      <div className="flex-grow flex items-center justify-center bg-gray-100 p-6">
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="text-teal-600 w-6 h-6" />
              <label htmlFor="policyName" className="flex-1 font-bold">
                Policy Name:
              </label>
              <select
                id="policyName"
                name="policyName"
                className="border border-gray-300 rounded-md p-1 flex-1"
                required
                value={inputData.policyName}
                onChange={handlePolicyChange}
              >
                <option value="">Select a Policy</option>
                <option value="Standalone Own Car Insurance Policy">Standalone Own Car Insurance Policy</option>
                <option value="Comprehensive Car Insurance Policy">Comprehensive Car Insurance Policy</option>
                <option value="Third Party Car Insurance Policy">Third Party Car Insurance Policy</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <FaTag className="text-teal-600 w-6 h-6" />
              <label htmlFor="policyScheme" className="flex-1 font-bold">
                Policy Scheme:
              </label>
              <input
                type="text"
                id="policyScheme"
                name="policyScheme"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.policyScheme}
                onChange={(e) =>
                  setInputData({ ...inputData, policyScheme: e.target.value })
                }
              />
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
                required
                value={inputData.carMake}
                onChange={(e) =>
                  setInputData({ ...inputData, carMake: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCarSide className="text-teal-600 w-6 h-6" />
              <label htmlFor="carName" className="flex-1 font-bold">
                Car Name:
              </label>
              <input
                type="text"
                id="carName"
                name="carName"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.carName}
                onChange={(e) =>
                  setInputData({ ...inputData, carName: e.target.value })
                }
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
                required
                value={inputData.carModel}
                onChange={(e) =>
                  setInputData({ ...inputData, carModel: e.target.value })
                }
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
                required
                value={inputData.carYear}
                onChange={(e) =>
                  setInputData({ ...inputData, carYear: e.target.value })
                }
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
                required
                value={inputData.carBuyingdate}
                onChange={(e) =>
                  setInputData({ ...inputData, carBuyingdate: e.target.value })
                }
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
                required
                value={inputData.carNumber}
                onChange={(e) =>
                  setInputData({ ...inputData, carNumber: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaMoneyBillWave className="text-teal-600 w-6 h-6" />
              <label htmlFor="policyAmount" className="flex-1 font-bold">
                Policy Amount:
              </label>
              <input
                type="text"
                id="policyAmount"
                name="policyAmount"
                className="border border-gray-300 rounded-md p-2 flex-1"
                readOnly
                value={inputData.policyAmount}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-2 w-full rounded-md hover:bg-teal-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuyCarInsurance;
