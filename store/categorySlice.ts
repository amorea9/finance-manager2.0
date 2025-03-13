import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryEntity } from "../categories/CategoryEntity";
import { CategoriesAPI } from "../categories/CategoriesAPI";

// First, create the thunk
export const fetchCategories = createAsyncThunk("categories/fetchAll", async (thunkAPI) => {
  return await CategoriesAPI.getCategories();
});

export const createCategory = createAsyncThunk("categories/create", async (category: CategoryEntity, thunkAPI) => {
  return await CategoriesAPI.createCategory(category);
});

export const removeCategory = createAsyncThunk("categories/delete", async (id: number, thunkAPI) => {
  return await CategoriesAPI.removeCategory(id); // Ensure this returns the id of the deleted category
});

interface CategoryState {
  categories: CategoryEntity[];
  errormessage: string;
}

const initialState: CategoryState = {
  categories: [],
  errormessage: "",
};

// Then, handle actions in your reducers:
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      state.categories = action.payload;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      state.categories.push(action.payload); // action.payload is the new category
      state.errormessage = "";
    });

    builder.addCase(removeCategory.fulfilled, (state, action) => {
      console.log("payload", action.payload); // Expecting action.payload to be the deleted category ID
      state.categories = state.categories.filter((category) => category.id !== action.payload);
      state.errormessage = "";
    });

    builder.addCase(removeCategory.rejected, (state, action) => {
      console.log("Error deleting category:", action.payload);
      state.errormessage = "Error deleting category";
    });

    builder.addCase(createCategory.rejected, (state, action) => {
      console.log("Error creating category:", action.payload);
      state.errormessage = "Error creating category";
    });
  },
});

export default categorySlice.reducer;
