import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { PayloadAction } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const getIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    loadIngredients: (state) => {
      state.isLoading = false;
    },
    loadIngredientsAdded: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.push(payload);
    }
  },
  selectors: {
    selectIngredients: (state) => state,
    selectIngredientsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

export const reducerIngredients = getIngredientsSlice.reducer;
export const { selectIngredients, selectIngredientsLoading } =
  getIngredientsSlice.selectors;
export const { loadIngredients, loadIngredientsAdded } =
  getIngredientsSlice.actions;
