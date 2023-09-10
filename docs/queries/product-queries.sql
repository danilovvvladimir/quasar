-- Find All Products
SELECT *
FROM product;

-- Find Product by Id
SELECT *
FROM product
WHERE product_id = 1;

-- Find Product by Slug
SELECT *
FROM product
WHERE slug = 't-shirt-bh';

-- Find Products by Category
SELECT 
	p.product_id, p.name, p.slug, p.description, p.price, p.discount_percentage
FROM product as p
INNER JOIN product_category as pc
    ON p.product_id = pc.product_id
INNER JOIN category as c
    ON pc.category_id = c.category_id
WHERE pc.category_id = 1;

-- Find Product's size and quantity
SELECT 
	ps.size, ps.quantity
FROM product as p
INNER JOIN product_size as ps
    ON p.product_id = ps.product_id
WHERE p.product_id = 1;

-- Find Product's images
SELECT 
	pi.image_path
FROM product as p
INNER JOIN product_image as pi
    ON p.product_id = pi.product_id
WHERE p.product_id = 1;

-- Create New Product
INSERT INTO product ("name", slug, description, price)
VALUES
	('t-shirt bh', 't-shirt-bh', 'some big text', 2499),

-- Update Product
UPDATE product as p
SET 
	"name" = 'new_product_name',
	slug = 'new_product_slug',
	description = 'new_product_description',
	price = 1000,
	discount_percentage = 10
WHERE p.product_id = 1;

-- Update Product's size and quantity
UPDATE product_size as ps
SET 
	size = 30,
	quantity = 100
WHERE ps.product_id = 1;

-- Update Product's image
UPDATE product_image as pi
SET 
	image_path = 'new_image_path'
WHERE pi.product_id = 1;

-- Update Product's category
UPDATE product_category as pc
SET 
	category_id = 2
WHERE pc.product_id = 1;

-- Delete Product
DELETE FROM product as p
WHERE p.product_id = 1;







