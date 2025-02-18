import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AppointmentForm.css";

const AppointmentForm = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { clinic, doctor, selectedDate, slotId, slotTime } = location.state || {};

  const [fullName, setFullName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "+911234567890");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!clinic || !doctor) {
      setError("Missing clinic or doctor information");
    }
  }, [clinic, doctor]);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/checkout/booking", {
        amount: 1000, // Example amount
        clinicId: "clinicId", // Example
        doctorId: "doctorId", // Example
        appointmentDate: "2025-02-20", // Example date
        slotTime: "10:00 AM", // Example time
      });
  
      // Check if the response contains the expected data
      if (data && data.orderId) {
        const options = {
          key: "rzp_test_tcw7K00n3n9dSW", // Razorpay key
          amount: data.amount,
          currency: "INR",
          order_id: data.orderId, // Use orderId safely
          handler: async function (response) {
            try {
              // Payment verification logic
            } catch (error) {
              console.error("Payment verification failed:", error);
            }
          },
          prefill: {
            name: fullName,
            email: email,
            contact: mobile,
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        if (window.Razorpay) {
          const paymentWindow = new Razorpay(options);
          paymentWindow.open();
        } else {
          console.error("Razorpay script is not loaded");
        }
      } else {
        console.error("Missing order details in response");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setError("Failed to initialize payment. Please try again.");
    }
  };
  
  return (
    <div className="appointment-container">
      {error && <div className="error-message">{error}</div>}
      
      <div className="booking-details">
        <h3>🩺 In-clinic Appointment</h3>
        <div className="appointment-info">
          📅 <b>{selectedDate || "N/A"}</b> | ⏰ <b>{slotTime || "N/A"}</b>
        </div>

        {doctor && (
          <div className="doctor-info">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h4>{doctor.name}</h4>
            <p>{doctor.specialization}</p>
          </div>
        )}

        {clinic && (
          <div className="clinic-info">
            <h4>🏥 <b>{clinic.name}</b></h4>
            <p>{clinic.location}</p> {/* Changed from clinic.address */}
            <p>⏰ {clinic.openingTime} - {clinic.closingTime}</p>
            <p>📅 Working Days: {clinic.workingDays}</p>
            <p>⭐ Rating: {clinic.rating}</p>
            <p>💰 Consultation Fee: ₹{clinic.fee}</p>
          </div>
        )}
      </div>

      <div className="patient-details">
        <h3>Patient Details</h3>
        <label>Full Name</label>
        <input 
          type="text" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)}
          required 
        />

        <label>Mobile</label>
        <input type="text" value={mobile} readOnly />

        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />

        <button 
          onClick={handlePayment} 
          className="confirm-btn"
          disabled={!fullName || !email}
        >
          Confirm Clinic Visit - Pay ₹{clinic?.fee}
        </button>
      </div>
    </div>
  );
};

export default AppointmentForm;