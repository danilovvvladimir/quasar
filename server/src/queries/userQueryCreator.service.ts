import { Injectable } from "@nestjs/common";

@Injectable()
export class UserQueryCreatorService {
  getAllQuery() {
    return `${this.getWithRoles()};`;
  }

  getByIdQuery(id: number) {
    return `${this.getWithRoles(`WHERE u.user_id = ${id}`)};`;
  }

  getByEmailQuery(email: string) {
    return `${this.getWithRoles(`WHERE u.email = '${email}'`)};`;
  }

  getOrdersQuery(id: number) {
    return `SELECT u.user_id, o.order_id, o.created_at, os.name as order_status_message
    FROM "user" as u
    INNER JOIN "order" as o 
    ON u.user_id = o.user_id
    INNER JOIN order_status as os 
    ON o.order_status_id = os.order_status_id
    WHERE u.user_id = ${id}; `;
  }

  getWishlistItemsQuery(id: number) {
    return `SELECT 
    u.user_id, p.product_id, p.name as product_name, p.slug as product_slug, 
    p.price as product_price, p.discount_percentage as product_discount 
    FROM "user" as u
    INNER JOIN user_wishlist_item as uwi 
    ON u.user_id = uwi.user_id
    INNER JOIN product as p 
    ON uwi.product_id = p.product_id
    WHERE u.user_id = ${id};`;
  }

  getCartItemsQuery(id: number) {
    return `SELECT 
    u.user_id, p.product_id, p.name as product_name, p.slug as product_slug, 
    p.price as product_price, p.discount_percentage as product_discount,
    uci.size as product_size, uci.quantity as product_quantity
    FROM "user" as u
    INNER JOIN user_cart_item as uci 
    ON u.user_id = uci.user_id
    INNER JOIN product as p 
    ON uci.product_id = p.product_id
    WHERE u.user_id = ${id};`;
  }

  getCreateQuery(email: string, username: string, passwordHash: string) {
    return `INSERT INTO "user" (email, username, "password")
    VALUES
      ('${email}', '${username}', '${passwordHash}');`;
  }

  private getWithRoles(whereStatement = "") {
    return `SELECT u.user_id, u.email, u.username, u.created_at, u.updated_at, u.password, string_agg(r.name, ', ') AS roles 
    FROM "user" as u
    INNER JOIN user_role as ur 
    ON ur.user_id = u.user_id 
    INNER JOIN role as r 
    ON r.role_id = ur.role_id
    ${whereStatement} 
    GROUP BY u.user_id`;
  }
}
