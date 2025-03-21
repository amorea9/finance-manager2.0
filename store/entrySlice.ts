import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EntryEntity } from "../entries/EntryEntity";
import { EntriesAPI } from "@/entries/EntriesAPI";

// First, create the thunk
export const fetchEntries = createAsyncThunk("entries/fetchAll", async (thunkAPI) => {
  return await EntriesAPI.getEntries();
});

export const createEntry = createAsyncThunk("entries/create", async (entry: EntryEntity, thunkAPI) => {
  return await EntriesAPI.createEntry(entry);
});

export const removeEntry = createAsyncThunk("entries/delete", async (id: number, thunkAPI) => {
  return await EntriesAPI.removeEntry(id); // Ensure this returns the id of the deleted category
});

interface EntryState {
  entries: EntryEntity[];
  errormessage: string;
}

const initialState: EntryState = {
  entries: [],
  errormessage: "",
};

// Then, handle actions in your reducers:
const entrySlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      console.log("payload entries", action.payload);
      state.entries = action.payload;
      console.log("entries", state.entries);
    });

    builder.addCase(createEntry.fulfilled, (state, action) => {
      console.log("payload created entires", action.payload);
      state.entries.push(action.payload); // action.payload is the new entry
      state.errormessage = "";
    });

    builder.addCase(removeEntry.fulfilled, (state, action) => {
      console.log("payload removed entry", action.payload); // Expecting action.payload to be the deleted category ID
      state.entries = state.entries.filter((entry) => entry.id !== action.payload);
      state.errormessage = "";
    });

    builder.addCase(removeEntry.rejected, (state, action) => {
      console.log("Error deleting entry:", action.payload);
      state.errormessage = "Error deleting entry";
    });

    builder.addCase(createEntry.rejected, (state, action) => {
      console.log("Error creating entry:", action.payload);
      state.errormessage = "Error creating entry";
    });
  },
});

export default entrySlice.reducer;
