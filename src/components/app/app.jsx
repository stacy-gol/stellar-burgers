// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import Header from "../app-header/app-header";
// import BurgerIngredients from "../burger-ingredients/burger-ingredients";
// import BurgerConstructor from "../burger-constructor/burger-constructor";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { fetchIngredients } from "../../services/ingredients/ingredientsSlice";
// import AppStyles from "./app.module.css";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchIngredients());
//   }, [dispatch]);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <Header />
//         <main className={AppStyles.app}>
//           <BurgerIngredients/>
//           <BurgerConstructor/>
//         </main>
//       </div>
//     </DndProvider>
//   );
// }

// export default App;

import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  IngredientModal
} from "../../pages";
import { ProtectedRouteElement } from "../protected-route/protected-route";


export default function App() {
  const location = useLocation();
  let background = location.state && location.state.backgroundLocation; 
  console.log('location', location);

  return (
    <div>
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ProtectedRouteElement><Login /></ProtectedRouteElement>} />
        <Route path="/register" element={<ProtectedRouteElement><Register /></ProtectedRouteElement>} />
        <Route path="/forgot-password" element={<ProtectedRouteElement><ForgotPassword /></ProtectedRouteElement>} />
        <Route path="/reset-password" element={<ProtectedRouteElement><ResetPassword /></ProtectedRouteElement>} />
        {/* <Route path="/profile" element={<ProtectedRouteElement><Profile /></ProtectedRouteElement>} /> */}
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
