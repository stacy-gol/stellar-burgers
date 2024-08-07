import reducer, {
    clearOrder,
    createOrder,
  } from './orderSlice';
  import fetchMock from 'jest-fetch-mock';

  
  const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: null,
  };
  
  describe('orderSlice', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle clearOrder', () => {
      const stateWithOrder = {
        order: { id: '1', name: 'Order 1' },
        orderRequest: true,
        orderFailed: 'Error',
      };
      const actual = reducer(stateWithOrder, clearOrder());
      expect(actual).toEqual(initialState);
    });
  
    it('should handle createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const actual = reducer(initialState, action);
      expect(actual.orderRequest).toEqual(true);
      expect(actual.orderFailed).toBeNull();
    });
  
    it('should handle createOrder.fulfilled', () => {
      const order = { id: '1', name: 'Order 1' };
      const action = { type: createOrder.fulfilled.type, payload: order };
      const actual = reducer(initialState, action);
      expect(actual.order).toEqual(order);
      expect(actual.orderRequest).toEqual(false);
      expect(actual.orderFailed).toBeNull();
    });
  
    it('should handle createOrder.rejected', () => {
      const action = { type: createOrder.rejected.type, error: { message: 'Error' } };
      const actual = reducer(initialState, action);
      expect(actual.orderRequest).toEqual(false);
      expect(actual.orderFailed).toEqual('Error');
    });
  });