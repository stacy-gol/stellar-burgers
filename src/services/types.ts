export interface Ingredient {
  _id: string;
  name: string;
  price: number;
  image: string;
  type: string;
  uniqueKey: string;
  isExistingIngredient?: boolean;
}

export interface DraggableIngredientProps {
  ingredient: Ingredient;
  onClick: (ingredient: Ingredient) => void;
  orderCount: number;
}

export interface BurgerIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueKey: string;
}

export interface GroupedIngredients {
  [key: string]: BurgerIngredient[];
}

export interface IngredientCounts {
  [key: string]: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  title: string;
}

export interface ModalOverlayProps {
  onClick: () => void;
  children: any;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

export interface User {
  email: string;
  name: string;
  password?: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  password: string;
  token: string;
}

export interface PasswordResetEmailRequest {
  email: string;
}

export const defaultInputProps = {
  error: false,
  errorText: "",
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined,
};
export interface Order {
  id: string;
  number: number;
}
export interface OrderApiResponse {
  name: string;
  order: Order;
  success: boolean;
}
export interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  isLoggedIn: boolean;
  email: string;
  name: string;
  accessToken: string;
  accessTokenExpired: boolean;
  refreshToken: string;
  isRegistrationInProcess: boolean;
  isRegistrationSuccess: boolean;
  isRegistrationFailed: boolean;
  isAuthorizationInProcess: boolean;
  isAuthorizationSuccess: boolean;
  isAuthorizationFailed: boolean;
  isPasswordRecoveryInProcess: boolean;
  isPasswordRecoverySuccess: boolean;
  isPasswordRecoveryFailed: boolean;
  isPasswordUpdatingInProcess: boolean;
  isPasswordUpdatingFailed: boolean;
  getUserInfoInProcess: boolean;
  getUserInfoSuccess: boolean;
  getUserInfoFailed: boolean;
  updateUserInfoInProcess: boolean;
  updateUserInfoInFailed: boolean;
  user: User | null;
  error: string | null;
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface OrderDetail {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface OrderFeedApiResponse {
  success: boolean;
  orders: OrderDetail[];
  total: number;
  totalToday: number;
}

export type OrderFeed = Array<OrderDetail>;

export enum OrderFeedActionType {
  DATA = 'data',
}

export type Data = {
  type: OrderFeedActionType.DATA,
  orders: OrderFeed;
}

export type OrderFeedAction = Data;
