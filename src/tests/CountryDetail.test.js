import React from 'react';
import { render } from '@testing-library/react';
import CountryDetail from '../components/CountryDetail';

const mockCountry = {
  name: {
    common: 'Canada',
  },
  capital: ['Ottawa'],
  population: 38000000,
  region: 'Americas',
  subregion: 'Northern America',
  languages: {
    eng: 'English',
    fra: 'French',
  },
  currencies: {
    CAD: 'Canadian dollar',
  },
  flags: {
    svg: 'https://restcountries.com/data/can.svg',
  },
  latlng: [60, -95],
};

describe('CountryDetail', () => {
  it('should render the country region', () => {
    const { getByText } = render(<CountryDetail country={mockCountry} />);
    expect(getByText(mockCountry.region)).toBeInTheDocument();
  });
});
