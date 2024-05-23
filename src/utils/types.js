import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
});

export const constructorTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export const burgerIngredientsTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export const  modalTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

export const modalOverlayTypes = {
	onClick: PropTypes.func
};

