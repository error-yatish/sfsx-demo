import * as constants from '../constants';
import API from '../constants/service';
import { Order } from '../types/index';

export interface GetOrders {
    type: constants.GET_ORDERS;
    orders?: Array<Order>;
}

export interface CreateOrder {
    type: constants.CREATE_ORDER;
    order: Order
}

export interface ExecuteBuyOrder {
    type: constants.EXECUTE_BUY_ORDER;
    order: Order,
    executedShares: number,
    remainedShares: number
}

export interface ExecuteSellOrder {
    type: constants.EXECUTE_SELL_ORDER;
    order: Order,
    executedShares: number,
    remainedShares: number
}

export interface ErrorHandle {
    type: constants.ERROR_HANDLE;
}

export type OrderActions = GetOrders | CreateOrder | ExecuteBuyOrder | ExecuteSellOrder | ErrorHandle;

export const getOrders = (orders: Array<Order>): GetOrders => {
    return {
        type: constants.GET_ORDERS,
        orders
    }
}

export const createOrder = (order: Order): CreateOrder => {
    return {
        type: constants.CREATE_ORDER,
        order
    }
}

export const executeBuyOrder = (order: Order, executedShares: number, remainedShares: number): ExecuteBuyOrder => {
    return {
        type: constants.EXECUTE_BUY_ORDER,
        executedShares,
        remainedShares,
        order
    }
}

export const executeSellOrder = (order: Order, executedShares: number, remainedShares: number): ExecuteSellOrder => {
    return {
        type: constants.EXECUTE_SELL_ORDER,
        executedShares,
        remainedShares,
        order
    }
}

export const errorHandle = (error: any, time: number): ErrorHandle => {
    return {
        type: constants.ERROR_HANDLE
    }
}

export const asyncAllOrders = () => async (dispatch: any) => {
    try {
        let response = await API.get(`/order/all`);
        if (response) {
            dispatch(getOrders(response.data.map((res: any) => ({ ...res, price: parseFloat(res.price), shares: parseFloat(res.shares) }))));
        }
    } catch (err) {
        dispatch(errorHandle({ message: err.response.data.error.message || err.message }, 5))
    }
}

export const asyncCreateOrder = (formData: any) => async (dispatch: any) => {
    try {
        let response = await API.post(`/order/create`, formData)

        if (response) {
            dispatch(createOrder(response.data));
        }
    } catch (err) {
        dispatch(errorHandle({ message: err.response.data.error.message || err.message }, 5))
    }
}

export const asyncExecuteBuyOrder = (formData: any) => async (dispatch: any) => {
    try {
        let response = await API.post(`/order/create`, formData)

        if (response) {
            dispatch(createOrder(response.data));
        }
    } catch (err) {
        dispatch(errorHandle({ message: err.response.data.error.message || err.message }, 5))
    }
}

export const asyncExecuteSellOrder = (formData: any) => async (dispatch: any) => {
    try {
        let response = await API.post(`/order/create`, formData)

        if (response) {
            dispatch(createOrder(response.data));
        }
    } catch (err) {
        dispatch(errorHandle({ message: err.response.data.error.message || err.message }, 5))
    }
}