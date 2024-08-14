import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, STATUS } from "../../constants";

export const fetchMealById = createAsyncThunk(
  "cart/fetchMealById",
  async (idMeal, thunkAPI) => {
    const store = thunkAPI.getState();

    try {
      const response = await fetch(`${API.mealId}${idMeal}`);
      // if (response.ok) {
      //   thunkAPI.dispatch(removeMeal(idMeal))
      // }
      const data = await response.json();

      // throw new Error(`Meal ${idMeal} not found`)
      return data?.meals?.[0];
    } catch (error) {
      thunkAPI.rejectWithValue("error");
    }
  }
);
export const removeMealById = createAsyncThunk(
  "cart/removeMealById",
  async (idMeal, thunkAPI) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(idMeal);
        }, 1000);
      });
    } catch (error) {
      thunkAPI.rejectWithValue("error");
    }
  }
);
export const addMoreProduct = createAsyncThunk(
  "cart/addMoreProduct",
  async (idMeal, thunkAPI) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(idMeal);
        }, 500);
      });
    } catch (error) {
      thunkAPI.rejectWithValue("error");
    }
  }
);
export const delMoreProduct = createAsyncThunk(
  "cart/delMoreProduct",
  async (idMeal, thunkAPI) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(idMeal);
        }, 500);
      });
    } catch (error) {
      thunkAPI.rejectWithValue("error");
    }
  }
);

const initialState = {
  meals: {},
  status: STATUS.IDLE,
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // remove: (state, action) => {
    //   const ifMealAlreadyAdded = state?.find((item) => item.id === action.payload.id)
    //   if (!ifMealAlreadyAdded) {
    //     state.push(action.payload);
    //
    //     // state = [...state, action.payload]
    //     // state.push(action.payload) -> [data].slice()
    //   }
    // },
    // removeMeal: (state, action) => {
    //   const ifMealWasAddedBefore = state?.findIndex((item) => item.id === action.payload.id)
    //   if (ifMealWasAddedBefore >= 0) {
    //     state.splice(ifMealWasAddedBefore, 1)
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMealById.pending, (state, action) => {
      console.log("info", action);
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchMealById.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.meals[action.payload.idMeal] = action.payload;
      state.meals[action.payload.idMeal].forCountIngredients = 1;
      state.status = STATUS.IDLE;
      state.count = Object.keys(state.meals).length;
    });
    builder.addCase(fetchMealById.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    });
    builder.addCase(removeMealById.fulfilled, (state, action) => {
      delete state.meals[action.payload];
      state.count = Object.keys(state.meals).length;
    });
    builder.addCase(addMoreProduct.fulfilled, (state, action) => {
      state.meals[action.payload].forCountIngredients += 1;
      state.count += 1;
    });
    builder.addCase(delMoreProduct.fulfilled, (state, action) => {
      if (state.meals[action.payload].forCountIngredients >= 1) {
        state.meals[action.payload].forCountIngredients -= 1;
        state.count -= 1;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { removeMeal } = cartSlice.actions;

export default cartSlice.reducer;
