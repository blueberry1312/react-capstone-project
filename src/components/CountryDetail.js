import React from 'react';
import PropTypes from 'prop-types';

function CountryDetails({ country }) {
  const {
    name, capital, population, region, subregion, languages, currencies, flags,
  } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <img src={flags.svg} alt={name.common} className="flags" />
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
  }),
};

export default CountryDetails;
