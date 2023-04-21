import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // import the middleware
import Home from '../components/Home';

const mockStore = configureStore([thunk]); // apply the middleware

describe('Home component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      home: {
        countries: [
          { name: 'Country A', region: 'Africa' },
          { name: 'Country B', region: 'Americas' },
          { name: 'Country C', region: 'Asia' },
          { name: 'Country D', region: 'Europe' },
          { name: 'Country E', region: 'Oceania' },
        ],
      },
    });
  });

  test('renders the home component with region buttons', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => {
      const regionButtons = screen.getAllByRole('button', { name: /All countries|Africa|Americas|Asia|Europe|Oceania/i });
      expect(regionButtons.length).toBe(6);
      expect(regionButtons[0]).toHaveTextContent('All countries (5)');
      expect(regionButtons[1]).toHaveTextContent('Africa (1)');
      expect(regionButtons[2]).toHaveTextContent('Americas (1)');
      expect(regionButtons[3]).toHaveTextContent('Asia (1)');
      expect(regionButtons[4]).toHaveTextContent('Europe (1)');
      expect(regionButtons[5]).toHaveTextContent('Oceania (1)');
    });
  });
});
