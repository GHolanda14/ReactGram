import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

export const cadastrar = createAsyncThunk(
  "auth/cadastrar",
  async (user, thunkAPI) => {
    const data = await authService.cadastrar(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.succes = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cadastrar.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(cadastrar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(cadastrar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlide.actions;
export default authSlide.reducer;
