import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn, setSignedIn, setUserData,setInput } from "../features/userSlice";
import {selectUserData} from '../features/userSlice'
import '../Styling/Navbar.css'
const Navbar = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const [inputValue, setInputValue] = useState("tech");
  const userData=useSelector(selectUserData);
  const dispatch=useDispatch();
  const logout=(response)=>{
      dispatch(setSignedIn(false))
      dispatch(setUserData(null));
  }
  const handleClick=(e)=>{
    e.preventDefault();
    dispatch(setInput(inputValue));
  }
  return (
    <div className="navbar">
      <h1 className="navbar__header">BlogMania</h1>
      {isSignedIn ? (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>Search</button>
        </div>
      ):<h1 className="notSignedIn">User Not avalible</h1>}
      {isSignedIn ? <div className="navbar__user__data">
          <Avatar 
          className="user"
          src={userData?.imageUrl} alt={userData?.name}/>
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout 
          clientId="307903905060-006sh952hobkne1qbehq4mktnhhprkrd.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="logout__button"
            >
              Logout
            </button>
          )}
          
          onLogoutSuccess={logout}
          />
      </div>:""}
    </div>
  );
};

export default Navbar;
