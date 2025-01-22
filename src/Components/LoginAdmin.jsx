import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import Logo from './back.png';

function LoginAdmin() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    adminName: '',
    adminPassword: '',
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8060/admin/all');
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching registered users data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to fetch users',
          text: 'Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { adminName, adminPassword } = inputData;

    const user = registeredUsers.find(
      (user) => user.adminName === adminName && user.adminPassword === adminPassword
    );

    if (user) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have logged in successfully.',
      }).then(() => {
        navigate('/landingpage3');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials',
        text: 'Please check your username and password and try again.',
      });
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
        <h1 className="text-2xl font-bold">Admin Login</h1>
      </header>

      <div className="flex-grow flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="p-2 text-gray-500">
                <AiOutlineUser size={20} />
              </div>
              <input
                type="text"
                id="adminName"
                placeholder="Admin Name"
                className="flex-grow p-2 outline-none bg-transparent"
                required
                value={inputData.adminName}
                onChange={(e) => setInputData({ ...inputData, adminName: e.target.value })}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="p-2 text-gray-500">
                <AiOutlineLock size={20} />
              </div>
              <input
                type="password"
                id="adminPassword"
                value={inputData.adminPassword}
                onChange={(e) => setInputData({ ...inputData, adminPassword: e.target.value })}
                placeholder="Password"
                className="flex-grow p-2 outline-none bg-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
