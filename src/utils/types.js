import PropTypes from 'prop-types';

export const constructorTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })).isRequired,
  };

export const burgerIngredientsTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired,
  };

export const  modalTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

export const modalOverlayTypes = {
	onClick: PropTypes.func
};

