import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { Dropdown } from "react-bootstrap"; // Import Bootstrap Dropdown
import { userLoginContext } from "../../contexts/userLoginContext";

function Header() {
  const { loginUser, logoutUser, userLoginStatus, currentUser } = useContext(userLoginContext);

  return (
    <div className="d-flex flex-wrap justify-content-around header">
      <h1>Myshop</h1>
      <ul className="nav fs-5 p-3">
        <li className="nav-item">
          <Link to="home" className="nav-link">
            <IoHome className="fs-3 text-warning" />
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="about" className="nav-link">
            <IoIosInformationCircleOutline className="fs-3 text-warning" />
            About Us
          </Link>
        </li>

        <li className="nav-item">
          <Link to="upcomingevents" className="nav-link">
            <IoIosInformationCircleOutline className="fs-3 text-warning" />
            Events
          </Link>
        </li>

        {userLoginStatus ? (
          // Dropdown for logged-in users
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link border-0">
              <FaUserCircle className="fs-3 text-warning me-2" />
              {currentUser.userDetails.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {currentUser.type === "organization" && (
                <>
                <Dropdown.Item as={Link} to="createevents">
                  Create Events
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="yourevents">
                    Your Events
                </Dropdown.Item>
                </>
              )}
              <Dropdown.Item as={Link} to="user-profile">
                User Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <li className="nav-item">
            <Link to="" className="nav-link">
              <FaSignInAlt className="fs-3 text-warning me-2" />
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
