import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DoctorProfile.css";

import SlotBooking from "../SlotBooking/SlotBooking.jsx"; // Import SlotBooking Component

const DoctorProfile = () => {
  const { id } = useParams();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [slots, setSlots] = useState([]);
  const [userStories, setUserStories] = useState([]); // State for User Stories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("Login / Signup");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedClinic, setSelectedClinic] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);

      // Fetch Doctor Data
      axios
        .get(`http://localhost:5000/api/v1/get/doctor/id/${id}`)
        .then((res) => {
          setDoctor(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch doctor data.");
        });

      // Fetch Clinics Associated with this Doctor
      axios
        .get(`http://localhost:5000/api/v1/get/clinics/${id}`)
        .then((res) => {
          setClinics(res.data);
          if (res.data.length > 0) {
            setSelectedClinic(res.data[0]?.id);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));

      // Fetch User Stories for this Doctor
      axios
        .get(`http://localhost:5000/api/v1/get/user-stories/${id}`)
        .then((res) => {
          console.log("User Stories:", res.data); // Log response data for debugging
          setUserStories(res.data); // Set the user stories from the response
        })
        .catch((err) => {
          console.error("Failed to fetch user stories:", err);
        });
    }

    const userName = localStorage.getItem("naam");
    if (userName) {
      setMsg(userName);
    }
  }, [id]);

  // Fetch Slots when Selected Clinic or Date Changes
  useEffect(() => {
    if (id && selectedClinic && selectedDate) {
      axios
        .get(`http://localhost:5000/api/v1/get/slots`, {
          params: {
            doctorId: id,
            clinicId: selectedClinic,
            date: selectedDate,
          },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            setSlots(res.data);
          } else {
            setSlots([]);
            console.error("Invalid slots response format:", res.data);
          }
        })
        .catch((err) => console.error("Error fetching slots:", err));
    }
  }, [id, selectedClinic, selectedDate]);

  const msgHandler = () => {
    if (msg === "Login / Signup") {
      window.location.href = "http://localhost:5000/login";
    } else {
      localStorage.removeItem("naam");
      localStorage.removeItem("authToken");
      setMsg("Login / Signup");
    }
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const adjustedHour = h % 12 || 12;
    return `${adjustedHour}:${minute} ${ampm}`;
  };

  if (loading) return <div className="loading-state">Loading...</div>;

  if (!doctor || error)
    return <div className="error-state">{error || "Doctor not found."}</div>;

  const { name, specialization, post, experience, description, image } = doctor;

  return (
    <div>
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <img
            onClick={() => (window.location.href = "http://localhost:5000")}
            src="https://upload.wikimedia.org/wikipedia/en/6/64/Practo_new_logo.png"
            alt="Practo Logo"
            className="practo-logo"
          />
          <div className="nav-links">
            <a href="http://localhost:5173/search">Find Doctors</a>
            <a href="#video-consult">Video Consult</a>
            <a href="#surgeries">Surgeries</a>
            <button onClick={msgHandler} className="login-btn">
              {msg}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="doctor-profile-container">
        <div className="breadcrumb">
          <a href="/">Home</a> &gt;
          <a href="/bangalore">Bangalore</a> &gt;
          <a href="/bangalore/dentist">Dentist</a> &gt;
          <span>{doctor?.name || "Doctor"}</span>
        </div>

        <div className="profile-main">
          <div className="profile-left">
            <div className="doctor-basic-info">
              <div className="doctor-header">
                <img
                  src={image || "/default-doctor.png"}
                  alt={name}
                  className="doctor-image"
                />
                <div className="doctor-name-section">
                  <h1>{name}</h1>
                  <div className="qualifications">{specialization}</div>
                  <div className="specialty-tags">
                    {post &&
                      post.split(",").map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty.trim()}
                        </span>
                      ))}
                  </div>
                  <div className="experience">
                    {experience} Years Experience Overall
                  </div>
                  <div className="registration">
                    <span>✓</span> Medical Registration Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Information */}
            <div className="clinic-info">
              <h2>Clinic Details</h2>
              {clinics.map((clinic) => (
                <div key={clinic.id} className="clinic-card">
                  <div className="clinic-header">
                    <div className="clinic-name">{clinic.name}</div>
                    <div className="clinic-rating">★ {clinic.rating}</div>
                  </div>
                  <div className="clinic-details">
                    <div>
                      <strong>Timings:</strong> {clinic.workingDays} (
                      {formatTime(clinic.openingTime)} -{" "}
                      {formatTime(clinic.closingTime)})
                    </div>
                    <div>
                      <strong>Consultation Fee:</strong> ₹{clinic.fee}
                    </div>
                    <div>{clinic.location}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Stories Section */}
            <div className="user-stories">
              <h2>User Stories</h2>
              {userStories.length > 0 ? (
                <div className="user-stories-list">
                  {userStories.map((story, index) => (
                    <div key={index} className="user-story">
                      <div className="story-user-name">
                        <strong>{story.user_name}</strong>
                      </div>
                      <div className="story-title">{story.title}</div>
                      <div className="story-content">{story.content}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No user stories available.</p>
              )}
            </div>
          </div>

          <div className="profile-right">
            {/* Slot Booking Section */}
            <SlotBooking
              clinic={clinics.find((c) => c.id === selectedClinic)}
              slots={slots}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
