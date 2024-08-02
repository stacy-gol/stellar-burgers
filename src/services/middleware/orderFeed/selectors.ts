import { createSelector } from 'reselect';
import { RootState } from '../../store';

const selectOrderFeed = (state: RootState) => state.orderFeed;
const selectProfileFeed = (state: RootState) => state.profileFeed;

export const selectOrders = createSelector(
  [selectOrderFeed],
  (orderFeed) => orderFeed.orders
);

export const selectProfileOrders = createSelector(
  [selectProfileFeed],
  (profileFeed) => profileFeed.profileOrders
);