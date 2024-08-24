import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const SignupCustomer = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        customerName: '',
        customerEmail: '',
        customerMobile: '',
        customerAddress: '',
        customerPincode: '',
        customerDob: '',
        customerAge: '',
        customerGender: '',
        customerPassword: ''
    });

    const onSubmit = async () => {
        const validationResult = validateValues(inputData);
        
        if (validationResult.isValid) {
            try {
                const res = await axios.post('http://localhost:8060/customer', inputData);
                Swal.fire('Success', 'Data added successfully', 'success');
                navigate('/logincustomer');
                console.log(res.data);
            } catch (err) {
                Swal.fire('Error', 'Failed to add data', 'error');
                console.log(err);
            }
        } else {
            Swal.fire('Validation Error', validationResult.message, 'error');
        }
    };

    const validateValues = (data) => {
        if (!data.customerName.trim()) {
            return { isValid: false, message: 'Please enter the Customer Name!' };
        }
        if (!data.customerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)) {
            return { isValid: false, message: 'Please enter a valid Customer Email!' };
        }
        if (!data.customerMobile.trim() || !/^[0-9]{10}$/.test(data.customerMobile)) {
            return { isValid: false, message: 'Please enter a valid Customer Mobile!' };
        }
        if (!data.customerAddress.trim()) {
            return { isValid: false, message: 'Please enter the Customer Address!' };
        }
        if (!data.customerPincode.trim() || !/^[0-9]{6}$/.test(data.customerPincode)) {
            return { isValid: false, message: 'Please enter a valid Customer Pincode!' };
        }
        if (!data.customerDob.trim()) {
            return { isValid: false, message: 'Please enter the Customer Date of Birth!' };
        }
        if (!data.customerAge || data.customerAge < 1) {
            return { isValid: false, message: 'Please enter a valid Customer Age!' };
        }
        if (!data.customerGender) {
            return { isValid: false, message: 'Please select the Customer Gender!' };
        }
        if (!data.customerPassword.trim() || data.customerPassword.length < 6) {
            return { isValid: false, message: 'Please enter a valid Customer Password!' };
        }
        return { isValid: true, message: '' };
    };

    return (
        <div className="bg-gray-100 flex flex-col min-h-screen">
            <header className="bg-teal-600 text-white py-4 rounded-b-lg flex justify-between items-center px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-teal-700 px-4 py-2 rounded-lg shadow-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Back
                </button>
                <div className="text-center text-2xl font-bold">Customer Registration Form</div>
                <div></div>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                            <input
                                type="text"
                                id="customerName"
                                {...register('customerName')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerName: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                            <input
                                type="email"
                                id="customerEmail"
                                {...register('customerEmail')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerEmail: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerMobile" className="block text-sm font-medium text-gray-700 mb-2">Customer Mobile</label>
                            <input
                                type="text"
                                id="customerMobile"
                                {...register('customerMobile')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerMobile: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">Customer Address</label>
                            <input
                                type="text"
                                id="customerAddress"
                                {...register('customerAddress')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerAddress: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerPincode" className="block text-sm font-medium text-gray-700 mb-2">Customer Pincode</label>
                            <input
                                type="text"
                                id="customerPincode"
                                {...register('customerPincode')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerPincode: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerDob" className="block text-sm font-medium text-gray-700 mb-2">Customer Date of Birth</label>
                            <input
                                type="date"
                                id="customerDob"
                                {...register('customerDob')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerDob: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerAge" className="block text-sm font-medium text-gray-700 mb-2">Customer Age</label>
                            <input
                                type="number"
                                id="customerAge"
                                {...register('customerAge')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerAge: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerGender" className="block text-sm font-medium text-gray-700 mb-2">Customer Gender</label>
                            <select
                                id="customerGender"
                                {...register('customerGender')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerGender: e.target.value })}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="customerPassword" className="block text-sm font-medium text-gray-700 mb-2">Customer Password</label>
                            <input
                                type="password"
                                id="customerPassword"
                                {...register('customerPassword')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setInputData({ ...inputData, customerPassword: e.target.value })}
                            />
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
