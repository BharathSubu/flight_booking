import React, { useState, useEffect } from "react";
import LandingComponent from "../Components/LandingComponent.jsx";
import Signin from "../Components/Signin.jsx";
import Login from "../Components/Login.jsx";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [landingPage, setLandingPage] = useState(true);

  const handleButtonClicked = (buttonName) => {
    setLandingPage(false);
    if (buttonName === "signup") {
      setLogIn(false);
      setSignUp(true);
    } else {
      setLogIn(true);
      setSignUp(false);
    }
  };

  const returnLanding = () => {
    setLandingPage(true);
    setLogIn(false);
    setSignUp(false);
  };

  return (
    <div className="relative flex  items-center justify-center h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute w-full h-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-900 opacity-75 animate-sea-wave-1"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 opacity-75 animate-sea-wave-3 mix-blend-multiply filter blur-2xl"></div>
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 opacity-75 animate-sea-wave-2 mix-blend-multiply filter blur-2xl"></div>
      </div>
      <div className="mx-4 my-4">
        <div className="relative max-w-md px-4 py-8 bg-white shadow-lg rounded-lg z-20">
          {landingPage && (
            <LandingComponent onButtonClicked={handleButtonClicked} />
          )}
          {signUp && <Signin onButtonClicked={returnLanding} />}
          {logIn && <Login onButtonClicked={returnLanding} />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
