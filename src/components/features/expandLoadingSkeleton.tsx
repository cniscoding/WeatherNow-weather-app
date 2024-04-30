import React from 'react';

const ExpandForecastLoadingSkeleton = () => {
  return (
    <div className="rounded-xl p-4 shadow-2xl animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-2"></div>

      <div className="pt-2 forecast-container grid grid-cols-6 gap-2">
        {/* Placeholder for each day */}
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className="border-2 rounded-xl p-1">
            <div className="flex flex-col h-full justify-between">
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
              <div className="relative h-16 w-16 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="forecast-container grid grid-cols-6 gap-2">
        <ul className="flex flex-col items-end justify-center">
          <li className="h-4 bg-gray-300 rounded"></li>
          <li className="bg-gray-200 h-4 w-full flex justify-end"></li>
          <li className="h-4 bg-gray-300 rounded"></li>
          <li className="bg-gray-200 h-4 w-full flex justify-end"></li>
        </ul>

        {/* Placeholder for temperature values */}
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="border-2 rounded-xl">
            <ul className="h-24">
              <li className="border-b-2 w-full h-6 bg-gray-300 rounded"></li>
              <li className="border-b-2 w-full h-6 bg-gray-200 rounded"></li>
              <li className="border-b-2 w-full h-6 bg-gray-300 rounded"></li>
              <li className="border-b-2 w-full h-6 bg-gray-200 rounded"></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandForecastLoadingSkeleton;