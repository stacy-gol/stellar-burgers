import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, register, refreshAccessToken, getUser } from "../utils/api";
import { getCookie, setCookie } from "../utils/cookies";

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

const handleAsyncThunk = (asyncFunction) => async (args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(args);
    return response;
  } catch (err) {
    return rejectWithValue(err.message);
  }
};

export const registerUser = createAsyncThunk(
  "user/register",
  handleAsyncThunk(({ email, password, name }) => register(email, password, name))
);

export const loginUser = createAsyncThunk(
  "user/login",
  handleAsyncThunk((credentials) => login(credentials))
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  handleAsyncThunk(() => logout())
);

export const refreshTokenThunk = createAsyncThunk(
  "user/refreshToken",
  handleAsyncThunk(async (_, { getState, rejectWithValue }) => {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
      return rejectWithValue("No refreshToken available.");
    }

    const response = await refreshAccessToken(refreshToken);
    if (response.success) {
      setCookie("accessToken", response.accessToken, { expires: 3600 });
      if (response.refreshToken) {
        setCookie("refreshToken", response.refreshToken, {
          expires: 7 * 24 * 3600,
        });
      }
      return response.accessToken;
    } else {
      return rejectWithValue("Failed to refresh access token.");
    }
  })
);

export const checkAuthStatus = createAsyncThunk(
  "user/checkAuthStatus",
  handleAsyncThunk(() => getUser())
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
    },
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
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthorizationInProcess = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthorizationInProcess = false;
        state.isAuthorizationSuccess = false;
        state.accessToken = null;
        state.email = null;
        state.name = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthorizationInProcess = false;
        state.isAuthorizationFailed = true;
      });
  },
});

export const { setUser, setIsAuthChecked } = authSlice.actions;

export default authSlice.reducer;
