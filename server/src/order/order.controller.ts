import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // add a order
  @Post('/create')
  async addOrder(@Res() res, @Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.addOrder(createOrderDto);
    return res.status(HttpStatus.OK).json({
      message: 'Order has been created successfully',
      order,
    })
  }

  // Retrieve orders list
  @Get('/all')
  async getAllOrder(@Res() res) {
    const orders = await this.orderService.getAllOrders();
    return res.status(HttpStatus.OK).json(orders);
  }

  // Update a order's details
  @Put('/update')
  async updateOrder(@Res() res, @Query('orderID') orderID, @Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.updateOrder(orderID, createOrderDto);
    if (!order) { throw new NotFoundException('Order does not exist!'); }
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully updated',
      order,
    });
  }

  // Delete a order
  @Delete('/delete')
  async deleteOrder(@Res() res, @Query('orderID') orderID) {
    const order = await this.orderService.deleteOrder(orderID);
    if (!order) { throw new NotFoundException('Order does not exist'); }
    return res.status(HttpStatus.OK).json({
      message: 'Order has been deleted',
      order,
    });
  }
}
