import React, { useState , useEffect} from "react";
import { useForm } from "react-hook-form";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaClock, FaLink, FaDollarSign, FaPencilAlt } from "react-icons/fa";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginContext } from "../../contexts/userLoginContext";
import { ToastContainer, toast } from "react-toastify";
const CreateEvents = () => {

  const navigate = useNavigate();
  const {currentUser, userLoginStatus} = useContext(userLoginContext);

  if(userLoginStatus===true)  console.log(currentUser.userDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit (data)  {
    const eventData = {
      ...data,
      userDetails:currentUser.userDetails
    }

    const res = await fetch("http://localhost:4000/event-api/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(eventData),
    });

    console.log("Event Data:", eventData);
    toast.success("Event Created Successfully!");
    navigate('/upcomingevents')
  };

  return (

    <div>
    {
      
        userLoginStatus?(
          <div className="container mt-5">
      <h2 className="text-center mb-4">Create Your Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">
            <FaPencilAlt className="me-2" />
            Name of the Event:
          </label>
          <input
            type="text"
            className={`form-control ${errors.eventName ? "is-invalid" : ""}`}
            {...register("eventName", { required: "Event name is required" })}
          />
          {errors.eventName && <div className="invalid-feedback">{errors.eventName.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FaPencilAlt className="me-2" />
            Description:
          </label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FaMapMarkerAlt className="me-2" />
            Location:
          </label>
          <input
            type="text"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FaRegCalendarAlt className="me-2" />
            Date:
          </label>
          <input
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FaClock className="me-2" />
            Timings:
          </label>
          <input
            type="time"
            className={`form-control ${errors.time ? "is-invalid" : ""}`}
            {...register("time", { required: "Timings are required" })}
          />
          {errors.time && <div className="invalid-feedback">{errors.time.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FaLink className="me-2" />
            Register Link:
          </label>
          <input
            type="url"
            className={`form-control ${errors.registerLink ? "is-invalid" : ""}`}
            {...register("registerLink", { required: "Register link is required" })}
          />
          {errors.registerLink && <div className="invalid-feedback">{errors.registerLink.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FaDollarSign className="me-2" />
            Payment Link:
          </label>
          <input
            type="url"
            className={`form-control ${errors.paymentLink ? "is-invalid" : ""}`}
            {...register("paymentLink")}
          />
          {errors.paymentLink && <div className="invalid-feedback">{errors.paymentLink.message}</div>}
        </div>


        <button type="submit" className="btn btn-primary w-100">
          Create Event
        </button>
      </form>
    </div>
        ):(
          <div className="d-flex justify-content-center  vh-100">
              <h1 className="text-danger">Login to access this page!</h1>
          </div>

        )
    }
    <ToastContainer />
    </div>
  );
};

export default CreateEvents;
