import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, register } from "../utils/api";
import { getCookie, setCookie } from "../utils/cookies";
import { refreshAccessToken } from "../utils/api";

const initialState = {
  isAuthenticated: false,
  isAuthChecked: false,
  email: "",
  name: "",
  accessToken: "",
  accessTokenExpired: false,
  refreshToken: "",
  isRegistrationInProcess: false,
  isRegistrationSuccess: false,
  isRegistrationFailed: false,
  isAuthorizationInProcess: false,
  isAuthorizationSuccess: false,
  isAuthorizationFailed: false,

  isPasswordRecoveryInProcess: false,
  isPasswordRecoverySuccess: false,
  isPasswordRecoveryFailed: false,

  isPasswordUpdatingInProcess: false,
  isPasswordUpdatingFailed: false,

  getUserInfoInProcess: false,
  getUserInfoSuccess: false,
  getUserInfoFailed: false,

  updateUserInfoInProcess: false,
  updateUserInfoInFailed: false,
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

export const authSlice = createSlice({
    name: "auth",
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
        state.isAuthorizationInProcess = true;
        state.isAuthorizationFailed = false;
        state.isAuthorizationSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; 
        state.isAuthorizationInProcess = false;
        state.isAuthorizationSuccess = true;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken; 
        state.email = action.payload.email;            
        state.name = action.payload.name;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthorizationInProcess = false;
        state.isAuthorizationFailed = true;
      })
    },
  });

  export const { setUser, setIsAuthChecked } = authSlice.actions; 
  
  export default authSlice.reducer;