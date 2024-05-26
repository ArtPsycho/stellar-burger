import {
  TConstructorState,
  reducerConstructorBurger,
  addIngredients,
  moveUpIngredient,
  moveDownIngredient,
  removeIngredient,
  clearConstructor
} from '../../src/services/slices/constructorSlice';
import { bun, main, sauce } from '../utils/testData';

describe('Проверка синхронных экшенов', () => {
  test('Добавление ингредиента', () => {
    const initialState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isLoading: false,
      error: null
    };
    const newState = reducerConstructorBurger(
      initialState,
      addIngredients(main)
    );
    const addedIngredients = newState.constructorItems;
    
    expect(addedIngredients.ingredients[0]._id).toEqual(main._id);
  });

  test('Добавление булки', () => {
    const initialState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isLoading: false,
      error: null
    };

    const newState = reducerConstructorBurger(
      initialState,
      addIngredients(bun)
    );

    const addedIngredients = newState.constructorItems;

    expect(addedIngredients.bun?._id).toEqual(bun._id);
  });

  test('Ингредиент вверх', () => {
    const initialState: TConstructorState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce, main]
      },
      isLoading: false,
      error: null
    };

    const stateMoveUp = reducerConstructorBurger(
      initialState,
      moveUpIngredient(1)
    );

    const newIngredientsArrayForMoveUp = stateMoveUp.constructorItems;

    expect(newIngredientsArrayForMoveUp.ingredients).toEqual([
      main,
      main,
      sauce
    ]);
  });

  test('Ингредиент вниз', () => {
    const initialState: TConstructorState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce, main]
      },
      isLoading: false,
      error: null
    };

    const stateMoveDown = reducerConstructorBurger(
      initialState,
      moveDownIngredient(1)
    );

    const newIngredientsArrayForMoveDown = stateMoveDown.constructorItems;

    expect(newIngredientsArrayForMoveDown.ingredients).toEqual([
      sauce,
      main,
      main
    ]);
  });

  test('Удаление игредиента', () => {
    const initialState: TConstructorState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isLoading: false,
      error: null
    };

    const newState = reducerConstructorBurger(
      initialState,
      removeIngredient(sauce)
    );

    const ingredientsAfterRemoving = newState.constructorItems;

    expect(ingredientsAfterRemoving.ingredients).toEqual([main]);
  });

  test('Сброс конструктора', () => {
    const initialState: TConstructorState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isLoading: false,
      error: null
    };

    const newState = reducerConstructorBurger(initialState, clearConstructor());

    const stateAfterClearing = newState.constructorItems;

    expect(stateAfterClearing).toEqual({
      bun: null,
      ingredients: []
    });
  });
});