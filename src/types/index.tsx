export interface Order {
    timestamp: number,
    ticker: string,
    trader: string,
    price: number,
    shares: number,
    side: string,
    isExecuted: boolean,
    _id?: string,
    __v?: number
}

export interface StoreState {
    orders: Array<Order>,
    executedOrders: Array<Order>,
}