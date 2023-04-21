import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CountryDetail.css';

function CountryDetails({ country }) {
  const {
    name, capital, population, region, subregion, languages, currencies, flags, latlng,
  } = country;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const [lat, lon] = latlng;
        const apiKey = '082486efc835ea0ab24e7700b795078e';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeather();
  }, [latlng]);

  return (
    <div className="country-details">
      <div className="flag-container">
        <img src={flags.svg} alt={name.common} className="flags" />
      </div>
      <div className="weather-container">
        {weather && (
          <div className="weather">
            <p>{`Current weather: ${weather.weather[0].description}`}</p>
            <p>{`Temperature: ${Math.round(weather.main.temp - 273.15)}°C`}</p>
            <p>{`Humidity: ${weather.main.humidity}%`}</p>
          </div>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <td>Capital:</td>
            <td>{capital}</td>
          </tr>
          <tr>
            <td>Population:</td>
            <td>{population}</td>
          </tr>
          <tr>
            <td>Region:</td>
            <td>{region}</td>
          </tr>
          <tr>
            <td>Subregion:</td>
            <td>{subregion}</td>
          </tr>
          <tr>
            <td>Languages:</td>
            <td>{Object.values(languages).join(', ')}</td>
          </tr>
          <tr>
            <td>Currencies:</td>
            <td>{Object.entries(currencies).map(([code, currency]) => `${currency.name} (${code})`).join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

CountryDetails.defaultProps = {
  country: {},
};

CountryDetails.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }),
    capital: PropTypes.arrayOf(PropTypes.string),
    population: PropTypes.number,
    region: PropTypes.string,
    subregion: PropTypes.string,
    languages: PropTypes.oneOfType([
      PropTypes.objectOf(
        PropTypes.string.isRequired,
      ),
      PropTypes.arrayOf(
        PropTypes.objectOf(
          PropTypes.string.isRequired,
        ),
      ),
    ]),
    currencies: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
    flags: PropTypes.objectOf(
      PropTypes.string.isRequired,
    ),
    latlng: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default CountryDetails;
