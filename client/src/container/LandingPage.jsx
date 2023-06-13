import React, { useState, useEffect } from "react";
import LandingComponent from "../Components/LandingComponent.jsx";
import Signin from "../Components/Signin.jsx";
import Login from "../Components/Login.jsx";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg.jpg";
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

  const returnLanding = async () => {
    setLandingPage(true);
    setLogIn(false);
    setSignUp(false);
  };

  const [activeTab, setActiveTab] = useState("user");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const UserLoginForm = () => {
    return (
      <div>
        {landingPage && (
          <LandingComponent
            onButtonClicked={handleButtonClicked}
            activeTab={activeTab}
          />
        )}
        {signUp && (
          <Signin onButtonClicked={returnLanding} activeTab={activeTab} />
        )}
        {logIn && (
          <Login onButtonClicked={returnLanding} activeTab={activeTab} />
        )}
      </div>
    );
  };

  const AdminLoginForm = () => {
    return (
      <div>
        {landingPage && (
          <LandingComponent
            onButtonClicked={handleButtonClicked}
            activeTab={activeTab}
          />
        )}
        {signUp && (
          <Signin onButtonClicked={returnLanding} activeTab={activeTab} />
        )}
        {logIn && (
          <Login onButtonClicked={returnLanding} activeTab={activeTab} />
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 opacity-100">
      <div className="relative justify-center m-5">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 mr-2 font-medium ${
                activeTab === "user"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
              onClick={() => handleTabChange("user")}
            >
              User Login
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "admin"
                  ? "bg-orange-500 text-white"
                  : "text-orange-500"
              }`}
              onClick={() => handleTabChange("admin")}
            >
              {" "}
              Admin Login
            </button>
          </div>
          {activeTab === "user" ? <UserLoginForm /> : <AdminLoginForm />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
