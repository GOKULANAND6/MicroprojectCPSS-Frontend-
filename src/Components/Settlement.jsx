// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { AiOutlineArrowLeft } from 'react-icons/ai';

// function Settlement() {
//   const location = useLocation();
//   const { id } = useParams();
//   const claimJson = location.state?.claimJson || '{}';
//   const claim = JSON.parse(claimJson);
//   const [record, setRecord] = useState('');
//   const [allRecord, setAllRecord] = useState('');
//   const [inputData, setInputData] = useState({
//     settlementAmount: '',
//     settlementStatus: '',
//     insuranceclaim: {}
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8060/claim/${id}`)
//       .then((response) => {
//         setRecord(response.data.carinsurance.customer.customerName);
//         console.log(response.data);
//         setInputData(prev => ({
//           ...prev,
//           settlementAmount: response.data.settlementAmount || '',
//           settlementStatus: response.data.settlementStatus || ''
//         }));
//       })
//       .catch((err) => {
//         console.log('Error fetching claims:', err);
//       });
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!inputData.settlementAmount || !inputData.settlementStatus) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Oops...',
//         text: 'Please fill all fields.',
//       });
//       return;
//     }

//     axios.post('http://localhost:8060/settlement', {
//       settlementAmount: inputData.settlementAmount,
//       settlementStatus: inputData.settlementStatus,
      
//     })
//       .then(() => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: 'Successfully Credited the Amount to the Customer',
//         }).then(() => {
//           navigate('/landingpage3');
//         });
//       })
//       .catch((err) => {
//         console.error('Error submitting the form:', err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: 'There was an error processing your request.',
//         });
//       });
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-teal-500 text-white py-4 px-6 flex items-center justify-between">
//       <button
//           onClick={handleGoBack}
//           className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
//         >
//           <AiOutlineArrowLeft size={24} />
//         </button>
//         <h1 className="text-xl font-semibold">Settle Amount</h1>
//       </header>

//       <div className="flex justify-center items-center p-6">
//         <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <h2 className="text-lg font-bold mb-4">Update Settlement Status</h2>

//             <div>
//               <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Customer Name:</label>
//               <input
//                 type="text"
//                 id="customer_name"
//                 name="customer_name"
//                 className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
//                 value={record}
//                 readOnly
//               />
//             </div>

//             <div>
//               <label htmlFor="settlement_amount" className="block text-sm font-medium text-gray-700">Settlement Amount:</label>
//               <input
//                 type="number"
//                 id="settlementAmount"
//                 name="settlementAmount"
//                 className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900"
//                 value={inputData.settlementAmount}
//                 onChange={(e) => setInputData({ ...inputData, settlementAmount: e.target.value })}
//               />
//             </div>

//             <div>
//               <label htmlFor="settlementStatus" className="block text-sm font-medium text-gray-700">Settlement Status:</label>
//               <select
//                 id="settlementStatus"
//                 name="settlementStatus"
//                 className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900"
//                 value={inputData.settlementStatus}
//                 onChange={(e) => setInputData({ ...inputData, settlementStatus: e.target.value })}
//               >
//                 <option value="" disabled>Select Status</option>
//                 <option value="Credited">Credited</option>
//                 <option value="Fake Reports">Fake Reports</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settlement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function Settlement() {
  const location = useLocation();
  const { id } = useParams();
  const claimJson = location.state?.claimJson || '{}';
  const claim = JSON.parse(claimJson);
  const [record, setRecord] = useState('');
  const [inputData, setInputData] = useState({
    settlementAmount: '',
    settlementStatus: '',
    insuranceclaim: {} // Initialize with an empty object
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8060/claim/${id}`)
      .then((response) => {
        const data = response.data;
        setRecord(data.carinsurance.customer.customerName);
        setInputData(prev => ({
          ...prev,
          settlementAmount: data.settlementAmount || '',
          settlementStatus: data.settlementStatus || '',
          insuranceclaim: data // Save the complete InsuranceClaim object
        }));
      })
      .catch((err) => {
        console.log('Error fetching claims:', err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputData.settlementAmount || !inputData.settlementStatus) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please fill all fields.',
      });
      return;
    }

    axios.post('http://localhost:8060/settlement', {
      settlementAmount: inputData.settlementAmount,
      settlementStatus: inputData.settlementStatus,
      insuranceclaim: inputData.insuranceclaim // Include the insuranceclaim object
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully Credited the Amount to the Customer',
      }).then(() => {
        navigate('/landingpage3');
      });
    })
    .catch((err) => {
      console.error('Error submitting the form:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error processing your request.',
      });
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-500 text-white py-4 px-6 flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="bg-white text-teal-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Settle Amount</h1>
      </header>

      <div className="flex justify-center items-center p-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-bold mb-4">Update Settlement Status</h2>

            <div>
              <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Customer Name:</label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
                value={record}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="settlement_amount" className="block text-sm font-medium text-gray-700">Settlement Amount:</label>
              <input
                type="number"
                id="settlementAmount"
                name="settlementAmount"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900"
                value={inputData.settlementAmount}
                onChange={(e) => setInputData({ ...inputData, settlementAmount: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="settlementStatus" className="block text-sm font-medium text-gray-700">Settlement Status:</label>
              <select
                id="settlementStatus"
                name="settlementStatus"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900"
                value={inputData.settlementStatus}
                onChange={(e) => setInputData({ ...inputData, settlementStatus: e.target.value })}
              >
                <option value="" disabled>Select Status</option>
                <option value="Credited">Credited</option>
                <option value="Fake Reports">Fake Reports</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settlement;
