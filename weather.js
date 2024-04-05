async function getWeather() {
    const locationInput = document.getElementById('locationInput').value;
    const apiUrl = `https://www.metaweather.com/api/location/search/?query=${locationInput}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.length === 0) {
        alert('Location not found. Please enter a valid location.');
        return;
      }
  
      const woeid = data[0].woeid;
      const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;
  
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
  
      const weatherInfo = document.getElementById('weatherInfo');
      weatherInfo.innerHTML = `
        <h2>Weather in ${weatherData.title}</h2>
        <p><strong>Weather state:</strong> ${weatherData.consolidated_weather[0].weather_state_name}</p>
        <p><strong>Temperature:</strong> ${weatherData.consolidated_weather[0].the_temp.toFixed(2)}°C</p>
        <p><strong>Humidity:</strong> ${weatherData.consolidated_weather[0].humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weatherData.consolidated_weather[0].wind_speed.toFixed(2)} m/s</p>
      `;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again later.');
    }
  }
  