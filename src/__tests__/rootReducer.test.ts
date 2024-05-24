import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducerIngredients } from '../../src/services/slices/ingredientsSlice';
import { reducerConstructorBurger } from '../../src/services/slices/constructorSlice';
import { reducerOrder } from '../../src/services/slices/orderSlice';
import { reducerUser } from '../services/slices/authSlice';

describe('Проверка rootReducer', () => {
  test('Проверка на UNKNOWN_ACTION', () => {
    const rootReducer = combineReducers({
      ingredients: reducerIngredients,
      constructor: reducerConstructorBurger,
      order: reducerOrder,
      auth: reducerUser
    });

    const store = configureStore({
      reducer: rootReducer
    });

    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      store.getState()
    );
  });
});
