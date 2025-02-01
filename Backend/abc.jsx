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
      const res = await fetch("http://localhost:5173/user-api/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (data.message === "user created") {
        navigate("/login");
      } else {
        setErr(data.message);
      }
    } catch (err) {
      console.log("Error:", err);
      setErr(err.message);
    }
  }

  return (
    <div>
      <p className="display-3 text-center">User Registration</p>

      <div className="row">
        <div className="col-11 col-sm-10 col-md-6 mx-auto">
          {/* Error message */}
          {err && <p className="fs-2 text-danger text-center">{err}</p>}

          {/* Account Type Selection */}
          {!type && (
            <div className="text-center mt-5">
              <button
                className="btn btn-primary me-3"
                onClick={() => setType("Personal")}
              >
                Personal Account
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setType("Professional")}
              >
                Organization Account
              </button>
            </div>
          )}

          {/* Personal Account Form */}
{type === "Personal" && (
  <form
    className="mx-auto mt-5 bg-light p-3"
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
      <input
        type="text"
        id="type"
        className="form-control"
        placeholder="Enter 'personal' here"
        {...register("type", { required: true })}
      />
      {errors.name && (
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
        {...register("name", { required: true })}
      />
      {errors.name && (
        <p className="text-danger">*Name is required</p>
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
    <div className="mb-3">
      <label htmlFor="phone" className="form-label">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        className="form-control"
        {...register("phone", { required: true })}
      />
      {errors.phone && (
        <p className="text-danger">*Phone number is required</p>
      )}
    </div>
    <button className="btn btn-success" type="submit">
      Register
    </button>
  </form>
)}


          {/* Professional Account Form */}
          {type === "Professional" && (
            <form
              className="mx-auto mt-5 bg-light p-3"
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
      <input
        type="text"
        id="type"
        className="form-control"
        placeholder="Enter 'organization' here"
        {...register("type", { required: true })}
      />
      {errors.name && (
        <p className="text-danger">*Type is required</p>
      )}
    </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  type
                </label>
                <input
                  type="text"
                  id="type"
                  className="form-control"
                  {...register("type", { required: true })}
                />
                {errors.type && <p className="text-danger">*type is required</p>}
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
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  className="form-control"
                  {...register("details.mobile", { required: true })}
                />
                {errors.details?.mobile && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;