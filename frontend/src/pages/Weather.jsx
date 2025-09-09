import { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("Nairobi");
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`http://127.0.0.1:8000/weather/?city=${city}`);
      setData(res.data);
    } catch (err) {
      setError("Could not fetch weather data. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`container ${theme}`}>
      <header className="header">
        <h1>Weather App</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          {/* Current Weather */}
          <div className="card current-weather">
            <h2>
              {data.location?.name}, {data.location?.country}
            </h2>
            <img
              src={data.current?.icon}
              alt={data.current?.condition}
              className="weather-icon"
            />
            <p className="temp">{data.current?.temperature_c}°C</p>
            <p>{data.current?.condition}</p>
            <p>Humidity: {data.current?.humidity}%</p>
            <p>Wind: {data.current?.wind_kph} kph</p>
          </div>

          {/* Forecast */}
          <h2>Forecast</h2>
          <div className="forecast-grid">
            {data.forecast?.map((day) => (
              <div key={day.date} className="card forecast-card">
                <h3>{day.date}</h3>
                <img src={day.icon} alt={day.condition} className="weather-icon" />
                <p>{day.avgtemp_c}°C</p>
                <p>{day.condition}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
