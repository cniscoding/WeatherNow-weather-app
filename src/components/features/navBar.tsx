import React from 'react';

interface navBarProps {

}

const navBar: React.FC<navBarProps> = ({ }) => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center border-2">
      <div className="flex">
        <input
          type="text"
          placeholder="Search For Location"
          className="border-b border-white bg-transparent text-white"
        /> 🔎
        {/* <img src="/magnify.png" alt="Search" className="" /> */}
      </div>
      <div className="flex space-x-4">
        <span className="underline cursor-pointer">Hourly</span>
        <span className="underline cursor-pointer">36 Hours</span>
        <span className="underline cursor-pointer">Weekend</span>
        <span className="underline cursor-pointer">8 Day</span>
      </div>
    </nav>
  )
}
export default navBar