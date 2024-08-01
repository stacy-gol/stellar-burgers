import { createSelector } from 'reselect';
import { RootState } from '../../store';

const selectOrderFeed = (state: RootState) => state.orderFeed;

export const selectOrders = createSelector(
  [selectOrderFeed],
  (orderFeed) => orderFeed.orders
);
