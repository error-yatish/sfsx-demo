import * as _ from 'underscore';
import { Order } from '../types/index';

export const arrangeOrders = (data: Array<Order>) => {
    let sell = _.filter(data, d => d.side === "SELL")
    sell = sell.sort((a, b) => b.price - a.price);

    let buy = _.filter(data, d => d.side === "BUY")
    buy = buy.sort((a, b) => b.price - a.price);

    return [...sell, ...buy];
}

export const filterByTicker = (data: Array<Order>, ticker: string) => {
    return _.filter(data, d => d.ticker === ticker);
}

export const filterBySide = (data: Array<Order>, side: string) => {
    return _.filter(data, d => d.side === side);
}

export const filterByPrice = (data: Array<Order>, price: number) => {
    return _.filter(data, d => d.price === price);
}

export const filterByExecuted = (data: Array<Order>, isExecuted: boolean) => {
    return _.filter(data, d => d.isExecuted === isExecuted);
}

export const buyOrder = (sellData: Array<Order>, buyOrder: Order) => {

    let i = 0, buyOrderShares = buyOrder.shares;

    while (sellData.length > i && sellData[i].price <= buyOrder.price) {
        if (sellData[i].shares <= buyOrderShares)
            buyOrderShares -= sellData[i].shares
        else
            buyOrderShares = 0

        if (!buyOrderShares)
            break;
        else
            i += 1
    }

    return buyOrder.shares - buyOrderShares;
}

export const sellOrder = (buyData: Array<Order>, sellOrder: Order) => {

    let i = 0, sellOrderShares = sellOrder.shares;

    while (buyData.length > i && buyData[i].price >= sellOrder.price) {
        if (buyData[i].shares <= sellOrderShares)
            sellOrderShares -= buyData[i].shares
        else
            sellOrderShares = 0

        if (!sellOrderShares)
            break;
        else
            i += 1
    }

    return sellOrder.shares - sellOrderShares;
}

export const executeBuyOrder = (orders: Array<Order>, order: Order, executedShares: number, remainedShares: number, executedOrders: Array<Order>) => {

    let sellOrders = filterBySide(orders, 'SELL').reverse(),
        buyOrders = filterBySide(orders, 'BUY');

    let { executeOrders, oppositeOrders, doneOrders } = executeOrder(sellOrders, buyOrders, order, executedShares, remainedShares, executedOrders)

    return { buyOrders: [...executeOrders.reverse(), ...oppositeOrders], doneBuyOrders: doneOrders };
}

export const executeSellOrder = (orders: Array<Order>, order: Order, executedShares: number, remainedShares: number, executedOrders: Array<Order>) => {

    let sellOrders = filterBySide(orders, 'SELL'),
        buyOrders = filterBySide(orders, 'BUY');

    let { executeOrders, oppositeOrders, doneOrders } = executeOrder(buyOrders, sellOrders, order, executedShares, remainedShares, executedOrders)

    return { sellOrders: [...oppositeOrders, ...executeOrders], doneSellOrders: doneOrders };
}

export const executeOrder = (executeOrders: Array<Order>, oppositeOrders: Array<Order>, order: Order, executedShares: number, remainedShares: number, executedOrders: Array<Order>) => {

    let sharesCount = executedShares;

    while (sharesCount > 0) {
        let TOB = executeOrders[0],
            TOBShares = TOB.shares,
            TMP_TOBShares = TOB.shares;

        if (TOBShares <= sharesCount) {
            executeOrders = [...executeOrders.slice(1)]
        } else {
            executeOrders = [{ ...TOB, shares: TOBShares - sharesCount }, ...executeOrders.slice(1)]
        }

        sharesCount = sharesCount - TMP_TOBShares
    }

    if (sharesCount <= 0) {
        executedOrders = [...executedOrders, { ...order, isExecuted: true, shares: executedShares }]
    }

    if (remainedShares) {
        oppositeOrders = arrangeOrders([...oppositeOrders, { ...order, shares: remainedShares }])
    }

    return { executeOrders, oppositeOrders, doneOrders: executedOrders };
}