import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  IngredientModal,
  Profile
} from "../../pages";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import Header from "../app-header/app-header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatus } from "../../services/authSlice";
import { refreshTokenThunk } from "../../services/authSlice";

export default function App() {
  const location = useLocation();
  let background = location.state && location.state.backgroundLocation; 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
    const interval = setInterval(() => {
      dispatch(refreshTokenThunk());
    }, 20 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <Header/>
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ProtectedRouteElement><Login /></ProtectedRouteElement>} />
          <Route path="/register" element={<ProtectedRouteElement><Register /></ProtectedRouteElement>} />
          <Route path="/forgot-password" element={<ProtectedRouteElement><ForgotPassword /></ProtectedRouteElement>} />
          <Route path="/reset-password" element={<ProtectedRouteElement><ResetPassword /></ProtectedRouteElement>} />
          <Route path="/profile" element={<ProtectedRouteElement><Profile /></ProtectedRouteElement>} />
          <Route path="ingredients/:ingredientId" element={<IngredientModal />} />
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
