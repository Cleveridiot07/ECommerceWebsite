import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';


const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.warn('Could not save state to localStorage:', e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn('Could not load state from localStorage:', e);
    return undefined;
  }
};


const preloadedState = {
  cart: loadFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState, 
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().cart);
});

export default store;
