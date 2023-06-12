
import React from 'react'
import CustomLogo from './CustomLogo';

const LandingComponent = ({ onButtonClicked }) => {
    const handleButtonClick = (buttonName) => {
        onButtonClicked(buttonName);
      };
      
  return (
    <div>
    <div className="relative flex flex-row items-center justify-center mb-8">
       <div className='w-2/5'> 
        <CustomLogo/>
       </div> 
    </div>
    <div className="mb-0">
      <button className="w-full px-4 py-2 mb-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
     onClick={() => handleButtonClick('signup')}>
        Sign Up
      </button>
      <button className="w-full px-4 py-2 text-sm font-semibold text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-50"
      onClick={() => handleButtonClick('login')}>
        Login
      </button>
    </div>
  </div>
  )
}

export default LandingComponent