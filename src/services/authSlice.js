import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, register } from "../utils/api";
import { getCookie, setCookie } from "../utils/cookies";
import { refreshAccessToken, getUser } from "../utils/api";


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

  export const checkAuthStatus = createAsyncThunk(
    'auth/checkAuthStatus',
    async (_, { getState, dispatch, rejectWithValue }) => {
      const { accessToken } = getState().auth; // пол��чаем accessToken из состояния
      try {
        const userData = await getUser(accessToken); // здесь ваша функция getUser должна использовать accessToken
        return userData;
      } catch (err) {
        if (err.message === 'jwt expired') {
          // Если проблема в истёкшем токене, попытаемся его обновить
          try {
            const newAccessToken = await dispatch(refreshTokenThunk()).unwrap();
            const updatedUserData = await getUser(newAccessToken); // повторный запрос на getUser с новым accessToken
            return updatedUserData;
          } catch (refreshErr) {
            return rejectWithValue('Не удалось обновить токен: ' + refreshErr.message);
          }
        }
        return rejectWithValue(err.message || 'Неизвестная ошибка при получении данных пользователя');
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
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        // ��десь вы можете установить дополнительные сообщения об ��шибках в состояние, 
        // если это необходимо для вашего прил��жения
      })
      // Вы также можете добавить обработку д��я pending, если хотите отслеживать 
      // состояние загрузки при проверке статуса авторизации
      .addCase(checkAuthStatus.pending, (state) => {
        state.isAuthChecked = false;
      });
    },
  });

  export const { setUser, setIsAuthChecked } = authSlice.actions; 
  
  export default authSlice.reducer;