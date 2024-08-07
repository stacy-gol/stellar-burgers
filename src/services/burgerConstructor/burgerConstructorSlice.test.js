import reducer, {
    addIngredient,
    removeIngredient,
    moveIngredient,
    clearConstructor,
  } from './burgerConstructorSlice';
  import { v4 as uuidv4 } from 'uuid';
  
  jest.mock('uuid', () => ({
    v4: jest.fn(),
  }));
  
  const initialState = {
    bun: null,
    ingredients: [],
  };
  
  describe('burgerConstructorSlice', () => {
    beforeEach(() => {
      uuidv4.mockReturnValue('unique-key');
    });
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addIngredient for bun', () => {
      const bun = { id: '1', name: 'Bun', type: 'bun', price: 1 };
      const actual = reducer(initialState, addIngredient(bun));
      expect(actual.bun).toEqual({ ...bun, uniqueKey: 'unique-key' });
      expect(actual.ingredients).toEqual([]);
    });
  
    it('should handle addIngredient for non-bun', () => {
      const ingredient = { id: '2', name: 'Patty', type: 'main', price: 2 };
      const actual = reducer(initialState, addIngredient(ingredient));
      expect(actual.bun).toBeNull();
      expect(actual.ingredients).toEqual([{ ...ingredient, uniqueKey: 'unique-key' }]);
    });
  
    it('should handle removeIngredient', () => {
      const initialStateWithIngredients = {
        bun: null,
        ingredients: [
          { id: '2', name: 'Patty', type: 'main', price: 2, uniqueKey: 'unique-key' },
        ],
      };
      const actual = reducer(initialStateWithIngredients, removeIngredient({ uniqueKey: 'unique-key' }));
      expect(actual.ingredients).toEqual([]);
    });
  
    it('should handle moveIngredient', () => {
      const initialStateWithIngredients = {
        bun: null,
        ingredients: [
          { id: '2', name: 'Patty', type: 'main', price: 2, uniqueKey: 'key-1' },
          { id: '3', name: 'Lettuce', type: 'main', price: 1, uniqueKey: 'key-2' },
        ],
      };
      const actual = reducer(initialStateWithIngredients, moveIngredient({ fromIndex: 0, toIndex: 1 }));
      expect(actual.ingredients).toEqual([
        { id: '3', name: 'Lettuce', type: 'main', price: 1, uniqueKey: 'key-2' },
        { id: '2', name: 'Patty', type: 'main', price: 2, uniqueKey: 'key-1' },
      ]);
    });
  
    it('should handle clearConstructor', () => {
      const initialStateWithIngredients = {
        bun: { id: '1', name: 'Bun', type: 'bun', price: 1, uniqueKey: 'unique-key' },
        ingredients: [
          { id: '2', name: 'Patty', type: 'main', price: 2, uniqueKey: 'key-1' },
        ],
      };
      const actual = reducer(initialStateWithIngredients, clearConstructor());
      expect(actual).toEqual(initialState);
    });
  });