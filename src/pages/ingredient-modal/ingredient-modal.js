import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredients/ingredientsSlice'; 

export const IngredientModal = () => {
  let { ingredientId } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const background = location.state && location.state.backgroundLocation;

  const dispatch = useDispatch();
  const { allIngredients, loading, error } = useSelector(
    (state) => state.ingredients
  );
  
  const ingredient = allIngredients.find((item) => item._id === ingredientId);

  useEffect(() => {
    if (allIngredients.length === 0 && !loading && !error) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, allIngredients.length, loading, error]);

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки ингредиентов: {error}</p>;
  }

  if (!ingredient) {
    return <p>Ингредиент не на��ден</p>;
  }

  if (!background) {
    return <IngredientDetails currentIngredient={ingredient} />;
  }

  return (
    <Modal title="Детали ингредиента" isOpen={true} onClose={handleClose}>
      <IngredientDetails currentIngredient={ingredient} />
    </Modal>
  );
};