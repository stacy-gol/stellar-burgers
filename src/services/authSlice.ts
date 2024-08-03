import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, register, refreshAccessToken, getUser } from "../utils/api";
import { getCookie, setCookie } from "../utils/cookies";
import { AuthResponse, AuthState, LoginCredentials } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false,
  isLoggedIn: false,
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
  user: null,
  error: null
};

const handleAsyncThunk = <T, P>(asyncFunction: (args: T) => Promise<P>) => async (args: T) => {
    const response = await asyncFunction(args);
    return response;
};

export const registerUser = createAsyncThunk(
  "user/register",
  handleAsyncThunk(async ({ email, password, name }: { email: string; password: string; name: string }) => {
    return register(email, password, name);
  })
);

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials>(
  "user/login",
  async (credentials: LoginCredentials) => {
    const response = await login(credentials);
    return response;
  }
);


export const logoutUser = createAsyncThunk(
  "user/logout",
  handleAsyncThunk(async () => {
    return logout();
  })
);

export const checkAuthStatus = createAsyncThunk(
  "user/checkAuthStatus",
  async () => {
    return getUser();
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    const refreshToken = getCookie("refreshToken");
    console.log("Refresh Token in Thunk:", refreshToken);


    if (!refreshToken) {
      return rejectWithValue("No refreshToken available.");
    }

    try {
      const response = await refreshAccessToken(); 
      const parsedResponse = JSON.parse(response);
      if (parsedResponse.success) {
        setCookie("accessToken", parsedResponse.accessToken, { expires: 3600 });
        if (parsedResponse.refreshToken) {
          setCookie("refreshToken", parsedResponse.refreshToken, { expires: 7 * 24 * 3600 });
        }
        return parsedResponse.accessToken;
      } else {
        return rejectWithValue("Failed to refresh access token.");
      }
    } catch (error) {
      return rejectWithValue("An error occurred while refreshing the token.");
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
        state.user = action.payload.user;
        state.isAuthorizationInProcess = false;
        state.isAuthorizationSuccess = true;
        state.isAuthenticated = true;
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
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
        state.isLoggedIn = false;
        state.isAuthorizationInProcess = false;
        state.isAuthorizationSuccess = false;
        state.accessToken = "";
        state.email = "";
        state.name = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthorizationInProcess = false;
        state.isAuthorizationFailed = true;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.accessTokenExpired = true;
      });
  },
});

export const { setUser, setIsAuthChecked } = authSlice.actions;

export default authSlice.reducer;
