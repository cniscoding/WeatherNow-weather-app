const MainLoadingSkeleton: React.FC = () => {
  return (
    <div className="main-forecast w-full flex flex-col p-2 shadow-2xl animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="flex shadow-xl">
        <div className="w-full">
          <div className="shadow-xl rounded-xl">
            <div className="flex flex-col justify-center items-center p-2">
              <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="weather-details flex flex-row">
                <div className="h-16 w-16 bg-gray-300 rounded-full mr-2"></div>
                <div className="temperature flex items-center justify-center flex-col">
                  <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1 p-2 rounded-xl shadow-md animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-2"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLoadingSkeleton;