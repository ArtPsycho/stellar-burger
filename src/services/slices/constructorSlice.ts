import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorBurgerSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },

    removeIngredient: (state, action) => {
      if (action.payload.type !== 'bun') {
        const idToRemove = action.payload._id;
        const indexToRemove = state.ingredients.findIndex(
          (ingredient) => ingredient._id === idToRemove
        );

        if (indexToRemove !== -1) {
          state.ingredients.splice(indexToRemove, 1);
        }
      }
    },

    moveUpIngredient: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.ingredients[payload];
      const neighbourIngredient = state.ingredients[payload + 1];

      state.ingredients.splice(
        payload,
        2,
        neighbourIngredient,
        currentIngredient
      );
    },

    moveDownIngredient: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.ingredients[payload];

      const neighbourIngredient = state.ingredients[payload - 1];

      state.ingredients.splice(
        payload - 1,
        2,
        currentIngredient,
        neighbourIngredient
      );
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const reducerConstructorBurger = constructorBurgerSlice.reducer;
export const {
  addIngredients,
  moveUpIngredient,
  moveDownIngredient,
  removeIngredient,
  clearConstructor
} = constructorBurgerSlice.actions;
