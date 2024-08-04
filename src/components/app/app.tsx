import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  IngredientModal,
  Profile,
  Feed,
  ProfileFeed,
} from "../../pages";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import Header from "../app-header/app-header";
import { useEffect } from "react";
import { fetchIngredients } from "../../services/ingredients/ingredientsSlice";
import { checkAuthStatus, refreshTokenThunk } from "../../services/authSlice";
import { useDispatch } from "../../services/store";
import { OrderFeedModal } from "../../pages/order-feed-modal/order-feed-modal";
import { getCookie } from "../../utils/cookies";
import { wsConnect as orderFeedConnect, wsDisconnect as orderFeedDisconnect } from '../../services/middleware/orderFeed/order-feed-actions';
import { wsConnect as profileFeedConnect, wsDisconnect as profileFeedDisconnect } from '../../services/middleware/profileFeed/profile-feed-actions';


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

  useEffect(() => {
    const isProfileFeed = location.pathname.startsWith('/profile/orders');

    if (isProfileFeed) {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        const wsUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
        dispatch(profileFeedConnect(wsUrl));
      } else {
        console.error("No access token found");
      }
    } else {
      dispatch(orderFeedConnect("wss://norma.nomoreparties.space/orders/all"));
    }

    return () => {
      if (isProfileFeed) {
          dispatch(profileFeedDisconnect())
        } else {
        dispatch(orderFeedDisconnect());
      }
    };
  }, [dispatch, location.pathname]);

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
        <Route
          path="/profile/orders/"
          element={
            <ProtectedRouteElement>
              <ProfileFeed />
            </ProtectedRouteElement>
          }
        />
        <Route path="ingredients/:ingredientId" element={<IngredientModal />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderFeedModal />} />
        <Route path="/profile/orders/:number" element={<OrderFeedModal />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:ingredientId" element={<IngredientModal />}/>
          <Route path="/feed/:number" element={<OrderFeedModal />} />
          <Route path="/profile/orders/:number" element={<OrderFeedModal />} />
        </Routes>
      )}
    </div>
  );
}
