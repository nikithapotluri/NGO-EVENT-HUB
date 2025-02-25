import React, { useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import './Home.css';


export default function Home() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
 
  useEffect(() => {
    const content = document.querySelector('.page-content');
    if (content) {
      content.classList.add('slide-in');
    }
  }, []);
 
  function scrollButtons(direction) {
    const container = scrollContainerRef.current;
    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  }


  return (
    <div className="page-content">
      {/* Background Image Section */}
      <div className="hero-section">
        <h1 className="hero-text">Welcome to NGO Event Hub</h1>
      </div>


      {/* About NGOs Section */}
      {/*<section className="about-ngos container">
        <p>
          Non-Governmental Organizations (NGOs) play a vital role in improving the well-being of communities
          around the world. They are independent, non-profit organizations that work towards creating positive
          social change.
        </p>
        <p>
          NGOs help bridge the gap between governmental initiatives and local communities by implementing
          innovative solutions, advocating for policy change, and offering resources to those in need.
        </p>
      </section>*/}




      {/* Mission & Goals Section */}
<section className="mission-goals">
  <h2>Our Mission & Goals</h2>
  <div className="mission-content">
    <div className="mission-item">
      <h3>🌍 Mission</h3>
      <p>Our mission is to connect NGOs with communities, enabling impactful events that create lasting change. We aim to provide a seamless platform for organizing and discovering meaningful opportunities.</p>
    </div>
    <div className="mission-item">
      <h3>🎯 Goals</h3>
      <p>✔️ Facilitate easy event management for NGOs.<br/>
         ✔️ Bridge the gap between volunteers and NGOs.<br/>
         ✔️ Promote social awareness through engaging events.<br/>
         ✔️ Enhance collaboration and community engagement.</p>
    </div>
  </div>
</section>


      {/* Scrollable Image Section */}
      <div className="scroll-container" ref={scrollContainerRef}>
        <div className="scroll-content">
          {[
            "https://ngocouncilofkenya.org/images/News__Events/IMG-20220909-WA0055.jpg",
            "https://wpportfoliodesigner.com/wp-content/uploads/2019/03/3-4.jpg",
            "https://miro.medium.com/v2/resize:fit:612/1*8bHF8BD-q0g0JiyenWL5BA.jpeg",
            "https://childhope.org.ph/wp-content/uploads/2022/12/childhope-ngo-in-the-philippines-for-education-kalyeskwela-program.jpg",
            "https://lh5.googleusercontent.com/J142AyAT1pxnlBhNPl_DAfbF35QpL3WYqFkJqzR6bq0YXrSx5Qzd_Jc_zc-01nv9BCRC2QkaNT-clPJ8lqDBAzmxO3Sg9rJgC7H0QpBA3gPTBSAtw_2zrM6hmQQ8JHxLoVBeKfBTKT-pIOQ96jkZu-LL2gBLwFg22eI1BCL7F58sgmuWMED4hhmX",
            "https://childhope.org.ph/wp-content/uploads/2022/11/childhope-giving-goods-outreach-program.jpg",
            "https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/https://lh6.googleusercontent.com/3Qvbk1LUgWD_TXDtqkbYllHsoJKM_Im9QIPngz57_e9J_rxZHM7guiBkfHRfvMddtdof2gWQkHsKsqwtSnrRTIUsfx8JgHuK6RJu57i8_B2-hSmuzFxayXwJ1WQ1Xvugjg",
            "https://childhope.org.ph/wp-content/uploads/2022/11/childhope-ngo-philippines-volunteers.jpg",
            "https://www.ktpress.rw/wp-content/uploads/2018/03/NGOs-768x431.jpg"
          ].map((src, index) => (
            <div key={index} className="scroll-item">
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




     
      <div className="cta-section">
      {/* Events CTA */}
      <div className="cta-card">
        <h2>Check Out Upcoming Events</h2>
        <p>Join an event, volunteer, or donate to a cause you care about.</p>
        <Link to="/upcomingevents" className="cta-button">Explore Events</Link>
      </div>


      {/* Organization Registration CTA */}
      <div className="cta-card">
        <h2>Register Your Organization</h2>
        <p>Are you an NGO? Register now and start creating impactful events.</p>
        <Link to="/register" className="cta-button">Register Now</Link>
      </div>
    </div>


     
    </div>
  );
}
