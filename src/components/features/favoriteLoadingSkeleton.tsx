import React, { useEffect, useState } from 'react';

const FavoriteForecastLoadingSkeleton: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col p-4 shadow-md">
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="rounded-xl flex flex-col m-2 shadow-lg">
              <div className="flex flex-col justify-center items-center p-1">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="flex-grow">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col">
                    <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                    <div className="temperature flex items-center justify-center flex-col">
                      <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Card className="w-full flex flex-col p-4 shadow-md">
        <CardTitle className="">Favorites</CardTitle>
        <div className="">
          {favoriteList.map((location, index) => (
            <div className="rounded-xl flex flex-col m-2 shadow-lg" key={index}>
              <CardHeader className="flex flex-col justify-center items-center p-1">
                <CardTitle>{location.location}</CardTitle>
                <CardDescription><p>{location.current.weather[0].description}</p></CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col">
                    {/* <div className={`relative invert-0 dark:invert mb-2`}> */}
                    <div>
                      {location.current.weather[0].icon && (
                        <img
                          alt={location.current.weather[0].description}
                          src={`https://openweathermap.org/img/wn/${location.current.weather[0].icon}@2x.png`}
                          className="select-none"
                        />
                      )}
                    </div>
                    <div className="temperature flex items-center justify-center flex-col">
                      <CardTitle >{roundTemperature(location.current.temp)} °{isCelsius ? 'C' : 'F'}</CardTitle>
                      <CardDescription>Feels like {roundTemperature(location.current.feels_like)} °{isCelsius ? 'C' : 'F'}{'.'}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </Card>
        
    )
  }
};

export default FavoriteForecastLoadingSkeleton;