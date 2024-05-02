import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { roundTemperature, celsiusToFahrenheit } from '../../lib/utils';
import Image from 'next/image';
import { MdCancel } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { getWeatherData } from '@/lib/getWeatherData'


interface favoriteProp {
  isCelsius: boolean;
  favoriteLocationData: Location[];
  // addFavoriteLocation: (newLocation: Location) => void;
  removeFavoriteLocation: (locationToRemove: any) => void;
  currentWeatherUpdate: any
}

interface Location {
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  current: {
    weather: {
      icon: string;
      description: string;
    }[];
    temp: number;
    feels_like: number;
  };
}

export const FavoriteForecast: React.FC<favoriteProp> = ({currentWeatherUpdate, removeFavoriteLocation, isCelsius, favoriteLocationData }) => {
  const navigation = useRouter();


  const handleItemClick = (lat: number, lon: number) => {
    let searchString = `?Latitude=${lat}&Longitude=${lon}`;
    navigation.push(`/${searchString}`);
    // const newUrl = window.location.origin + '/' + searchString;
    // window.location.href = newUrl;
    // getWeatherData(lat,lon)
    currentWeatherUpdate(lat,lon)
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await new Promise(resolve => setTimeout(resolve, 500));

  //       // setCurrentWeather(favoriteLocationData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching weather data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleFavoriteToggle = (location: Location) => {
  //   const isFavorite = isLocationFavorite(location);
  //   console.log('clicked');
  //   console.log(isFavorite, 'isFavorite')
  //   console.log(location, 'location')
  //   console.log(favoriteLocationData, 'FavoriteLocationData')
  //   if (isFavorite) {
  //     setFavoriteLocationData(prevData => prevData.filter(item => item.location !== location.location));
  //   } else {
  //     setFavoriteLocationData(prevData => [...prevData, location]);
  //   }
  // };

  // const isLocationFavorite = (location: Location) => {
  //   return favoriteLocationData.some(item => item.location === location.location);
  // };

  const handleFavoriteToggle = (location: any) => {
    if (favoriteLocationData.includes(location)) {
      removeFavoriteLocation(location);
    } else {
      // addFavoriteLocation(location);
    }
  };

  if (!favoriteLocationData) {
    return (
      <Card className="w-full flex flex-col p-4 shadow-md">
        <CardTitle className="animate-pulse">Favorites</CardTitle>
        {[1, 2, 3].map((_, index) => (
          <div className="rounded-xl flex flex-col m-2 shadow-lg" key={index}>
            <CardHeader className="flex flex-col justify-center items-center p-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col">
                  <div className="h-16 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="temperature flex items-center justify-center flex-col">
                    <div className="h-6 bg-gray-300 rounded w-16 mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        ))}
      </Card>
    );
  }

  if (favoriteLocationData.length === 0) {
    return (
      <Card className="w-full flex flex-col p-4 shadow-md">
        <CardTitle className="">Favorites</CardTitle>

        <CardHeader className="flex flex-col justify-center items-center p-1">
          <CardTitle className="text-center"></CardTitle>
          <CardDescription className="text-center tracking-tight">You currently have no favorites.</CardDescription>
        </CardHeader>

      </Card>
    );
  }

  return (
    <Card className="w-full flex flex-col p-3 shadow-md">
      <CardTitle className="text-center md:text-left">Favorites</CardTitle>
      <div className="">
        {favoriteLocationData.slice(0, 6).map((location: Location, index: number) => (
          <div key={index} className=''>
            <div className="flex justify-end relative">
              <span className="inline-block cursor-pointer absolute top-0 right-0">
                <MdCancel
                  onClick={() => handleFavoriteToggle(location)}
                  className="text-red-400 hover:text-red-900 transition-colors duration-300 text-3xl"
                />
              </span>
            </div>
            <div className="cursor-pointer rounded-xl flex flex-row my-2 shadow-lg" key={index} onClick={() => handleItemClick(location.coordinates.latitude, location.coordinates.longitude)}>
              <CardHeader className="flex flex-col justify-center items-center p-1">
                <CardTitle className="text-center">{location.location}</CardTitle>
                <CardDescription className="text-center tracking-tight">{location.current.weather[0].description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow w-full">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex relative">
                    {/* <div> */}
                    {location.current.weather[0].icon && (
                      // <img
                      <Image
                        alt={location.current.weather[0].description}
                        src={`https://openweathermap.org/img/wn/${location.current.weather[0].icon}@2x.png`}
                        className="select-none"
                        width={85}
                        height={100}
                        priority={true}
                      />
                    )}
                    {/* </div> */}
                    <div className="tracking-tight temperature flex items-center justify-center flex-col">
                      <CardTitle>
                        {
                          isCelsius
                            ? `${roundTemperature(location.current.temp)} °C`
                            : `${roundTemperature(celsiusToFahrenheit(location.current.temp))} °F`
                        }
                      </CardTitle>

                      <CardDescription className="tracking-tight">
                        Feels like {
                          isCelsius
                            ? `${roundTemperature(location.current.feels_like)} °C`
                            : `${roundTemperature(celsiusToFahrenheit(location.current.feels_like))} °F`
                        }.
                      </CardDescription>
                    </div>

                  </div>
                </div>
              </CardContent>
            </div>
          </div>

        ))}
        {favoriteLocationData.length > 6 && (
          <div className="text-center">+{favoriteLocationData.length - 6} more</div>
        )}
      </div>
    </Card>
  );
};