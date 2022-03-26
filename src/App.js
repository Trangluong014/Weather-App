import "./index.css";
import React, { useState, useEffect } from "react";

const api = {
  key: "80d98c4170ec6408e3c211314d63e6bd",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        //console.log(url);
        const response = await fetch(url);
        //console.log("response", response);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(data);
          console.log(typeof weatherInfo);
          console.log(weatherInfo);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <div className="App">
      <div className="weather-gradient">
        <h1 className="title">How's the weather?</h1>
        <form onSubmit={handleSubmit} className="form-wrapper">
          <input
            type="text"
            placeholder="City"
            id="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button id="submit">Search</button>
        </form>

        {loading ? (
          <div> Loading ... </div>
        ) : weatherInfo ? (
          <>
            {" "}
            {errorMessage ? (
              <div style={{ color: "red" }}>{errorMessage}</div>
            ) : (
              <div>
                <div className="city">
                  {weatherInfo.name} {weatherInfo.sys.country}
                </div>
                <div className="weather">
                  Weather: {weatherInfo.weather[0].description}
                </div>
                <div className="info">
                  Temperature: {weatherInfo.main.temp}°C - Feels Like:{" "}
                  {weatherInfo.main.feels_like}°C
                </div>
                <div className="info">
                  Pressure: {weatherInfo.main.pressure}
                </div>
              </div>
            )}{" "}
          </>
        ) : (
          <div>{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

export default App;
