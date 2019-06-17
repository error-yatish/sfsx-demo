import { OrderActions } from '../actions';
import { StoreState } from '../types/index';
import { GET_ORDERS, CREATE_ORDER, EXECUTE_BUY_ORDER, EXECUTE_SELL_ORDER } from '../constants/index';
import * as _ from 'underscore';
import { arrangeOrders, filterByTicker, executeBuyOrder, executeSellOrder } from '../constants/helper';

export const orderBook = (state: StoreState, action: OrderActions): StoreState => {
    switch (action.type) {
        case GET_ORDERS:
            return { ...state, orders: arrangeOrders(action.orders) };
        case CREATE_ORDER:
            return { ...state, orders: arrangeOrders([...state.orders, action.order]) };
        case EXECUTE_BUY_ORDER:
            let { buyOrders, doneBuyOrders } = executeBuyOrder(filterByTicker(state.orders, action.order.ticker), action.order, action.executedShares, action.remainedShares, state.executedOrders);
            return { ...state, orders: buyOrders, executedOrders: doneBuyOrders };
        case EXECUTE_SELL_ORDER:
            let { sellOrders, doneSellOrders } = executeSellOrder(filterByTicker(state.orders, action.order.ticker), action.order, action.executedShares, action.remainedShares, state.executedOrders);
            return { ...state, orders: sellOrders, executedOrders: doneSellOrders };
    }
    return state;
}