import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { Ingredient } from '../../services/types';

export const IngredientModal = () => {
  let { ingredientId } = useParams();
  let location = useLocation();
  let navigate = useNavigate();

  const background = location.state && location.state.backgroundLocation;

  const { allIngredients, loading, error } = useSelector(
    (state: any) => state.ingredients
  );
  
  const ingredient = allIngredients.find((item: Ingredient) => item._id === ingredientId);

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
    return <p>Ингредиент не найден</p>;
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