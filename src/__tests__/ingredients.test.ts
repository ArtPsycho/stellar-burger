import {
  getIngredients,
  reducerIngredients,
  loadIngredients,
  loadIngredientsAdded,
} from '../services/slices/ingredientsSlice';
import { ingredients, main } from '../utils/testData';

describe('Проверка синхронных экшенов загрузки ингредиентов', () => {
  test('Получение ингредиентов', () => {
    const initialState = {
      ingredients: ingredients,
      isLoading: false,
      error: null
    };
    const newState = reducerIngredients(initialState, loadIngredients());

    expect(newState).toEqual({
      ingredients: ingredients,
      isLoading: false,
      error: null
    });
  });

  test('Получение добавленных ингредиентов', () => {
    const initialState = {
      ingredients: [],
      isLoading: false,
      error: null
    };
    const newState = reducerIngredients(
      initialState,
      loadIngredientsAdded(main)
    );

    expect(newState).toEqual({
      ingredients: [main],
      isLoading: false,
      error: null
    });
  });
});

describe('Проверка асинхронных экшенов загрузки ингредиентов', () => {
  test('getIngredients.pending', () => {
    const initialState = {
      ingredients: ingredients,
      isLoading: false,
      error: null
    };
    const newState = reducerIngredients(
      { ...initialState, isLoading: false },
      getIngredients.pending('pending')
    );
  
    expect(newState.isLoading).toBeTruthy();
    expect(newState.error).toBeNull();
  });

  test('getIngredients.rejected', async () => {
    const initialState = {
      ingredients: ingredients,
      isLoading: true,
      error: null
    };
    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения игредиента'
    };
    const newState = reducerIngredients(
      initialState,
      getIngredients.rejected(error, 'rejected')
    );
    expect(newState.isLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });
  test('getIngredients.fulfilled', async () => {
    const initialState = {
      ingredients: ingredients,
      isLoading: false,
      error: null
    };

    const newState = reducerIngredients(
      initialState,
      getIngredients.fulfilled(ingredients, 'fulfilled')
    );
    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.error).toBeNull;
    expect(newState.isLoading).toBeFalsy;
  });
});
