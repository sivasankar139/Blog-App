import React from 'react';
import HomePage from './Components/HomePage';
import './App.css'
import Navbar from './Components/Navbar';
import { useSelector } from 'react-redux';
import { selectSignedIn } from './features/userSlice';
import Blogs from './Components/Blogs';
const App = () => {
  const isSignedIn =useSelector(selectSignedIn);
  return (
    <div>
      <Navbar/>
      <HomePage/>
      {isSignedIn && <Blogs/>}
    </div>
  )
};

export default App;
