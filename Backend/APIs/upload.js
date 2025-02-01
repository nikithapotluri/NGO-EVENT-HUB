const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


// Load environment variables
require('dotenv').config();

cloudinary.config({
  cloud_name: "dzbnppmzg",
  api_key: "879635989771454",
  api_secret: "vyua8ENpi0A3z4u_GD5BDU_FhfE",
});

// Configure multer for file handling
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Upload image endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const { username, description } = req.body; // Extract context from the request body
  
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded!' });
      }
  
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'ngo-organization-logos', // Specify folder in Cloudinary
        context: {
          alt: description || 'Uploaded wallpaper', // Alt text for the image
          user: username || 'Unknown User', // User info
        },
      });
  
      res.json({
        message: 'Image uploaded successfully!',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to upload image', error });
    }
  });

  
  router.get('/get-images', async (req, res) => {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'ngo-organization-logos', //|| 'ngo-events', // Fetch only images from this folder
        context: true, // Include context in the response
      });
      
      

      // Transform result to include context in a more readable format
      const imagesWithContext = result.resources.map((image) => ({
        url: image.secure_url,
        public_id: image.public_id,
        context: image.context?.custom || {}, // Safely access custom context
      }));
  
      res.json({
        message: 'Images retrieved successfully!',
        data: imagesWithContext,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve images', error });
    }
  });
  

  router.delete('/delete-image/:public_id', async (req, res) => {
    try {
      const public_id = decodeURIComponent(req.params.public_id); // Safely decode it
      console.log("Received public_id:", public_id); // Debug log
  
      const result = await cloudinary.uploader.destroy(public_id);
  
      if (result.result === 'ok') {
        res.json({ message: 'Image deleted successfully!' });
      } else {
        res.status(400).json({ message: 'Failed to delete image!', result });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

module.exports = router;