import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [msg, setMsg] = useState("Login / Signup");

  const searchOptions = [
    { id: 1, name: "Cold, Cough", type: "CONDITION", isClickable: true },
    { id: 2, name: "Dentist", type: "SPECIALITY", isClickable: true },
    { id: 3, name: "Pediatrician", type: "SPECIALITY" },
    { id: 4, name: "Dermatologist", type: "SPECIALITY" },
    { id: 5, name: "Gynecologist", type: "SPECIALITY" },
    { id: 6, name: "Cardiologist", type: "SPECIALITY" },
    { id: 7, name: "Back & Neck Pain", type: "CONDITION" },
    { id: 8, name: "ENT Specialist", type: "SPECIALITY" },
    { id: 9, name: "Orthopedist", type: "SPECIALITY" },
    { id: 10, name: "Mental Health", type: "CONDITION" },
    { id: 11, name: "Eye Specialist", type: "SPECIALITY" },
    { id: 12, name: "Diabetes Management", type: "CONDITION" },
    { id: 13, name: "Neurologist", type: "SPECIALITY" },
    { id: 14, name: "Physiotherapist", type: "SPECIALITY" },
    { id: 15, name: "General Physician", type: "SPECIALITY" },
  ];

  const specialties = [
    {
      id: 1,
      title: "Period Doubts or Pregnancy",
      image:
        "https://clone-practo.vercel.app/images/home_irregular_painful_period.webp",
    },
    {
      id: 2,
      title: "Acne, pimple or skin issues",
      image: "https://clone-practo.vercel.app/images/home_acne.webp",
    },
    {
      id: 3,
      title: "Performance issues in bed",
      image:
        "https://clone-practo.vercel.app/images/home_performance_issues.svg",
    },
    {
      id: 4,
      title: "Cold, cough",
      image: "https://clone-practo.vercel.app/images/home_coughing.webp",
    },
    {
      id: 5,
      title: "Child not feeling well",
      image: "https://clone-practo.vercel.app/images/home_pediatric.svg",
    },
    {
      id: 6,
      title: "Depression or anxiety",
      image: "https://clone-practo.vercel.app/images/home-mental-wellness.webp",
    },
  ];
  const books = [
    {
      id: 1,
      title: "Dentist",
      image:
        "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dentist@2x.jpg",
      text: "Teething troubles? Schedule a dental checkup",
    },
    {
      id: 2,
      title: "Gynecologist/Obstetrician",
      image:
        "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-gynecologist@2x.jpg",
      text: "Explore for women’s health, pregnancy and infertility treatments",
    },
    {
      id: 3,
      title: "Dietitian/Nutrition",
      image:
        "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dietitian@2x.jpg",
      text: "Get guidance on eating right, weight management and sports nutrition",
    },
    {
      id: 4,
      title: "Physiotherapist",
      image:
        "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-physiotherapist@2x.jpg",
      text: "Pulled a muscle? Get it treated by a trained physiotherapist",
    },
  ];
  const handleOptionClick = (option) => {
    if (option.isClickable) {
      if (option.name === "Cold, Cough") {
        window.location.href = "http://localhost:5000/list-cough";
      } else if (option.name === "Dentist") {
        window.location.href = "http://localhost:5000/list-dentist";
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("naam");
    window.location.replace("http://localhost:5000");
  };

  useEffect(() => {
    if (localStorage.getItem("naam")) {
      setMsg(localStorage.getItem("naam"));
    }
  }, []);

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/6/64/Practo_new_logo.png?20180609150803"
            alt="Practo Logo"
            className="practo-logo"
          />
        </div>
        <div className="nav-links">
          <div className="navhead">
          <a
            href="http://localhost:5173/search"
            onClick={() => setIsActive(true)}
            className={isActive ? "active" : ""}
          >
            Find Doctors
          </a>
          
          <a href="#video-consult">Video Consult</a>
          <a href="#surgeries">Surgeries</a>
          </div>
          <a href="">For Corporates </a>
          <a href="">For providers</a>
          <a href="">Security & Help</a>

          <button onClick={handleLogout} className="login-btn">
            <a className="lgn" href="http://localhost:5000/login">
              {msg}
            </a>
          </button>
        </div>
      </nav>

      <div className="search-section">
        <div className="location-search">
          <input type="text" placeholder="Bangalore" />
        </div>
        <div className="doctor-search">
          <input
            type="text"
            placeholder="Search doctors, clinics, hospitals, etc."
            onFocus={() => setIsDropdownVisible(true)}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
          />
          {isDropdownVisible && (
            <div className="search-dropdown">
              <div className="dropdown-header">
                <p>Popular Searches</p>
              </div>
              <div className="dropdown-content">
                {searchOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`dropdown-item ${
                      option.isClickable ? "clickable" : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      cursor: option.isClickable ? "pointer" : "default",
                    }}
                  >
                    <div className="item-info">
                      <p className="item-name">{option.name}</p>
                      <p className="item-type">{option.type}</p>
                    </div>
                    <svg
                      className="arrow-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="services-grid">
        <div className="service-card video-consultation">
          <div className="image-container">
            <img
              src="https://clone-practo.vercel.app/images/instant_video_consulation.webp"
              alt="Video consultation"
            />
          </div>
          <div className="text-container">
            <h3>Instant Video Consultation</h3>
            <p>Connect within 60 secs</p>
          </div>
        </div>

        <a className="dusra" href="http://localhost:5173/search">
          <div className="service-card find-doctors">
            <div className="image-container">
              <img
                src="https://clone-practo.vercel.app/images/find_doctors.webp"
                alt="Find doctors"
              />
            </div>
            <div className="text-container">
              <h3>Find Doctors Near You</h3>
              <p>Confirmed appointments</p>
            </div>
          </div>
        </a>

        <div className="service-card surgeries-card">
          <div className="image-container">
            <img
              src="https://clone-practo.vercel.app/images/home_surgeries.webp"
              alt="Surgeries"
            />
          </div>
          <div className="text-container">
            <h3>Surgeries</h3>
            <p>Safe and trusted surgery centers</p>
          </div>
        </div>
      </div>

      <div className="specialties-section">
        <div className="section-header">
          <h2>Consult top doctors online for any health concern</h2>
          <p>
            Private online consultations with verified doctors in all
            specialists
          </p>
          <a href="#view-all" className="view-all">
            View All Specialities
          </a>
        </div>
        <div className="specialties-grid">
          {specialties.map((specialty) => (
            <div key={specialty.id} className="specialty-card">
              <div className="specialty-icon">
                <img src={specialty.image} alt={specialty.title} />
              </div>
              <h3>{specialty.title}</h3>
              <button className="consult-btn">CONSULT NOW</button>
            </div>
          ))}
        </div>
      </div>

      <div className="book-section">
        <div className="book-header">
          <h2>Book an appointment for an in-clinic consultation</h2>
          <p>Find experienced doctors across all specialties</p>
        </div>
        <div className="book-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-icon">
                <img src={book.image} alt={book.title} loading="lazy" />
              </div>
              <div className="book-content">
                <h3>{book.title}</h3>
                <p>{book.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
