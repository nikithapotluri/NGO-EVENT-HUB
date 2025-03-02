import React, { useState, useEffect, useContext } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Button, Card, Spinner, Form, Modal } from "react-bootstrap";
import { userLoginContext } from "../../contexts/userLoginContext";
import './UpComingEvents.css'; // Ensure the CSS file is imported


function UpComingEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [username, setUsername] = useState(""); // Added state for username
  const [organizationName, setOrganizationName] = useState(""); // Added state for organization name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const { userLoginStatus } = useContext(userLoginContext);


  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await fetch("https://ngo-event-hub-backend.vercel.app/event-api/events");
        if (!response.ok) {
          throw new Error(`Failed to fetch event details: ${response.statusText}`);
        }
        const data = await response.json();


        const today = new Date();
        today.setHours(0, 0, 0, 0);


        const upcomingEvents = data.filter(event => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today;
        });


        setEvents(upcomingEvents);
        setFilteredEvents(upcomingEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }


    fetchEventDetails();
  }, []);


  // Filter function
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;


    const filtered = events.filter(event => {
      const eventDate = new Date(event.date);
      const isWithinDateRange = (!start || eventDate >= start) && (!end || eventDate <= end);
      const isMatchingLocation = location ? event.location?.toLowerCase().includes(location.toLowerCase()) : true;
      const isMatchingUsername = username ? event.userDetails?.username?.toLowerCase().includes(username.toLowerCase()) : true;
      const isMatchingOrganization = organizationName ? event.userDetails?.organization?.name?.toLowerCase().includes(organizationName.toLowerCase()) : true;


      return isWithinDateRange && isMatchingLocation && isMatchingUsername && isMatchingOrganization;
    });


    setFilteredEvents(filtered);
  };


  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading event details...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h4>Error:</h4>
        <p>{error}</p>
      </div>
    );
  }


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Find Events Here!</h2>


      {/* Filter Form */}
      <Form onSubmit={handleFilterSubmit} className="d-flex flex-wrap gap-3 justify-content-center mb-4">
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Organization Name</Form.Label>
          <Form.Control type="text" placeholder="Enter organization name" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary" className="align-self-end">
          Submit
        </Button>
      </Form>


      {/* Display Filtered Events */}
      <div className="cards-container">
        {filteredEvents.length > 0 ? (
          <div className="row">
            {filteredEvents.map((event, index) => (
              <div className="col-md-4 mb-4" key={event.id || index}>
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title className="mb-3">
                      <strong>{event.eventName}</strong>
                    </Card.Title>
                    <Card.Text>{event.description}</Card.Text>


                    {/* Event Details */}
                    <ul className="list-unstyled mb-3">
                      <li className="d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2 text-primary" />
                        <strong>Location:</strong> {event.location}
                      </li>
                      <li className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2 text-success" />
                        <strong>Date:</strong> {event.date}
                      </li>
                      <li className="d-flex align-items-center">
                        <FaClock className="me-2 text-warning" />
                        <strong>Time:</strong> {event.time}
                      </li>
                                          </ul>


                    <div className="btn-container">
  <a href={event.registerLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
    Register
  </a>


  <Button variant="info"  onClick={() => {setSelectedOrganization(event.userDetails); setShowModal(true);}}>
    About NGO
  </Button>


  {event.paymentLink && (
    <a href={event.paymentLink} target="_blank" rel="noopener noreferrer" className="btn btn-success ms-2">
      Pay Now
    </a>
  )}
</div>


                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <p>No events found.</p>
          </div>
        )}
      </div>


      {/* Modal for displaying organization details */}
      {selectedOrganization && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>About {selectedOrganization.organization?.name || "NGO"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p><strong>Name:</strong> {selectedOrganization?.details?.name || "Not available"}</p>
            <p><strong>Username:</strong> {selectedOrganization?.username || "Not available"}</p>
            <p><strong>Mobile Number:</strong> {selectedOrganization.details?.mobileNumber || "Not available"}</p>
            <p><strong>Email:</strong> {selectedOrganization.details?.email || "Not available"}</p>
            <p><strong>Description:</strong> {selectedOrganization.organization?.description || "Not available"}</p>
            <p><strong>Location:</strong> {selectedOrganization.organization?.place || "Not available"}</p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}


export default UpComingEvents;


