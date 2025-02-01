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
        navigate("/home");
      }, 2000); // 2-second delay
    }
  }, [userLoginStatus, navigate]);

  return (
    <div>
      <p className="display-3 text-center">Login</p>
      {/* Login form */}
      <div className="row">
        <div className="col-11 col-sm-10 col-md-6 mx-auto">
          {/* Error message */}
          {/*err && <p className="fs-2 text-danger">{err}</p>*/}
          <form
            className="mx-auto mt-5 bg-light p-3"
            onSubmit={handleSubmit(onUserLogin)}
          >
            {/* Username */}
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
              {errors.username?.type === "required" && (
                <p className="text-danger lead">*Username is required</p>
              )}
            </div>
            {/* Password */}
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
              {errors.password?.type === "required" && (
                <p className="text-danger lead">*Password is required</p>
              )}
            </div>
            {/* Submit button */}
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
          {/* Link to register */}
          <div className="mt-3 text-center">
            <p>
              New User?{" "}
              <Link to="/register" className="text-primary">
                Click here to Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer/>
    </div>
  );
}

export default Login;
