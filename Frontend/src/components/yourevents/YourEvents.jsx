import React, { useEffect, useState, useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import { Table, Button, Spinner, Form, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function YourEvents() {
  const { currentUser, userLoginStatus } = useContext(userLoginContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Fetch events of the logged-in organization
  useEffect(() => {
    if (userLoginStatus && currentUser.userDetails.type === "organization") {
      fetchEvents();
    }
  }, [currentUser, userLoginStatus]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/event-api/events/organization/${currentUser.userDetails.username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }
      const data = await response.json();
      setEvents(data || []);
      setFilteredEvents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Show the confirmation modal before deleting
  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowModal(true);
  };

  // Delete an event
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/event-api/delete/${eventToDelete}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event.");
      }

      toast.success("Event Deleted Successfully!");
      setEvents(events.filter((event) => event._id !== eventToDelete));
      setFilteredEvents(filteredEvents.filter((event) => event._id !== eventToDelete));
    } catch (err) {
      setError(err.message);
    } finally {
      setShowModal(false); // Close the modal after deletion
      setEventToDelete(null); // Reset selected event
    }
  };

  // Filter events based on date range
  const filterEvents = () => {
    if (!startDate || !endDate) {
      setFilteredEvents(events);
      return;
    }
    const filtered = events.filter((event) => event.date >= startDate && event.date <= endDate);
    setFilteredEvents(filtered);
  };

  if (!userLoginStatus) {
    return (
      <div className="d-flex justify-content-center vh-100">
        <h1 className="text-danger">Login to access this page!</h1>
      </div>
    );
  }

  if (currentUser.userDetails.type !== "organization") {
    return (
      <div className="d-flex justify-content-center vh-100">
        <h3 className="text-warning">Personal accounts cannot access this page.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Events</h2>

      <div className="d-flex justify-content-center mb-3">
        <Form.Group className="me-3">
          <Form.Label><strong>From:</strong></Form.Label>
          <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Form.Group>
        <Form.Group className="me-3">
          <Form.Label><strong>To:</strong></Form.Label>
          <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Form.Group>
        <Button className="align-self-end" onClick={filterEvents}>
          Filter
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading events...</p>
        </div>
      ) : error ? (
        <div className="text-center text-danger">
          <p>Error: {error}</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Register Link</th>
              <th>Payment Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.eventName}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>
                  <a href={event.registerLink} target="_blank" rel="noopener noreferrer">
                    Register
                  </a>
                </td>
                <td>
                  {event.paymentLink ? (
                    <a href={event.paymentLink} target="_blank" rel="noopener noreferrer">
                      Pay Now
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <Button variant="danger" onClick={() => confirmDelete(event._id)} title="Remove this event">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center">
          <p>No events found.</p>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default YourEvents;
