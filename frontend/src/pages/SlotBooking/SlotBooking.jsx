import React from "react";
import { useNavigate } from "react-router-dom";

const SlotBooking = ({ clinic, doctor, slots, selectedDate, onDateChange }) => {
  const navigate = useNavigate();

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };
  const getSpecialDate = () => "2025-02-19";

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const adjustedHour = h % 12 || 12;
    return `${adjustedHour}:${minute} ${ampm}`;
  };

  const handleSlotSelect = (slot) => {
    navigate("/appointmentForm", {
      state: {
        clinic,
        doctor,
        selectedDate,
        slotId: slot.id,
        slotTime: formatTime(slot.time), // Pass formatted time
      },
    });
  };

  const getSlotCount = (date) => slots.filter((slot) => slot.date === date).length;
  const filteredSlots = slots.filter((slot) => slot.date === selectedDate);

  return (
    <div className="slot-booking-container">
      <div className="slot-booking-header">
        <h2>Pick a time slot</h2>
        <div className="consultation-fee">₹ {clinic?.fee} fee</div>
      </div>

      <div className="clinic-info-header">
        <div className="clinic-icon">🏥</div>
        <div className="clinic-details">
          <h3>{clinic?.name}</h3>
          <p>{clinic?.location}</p>
        </div>
      </div>

      <div className="date-selector">
        <button className={`date-button ${selectedDate === getTodayDate() ? "active" : ""}`} onClick={() => onDateChange(getTodayDate())}>
          <span className="day-label">Today</span>
          <br />
          <span className="slot-count">{getSlotCount(getTodayDate())} Slots Available</span>
        </button>

        <button className={`date-button ${selectedDate === getTomorrowDate() ? "active" : ""}`} onClick={() => onDateChange(getTomorrowDate())}>
          <span className="day-label">Tomorrow</span>
          <br />
          <span className="slot-count">{getSlotCount(getTomorrowDate())} Slots Available</span>
        </button>

        <button className={`date-button ${selectedDate === getSpecialDate() ? "active" : ""}`} onClick={() => onDateChange(getSpecialDate())}>
          <span className="day-label">{getSpecialDate()}</span>
          <br />
          <span className="slot-count">{getSlotCount(getSpecialDate())} Slots Available</span>
        </button>
      </div>

      <div className="slots-section">
        <h4> ({filteredSlots.length} slots)</h4>
        <div className="slots-grid">
          {filteredSlots.map((slot, index) => (
            <button key={index} className="slot-button" onClick={() => handleSlotSelect(slot)}>
              {formatTime(slot.time)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
