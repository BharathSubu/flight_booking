import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import CustomLogo from "./CustomLogo";
import { get, post, put } from "../utils/Network";

const Signin = ({ onButtonClicked }) => {
  const handleBackClick = () => {
    onButtonClicked();
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const body = {
      username,
      email,
      password,
    };
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      setIsLoading(false);
      return;
    }

    const checkmail = await get(`user/checkemail/${email}`);
    if (checkmail.status) {
      alert("Mail already exists");
      setIsLoading(false);
      return;
    }
    const response = await post("user/register", body);
    if (response.status) {
      onButtonClicked();
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
          id="username"
          className="w-full px-4 py-2 mb-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Username"
        />
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
          className="w-full px-4 py-2 mb-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Signin;
