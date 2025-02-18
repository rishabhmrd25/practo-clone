import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy-loaded components
const Search = lazy(() => import("./pages/Search/Search.jsx"));

// Regular imports
import Home from "./pages/Home/Home.jsx";
import ListDentist from "./pages/ListDentist/ListDentist.jsx";
import ListCough from "./pages/ListCough/ListCough.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile.jsx";
import PaymentSummary from "./pages/PaymentSummary/PaymentSummary.jsx";
import Success from "./pages/Success/Success.jsx";
import Cancel from "./pages/Cancel/Cancel.jsx";
import SlotBooking from "./pages/SlotBooking/SlotBooking.jsx";
import AppointmentForm from "./pages/AppointmentForm/AppointmentForm.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Lazy-loaded Search Page */}
        <Route
          path="/search"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
          }
        />
        
        {/* Other Routes */}
        <Route path="/list-dentist" element={<ListDentist />} />
        <Route path="/list-cough" element={<ListCough />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/payment-summary" element={<PaymentSummary />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* New Routes for Booking */}
        <Route path="/slot-booking" element={<SlotBooking />} />
        <Route path="/appointmentForm" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
