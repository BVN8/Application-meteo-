import React, { useState } from "react";
import Header from "../components/Header";
import "../style/App.css";
import WeatherCard from "../components/WeatherCard";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div>
      <Header setWeatherData={setWeatherData} />
      <WeatherCard weatherData={weatherData} />
    </div>
  );
};

export default App;
