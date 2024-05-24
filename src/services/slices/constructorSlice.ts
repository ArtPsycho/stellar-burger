import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

const constructorBurgerSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (state, action) => {
      if (action.payload.type !== 'bun') {
        const idToRemove = action.payload._id;
        const indexToRemove = state.constructorItems.ingredients.findIndex(
          (ingredient) => ingredient._id === idToRemove
        );

        if (indexToRemove !== -1) {
          state.constructorItems.ingredients.splice(indexToRemove, 1);
        }
      }
    },

    moveUpIngredient: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];
      const neighbourIngredient =
        state.constructorItems.ingredients[payload + 1];

      state.constructorItems.ingredients.splice(
        payload,
        2,
        neighbourIngredient,
        currentIngredient
      );
    },

    moveDownIngredient: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];

      const neighbourIngredient =
        state.constructorItems.ingredients[payload - 1];

      state.constructorItems.ingredients.splice(
        payload - 1,
        2,
        currentIngredient,
        neighbourIngredient
      );
    },

    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
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
