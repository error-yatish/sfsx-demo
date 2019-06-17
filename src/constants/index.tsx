export const GET_ORDERS = 'GET_ORDERS';
export type GET_ORDERS = typeof GET_ORDERS;

export const CREATE_ORDER = 'CREATE_ORDER';
export type CREATE_ORDER = typeof CREATE_ORDER;

export const EXECUTE_BUY_ORDER = 'EXECUTE_BUY_ORDER';
export type EXECUTE_BUY_ORDER = typeof EXECUTE_BUY_ORDER;

export const EXECUTE_SELL_ORDER = 'EXECUTE_SELL_ORDER';
export type EXECUTE_SELL_ORDER = typeof EXECUTE_SELL_ORDER;

export const ERROR_HANDLE = 'ERROR_HANDLE';
export type ERROR_HANDLE = typeof ERROR_HANDLE;

//endpoints
const localhost = "http://192.168.0.108:3000";
const stagging = "http://localhost:3002";
const production = "http://localhost:3002";

export const END_POINT = localhost;