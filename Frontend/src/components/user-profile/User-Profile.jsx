import React, { useState , useEffect} from "react";
import "./User-Profile.css";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import personalPic from "../../assets/personal.png";
import orgPic from "../../assets/organization.jpg";


import {RiDeleteBin6Fill} from "react-icons/ri"
import { ImCloudUpload } from "react-icons/im";
import Axios from 'axios'


import { ToastContainer, toast } from "react-toastify";


function UserProfile() {
  const { currentUser, userLoginStatus } = useContext(userLoginContext);
  let [cloudinaryImages, setCloudinaryImages] = useState([]);
  console.log(cloudinaryImages)


  function onInputChange(files) {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'ngo-event-hub-pics');
    formData.append('folder', 'ngo-organization-logos');
 
    // Directly construct the userInfo object
    const userInfo = { username: currentUser.userDetails.username };
    formData.append('context', `user_info=${JSON.stringify(userInfo)}`);


    Axios.post('https://api.cloudinary.com/v1_1/dzbnppmzg/image/upload', formData)
      .then((response) => {
        console.log('Upload Successful:', response.data);
        toast.success('Profile picture Uploaded Successfully!');
      })
      .catch((error) => {
        console.error('Upload Failed:', error);
        toast.error('Failed to upload your profile. Please try again.');
      });
  }


  async function getImage() {
    try {
      const response = await fetch('https://ngo-event-hub-bend.vercel.app/image-api/get-images');
      const result = await response.json();
 
      if (result.data) {
        // Map the data to extract necessary details
        const formattedImages = result.data.map((image) => {
          let username = 'Anonymous'; // Default value
          if (image.context?.user_info) {
            try {
              // Parse the stringified JSON object
              const userInfo = JSON.parse(image.context.user_info);
              username = userInfo.username || 'Anonymous'; // Fallback to 'Anonymous' if username is missing
            } catch (error) {
              console.error('Failed to parse user_info:', error);
            }
          }
 
          return {
            url: image.url, // Image URL
            user: username, // Extracted username
            public_id:image.public_id
          };
        });
 
        console.log(formattedImages); // Debug: Verify the formatted data
        setCloudinaryImages(formattedImages); // Update state with formatted data
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }




  async function deleteImage(publicId) {
    try {
      const response = await fetch(
        `https://ngo-event-hub-bend.vercel.app/image-api/delete-image/${encodeURIComponent(publicId)}`,
        { method: 'DELETE' }
      );
 
      console.log("Public ID:", publicId); // Debug log
      const result = await response.json();
 
      if (response.ok) {
        toast.success(result.message);
        getImage(); // Refresh the image list
      } else {
        console.error("Failed to delete image:", result);
        toast.error("Failed to delete the image. Please try again.");
      }
    } catch (error) {
      console.error("Error during image deletion:", error);
      toast.error("An error occurred while trying to delete the image.");
    }
  }




  useEffect(()=>{
    getImage();
  },[userLoginStatus])


  return (
    <div>
      {userLoginStatus ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card shadow-lg border-0" style={{ width: "22rem", borderRadius: "15px" }}>
            <div className="card-body text-center">
              {/* Profile Picture */}
              <div>
                {cloudinaryImages.find((ele) => ele.user === currentUser.userDetails.username) ? (


                  <div>
                  <img
                    src={
                      cloudinaryImages.find((ele) => ele.user === currentUser.userDetails.username)?.url
                    }
                    alt="Profile"
                    style={{
                      width: "50%",
                      height: "50%",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginRight: '-10px'
                    }}
                  />


           
              <RiDeleteBin6Fill
                        onClick={() => deleteImage(cloudinaryImages.find((ele) => ele.user === currentUser.userDetails.username)?.public_id)}
                        style={{ cursor: 'pointer', borderRadius: '5px', padding: '2px', marginRight: '-20px', marginTop: '-50px'}}
                        className="text-danger mb-3 fs-2"
                      />


                  </div>
                ) : currentUser.userDetails.type === "personal" ? (
                  <div>
                  <img
                    src={personalPic}
                    alt="Personal Profile"
                    style={{
                      width: "50%",
                      height: "50%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />


              <label
             htmlFor="fileupload"
             className="a"
             style={{ cursor: 'pointer' }}
              >
              <ImCloudUpload  style={{fontSize:'30px',marginLeft:'-30px',marginBottom:'-90px'}} className='text-warning'/>
              </label>
              <input
                  id="fileupload"
                  accept="image/*"
                  type="file"
                  onChange={(event) => onInputChange(event.target.files)}
                  style={{ display: 'none' }}
              />
                  </div>
                 
                ) : (


                  <div>
                  <img
                    src={orgPic}
                    alt="Organization Profile"
                    style={{
                      width: "50%",
                      height: "50%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />


                <label
             htmlFor="fileupload"
             className="a"
             style={{ cursor: 'pointer' }}
              >
              <ImCloudUpload  style={{fontSize:'30px',marginLeft:'-30px',marginBottom:'-90px'}} className='text-warning'/>
              </label>
              <input
                  id="fileupload"
                  accept="image/*"
                  type="file"
                  onChange={(event) => onInputChange(event.target.files)}
                  style={{ display: 'none' }}
              />
                  </div>
                )}








              </div>




              {/* User Details */}
              <h5 className="card-title mb-3" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {currentUser.userDetails.type === "personal"
                  ? currentUser.userDetails.name
                  : currentUser.userDetails.details.name}
              </h5>
              <p className="card-text text-muted mb-4">
                <i className="fas fa-envelope me-2 text-info"></i>
                {currentUser.userDetails.type === "personal"
                  ? currentUser.userDetails.email
                  : currentUser.userDetails.details.email}
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item border-0 d-flex align-items-center">
                  <i className="fas fa-user me-3 text-primary"></i>
                  <strong>Username:</strong>
                  <span className="ms-auto">{currentUser.userDetails.username}</span>
                </li>
                <li className="list-group-item border-0 d-flex align-items-center">
                  <i className="fas fa-mobile-alt me-3 text-success"></i>
                  <strong>Mobile:</strong>
                  <span className="ms-auto">
                    {currentUser.userDetails.type === "personal"
                      ? currentUser.userDetails.mobileNumber
                      : currentUser.userDetails.details.mobileNumber}
                  </span>
                </li>
                {currentUser.userDetails.type === "organization" && (
                  <>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-map-marker-alt me-3 text-warning"></i>
                      <strong>Place:</strong>
                      <span className="ms-auto">
                        {currentUser.userDetails.organization.place}
                      </span>
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-building me-3 text-secondary"></i>
                      <strong>Description:</strong>
                      <span className="ms-auto">
                        {currentUser.userDetails.organization.description}
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center vh-100">
          <h1 className="text-danger">Login to access this page!</h1>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}


export default UserProfile;


