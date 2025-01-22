import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './LandingPage'
import LandingPage2 from './LandingPage2'
import LoginCustomer from './LoginCustomer'
import SignupCustomer from './SignupCustomer'
import RegisterVehicles from './RegisterVehicles'
import BuyCarInsurance from './BuyCarInsurance'
import FileClaim from './FileClaim'
import ViewClaimStatus from './ViewClaimStatus'
import ViewSettlementStatus from './ViewSettlementStatus'
import LoginAdmin from './LoginAdmin'
import LandingPage3 from './LandingPage3'
import ViewCustomers from './ViewCustomers'
import ViewPolicies from './ViewPolicies'
import ViewClaimNotification from './ViewClaimNotification'
import ProcessClaim from './ProcessClaim'
import ViewProcessedClaim from './ViewProcessedClaim'
import UpdateStatus from './UpdateStatus'
import ViewClaim from './ViewClaim'
import Settlement from './Settlement'
import ViewCustomerProfile from './ViewCustomerProfile'
import ViewAdminProfile from './ViewAdminProfile'
import ViewRegisteredVehicles from './ViewRegisteredVehicles'

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/landingpage2" element={<LandingPage2 />} />
            <Route path='/landingpage3' element={<LandingPage3 />} />
            <Route path="/logincustomer" element={<LoginCustomer />} />
            <Route path="/loginadmin" element={<LoginAdmin />} />
            <Route path="/signupcustomer" element={<SignupCustomer />} />
            <Route path="/registervehicles" element={<RegisterVehicles />} />
            <Route path="/viewregisteredvehicles/:id" element={<ViewRegisteredVehicles />} />
            <Route path="/buycarinsurance/:id" element={<BuyCarInsurance />} />
            <Route path="/fileclaim" element={<FileClaim />} />
            <Route path="/viewclaimstatus" element={<ViewClaimStatus />} />
            <Route path="/viewsettlementstatus" element={<ViewSettlementStatus />} />
            <Route path="/viewcustomers" element={<ViewCustomers />} />
            <Route path="/viewpolicy/:id" element={<ViewPolicies />} />
            <Route path="/viewclaimnotification" element={<ViewClaimNotification />} />
            <Route path="/processclaim" element={<ProcessClaim />} />
            <Route path="/viewprocessedclaim" element={<ViewProcessedClaim />} />
            <Route path="/updatestatus/:id" element={<UpdateStatus />} />
            <Route path="/settlement" element={<ViewClaim />} />
            <Route path="/payment/:id" element={<Settlement />} />
            <Route path="/viewcustomerprofile/:id" element={<ViewCustomerProfile />} />
            <Route path="/viewadminprofile" element={<ViewAdminProfile />} />
        </Routes>
    </Router>
  )
}

export default AppRouter
