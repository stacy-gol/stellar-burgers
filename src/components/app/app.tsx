import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  IngredientModal,
  Profile,
  Feed
} from "../../pages";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import Header from "../app-header/app-header";
import { useEffect } from "react";
import { fetchIngredients } from "../../services/ingredients/ingredientsSlice";
import { checkAuthStatus, refreshTokenThunk } from "../../services/authSlice";
import { useDispatch } from "../../services/store";

export default function App() {
  const location = useLocation();
  let background = location.state && location.state.backgroundLocation;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthStatus());
    const interval = setInterval(() => {
      dispatch(refreshTokenThunk());
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement anonymous>
              <Login />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement anonymous>
              <Register />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement anonymous>
              <ForgotPassword />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement anonymous>
              <ResetPassword />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <Profile />
            </ProtectedRouteElement>
          }
        />
        <Route path="ingredients/:ingredientId" element={<IngredientModal />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientModal />}
          />
        </Routes>
      )}
    </div>
  );
}
