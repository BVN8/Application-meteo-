import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../style/Header.css";

const Header = ({ setWeatherData }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const keyApi = "f309c589d373d48b54b0f3783de6bd44";

  const suggestionsRef = useRef(null);

  const fetchSuggestions = async (input) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${keyApi}`;
    try {
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions : ", error);
    }
  };

  const handleSuggestionClick = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric&lang=fr`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setSuggestions([]);
      setCity("");
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météo : ",
        error
      );
    }
  };

  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className='header-bar'>
      <div className='header-bloc'>
        <h1>
          Météou? Pluie là{" "}
          <FontAwesomeIcon icon={faCloudRain} style={{ color: "#333333" }} />
        </h1>
        <input
          type='text'
          value={city}
          placeholder='Rechercher une ville, un pays...'
          onChange={(e) => {
            setCity(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          className='header-input'
        />
        <div className='suggestions' ref={suggestionsRef}>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() =>
                handleSuggestionClick(suggestion.lat, suggestion.lon)
              }
            >
              {suggestion.name}, {suggestion.country}
            </div>
          ))}
        </div>
      </div>
      <div className='header-links'>
        <a
          href='https://www.linkedin.com/in/benjamin-vincent-neveu-35b393253/'
          target='_blank'
          rel='noopener noreferrer'
          alt='logo-Linkedin'
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{ color: "#333333" }}
            className='header-logo'
          />
        </a>
        <a
          href='https://github.com/BVN8?tab=repositories'
          target='_blank'
          rel='noopener noreferrer'
          alt='logo-Github'
        >
          <FontAwesomeIcon
            icon={faGithub}
            style={{ color: "#333333" }}
            className='header-logo'
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
