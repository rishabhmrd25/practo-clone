import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorProfile.css"
import { useParams } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams(); // Get the doctor ID from the URL
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [stories, setStories] = useState([]);
  const [showStories, setShowStories] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/get/doctor/${id}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctor:', err);
        setError(err.response?.data?.message || 'Failed to fetch doctor');
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  useEffect(() => {
    axios.get(`/api/slots/${id}`).then((res) => setSlots(res.data));
  }, [id]);

  const fetchStories = () => {
    axios.get(`/api/stories/${id}`).then((res) => setStories(res.data));
    setShowStories(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="doctor-profile-container">
      <div className="doctor-header">
        <img src={doctor.image} alt={doctor.name} className="doctor-image" />
        <div>
          <h2>{doctor.name}</h2>
          <p><strong>{doctor.specialization}</strong> - {doctor.post}</p>
          <p>{doctor.experience} years of experience</p>
          <p>{doctor.description}</p>
        </div>
      </div>

      <div className="slot-section">
        <h3>Pick a Time Slot</h3>
        <p>Fee: ₹{doctor.clinicFee}</p>
        <div className="slots-container">
          {slots.map((slot) => (
            <button key={slot.id} className="slot-button">{slot.time}</button>
          ))}
        </div>
      </div>

      <button className="story-button" onClick={fetchStories}>View Patient Stories</button>
      {showStories && (
        <div className="stories-section">
          {stories.map((story) => (
            <div key={story.id} className="story">
              <h4>{story.userName}</h4>
              <p><strong>{story.title}</strong></p>
              <p>{story.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
