import reducer, {
    setIngredient,
    clearIngredient,
  } from './currentIngredientSlice';
  
  const initialState = {
    currentIngredient: null,
  };
  
  describe('currentIngredientSlice', () => {
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle setIngredient', () => {
      const ingredient = { id: '1', name: 'Bun', type: 'bun', price: 1 };
      const actual = reducer(initialState, setIngredient(ingredient));
      expect(actual.currentIngredient).toEqual(ingredient);
    });
  
    it('should handle clearIngredient', () => {
      const stateWithIngredient = {
        currentIngredient: { id: '1', name: 'Bun', type: 'bun', price: 1 },
      };
      const actual = reducer(stateWithIngredient, clearIngredient());
      expect(actual.currentIngredient).toBeNull();
    });
  });