'use client'

export function geolocationProvider() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const { latitude, longitude } = success.coords;
        console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
        // Set default latitude and longitude to Japan
        console.log('Using default latitude and longitude: 36.2048, 138.2529');
        resolve({ lat: '36.2048', lon: '138.2529' });
      }
    );
  });
}