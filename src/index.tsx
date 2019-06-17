import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { orderBook } from './reducers/index';
import { OrderActions } from './actions/index';
import { StoreState } from './types/index';

import PageContainer from "./containers/PageContainer";
import 'index.sass';

export const store = createStore<StoreState, OrderActions, any, any>(orderBook, {
  orders: [],
  executedOrders: []
}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <PageContainer />
  </Provider>,
  document.getElementById("root")
);