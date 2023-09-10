import { Injectable } from "@nestjs/common";

@Injectable()
export class ReviewQueryCreatorService {
  getAllQuery() {
    return this.getFullWithStatusAndTotal();
  }

  getByIdQuery(id: number) {
    return this.getFullWithStatusAndTotalQuery(`WHERE o.order_id = ${id}`);
  }

  getFullWithStatusAndTotalQuery(whereStatement = "") {
    // return `
    // SELECT
    // o.order_id, o.user_id, os.name as order_status_name, o.created_at
    // FROM "order" as o
    // INNER JOIN order_status as os
    // ON o.order_status_id = os.order_status_id
    // ${whereStatement};
    // `;

    return `
    SELECT
	  o.order_id, o.user_id, os.name as order_status_name, 
	  o.created_at, SUM(oi.quantity * oi.total_price) AS total_price
    FROM "order" as o
    INNER JOIN order_status as os
	  ON o.order_status_id = os.order_status_id
    INNER JOIN order_item AS oi
    ON o.order_id = oi.order_id
    ${whereStatement};
    GROUP BY o.order_id, o.user_id, os.name, o.created_at;
    `;
  }

  getOrderItemsQuery(id: string) {
    return `
    SELECT
	  o.order_id, o.user_id, oi.product_id, oi.quantity, oi.size, oi.total_price
    FROM "order" as o
    INNER JOIN order_item as oi
	  ON o.order_id = oi.order_id
    WHERE o.order_id = ${id}
    `;
  }

  getTotalPriceQuery(id: string) {
    return `
    SELECT
    SUM(oi.quantity * oi.total_price) AS total_price
    FROM "order" AS o
    INNER JOIN order_item AS oi
    ON o.order_id = oi.order_id
    WHERE o.order_id = ${id};
    `;
  }

  getUpdateStatusQuery(id: number, orderStatusId: number) {
    return `
    UPDATE "order" as o
    SET 
	  order_status_id = ${orderStatusId}
    WHERE o.order_id = ${id};
    `;
  }

  getCreateQuery(
    name: string,
    slug: string,
    description: string,
    price: number,
  ) {
    return `
    INSERT INTO product ("name", slug, description, price)
    VALUES
	    ('${name}', '${slug}', '${description}', ${price});
    `;
  }

  // getUpdateQuery(
  //   id: number,
  //   name: string,
  //   slug: string,
  //   description: string,
  //   price: number,
  //   discountPercentage: number,
  // ) {
  //   return `
  //   UPDATE product as p
  //   SET
  //   "name" = '${name}',
  //   "slug" = '${slug}',
  //   description = '${description}',
  //   price = ${price},
  //   discount_percentage = ${discountPercentage}
  //   WHERE p.product_id = ${id};
  //   `;
  // }

  getDeleteQuery(id: number) {
    return `
    DELETE FROM "order" as o
    WHERE o.order_id = ${id};
    `;
  }
}
