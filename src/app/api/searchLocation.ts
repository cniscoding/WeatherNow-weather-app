
'use server'

export async function searchLocation(searchQuery: string) {

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};