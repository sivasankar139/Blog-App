import React from "react";
import { useDispatch, useSelector } from "react-redux";
import book from "./books.png";
// import selectSignedIn from "../features/userSlice";
import {selectSignedIn,  setSignedIn, setUserData } from "../features/userSlice";
import "../Styling/Home.css";
import GoogleLogin from "react-google-login";
const HomePage = () => {
  const dispatch =useDispatch();
  const isSignedIn=useSelector(selectSignedIn)
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj))
  };
  return (
    <div className="home__page" style={{display:isSignedIn ? "none":""}}>
      {!isSignedIn ? (<div className="login__message">
       <h2><img src={book} width={50} height={50} /></h2> 
        <h2>A Readers favourite place!</h2>
        <p>
          We provide high quality online resources for reading blogs.just sign
          up start readind some quality blogs
        </p>
        <GoogleLogin
          clientId="307903905060-006sh952hobkne1qbehq4mktnhhprkrd.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="login__button"
            >
              Login with Google
            </button>
          )}
          onSuccess={login}
          onFailure={login}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      </div>):("")}
    </div>
  );
};

export default HomePage;
