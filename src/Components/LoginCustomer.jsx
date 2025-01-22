import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Logo from './back.png';

function LoginCustomer() {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        customerEmail: '',
        customerPassword: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8060/customer/all');
                setRegisteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching registered users data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { customerEmail, customerPassword } = inputData;

        const user = registeredUsers.find(
            (user) => user.customerEmail === customerEmail && user.customerPassword === customerPassword
        );

        if (user) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            Swal.fire({
                title: 'Success',
                text: 'Logged In Successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/landingpage2');
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Invalid credentials. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleGoBack = () => {
        navigate(-1); 
      };

    return (
        <div className="bg-gray-100 flex flex-col min-h-screen">
            <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-md mb-6">
                <button className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleGoBack}>
                <img src={Logo} alt="Logo" className="w-8 h-8" />
                </button>
                <h1 className="text-2xl font-bold">Customer Login</h1>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={inputData.customerEmail}
                                onChange={(e) => setInputData({ ...inputData, customerEmail: e.target.value })}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={inputData.customerPassword}
                                onChange={(e) => setInputData({ ...inputData, customerPassword: e.target.value })}
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account? 
                            <Link to="/signupcustomer">
                                <a className="text-red-600 font-semibold">
                                    Register here
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginCustomer;
