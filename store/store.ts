import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import categoryReducer from "./categorySlice";
import userReducer from "./usersSlice";
import entryReducer from "./entrySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category: categoryReducer,
    user: userReducer,
    entry: entryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
