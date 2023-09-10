import { Injectable } from "@nestjs/common";

@Injectable()
export class ReviewQueryCreatorService {
  getAll() {
    return `
    SELECT *
    FROM product
    `;
  }

  getByIdQuery(id: number) {
    return `
    SELECT *
    FROM product as p
    WHERE p.product_id = ${id};
    `;
  }

  getBySlugQuery(slug: string) {
    return `
    SELECT *
    FROM product as p
    WHERE p.slug = '${slug}';
    `;
  }

  getByCategoryIdQuery(id: number) {
    return `
    SELECT 
	  p.product_id, p.name, p.slug, p.description, p.price, p.discount_percentage
    FROM product as p
    INNER JOIN product_category as pc
    ON p.product_id = pc.product_id
    INNER JOIN category as c
    ON pc.category_id = c.category_id
    WHERE pc.category_id = ${id};
    `;
  }

  getSizeAndQuantityQuery(id: number) {
    return `
    SELECT 
	  ps.size, ps.quantity
    FROM product as p
    INNER JOIN product_size as ps
    ON p.product_id = ps.product_id
    WHERE p.product_id = ${id};
    `;
  }

  getImagesQuery(id: number) {
    return `
    SELECT 
	  pi.image_path
    FROM product as p
    INNER JOIN product_image as pi
    ON p.product_id = pi.product_id
    WHERE p.product_id = ${id};
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

  getUpdateQuery(
    id: number,
    name: string,
    slug: string,
    description: string,
    price: number,
    discountPercentage: number,
  ) {
    return `
    UPDATE product as p
    SET 
	  "name" = '${name}',
	  "slug" = '${slug}',
	  description = '${description}',
	  price = ${price},
	  discount_percentage = ${discountPercentage}
    WHERE p.product_id = ${id};
    `;
  }

  getUpdateSizeAndQuantityQuery(id: number, size: string, quantity: string) {
    return `
    UPDATE product_size as ps
    SET 
	  size = ${size},
	  quantity = ${quantity}
    WHERE ps.product_id = ${id};
    `;
  }

  getUpdateImageQuery(id: number, imagePath: string) {
    return `
    UPDATE product_image as pi
    SET 
	  image_path = '${imagePath}'
    WHERE ps.product_id = ${id};
    `;
  }

  getUpdateCategoryQuery(id: number, categoryId: number) {
    return `
    UPDATE product_category as pc
    SET 
	  category_id = ${categoryId}
    WHERE pc.product_id = ${id};
    `;
  }

  getDeleteQuery(id: number) {
    return `
    DELETE FROM product as p
    WHERE p.product_id = ${id};
    `;
  }
}
