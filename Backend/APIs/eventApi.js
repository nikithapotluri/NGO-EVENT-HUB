// create mini-express app
const exp = require("express");
const eventApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');

// Add body parser middleware
eventApp.use(exp.json());


// GET request to fetch all events
eventApp.get(
    "/events",  // Endpoint to fetch all events
    expressAsyncHandler(async (req, res) => {
      const eventsCollection = req.app.get("eventsCollection");
  
      // Fetch all events from the collection
      const events = await eventsCollection.find({}).toArray();
  
      if (events.length === 0) {
        return res.status(404).send({ message: "No events found" });
      }
  
      res.send(events);  // Send back the list of events
    })
  );


// GET request to fetch events of a single organization by username
eventApp.get(
  "/events/organization/:username",
  expressAsyncHandler(async (req, res) => {
    const eventsCollection = req.app.get("eventsCollection");
    const username = req.params.username;

    // Fetch events where userDetails.username matches
    const events = await eventsCollection.find({
      "userDetails.username": username
    }).toArray();

    if (events.length === 0) {
      return res.status(404).send({ message: "No events found for this organization" });
    }

    res.send(events);
  })
);

  

// POST request to create an event (for organizers)
eventApp.post(
    "/create",
    expressAsyncHandler(async (req, res) => {
      const eventsCollection = req.app.get("eventsCollection");
    //  const usersCollection = req.app.get("usersCollection");
  
      const newEvent = req.body;
  
      // Validation for required fields
     // if (!newEvent.username || !newEvent.name || !newEvent.description || !newEvent.location || !newEvent.timings || !newEvent.registerLink) {
    //    return res.status(400).send({ message: "All fields are required" });
    //  }
  
      // Fetch the organization details using the username
    //  const organization = await usersCollection.findOne({ username: newEvent.username });
  
    //  if (!organization) {
     //   return res.status(404).send({ message: "Organization not found" });
      //}
  
      // Add organization details to the event
    //  newEvent.organizationDetails = {
      //  userDetails: organization.userDetails,
       // name: organization.details.name,  // Organization name from the 'details' field
        //mobileNumber: organization.details.mobileNumber,
        //email: organization.details.email,
       // place: organization.organizationDetails.place, // Organization place from the 'organizationDetails' field
        //description: organization.organizationDetails.description // Organization description from the 'organizationDetails' field
    //  };
  
      // Insert the new event into the events collection
      try {
        await eventsCollection.insertOne(newEvent);
        res.send({ message: "Event created successfully", eventDetails: newEvent });
      } catch (error) {
        res.status(500).send({ message: "Error inserting event into database", error: error.message });
      }
    })
  );
    
 // DELETE request to delete an event by name or ID
    eventApp.delete(
    "/delete/:id",  // Using URL params to specify the event ID
    expressAsyncHandler(async (req, res) => {
      const eventsCollection = req.app.get("eventsCollection");
      const eventId = req.params.id;  // Get the event ID from the URL
  
      try {
        // Convert the eventId to ObjectId
        const objectId = new ObjectId(eventId);
    
        // Try to delete the event from the database
        const result = await eventsCollection.deleteOne({ _id: objectId });
    
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Event not found" });
        }
    
        res.send({ message: "Event deleted successfully" });
      } catch (err) {
        return res.status(400).send({ message: "Invalid event ID format" });
      }
    })
  );
  


// Export eventApp
module.exports = eventApp;
