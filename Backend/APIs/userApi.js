const exp = require("express");
require("dotenv").config();
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");

userApp.use(exp.json());

// Route to get all users (protected route)
userApp.get(
    "/users",
    expressAsyncHandler(async (req, res) => {
      const usersCollection = req.app.get("usersCollection");
  
      const users = await usersCollection.find({}).toArray();
  
      if (!users) {
        return res.status(404).send({ message: "No users found" });
      }
  
      res.send({ message: "Users retrieved successfully", users });
    })
  );


// Route to get details of a single user (protected route)
userApp.get(
    "/users/:username",
    expressAsyncHandler(async (req, res) => {
      const usersCollection = req.app.get("usersCollection");
      const username = req.params.username;  // Get the username from the URL parameter
  
      // Fetch the user from the database
      const user = await usersCollection.findOne({ username });
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      res.send({ message: "User details retrieved successfully", user });
    })
  );
  

// Route for user/organization registration (public route)
userApp.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const usersCollection = req.app.get("usersCollection");
    const newUser = req.body;

    let existingUser = await usersCollection.findOne({
      username: newUser.username,
    });
    if (existingUser) {
      return res.send({ message: "Username already exists" });
    }

    const hashedPassword = await bcryptjs.hash(newUser.password, 7);
    newUser.password = hashedPassword;

    if (newUser.type !== "user" && newUser.type !== "organization" && newUser.type !== "personal") {
      return res.send({ message: "Invalid type specified" });
    }

    await usersCollection.insertOne(newUser);
    res.send({ message: "Registration successful" });
  })
);


// Route for login (public route)
userApp.post(
    "/login",
    expressAsyncHandler(async (req, res) => {
      const usersCollection = req.app.get("usersCollection");
      const { username, password } = req.body;
  
      // Check if the user exists
      const dbUser = await usersCollection.findOne({ username });
      if (!dbUser) {
        return res.send({ message: "Invalid username" });
      }
  
      // Verify the password
      const isPasswordValid = await bcryptjs.compare(password, dbUser.password);
      if (!isPasswordValid) {
        return res.send({ message: "Invalid password" });
      }
  
      res.send({
        message: "Login successful",
        user: { userDetails: dbUser, type: dbUser.type },
      });
    })
  );

  
  // Route to update user details (no token required)
userApp.put(
    "/update",
    expressAsyncHandler(async (req, res) => {
      const usersCollection = req.app.get("usersCollection");
  
      const { username } = req.body; // Extract username from request body
      const updatedDetails = req.body; // New user details from the request body
  
      // Check if the user exists in the database
      const dbUser = await usersCollection.findOne({ username });
      if (!dbUser) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Update the user details
      const result = await usersCollection.updateOne(
        { username },
        {
          $set: updatedDetails,
        }
      );
  
      if (result.modifiedCount === 0) {
        return res.status(400).send({ message: "No changes made" });
      }
  
      res.send({ message: "User details updated successfully" });
    })
  );
  
  


module.exports = userApp;