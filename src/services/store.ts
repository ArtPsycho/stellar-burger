import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducerIngredients } from './slices/ingredientsSlice';
import { reducerConstructorBurger } from './slices/constructorSlice';
import { reducerOrder } from './slices/orderSlice';
import { reducerUser } from './slices/authSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: reducerIngredients,
  constructorBurger: reducerConstructorBurger,
  order: reducerOrder,
  user: reducerUser
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
