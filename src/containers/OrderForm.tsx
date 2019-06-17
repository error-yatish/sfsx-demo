import * as React from 'react';
import * as _ from 'underscore';
import API from '../constants/service';
import { store } from '../index';
import { asyncCreateOrder, executeBuyOrder, executeSellOrder } from '../actions/index';
import { buyOrder, sellOrder, filterBySide } from '../constants/helper'

interface FuncProps {
    selectedTicker: string,
    orders: Array<OrderProps>
}

export interface OrderProps {
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

const OrderForm: React.FunctionComponent<FuncProps> = ({ orders, selectedTicker }: FuncProps) => {

    let [formData, onChangeData] = React.useState<OrderProps>({
        trader: '',
        price: 0,
        shares: 0,
        side: 'BUY',
        timestamp: 0,
        ticker: '',
        isExecuted: false
    })
    const [validationErr, setValError] = React.useState<string>('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked ? 'SELL' : 'BUY' : target.value;
        const name = target.name;

        onChangeData({
            ...formData,
            [name]: value
        });
    }

    const handleOnSubmit = async () => {

        if (!formData.trader) {
            setValError('trader')
        } else if (formData.price < 0) {
            setValError('price')
        } else if (formData.shares < 0) {
            setValError('shares')
        } else {
            formData.ticker = selectedTicker
            formData.isExecuted = false
            formData.timestamp = new Date().getTime()

            formData = { ...formData, price: parseFloat(formData.price.toString()), shares: parseFloat(formData.shares.toString()) }

            store.dispatch(asyncCreateOrder(formData))

            if (formData.side === 'BUY') {
                let sellData = filterBySide(orders, 'SELL')

                if (!!sellData.length) {
                    let executedShare = buyOrder(sellData.reverse(), formData)
                    let remainedShare = formData.shares - executedShare

                    store.dispatch(executeBuyOrder(formData, executedShare, remainedShare))
                }

            } else if (formData.side === 'SELL') {
                let buyData = filterBySide(orders, 'BUY')

                if (!!buyData.length) {
                    let executedShare = sellOrder(buyData, formData)
                    let remainedShare = formData.shares - executedShare

                    store.dispatch(executeSellOrder(formData, executedShare, remainedShare))
                }
            }
            onChangeData({
                trader: '',
                price: 0,
                shares: 0,
                side: 'BUY',
                timestamp: 0,
                ticker: '',
                isExecuted: false
            })
        }
    }

    return (
        <div className="card">
            <table className="table table-borderless">
                <tbody>
                    <tr>
                        <td>Trader</td>
                        <td><input name="trader" type="text" value={formData.trader} className="order-input" required onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td><input name="price" type="number" value={formData.price} className="order-input" onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td>Shares</td>
                        <td><input name="shares" type="number" value={formData.shares} className="order-input" onChange={handleInputChange} /></td>
                    </tr>
                </tbody>
            </table>
            <div className="input-wrapper row justify-center">
                <p className="margin-r-8">Buy</p>
                <div className="custom-control custom-switch">
                    <input name="side" type="checkbox" checked={formData.side !== 'BUY'} className="custom-control-input" id="customSwitch1" onChange={handleInputChange} />
                    <label className="custom-control-label" htmlFor="customSwitch1">Sell</label>
                </div>
            </div>
            <div className="input-wrapper row justify-center">
                <button type="button" className="btn btn-warning" onClick={handleOnSubmit}>Add Order</button>
            </div>
        </div>
    );
}

export default OrderForm;