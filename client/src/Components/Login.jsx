import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import CustomLogo from "./CustomLogo";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../utils/Network";

const Login = ({ onButtonClicked, activeTab }) => {
  const isUser = activeTab === "user";

  const navigate = useNavigate();

  const handleBackClick = () => {
    onButtonClicked();
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const body = {
      email,
      password,
    };

    if (!email || !password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      setIsLoading(false);
      return;
    }

    const checkmail = await get(`${activeTab}/checkemail/${email}`);
    if (!checkmail.status) {
      alert("Mail does not exists , feel free to Sign Up");
      setIsLoading(false);
      return;
    }

    const response = await post(`${activeTab}/login`, body);
    if (response.status) {
      const token = response.token;
      const isAdmin = activeTab !== "user";
      localStorage.setItem("token", token);
      localStorage.setItem("user", response.email);
      if (isAdmin) localStorage.setItem("isAdmin", isAdmin);
      alert("Loged In");
      navigate("/home", { replace: true });
      // onButtonClicked();
    } else alert("failed");
    setIsLoading(false);
  };

  return (
    <div>
      <div className="relative flex flex-row items-center justify-center mb-8">
        <div className="w-2/5">
          <CustomLogo />
        </div>
        <div className="absolute top-0 left-0 ml-4 mt-4">
          <button onClick={handleBackClick}>
            <FiArrowLeft className="text-gray-500 text-xl" /> {/* Back icon */}
          </button>
        </div>
      </div>
      <div>
        <input
          type="text"
          id="email"
          className="w-full px-4 py-2 mb-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 mb-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Password"
        />

        <button
          className={`w-full px-4 py-2 text-sm font-semibold ${
            isUser ? "text-blue-500" : "text-orange-500"
          } bg-white border   ${
            isUser ? "border-blue-500" : "border-orange-500"
          } rounded hover:${isUser ? "bg-blue-60" : "bg-orange-60"}`}
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
