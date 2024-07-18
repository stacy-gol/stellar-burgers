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
  data: T;
}

export interface User {
  email: string;
  name: string;
  password?: string;
}

export interface AuthResponse {
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