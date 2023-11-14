import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const apiKey = '294df0b6708e2266c157f1fa28ba0e96';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        // Handle the case when the city is not found or other API errors
        setError('City not found. Please enter a valid city name.');
        setWeatherData(null);
        return;
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching weather data.');
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const getBackgroundStyle = () => {
    if (weatherData) {
      const weatherMain = weatherData.weather[0].main.toLowerCase();
      if (weatherMain.includes('clear')) {
        return styles.clearBackground;
      } else if (weatherMain.includes('rain')) {
        return styles.rainBackground;
      } else if (weatherMain.includes('cloud')) {
        return styles.cloudBackground;
      } else if (weatherMain.includes('thunderstorm')) {
        return styles.thunderstormBackground;
      } else {
        return styles.defaultBackground;
      }
    }
    return styles.defaultBackground;
  };

  return (
    <div style={{ ...styles.container, ...getBackgroundStyle() }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Get Weather
        </button>
      </form>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : weatherData ? (
        <div style={styles.weatherInfo}>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img
            src={getWeatherIcon(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
            style={styles.weatherIcon}
          />
          <p>Feels like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure}</p>
          <p>Wind Speed: {weatherData.wind.speed}m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    color: 'white',
    transition: 'background-color 0.5s ease',
    
  },
  input: {
    padding: '10px',
    marginRight: '10px',
  },
  button: {
    padding: '10px',
    cursor: 'pointer',
  },
  weatherInfo: {
    marginTop: '20px',
  },
  weatherIcon: {
    width: '50px',
    height: '50px',
  },
  defaultBackground: {
    backgroundColor: '#3498db', // Default background color (blue)
  },
  clearBackground: {
    backgroundColor: '#3498db', // Blue for clear sky
  },
  rainBackground: {
    backgroundColor: '#2980b9', // Dark blue for rain
  },
  cloudBackground: {
    backgroundColor: '#7f8c8d', // Gray for clouds
  },
  thunderstormBackground: {
    backgroundColor: '#2c3e50', // Dark gray for thunderstorm
  },
};

export default Weather;
