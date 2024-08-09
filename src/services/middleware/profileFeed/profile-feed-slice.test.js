import { profileFeedSlice, wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './profile-feed-slice';
import { WebsocketStatus } from '../../types';

describe('profileFeedSlice reducer', () => {
  const initialState = {
    status: WebsocketStatus.OFFLINE,
    profileOrders: [],
    connectionError: null,
  };

  it('should handle initial state', () => {
    expect(profileFeedSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle wsConnecting', () => {
    const actual = profileFeedSlice.reducer(initialState, wsConnecting());
    expect(actual.status).toEqual(WebsocketStatus.CONNECTING);
  });

  it('should handle wsOpen', () => {
    const actual = profileFeedSlice.reducer(initialState, wsOpen());
    expect(actual.status).toEqual(WebsocketStatus.ONLINE);
    expect(actual.connectionError).toBeNull();
  });

  it('should handle wsClose', () => {
    const actual = profileFeedSlice.reducer(initialState, wsClose());
    expect(actual.status).toEqual(WebsocketStatus.OFFLINE);
  });

  it('should handle wsError', () => {
    const error = 'Connection error';
    const actual = profileFeedSlice.reducer(initialState, wsError(error));
    expect(actual.connectionError).toEqual(error);
  });

  it('should handle wsMessage', () => {
    const orders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
    const actual = profileFeedSlice.reducer(initialState, wsMessage({ orders }));
    expect(actual.profileOrders).toEqual(orders);
  });
});