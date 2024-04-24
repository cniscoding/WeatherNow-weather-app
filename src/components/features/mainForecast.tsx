
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { TiWeatherDownpour } from 'react-icons/ti';


interface MainForecastProps {
  currentWeather: any; // Define the type of currentWeather object
  // isCelsius: boolean;
}

  const MainForecast: React.FC<MainForecastProps> = ({ currentWeather, isCelsius }) => {
    
  return (
    <Card className="main-forecast w-full flex flex-col border-2 rounded-xl">
      <CardTitle className="">Current Weather</CardTitle>
      <div className="flex items-center justify-center flex-col">
        {/* current weather container */}
        <div className="w-full">
          <div className="border-2 rounded-xl w-full">
            <CardHeader className="flex flex-col justify-center items-center">
            {/* <CardTitle>{currentWeather}</CardTitle>
              <CardDescription>{currentWeather}</CardDescription> */}
              <CardTitle>{currentWeather.location}</CardTitle>
              <CardDescription>{currentWeather.dateTime}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <p>Feels like {currentWeather.feelsLike}°{isCelsius ? 'C' : 'F'}{'.'} {currentWeather.description}</p>
                <div className="weather-info">
                  <div className="weather-details flex flex-row">
                    <TiWeatherDownpour className="text-5xl" />
                    <div className="temperature flex items-center justify-center text-4xl">
                      <p>
                        {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </Card>
  );
};


//   return (
//     <Card className="main-forecast w-full flex flex-col border-2 rounded-xl">
//       <CardTitle className="">Current Weather</CardTitle>
//       <div className="flex items-center justify-center flex-col">
//         {/* current weather container */}
//         <div className="w-full">
//           <div className="border-2 rounded-xl w-full">
//             <CardHeader className="flex flex-col justify-center items-center">
//               <CardTitle>{currentWeather.location}</CardTitle>
//               <CardDescription>{currentWeather.dateTime}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col justify-center items-center">
//                 <p>Feels like {currentWeather.feelsLike}°{isCelsius ? 'C' : 'F'}{'.'} {currentWeather.description}</p>
//                 <div className="weather-info">
//                   <div className="weather-details flex flex-row">
//                     <TiWeatherDownpour className="text-5xl" />
//                     <div className="temperature flex items-center justify-center text-4xl">
//                       <p>
//                         {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

export default MainForecast;
