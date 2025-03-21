import { CreateUserDto } from "@/users/CreateUserDto";
import { UsersAPI } from "@/users/UsersAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
// export const getUsers = createAsyncThunk("categories/fetchAll", async (thunkAPI) => {
//   return await CategoriesAPI.getCategories();
// });

export const signup = createAsyncThunk("auth/signup", async (createUserDto: CreateUserDto, thunkAPI) => {
  return await UsersAPI.signup(createUserDto);
});
export const login = createAsyncThunk("auth/login", async (createUserDto: CreateUserDto, thunkAPI) => {
  return await UsersAPI.login(createUserDto);
});

// export const logout = createAsyncThunk("auth/logout", async (id: number, thunkAPI) => {
//   return await CategoriesAPI.removeCategory(id); // Ensure this returns the id of the deleted category
// });

interface UserState {
  token: string;
  errormessage: string;
}

const initialState: UserState = {
  token: "",
  errormessage: "",
};

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("payload", action.payload);

      //setItem to persistent storage here
      state.errormessage = "";
    });

    builder.addCase(signup.rejected, (state, action) => {
      console.log("payload", action.payload);
      state.errormessage = "Error signing up";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      console.log("payload", action.payload);

      state.token = action.payload;
      state.errormessage = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("payload", action.payload);

      state.errormessage = "Login failed, try again";
    });

    // builder.addCase(removeCategory.fulfilled, (state, action) => {
    //   console.log("payload", action.payload); // Expecting action.payload to be the deleted category ID
    //   state.categories = state.categories.filter((category) => category.id !== action.payload);
    //   state.errormessage = "";
    // });

    // builder.addCase(removeCategory.rejected, (state, action) => {
    //   console.log("Error deleting category:", action.payload);
    //   state.errormessage = "Error deleting category";
    // });

    // builder.addCase(createCategory.rejected, (state, action) => {
    //   console.log("Error creating category:", action.payload);
    //   state.errormessage = "Error creating category";
    // });
  },
});

export default userSlice.reducer;
