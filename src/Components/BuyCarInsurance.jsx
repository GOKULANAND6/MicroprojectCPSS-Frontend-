import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaShieldAlt, FaCar, FaTag, FaCalendar, FaKey, FaMoneyBillWave, FaCarSide } from 'react-icons/fa';
import Logo from './back.png';

function BuyCarInsurance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    policyName: "",
    policyScheme: "",
    policyNumber: "",
    carMake: "",
    carName: "",
    carModel: "",
    carYear: "",
    carBuyingdate: "",
    carNumber: "",
    policyAmount: "",
    customer: {}
  });
  const [carOptions, setCarOptions] = useState([]);
  const [carDetails, setCarDetails] = useState({});

  const policyBaseAmount = {
    "Standalone Own Car Insurance Policy": 1000,
    "Comprehensive Car Insurance Policy": 2000,
    "Third Party Car Insurance Policy": 3000,
  };

  useEffect(() => {
    const fetchCustomerAndVehicleData = async () => {
      try {
        const customerData = sessionStorage.getItem("loggedInUser");
        if (customerData) {
          const parsedCustomerData = JSON.parse(customerData);
          setInputData(prevState => ({
            ...prevState,
            customer: parsedCustomerData
          }));

          const vehicleResponse = await axios.get('http://localhost:8060/registervehicles/all');
          const allVehicles = vehicleResponse.data;

          const filteredVehicles = allVehicles.filter(vehicle => vehicle.customer.customerId === parseInt(id));

          setCarOptions(filteredVehicles);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Error fetching data',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    fetchCustomerAndVehicleData();
  }, [id]);

  const handlePolicyChange = (e) => {
    const policyName = e.target.value;
    const policyAmount = policyBaseAmount[policyName] || "";
    const policyNumber = policyName === "Standalone Own Car Insurance Policy" ? "SCP1"
                         : policyName === "Comprehensive Car Insurance Policy" ? "CCP1"
                         : policyName === "Third Party Car Insurance Policy" ? "TCP1"
                         : "";

    setInputData(prevState => ({
      ...prevState,
      policyName: policyName,
      policyNumber: policyNumber,
      policyAmount: calculatePolicyAmount(policyAmount, prevState.policyScheme)
    }));
  };

  const handleSchemeChange = (e) => {
    const policyScheme = e.target.value;
    const currentBaseAmount = policyBaseAmount[inputData.policyName] || "";
    setInputData(prevState => ({
      ...prevState,
      policyScheme: policyScheme,
      policyAmount: calculatePolicyAmount(currentBaseAmount, policyScheme)
    }));
  };

  const calculatePolicyAmount = (baseAmount, scheme) => {
    return baseAmount * (scheme || 0);
  };

  const handleCarNumberSelect = (e) => {
    const carNumber = e.target.value;
    setInputData(prevState => ({ ...prevState, carNumber: carNumber }));

    if (carNumber) {
      const selectedCar = carOptions.find(vehicle => vehicle.vehicleNumber === carNumber);

      if (selectedCar) {
        setCarDetails(selectedCar);
        setInputData(prevState => ({
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
    } else if (!data.carYear) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter the year of your car!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (!data.carBuyingdate) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter the buying date of your car!',
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
        <h1 className="text-2xl font-bold">Car Insurance Filing Form</h1>
      </header>

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
              <select
                id="policyScheme"
                name="policyScheme"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.policyScheme}
                onChange={handleSchemeChange}
              >
                <option value="">Select Scheme</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <FaCarSide className="text-teal-600 w-6 h-6" />
              <label htmlFor="carNumber" className="flex-1 font-bold">
                Car Number:
              </label>
              <select
                id="carNumber"
                name="carNumber"
                className="border border-gray-300 rounded-md p-2 flex-1"
                required
                value={inputData.carNumber}
                onChange={handleCarNumberSelect}
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
                id="carMake"
                name="carMake"
                className="border border-gray-300 rounded-md p-2 flex-1"
                type="text"
                value={inputData.carMake}
                readOnly
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carName" className="flex-1 font-bold">
                Car Model:
              </label>
              <input
                id="carName"
                name="carName"
                className="border border-gray-300 rounded-md p-2 flex-1"
                type="text"
                value={inputData.carName}
                readOnly
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCalendar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carYear" className="flex-1 font-bold">
                Car Year:
              </label>
              <input
                id="carYear"
                name="carYear"
                className="border border-gray-300 rounded-md p-2 flex-1"
                type="text"
                value={inputData.carYear}
                readOnly
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaCalendar className="text-teal-600 w-6 h-6" />
              <label htmlFor="carBuyingdate" className="flex-1 font-bold">
                Car Buying Date:
              </label>
              <input
                id="carBuyingdate"
                name="carBuyingdate"
                className="border border-gray-300 rounded-md p-2 flex-1"
                type="text"
                value={inputData.carBuyingdate}
                readOnly
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaMoneyBillWave className="text-teal-600 w-6 h-6" />
              <label htmlFor="policyAmount" className="flex-1 font-bold">
                Policy Amount:
              </label>
              <input
                id="policyAmount"
                name="policyAmount"
                className="border border-gray-300 rounded-md p-2 flex-1"
                type="text"
                value={inputData.policyAmount}
                readOnly
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

export default BuyCarInsurance;
