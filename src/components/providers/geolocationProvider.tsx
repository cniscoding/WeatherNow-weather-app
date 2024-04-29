'use client'

export function geolocationProvider() {
  return new Promise<{ lat: string; lon: string }>((resolve, reject) => {
    console.log('geolocationProvider status', 'hello im hit')
    if (typeof navigator === 'undefined') {
      // Handle cases where navigator is not available (e.g., during server-side rendering)
      console.log('navigator status', navigator)
      resolve({ lat: '49.16', lon: '-123.13' });
    } else {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const { latitude, longitude } = success.coords;
          console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
          // resolve({ lat: latitude.toString(), lon: longitude.toString() });
          return { lat: latitude.toString(), lon: longitude.toString() }
        },
        (error) => {
          console.error('Error getting location:', error);
          // Set default latitude and longitude to Japan
          console.log('Using default latitude and longitude: 36.2048, 138.2529');
          // resolve({ lat: '36.2048', lon: '138.2529' });
          return { lat: '36.2048', lon: '138.2529' }
        }
      );
    }
  });
}
