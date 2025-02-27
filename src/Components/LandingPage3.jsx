import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import './LandingPage.css';
import axios from "axios";
import { FaBell } from 'react-icons/fa'
import carimage from './thar.jpeg';
import bikeimage from './honda.png';
import healthimage from './health.jpg';
import About from './About';
import Footer from './Footer';
import video from './video.mp4';

Modal.setAppElement('#root');

function LandingPage3() {
  const [modalOpen, setModalOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [isVideoPoppedUp, setVideoPopUp] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hasNewClaims, setHasNewClaims] = useState(false);
  const navigate = useNavigate();
  const [records, setRecords] = useState();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openClaimModal = () => setClaimModalOpen(true);
  const closeClaimModal = () => setClaimModalOpen(false);

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    const checkForNewClaims = async () => {
      try {
        const response = await fetch('http://localhost:8060/claims/new');
        const data = await response.json();
        setHasNewClaims(data.length > 0);
      } catch (err) {
        console.error('Error checking for new claims:', err);
      }
    };

    checkForNewClaims();
  }, []);

  return (
    <div>
      <div className="hero-image flex items-center justify-center text-white"></div>

      <nav className="navbar bg-white bg-opacity-80 rounded-b-lg shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-800">
            <i className="fa fa-shield" style={{ fontSize: '25px' }} aria-hidden="true"></i>
            Go Claim Insurance Pvt. Ltd
          </a>
          <div className="hidden md:flex space-x-4 items-center">

            <Link to="/viewcustomers"><a  className="text-gray-800 hover:text-blue-500 font-bold">
              View Customer Details
            </a></Link>   

            <Link to="/viewclaimnotification" className="relative inline-block">
                <FaBell className="h-6 w-6 text-gray-800 hover:text-blue-500" />
                {hasNewClaims && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                    New
                  </span>
                )}
            </Link>   

            <Link to="/settlement"><a href="/viewcustomers" className="text-gray-800 hover:text-blue-500 font-bold">
              Settle Amount
            </a></Link>       

            
            <div className="relative">
            <button onClick={handleProfileClick} className="flex items-center text-gray-800 hover:text-blue-500">
              <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_small-512.png" alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-300" />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <Link to="/viewadminprofile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Your Info</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Logout</button>
              </div>
              )}
            </div>

          </div>
          <button className="md:hidden px-4 py-2 text-gray-800 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className="md:hidden p-4">
          <a href="/" className="block text-gray-800 hover:text-blue-500">Home</a>
          <a href="/" className="block text-gray-800 hover:text-blue-500">About</a>
          <a href="/" className="block text-gray-800 hover:text-blue-500">Services</a>
          <a href="/" className="block text-gray-800 hover:text-blue-500">Contact</a>
          <button onClick={openClaimModal} className="block text-gray-800 hover:text-blue-500 flex items-center">
            <span className="mr-2 font-bold">Claim</span>
          </button>
        </div>
      </nav>

      <div className="heading">
        <h1>
          <span id="gold">Buy Insurance</span>
        </h1>
      </div>

      <div className="image-section flex flex-wrap justify-center gap-8 p-4">
        <Link to="/buycarinsurance" className="text-center">
          <img src={carimage} alt="Car" className="h-24 w-24 rounded-full border-4 border-white shadow-lg" />
          <div className="text-white text-lg mt-2">Car Insurance</div>
        </Link>
        <Link to="/buycarinsurance" className="text-center">
          <img src={bikeimage} alt="Bike" className="h-24 w-24 rounded-full border-4 border-white shadow-lg" />
          <div className="text-white text-lg mt-2">Bike Insurance</div>
        </Link>
        <Link to="/buycarinsurance" className="text-center">
          <img src={healthimage} alt="Health" className="h-24 w-24 rounded-full border-4 border-white shadow-lg" />
          <div className="text-white text-lg mt-2">Health Insurance</div>
        </Link>
      </div>

      <div className="content">
        <h1>
          Everything is for your <span id="gold">Home & Future</span>
        </h1>
        <p>10,00,000+ Successful Customers</p>
      </div>

      <Modal
        isOpen={claimModalOpen}
        onRequestClose={closeClaimModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black/30"
        overlayClassName="fixed inset-0 bg-black/30"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={closeClaimModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold mb-4 text-center">Select Claim Option</h2>
          <div className="flex flex-col space-y-4">
            <Link to="/fileclaim" className="block text-center text-blue-500 text-lg">
              File a Claim
            </Link>
            <Link to="/viewclaimstatus" className="block text-center text-blue-500 text-lg">
              Claim Status
            </Link>
            <Link to="/viewsettlementstatus" className="block text-center text-blue-500 text-lg">
              Settlement Status
            </Link>
          </div>
        </div>
      </Modal>

      <br></br><br></br>

      <div className="space-y-3 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Why Insurance?
        </h1>
        <div className="flex-1 max-w-xl mx-auto mt-14 xl:mt-0">
          <div className="relative">
            <button
              className="absolute w-16 h-16 rounded-full inset-0 m-auto duration-150 bg-blue-500 hover:bg-blue-600 ring-offset-2 focus:ring text-white" id="video"
              onClick={() => setVideoPopUp(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 m-auto">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </div>

        {isVideoPoppedUp && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full bg-black/50" onClick={() => setVideoPopUp(false)}></div>
            <div className="px-4 relative">
              <button
                className="w-12 h-12 mb-5 rounded-full duration-150 bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => setVideoPopUp(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-auto">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
              <video className="rounded-lg w-full max-w-2xl" controls autoPlay={true}>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>

      <br></br><br></br>

      <About />
      <Footer />
    </div>
  );
}

export default LandingPage3;
