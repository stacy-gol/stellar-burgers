import reducer, {
    openOrderModal,
    closeOrderModal,
    openIngredientModal,
    closeIngredientModal,
    openOrderFeedModal,
    closeOrderFeedModal,
  } from './modalSlice';
  
  const initialState = {
    orderModal: {
      isOpen: false,
    },
    ingredientModal: {
      isOpen: false,
      currentIngredient: null,
    },
    orderFeedModal: {
      currentOrder: null,
      isOpen: false,
    },
  };
  
  describe('modalsSlice', () => {
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle openOrderModal', () => {
      const actual = reducer(initialState, openOrderModal());
      expect(actual.orderModal.isOpen).toEqual(true);
    });
  
    it('should handle closeOrderModal', () => {
      const stateWithOpenOrderModal = {
        ...initialState,
        orderModal: { isOpen: true },
      };
      const actual = reducer(stateWithOpenOrderModal, closeOrderModal());
      expect(actual.orderModal.isOpen).toEqual(false);
    });
  
    it('should handle openIngredientModal', () => {
      const ingredient = { id: '1', name: 'Bun', type: 'bun', price: 1 };
      const actual = reducer(initialState, openIngredientModal(ingredient));
      expect(actual.ingredientModal.isOpen).toEqual(true);
      expect(actual.ingredientModal.currentIngredient).toEqual(ingredient);
    });
  
    it('should handle closeIngredientModal', () => {
      const stateWithOpenIngredientModal = {
        ...initialState,
        ingredientModal: { isOpen: true, currentIngredient: { id: '1', name: 'Bun', type: 'bun', price: 1 } },
      };
      const actual = reducer(stateWithOpenIngredientModal, closeIngredientModal());
      expect(actual.ingredientModal.isOpen).toEqual(false);
      expect(actual.ingredientModal.currentIngredient).toBeNull();
    });
  
    it('should handle openOrderFeedModal', () => {
      const orderDetail = { id: '1', name: 'Order 1', ingredients: ['Bun', 'Patty'] };
      const actual = reducer(initialState, openOrderFeedModal(orderDetail));
      expect(actual.orderFeedModal.isOpen).toEqual(true);
      expect(actual.orderFeedModal.currentOrder).toEqual(orderDetail);
    });
  
    it('should handle closeOrderFeedModal', () => {
      const stateWithOpenOrderFeedModal = {
        ...initialState,
        orderFeedModal: { isOpen: true, currentOrder: { id: '1', name: 'Order 1', ingredients: ['Bun', 'Patty'] } },
      };
      const actual = reducer(stateWithOpenOrderFeedModal, closeOrderFeedModal());
      expect(actual.orderFeedModal.isOpen).toEqual(false);
      expect(actual.orderFeedModal.currentOrder).toBeNull();
    });
  });