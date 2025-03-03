import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();

  const onUserRegister = (userObj) => {
    setRegisteredUsers([...registeredUsers, userObj]);
    console.log("Registered Users:", registeredUsers);
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <h2 className="text-center">Register</h2>
        <form
          className="form-container bg-light p-3 mb-5"
          onSubmit={handleSubmit(onUserRegister)}
        >
          <div className="scrollable-form">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register("username", { required: true })}
            />
            {errors.username && <p className="error">Username is required</p>}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="error">Email is required</p>}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="error">Password must be at least 6 characters</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;