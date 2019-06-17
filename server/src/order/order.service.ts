import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './create-order.dto';
import { Order } from './order.interface';
import * as _ from 'lodash';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

  // fetch all orders
  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();
    return orders;
  }

  // post a single order
  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await new this.orderModel(createOrderDto);
    return newOrder.save();
  }

  // Edit order details
  async updateOrder(orderID, createOrderDto: CreateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(orderID, createOrderDto, { new: true });
    return updatedOrder;
  }

  // Delete a customer
  async deleteOrder(orderID): Promise<any> {
    const deletedOrder = await this.orderModel.findByIdAndRemove(orderID);
    return deletedOrder;
  }

}
