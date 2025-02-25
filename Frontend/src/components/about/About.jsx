import React from 'react';
import './About.css';

import female from '../pictures/female.webp';
import pic from '../pictures/about-pic.gif'
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";

function About() {
    const teamMembers = [
        {
            name: "Rayapudi Sai Roshini",
            linkedin: "https://www.linkedin.com/in/rayapudisairoshini/",
            github: "https://github.com/rayapudisairoshini",
        },
        {
            name: "Potluri Nikitha",
            linkedin: "https://www.linkedin.com/in/nikithapotluri/",
            github: "https://github.com/nikithapotluri",
        },
        {
            name: "Rayala Baby Akshitha",
            linkedin: "https://www.linkedin.com/in/nikithapotluri/",
            github: "https://github.com/nikithapotluri",
        },
        {
            name: "Vemulapalli Gnaneswari",
            linkedin: "https://www.linkedin.com/in/nikithapotluri/",
            github: "https://github.com/nikithapotluri",
        }
    ];

    return (
        <div className="section-white">
            <div className="top-container">
        <img src={pic} alt="Team" />
        <p className='text-center'>BEHIND NGO EVENT HUB</p>
        <p>We are a team of passionate web developers committed to transforming how NGOs organize and manage their events. At NGO Event Hub, our mission is to simplify the process of event planning and coordination for organizations, making it easier for them to focus on their impact and mission.


Through our user-friendly platform, NGOs can effortlessly book spaces, manage participants, and create impactful events. Whether you're organizing a conference, a community outreach program, or a fundraising event, NGO Event Hub provides the tools to make every event seamless and successful.


Thank you for choosing NGO Event Hub — where every event makes a difference!</p>
      </div>

            <h2 className='text-center'>MEET OUR TEAM</h2>
            <div className="team-container">
                {teamMembers.map((member, index) => (
                    <div className="team-item" key={index}>
                        <img src={female} className="team-img" alt={member.name} style={{ width: '150px', height: '150px' }} />
                        <div className="team-info">
                            <p style={{ fontStyle: 'italic' }}><b>{member.name}</b></p>
                            <p>{member.description}</p>
                            <ul className="team-icon">
                                <li>
                                    <a href={member.linkedin} className="linkedin" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedinIn />
                                    </a>
                                </li>
                                <li>
                                    <a href={member.github} className="github" target="_blank" rel="noopener noreferrer">
                                        <TbBrandGithubFilled />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
