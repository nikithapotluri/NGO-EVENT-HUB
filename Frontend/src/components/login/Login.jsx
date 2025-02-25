import "./Login.css";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { userLoginContext } from "../../contexts/userLoginContext.js";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function Login() {
  let { loginUser, userLoginStatus, err } = useContext(userLoginContext);
  const navigate = useNavigate();


  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // On user submit
  const onUserLogin = async (userCred) => {
    console.log("Login attempt with credentials:", userCred);
    await loginUser(userCred); // Call the login function
  };


  // Use useEffect to navigate when userLoginStatus changes
  useEffect(() => {
    if (userLoginStatus) {
      console.log("Navigating to /home");
      setTimeout(() => {
        navigate("/user-profile");
      }, 2000); // 2-second delay
    }
  }, [userLoginStatus, navigate]);


  return (
    <div className="login-container">
      {/* Login form inside a square container */}
      <div className="login-box">
        {/* Login text */}
        <p className="login-title">Login</p>


        <form className="login-form" onSubmit={handleSubmit(onUserLogin)}>
          {/* Username */}
          <div className="mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-danger">*Username is required</p>
            )}
          </div>


          {/* Password */}
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">*Password is required</p>
            )}
          </div>


          {/* Submit button */}
          <button className="btn btn-success w-100" type="submit">
            Submit
          </button>
        </form>


        {/* Link to register */}
        <div className="text-center mt-2">
          <p>
            New User?{" "}
            <Link to="/register" className="text-primary">
              Click here to Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}


export default Login;
