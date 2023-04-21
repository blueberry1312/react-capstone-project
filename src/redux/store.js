import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import homeReducer from './home/homeSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  getState: () => store.getState,
});

export { store, mockStore };
