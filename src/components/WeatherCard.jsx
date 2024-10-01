import React from "react";
import "../style/Weathercard.css";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData)
    return <p className='loading-data'>Chargement des données météo...</p>;

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    visibility,
    wind: { speed, deg, gust },
    clouds: { all: cloudiness },
    rain,
    sys: { sunrise, sunset },
    timezone,
  } = weatherData;

  return (
    <div className='weather-card'>
      <h1>Météo à {weatherData.name}</h1>
      <div className='weather-grid'>
        <div>Condition :</div>
        <div>{weather[0].description}</div>
        <div>Température :</div>
        <div>{temp}°C</div>
        <div>Température ressentie :</div>
        <div>{feels_like}°C</div>
        <div>Température minimale :</div>
        <div>{temp_min}°C</div>
        <div>Température maximale :</div>
        <div>{temp_max}°C</div>
        <div>Humidité :</div>
        <div>{humidity}%</div>
        <div>Pression :</div>
        <div>{pressure} hPa</div>
        <div>Visibilité :</div>
        <div>{visibility / 1000} km</div>
        <div>Vitesse du vent :</div>
        <div>{speed} m/s</div>
        <div>Direction du vent :</div>
        <div>{deg}°</div>
        {gust && (
          <>
            <div>Rafales :</div>
            <div>{gust} m/s</div>
          </>
        )}
        {rain && rain["1h"] && (
          <>
            <div>Pluie (dernière heure) :</div>
            <div>{rain["1h"]} mm</div>
          </>
        )}
        <div>Couverture nuageuse :</div>
        <div>{cloudiness}%</div>
        <div>Lever du soleil :</div>
        <div>{new Date(sunrise * 1000).toLocaleTimeString()}</div>
        <div>Coucher du soleil :</div>
        <div>{new Date(sunset * 1000).toLocaleTimeString()}</div>
        <div>Fuseau horaire :</div>
        <div>{timezone / 3600} heures</div>
      </div>
    </div>
  );
};

export default WeatherCard;
