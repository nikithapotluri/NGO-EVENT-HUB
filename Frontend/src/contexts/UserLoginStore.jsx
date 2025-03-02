import { userLoginContext } from "./userLoginContext";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function UserLoginStore({ children }) {
  //login user state
  let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
  let [userLoginStatus, setUserLoginStatus] = useState(!!localStorage.getItem('currentUser'));
  let [err, setErr] = useState("");

  //user login
  async function loginUser(userCred) {
    try {
      let res = await fetch(
        `https://ngo-event-hub-hksp.vercel.app/user-api/login`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" ,},
          body: JSON.stringify(userCred),
        }
      );
      let result = await res.json();
     
      if (result.message === 'Login successful') {
        toast.success('Login Successful!');
      
        setCurrentUser(result.user);
        console.log(result.user);
        setUserLoginStatus(true);
        setErr('');
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
      }
       else {
          setErr(result.message);
          setCurrentUser({})
          setUserLoginStatus(false)
          localStorage.removeItem('currentUser')
          toast.error('Invalid Username or Password');
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  //user logout
  function logoutUser() {
    //reset state
    console.log('Logging out')
    setCurrentUser({});
    setUserLoginStatus(false);
    setErr('')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if(storedUser)
    {
      setCurrentUser(storedUser);
      setUserLoginStatus(true);
    }
  },[]);

  return (
    <userLoginContext.Provider
      value={{ loginUser, logoutUser, userLoginStatus,err,currentUser,setCurrentUser }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;