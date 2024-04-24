export default async function getWeatherData() {
  const lat = "49.16";
  const lon = "-123.13";
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    console.log("Fetched data:", data); // Add this line to log the fetched data
    // return {
    //   props: {
    //     data
    //   }
    // };
    return {
      data // Return the data as props
    };
    // return data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);

    // return {
    //   props: {
    //     data: null
    //   }
    // };
    return {
      data : null
    }

  }
}
