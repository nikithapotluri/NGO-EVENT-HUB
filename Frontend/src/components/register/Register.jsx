import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [type, setType] = useState(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate();


  // Handle user registration
  async function onUserRegister(newUser) {
    try {
      const res = await fetch("https://ngo-event-hub-backend.vercel.app/user-api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
 
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        throw new Error("Invalid JSON response from server");
      }
 
      console.log("Response Data:", data);
 
      if (res.ok) {
        navigate("/"); // Redirect to login
      } else {
        setErr(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErr("Network error or server unavailable. Try again later.");
    }
  }
 


  return (
    <div className="register-container">
      <p className="display-5 text-center text-black registration-heading">
        {type === "Personal" ? "User Registration" : type === "Professional" ? "Organization Registration" : ""}
      </p>


      <div className="row">
        <div className="col-11 col-sm-10 col-md-6 mx-auto">
          {/* Error message */}
          {err && <p className="fs-2 text-danger text-center">{err}</p>}


          {/* Account Type Selection */}
          {!type && (
            <div className="container text-center mt-5 p-4 border rounded shadow bg-white">
               <h3 className="mb-4">Choose an Account Type</h3>
            <button
              className="btn btn-primary me-3"
              onClick={() => setType("Personal")}
            >
                Personal Account
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setType("Professional")}
              >
                Organization Account
              </button>
            </div>
          )}


          {/* Personal Account Form */}
          {type === "Personal" && (
            <form
              className="form-container bg-light p-3 mb-5"
              onSubmit={handleSubmit(onUserRegister)}
            >
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-danger">*Username is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-danger">*Password is required</p>
                )}
              </div>


              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  id="type"
                  className="form-control"
                  {...register("type", { required: true })}
                >
                  <option value="personal">Personal</option>
                </select>
                {errors.type && (
                  <p className="text-danger">*Type is required</p>
                )}
              </div>


              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                />
                {errors.name && (
                  <p className="text-danger">*Name is required</p>
                )}
              </div>
             
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  className="form-control"
                  {...register("mobileNumber", { required: true })}
                />
                {errors.mobileNumber && (
                  <p className="text-danger">*Phone number is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-danger">*Email is required</p>
                )}
              </div>
              <button className="btn btn-success" type="submit">
                Register
              </button>
            </form>
          )}


          {/* Professional Account Form */}
          {type === "Professional" && (
            <div className="form-wrapper">
            <form
              className="form-container bg-light p-3 mb-5"
              onSubmit={handleSubmit(onUserRegister)}
            >
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-danger">*Username is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-danger">*Password is required</p>
                )}
              </div>


              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  id="type"
                  className="form-control"
                  {...register("type", { required: true })}
                >
                  <option value="organization">Organization</option>
                </select>
                {errors.type && (
                  <p className="text-danger">*Type is required</p>
                )}
              </div>
              <h5>Details</h5>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  {...register("details.name", { required: true })}
                />
                {errors.details?.name && (
                  <p className="text-danger">*Name is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  className="form-control"
                  {...register("details.mobileNumber", { required: true })}
                />
                {errors.details?.mobileNumber && (
                  <p className="text-danger">*Mobile number is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  {...register("details.email", { required: true })}
                />
                {errors.details?.email && (
                  <p className="text-danger">*Email is required</p>
                )}
              </div>
              <h5>Organization Details</h5>
              <div className="mb-3">
                <label htmlFor="place" className="form-label">
                  Place
                </label>
                <input
                  type="text"
                  id="place"
                  className="form-control"
                  {...register("organization.place", { required: true })}
                />
                {errors.organization?.place && (
                  <p className="text-danger">*Place is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  {...register("organization.description", { required: true })}
                ></textarea>
                {errors.organization?.description && (
                  <p className="text-danger">*Description is required</p>
                )}
              </div>
              <button className="btn btn-success" type="submit">
                Register
              </button>
             
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default Register;
