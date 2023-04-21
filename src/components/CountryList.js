import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountryDetail from './CountryDetail';
import './CountryList.css';

function CountryList({ countries, regionFilter }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryDetails, setShowCountryDetails] = useState(false);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setShowCountryDetails(true);
  };

  const filteredCountries = countries
    .filter((country) => regionFilter === 'All countries' || country.region === regionFilter)
    .map((country) => (
      <div
        className="country"
        key={country.cca3}
        role="button"
        tabIndex={0}
        onClick={() => handleCountryClick(country)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleCountryClick(country);
          }
        }}
      >
        <div className="country-name">
          {country.name.common}
          {' '}
          - Population:
          {country.population}
        </div>
      </div>
    ));

  if (showCountryDetails) {
    return (
      <div>
        {selectedCountry && <CountryDetail country={selectedCountry} />}
      </div>
    );
  }

  return (
    <div className="country-list">{filteredCountries}</div>
  );
}

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      cca3: PropTypes.string.isRequired,
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
      }).isRequired,
      region: PropTypes.string.isRequired,
      population: PropTypes.number.isRequired,
    }),
  ).isRequired,
  regionFilter: PropTypes.string.isRequired,
};

export default CountryList;
