import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, selectAllCountries } from '../redux/home/homeSlice';
import CountryList from './CountryList';
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector(selectAllCountries);

  const [regionFilter, setRegionFilter] = useState('');
  const [showCountryList, setShowCountryList] = useState(false);
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
    setShowCountryList(true);
  };

  const handleBackButtonClick = () => {
    setShowCountryList(false);
    setRegionFilter('');
  };

  const regions = ['All countries', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  if (showCountryList) {
    return (
      <div>
        <button type="button" onClick={handleBackButtonClick}>Back</button>
        <CountryList countries={countries} regionFilter={regionFilter} />
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
    </div>
  );
}

export default Home;
