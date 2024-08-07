import reducer, {
  resetIngredientsState,
  fetchIngredients,
  selectAllIngredients,
} from './ingredientsSlice';

const initialState = {
  allIngredients: [],
  loading: false,
  error: null,
};

describe('ingredientsSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle resetIngredientsState', () => {
    const modifiedState = {
      allIngredients: [{ id: '1', name: 'Bun', type: 'bun', price: 1 }],
      loading: true,
      error: 'Error',
    };
    const actual = reducer(modifiedState, resetIngredientsState());
    expect(actual).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const actual = reducer(initialState, action);
    expect(actual.loading).toEqual(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const ingredients = [
      { id: '1', name: 'Bun', type: 'bun', price: 1 },
      { id: '2', name: 'Patty', type: 'main', price: 2 },
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: ingredients };
    const actual = reducer(initialState, action);
    expect(actual.allIngredients).toEqual(ingredients);
    expect(actual.loading).toEqual(false);
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: { message: 'Fetch failed' } };
    const actual = reducer(initialState, action);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual('Fetch failed');
  });

  it('should select all ingredients', () => {
    const state = {
      ingredients: {
        allIngredients: [{ id: '1', name: 'Bun', type: 'bun', price: 1 }],
        loading: false,
        error: null,
      },
    };
    expect(selectAllIngredients(state)).toEqual([{ id: '1', name: 'Bun', type: 'bun', price: 1 }]);
  });
});