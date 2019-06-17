import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'underscore';
import LineGraph from '../components/graphs/LineGraph';
import DropdownButton from '../components/buttons/DropdownButton';
import OrderForm from '../containers/OrderForm';
import { store } from '../index';
import { asyncAllOrders } from '../actions/index';
import { StoreState } from '../types/index';
import { filterByTicker, filterByPrice, filterByExecuted } from '../constants/helper';

interface OrderProps {
    price: number,
    shares: number,
    side: string,
    ticker: string,
    trader: string,
    timestamp: number,
    isExecuted: boolean,
    _id?: string,
    __v?: number
}

interface FuncProps {
    allOrders?: Array<OrderProps>,
    executedOrders?: Array<OrderProps>,
}

const fakeData = [
    { price: 86.52, shares: 200, side: "SELL", ticker: 'ORCL' },
    { price: 75.62, shares: 50, side: "SELL", ticker: 'ORCL' },
    { price: 49.51, shares: 75, side: "SELL", ticker: 'ORCL' },
    { price: 42.43, shares: 63, side: "SELL", ticker: 'ORCL' },
    { price: 36.07, shares: 250, side: "SELL", ticker: 'ORCL' },
    { price: 32.89, shares: 300, side: "SELL", ticker: 'ORCL' },
    { price: 24.72, shares: 450, side: "SELL", ticker: 'ORCL' },
    { price: 25.63, shares: 100, side: "BUY", ticker: 'ORCL' },
    { price: 34.58, shares: 75, side: "BUY", ticker: 'ORCL' },
    { price: 35.32, shares: 24, side: "BUY", ticker: 'ORCL' },
    { price: 38.90, shares: 65, side: "BUY", ticker: 'ORCL' },
    { price: 46.03, shares: 200, side: "BUY", ticker: 'ORCL' },
    { price: 52.69, shares: 80, side: "BUY", ticker: 'ORCL' },
]

const PageContainer = (props: any) => {

    const [selectedTicker, onSelectTicker] = React.useState<string>("GOOG")
    const [restingOrders, changeRestingOrders] = React.useState<Array<OrderProps>>([])
    const orders = filterByTicker(props.allOrders, selectedTicker)
    const executedOrder = filterByTicker(props.executedOrders, selectedTicker)

    const getAllOrders = async () => {
        store.dispatch(asyncAllOrders())
    }

    React.useEffect(() => {
        getAllOrders()
    }, [])

    const changeTicker = (value: string) => {
        onSelectTicker(value)
    }

    const changeRestingOrder = (label: number) => {
        let filteredOrders = filterByExecuted(filterByPrice(orders, label), false)
        changeRestingOrders(filteredOrders)
    }

    const datasets = [
        {
            label: "shares",
            data: _.pluck(orders, 'shares'),
            backgroundColor: _.map(orders, (order: OrderProps) => String(order.side) === "BUY" ? '#96bff7' : '#e22d45'),
            borderColor: "#000"
        }
    ]

    const labels = _.pluck(orders, 'price')

    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-4">
                                    <h4>SFSX</h4>
                                </div>
                                <div className="col-8">
                                    <DropdownButton data={["GOOG", "FB", "ORCL", "ZGRO"]} selectedItem={selectedTicker} _onSelect={changeTicker} />
                                </div>
                            </div>
                            <OrderForm orders={orders} selectedTicker={selectedTicker} />
                        </div>
                        <div className="col-6">
                            <LineGraph
                                datasets={datasets}
                                labels={labels}
                                handleClickOnBar={changeRestingOrder} />
                        </div>
                    </div>
                    {
                        !!restingOrders.length &&
                        <div style={{ borderTop: '2px solid', marginTop: '18px', paddingTop: '18px' }}>
                            <h5>Resting Orders: Buy @ {restingOrders[0].price}</h5>
                            <table className="table table-sm table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Timestamp</th>
                                        <th scope="col">Trader</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Shares</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        _.map(restingOrders, (order: OrderProps, i: number) =>
                                            <tr key={i}>
                                                <td>{order.timestamp}</td>
                                                <td>{order.trader}</td>
                                                <td>{order.price}</td>
                                                <td>{order.shares}</td>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className="col-4" style={{ borderLeft: '2px solid', minHeight: 'calc(100vh - 24px)' }}>
                    <h5 className="text-center">Trading Log</h5>
                    <table className="table table-sm table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Timestamp</th>
                                <th scope="col">Ticker</th>
                                <th scope="col">Price</th>
                                <th scope="col">Shares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.map(executedOrder, (order: OrderProps, i: number) =>
                                    <tr key={i} className={String(order.side) === 'BUY' ? 'table-primary' : 'table-danger'}>
                                        <td>{order.timestamp}</td>
                                        <td>{order.ticker}</td>
                                        <td>{order.price}</td>
                                        <td>{order.shares}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    allOrders: state.orders,
    executedOrders: state.executedOrders,
});

export default connect(mapStateToProps)(PageContainer);