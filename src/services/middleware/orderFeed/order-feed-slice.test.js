import { orderFeedSlice, wsConnecting, wsOpen, wsClose, wsError, wsMessage, initialState } from './order-feed-slice';
import { WebsocketStatus } from '../../types';

describe('orderFeedSlice reducer', () => {

  it('should handle initial state', () => {
    expect(orderFeedSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle wsConnecting', () => {
    const actual = orderFeedSlice.reducer(initialState, wsConnecting());
    expect(actual.status).toEqual(WebsocketStatus.CONNECTING);
  });

  it('should handle wsOpen', () => {
    const actual = orderFeedSlice.reducer(initialState, wsOpen());
    expect(actual.status).toEqual(WebsocketStatus.ONLINE);
    expect(actual.connectionError).toBeNull();
  });

  it('should handle wsClose', () => {
    const actual = orderFeedSlice.reducer(initialState, wsClose());
    expect(actual.status).toEqual(WebsocketStatus.OFFLINE);
  });

  it('should handle wsError', () => {
    const error = 'Connection error';
    const actual = orderFeedSlice.reducer(initialState, wsError(error));
    expect(actual.connectionError).toEqual(error);
  });

  it('should handle wsMessage', () => {
    const orders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
    const actual = orderFeedSlice.reducer(initialState, wsMessage({ orders }));
    expect(actual.orders).toEqual(orders);
  });
});