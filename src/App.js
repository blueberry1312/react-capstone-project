import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries/:countryId" element={<CountryDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
