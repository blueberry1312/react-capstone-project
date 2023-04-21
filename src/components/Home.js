import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, selectAllCountries } from '../redux/home/homeSlice';
import CountryDetail from './CountryDetail';
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector(selectAllCountries);

  const [regionFilter, setRegionFilter] = useState('');
  const [regionCounts, setRegionCounts] = useState({
    'All countries': countries.length,
    Africa: 0,
    Americas: 0,
    Asia: 0,
    Europe: 0,
    Oceania: 0,
  });

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    const counts = countries.reduce((acc, country) => {
      if (country.region in acc) {
        acc[country.region] += 1;
      } else {
        acc[country.region] = 1;
      }
      acc['All countries'] += 1;
      return acc;
    }, {
      'All countries': 0,
      Africa: 0,
      Americas: 0,
      Asia: 0,
      Europe: 0,
      Oceania: 0,
    });
    setRegionCounts(counts);
  }, [countries]);

  const handleRegionFilterChange = (region) => {
    setRegionFilter(region);
  };

  const regions = ['All countries', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryDetails, setShowCountryDetails] = useState(false);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setShowCountryDetails(true);
  };

  const handleBackButtonClick = () => {
    setSelectedCountry(null);
    setShowCountryDetails(false);
  };

  const filteredCountries = countries
    .filter(
      (country) => regionFilter === 'All countries' || country.region === regionFilter,
    )
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
        {country.name.common}
        {' '}
        - Population:
        {country.population}
      </div>
    ));

  if (showCountryDetails) {
    return (
      <div>
        <button type="button" onClick={handleBackButtonClick}>Back</button>
        <CountryDetail country={selectedCountry} />
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        {' '}
        {regions.map((region) => (
          <div
            className={`region ${region.toLowerCase().replace(' ', '-')}`}
            key={region}
            role="button"
            tabIndex={0}
            onClick={() => handleRegionFilterChange(region)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleRegionFilterChange(region);
              }
            }}
          >
            {region}
            {' '}
            (
            {regionCounts[region]}
            )
          </div>
        ))}
      </div>
      <div className="filtered-countries">
        {filteredCountries}
      </div>
    </div>
  );
}

export default Home;
