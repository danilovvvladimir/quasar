import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Order, OrderStatus } from "@prisma/client";
import {
  ORDER_CREATE_ERROR_MESSAGE,
  ORDER_NOT_FOUND_MESSAGE,
} from "src/constants/order";
import { PrismaService } from "src/database/prisma.service";
import { OrderCreateDTO, OrderItemsCreateDTO } from "./order.dto";

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  private async getOrderTotalPrice(orderId: string) {
    const orderWithTotalPrice = await this.prismaService.orderItem.aggregate({
      where: {
        orderId: orderId,
      },
      _sum: {
        totalPrice: true,
      },
    });

    console.log("orderWithTotalPrice", orderWithTotalPrice);

    return orderWithTotalPrice._sum.totalPrice;
  }

  async findAll() {
    const orders = await this.prismaService.order.findMany({
      include: { orderItem: true, user: true },
    });

    const orderPromises = orders.map(async (item) => ({
      ...item,
      totalPrice: +(await this.getOrderTotalPrice(item.id)),
    }));

    const ordersWithTotalPrices = await Promise.all(orderPromises);

    console.log("ordersWithTotalPrices", ordersWithTotalPrices);

    return ordersWithTotalPrices;
  }

  async findById(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: { orderItem: true },
    });

    if (!order) {
      throw new NotFoundException(ORDER_NOT_FOUND_MESSAGE);
    }

    return order;
  }

  async findByUserId(userId: string) {
    // Проверка на существование юзера?

    const orders = await this.prismaService.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItem: {
          include: {
            product: {
              include: {
                productImage: true,
              },
            },
          },
        },
      },
    });

    const formattedOrders = orders.map((order) => {
      const { orderItem: orderItems, ...orderRest } = order;
      const formattedOrderItems = orderItems.map((orderItem) => {
        const { product, ...restOrderItem } = orderItem;

        const { productImage: productImages, ...productRest } = product;

        return { ...restOrderItem, product: { productRest, productImages } };
      });

      return { ...orderRest, orderItems: formattedOrderItems };
    });

    return formattedOrders;
  }

  async findByProductId(productId: string) {
    // Проверка на существование product?

    const products = await this.prismaService.order.findMany({
      where: {
        orderItem: {
          some: {
            productId,
          },
        },
      },
    });

    return products;
  }

  async create(dto: OrderCreateDTO) {
    const { orderItems, userId } = dto;

    let order: Order = undefined;

    try {
      // Начало транзакции
      order = await this.prismaService.$transaction(async (prisma) => {
        const createdOrder = await prisma.order.create({
          data: {
            userId,
          },
        });
        console.log("1 зашло");

        this.createOrderItems(createdOrder.id, {
          orderItems,
        });

        this.updateOrderedItems({ orderItems });

        console.log("2 зашло");

        return createdOrder;
      });
    } catch (error) {
      // Обработка ошибок транзакции
      throw new HttpException(
        ORDER_CREATE_ERROR_MESSAGE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return order;
  }

  private async updateOrderedItems(dto: OrderItemsCreateDTO) {
    const { orderItems } = dto;

    const detailsPromises = orderItems.map((orderItem) => {
      return this.prismaService.productSize.updateMany({
        data: {
          quantity: {
            decrement: 1,
          },
        },
        where: {
          productId: orderItem.productId,
          AND: {
            size: orderItem.size,
          },
        },
      });
    });

    await Promise.all(detailsPromises);

    return detailsPromises;
  }

  private async createOrderItems(id: string, dto: OrderItemsCreateDTO) {
    const { orderItems } = dto;

    const detailsPromises = orderItems.map((orderItem) => {
      return this.prismaService.orderItem.create({
        data: {
          size: orderItem.size,
          quantity: orderItem.quantity,
          totalPrice: orderItem.totalPrice,
          productId: orderItem.productId,
          orderId: id,
        },
      });
    });

    await Promise.all(detailsPromises);

    return detailsPromises;
  }

  async updateStatus(id: string, newOrderStatus: OrderStatus) {
    await this.findById(id);

    const order = await this.prismaService.order.update({
      where: { id },
      data: {
        orderStatus: newOrderStatus,
      },
    });

    return order;
  }
}
