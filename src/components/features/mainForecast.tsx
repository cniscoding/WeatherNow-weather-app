
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { TiWeatherDownpour } from 'react-icons/ti';


interface MainForecastProps {
  currentWeather: any; // Define the type of currentWeather object
  // isCelsius: boolean;
}

const MainForecast: React.FC<MainForecastProps> = ({ currentWeather, isCelsius }) => {

  // let time = currentWeather.list.dt
  // const date = new Date(time * 1000); // Convert timestamp to milliseconds
  // console.log(date.toString()); // Output the date and time

  // const currentLocalDate = new Date().toLocaleDateString("en-US", {
  //   timeZoneName: "short",
  //   weekday: "long",
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  // }
  // )
  // console.log(currentLocalDate);
  // console.log('currentWeather.list[1]', currentWeather.list[1])

  return (
    <Card className="main-forecast w-full flex flex-col border-2 rounded-xl">
      <CardTitle className="">Current Weather</CardTitle>
      <CardDescription>
        {new Date().toLocaleDateString("en-US", {
          timeZoneName: "short",
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
        )}
      </CardDescription>
      <div className="flex items-center justify-center flex-col">
        {/* current weather container */}
        <div className="w-full">
          <div className="border-2 rounded-xl w-full">
            <CardHeader className="flex flex-col justify-center items-center">
              <CardTitle>{currentWeather.timezone}</CardTitle>
              <CardDescription>{currentWeather.daily[0].summary}</CardDescription>
              {console.log('currentWeather', currentWeather)}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                  <div className="weather-details flex flex-row">
                    <TiWeatherDownpour className="text-5xl" />
                    <div className="temperature flex items-center justify-center text-4xl">
                      <p>
                        {currentWeather.current.temp}°{isCelsius ? 'C' : 'F'}
                      </p>
                    </div>
                  </div>
                <p>Feels like {currentWeather.current.feels_like}°{isCelsius ? 'C' : 'F'}{'.'}</p>
                <p>{currentWeather.current.weather[0].description}</p>
                <div className="weather-info">
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MainForecast;
