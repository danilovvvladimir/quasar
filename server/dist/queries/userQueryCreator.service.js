"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueryCreatorService = void 0;
const common_1 = require("@nestjs/common");
let UserQueryCreatorService = class UserQueryCreatorService {
    getAllUsersQuery() {
        return `${this.getInnerRoles()};`;
    }
    getUserByIdQuery(id) {
        return `${this.getInnerRoles(`WHERE u.user_id = ${id}`)};`;
    }
    getUserByEmailQuery(email) {
        return `${this.getInnerRoles(`WHERE u.email = '${email}'`)};`;
    }
    getUserOrdersQuery(id) {
        return `SELECT u.user_id, o.order_id, o.created_at, os.name as order_status_message
    FROM "user" as u
    INNER JOIN "order" as o 
    ON u.user_id = o.user_id
    INNER JOIN order_status as os 
    ON o.order_status_id = os.order_status_id
    WHERE u.user_id = ${id}; `;
    }
    getUserWishlistItemsQuery(id) {
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
    getUserCartItemsQuery(id) {
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
    getInnerRoles(whereStatement = "") {
        return `SELECT u.user_id, u.email, u.firstname, u.created_at, u.updated_at, string_agg(r.name, ', ') AS roles 
    FROM "user" as u
    INNER JOIN user_role as ur 
    ON ur.user_id = u.user_id 
    INNER JOIN role as r 
    ON r.role_id = ur.role_id
    ${whereStatement} 
    GROUP BY u.user_id`;
    }
};
exports.UserQueryCreatorService = UserQueryCreatorService;
exports.UserQueryCreatorService = UserQueryCreatorService = __decorate([
    (0, common_1.Injectable)()
], UserQueryCreatorService);
//# sourceMappingURL=userQueryCreator.service.js.map