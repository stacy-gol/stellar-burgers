import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, register } from "../utils/api";
import { getCookie, setCookie } from "../utils/cookies";
import { refreshAccessToken } from "../utils/api";

const initialState = {
  user: null,
  isAuthChecked: false
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await register(email, password, name);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await login(credentials);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
      try {
        const response = await logout();
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

export const refreshTokenThunk = createAsyncThunk(
    "user/refreshToken",
    async (_, { getState, rejectWithValue }) => {
      const refreshToken = getCookie('refreshToken');
      if (!refreshToken) {
        return rejectWithValue('No refreshToken available.');
      }
  
      try {
        const response = await refreshAccessToken(refreshToken);
        if (response.success) {
          setCookie('accessToken', response.accessToken, { expires: 3600 });
          if (response.refreshToken) {
            setCookie('refreshToken', response.refreshToken, { expires: 7 * 24 * 3600 });
          }
          return response.accessToken;
        } else {
          return rejectWithValue('Failed to refresh access token.');
        }
      } catch (err) {
       return rejectWithValue(err.message || 'Unknown error');
      }
    }
  );

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
        state.error = null;
      },
      setIsAuthChecked: (state, action) => {
        state.isAuthChecked = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(logoutUser.pending, (state) => {
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.isAuthChecked = false;
          state.error = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(registerUser.pending, (state) => {
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
          state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(refreshTokenThunk.fulfilled, (state, action) => {
            state.accessToken = action.payload;
          })
        .addCase(refreshTokenThunk.pending, (state, action) => {
            state.accessToken = action.payload;
          })
        .addCase(refreshTokenThunk.rejected, (state, action) => {
            state.error = action.payload;
          })
    },
  });

   
  export const { setUser, setIsAuthChecked } = userSlice.actions; 
  
  export default userSlice.reducer;