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

  async findAll() {
    const orders = await this.prismaService.order.findMany();

    return orders;
  }

  async findById(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(ORDER_NOT_FOUND_MESSAGE);
    }

    return order;
  }

  async findByUserId(userId: string) {
    // Проверка на существование юзера?

    const products = await this.prismaService.order.findMany({
      where: {
        userId,
      },
    });

    return products;
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

        const createdOrderItems = await this.createOrderItems(createdOrder.id, {
          orderItems,
        });

        await Promise.all(createdOrderItems);

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

  private async createOrderItems(id: string, dto: OrderItemsCreateDTO) {
    await this.findById(id);

    const { orderItems } = dto;

    const detailsPromises = orderItems.map((orderItem) =>
      this.prismaService.orderItem.create({
        data: {
          quantity: orderItem.quantity,
          totalPrice: orderItem.totalPrice,
          productId: orderItem.productId,
          orderId: id,
        },
      }),
    );

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
