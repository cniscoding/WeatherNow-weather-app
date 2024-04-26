'use server'

// async function getDefaultLocation() {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (success) => {
//         const { latitude, longitude } = success.coords;
//         resolve({ lat: latitude, lon: longitude });
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         // Set default latitude and longitude to Japan
//         resolve({ lat: '36.2048', lon: '138.2529' });
//       }
//     );
//   });
// }

export default async function getWeatherData(lat, lon) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const exclude = 'minutely';
  const units = 'metric';

  // let { lat, lon } = await getDefaultLocation();
  console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${apiKey}`)

  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return { error: 'Failed to fetch weather data' };
  }
}