import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUsers, FaBuilding } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [counts, setCounts] = useState({ personalCount: 0, organizationCount: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://ngocouncilofkenya.org/images/News__Events/IMG-20220909-WA0055.jpg",
    "https://wpportfoliodesigner.com/wp-content/uploads/2019/03/3-4.jpg",
    "https://miro.medium.com/v2/resize:fit:612/1*8bHF8BD-q0g0JiyenWL5BA.jpeg",
    "https://childhope.org.ph/wp-content/uploads/2022/12/childhope-ngo-in-the-philippines-for-education-kalyeskwela-program.jpg",
  ];

  useEffect(() => {
    const content = document.querySelector('.page-content');
    if (content) {
      content.classList.add('slide-in');
    }

    // Fetch user counts dynamically
    fetch('http://localhost:4000/user-api/user-counts')
      .then((res) => res.json())
      .then((data) => {
        setCounts({
          personalCount: data.personalCount || 0,
          organizationCount: data.organizationCount || 0
        });
      })
      .catch((err) => console.error("Error fetching user counts:", err));

    // Detect center image while scrolling
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const items = container.querySelectorAll('.scroll-item');
        let minDiff = Infinity;
        let newIndex = 0;

        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const diff = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
          if (diff < minDiff) {
            minDiff = diff;
            newIndex = index;
          }
        });

        setActiveIndex(newIndex);
      }
    };

    scrollContainerRef.current?.addEventListener('scroll', handleScroll);
    return () => scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollButtons(direction) {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  }

  return (
    <div className="page-content">
      {/* Background Image Section */}
      <div className="hero-section">
        <h1 className="hero-text">Welcome to NGO Event Hub</h1>
      </div>

      {/* Mission & Goals Section */}
      <section className="mission-goals">
        <h2>Our Mission & Goals</h2>
        <div className="mission-content">
          <div className="mission-item">
            <h3>🌍 Mission</h3>
            <p>Our mission is to connect NGOs with communities, enabling impactful events that create lasting change.</p>
          </div>
          <div className="mission-item">
            <h3>🎯 Goals</h3>
            <p>✔️ Facilitate easy event management for NGOs.<br/>
               ✔️ Bridge the gap between volunteers and NGOs.<br/>
               ✔️ Promote social awareness through engaging events.</p>
          </div>
        </div>
      </section>

      {/* Scrollable Image Section */}
      <div className="scroll-container" ref={scrollContainerRef}>
        <div className="scroll-content">
          {images.map((src, index) => (
            <div key={index} className={`scroll-item ${index === activeIndex ? 'active-image' : ''}`}>
              <img src={src} alt={`Event ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Buttons */}
      <div className="scroll-buttons">
        <button onClick={() => scrollButtons('left')}>
          <FaArrowLeft />
        </button>
        <button onClick={() => scrollButtons('right')}>
          <FaArrowRight />
        </button>
      </div>

      {/* User Stats Section */}
      <div className="stats-section">
        <h2 className="stats-heading">Platform Statistics</h2>
        <div className="stats-container">
          <div className="stat-card">
            <FaUsers className="stat-icon users" />
            <h3>{counts.personalCount}</h3>
            <p>Registered Users</p>
          </div>
          <div className="stat-card">
            <FaBuilding className="stat-icon organizations" />
            <h3>{counts.organizationCount}</h3>
            <p>Registered Organizations</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <div className="cta-card">
          <h2>Check Out Upcoming Events</h2>
          <p>Join an event, volunteer, or donate to a cause you care about.</p>
          <Link to="/upcomingevents" className="cta-button">Explore Events</Link>
        </div>
        <div className="cta-card">
          <h2>Register Your Organization</h2>
          <p>Are you an NGO? Register now and start creating impactful events.</p>
          <Link to="/register" className="cta-button">Register Now</Link>
        </div>
      </div>
    </div>
  );
}
