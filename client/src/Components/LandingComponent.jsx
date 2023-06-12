import React from "react";
import CustomLogo from "./CustomLogo";

const LandingComponent = ({ onButtonClicked, activeTab }) => {
  const isUser = activeTab === "user";
  const handleButtonClick = (buttonName) => {
    onButtonClicked(buttonName);
  };

  return (
    <div>
      <div className="relative flex flex-row items-center justify-center mb-8">
        <div className="w-2/5">
          <CustomLogo />
        </div>
      </div>
      <div className="mb-0">
        <button
          className={`w-full px-4 py-2 mb-2 text-sm font-semibold text-white ${
            isUser ? "bg-blue-500" : "bg-orange-500"
          } rounded hover:${isUser ? "bg-blue-600" : "bg-orange-600"}`}
          onClick={() => handleButtonClick("signup")}
        >
          Sign Up
        </button>
        <button
          className={`w-full px-4 py-2 text-sm font-semibold ${
            isUser ? "text-blue-500" : "text-orange-500"
          } bg-white border   ${
            isUser ? "border-blue-500" : "border-orange-500"
          } rounded hover:${isUser ? "bg-blue-60" : "bg-orange-60"}`}
          onClick={() => handleButtonClick("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingComponent;
