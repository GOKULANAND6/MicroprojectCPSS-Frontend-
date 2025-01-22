import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from './back.png';

const SignupCustomer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:8060/customer', data);
            Swal.fire('Success', 'Data added successfully', 'success');
            navigate('/logincustomer');
            console.log(res.data);
        } catch (err) {
            Swal.fire('Error', 'Failed to add data', 'error');
            console.log(err);
        }
    };

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address';
    const validateMobile = (value) => /^[0-9]{10}$/.test(value) || 'Mobile number must be 10 digits';
    const validatePincode = (value) => /^[0-9]{6}$/.test(value) || 'Pincode must be 6 digits';
    const validateDob = (value) => {
        const today = new Date();
        const dob = new Date(value);
        const age = today.getFullYear() - dob.getFullYear();
        return age >= 18 || 'You must be at least 18 years old';
    };

    return (
        <div className="bg-gray-100 flex flex-col min-h-screen">
            <header className="bg-teal-600 text-white p-4 flex items-center justify-between rounded-lg shadow-md mb-6">
                <button className="bg-white text-blue-500 p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={() => navigate(-1)}>
                    <img src={Logo} alt="Logo" className="w-8 h-8" />
                </button>
                <h1 className="text-2xl font-bold">Customer Registration Form</h1>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                            <input
                                type="text"
                                id="customerName"
                                {...register('customerName', { required: 'Customer Name is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                            <input
                                type="email"
                                id="customerEmail"
                                {...register('customerEmail', { 
                                    required: 'Email is required', 
                                    validate: validateEmail 
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerMobile" className="block text-sm font-medium text-gray-700 mb-2">Customer Mobile</label>
                            <input
                                type="text"
                                id="customerMobile"
                                {...register('customerMobile', { 
                                    required: 'Mobile number is required', 
                                    validate: validateMobile 
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.customerMobile && <p className="text-red-500 text-xs mt-1">{errors.customerMobile.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">Customer Address</label>
                            <input
                                type="text"
                                id="customerAddress"
                                {...register('customerAddress', { required: 'Address is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.customerAddress && <p className="text-red-500 text-xs mt-1">{errors.customerAddress.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerPincode" className="block text-sm font-medium text-gray-700 mb-2">Customer Pincode</label>
                            <input
                                type="text"
                                id="customerPincode"
                                {...register('customerPincode', { 
                                    required: 'Pincode is required', 
                                    validate: validatePincode 
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.customerPincode && <p className="text-red-500 text-xs mt-1">{errors.customerPincode.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerDob" className="block text-sm font-medium text-gray-700 mb-2">Customer Date of Birth</label>
                            <input
                                type="date"
                                id="customerDob"
                                {...register('customerDob', { 
                                    required: 'Date of Birth is required', 
                                    validate: validateDob 
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.customerDob && <p className="text-red-500 text-xs mt-1">{errors.customerDob.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerGender" className="block text-sm font-medium text-gray-700 mb-2">Customer Gender</label>
                            <select
                                id="customerGender"
                                {...register('customerGender', { required: 'Gender is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.customerGender && <p className="text-red-500 text-xs mt-1">{errors.customerGender.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="customerPassword" className="block text-sm font-medium text-gray-700 mb-2">Customer Password</label>
                            <input
                                type="password"
                                id="customerPassword"
                                {...register('customerPassword', { 
                                    required: 'Password is required', 
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.customerPassword && <p className="text-red-500 text-xs mt-1">{errors.customerPassword.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SignupCustomer;
