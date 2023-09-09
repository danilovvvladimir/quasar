-- Role ---
SELECT * FROM role;
INSERT INTO role (name)
VALUES
	('user'),
	('admin'),
	('superadmin');	

-- User ---
SELECT * FROM "user";
INSERT INTO "user" (email, firstname, "password")
VALUES
	('user1@gmail.com', 'user1', 'user1p'),
	('user2@gmail.com', 'user2', 'user2p'),
	('user3@gmail.com', 'user3', 'user3p');

-- User_role ---
SELECT * FROM user_role;
INSERT INTO user_role (user_id, role_id)
VALUES
	(1, 2);
	
-- product ---
SELECT * FROM product;
INSERT INTO product ("name", slug, description, price)
VALUES
	('t-shirt bh', 't-shirt-bh', 'some big text', 2499),
	('react sneakers', 'react-sneakers', 'some big text react', 7999),
	('hoodie who di', 'hoodie-who-di', 'some big text hoodie', 3499);
	
-- product_image ---
SELECT * FROM product_image;
INSERT INTO product_image (product_id, image_path)
VALUES
	(1, 'uploads/t-shirt/bh/1.jpg'),
	(1, 'uploads/t-shirt/bh/2.jpg'),
	(2, 'uploads/sneakers/sneakers/1.jpg'),
	(3, 'uploads/hoodie/who-di/1.jpg');
	
-- product_size ---
SELECT * FROM product_size;
INSERT INTO product_size (product_id, size, quantity)
VALUES
	(1, 42, 2),
	(1, 43, 16),
	(2, 40, 24),
	(2, 41, 12),
	(2, 42, 14),
	(2, 44, 16),
	(3, 44, 6),
	(3, 34, 12);
	
-- category ---
SELECT * FROM category;
INSERT INTO category ("name", slug)
VALUES
	('t-shirt', 't-shirt'),
	('sneakers', 'sneakers'),
	('hoodies', 'hoodies'),
	('running shoes', 'running-shoes');
	
-- product_category ---
SELECT * FROM product_category;
INSERT INTO product_category (product_id, category_id)
VALUES
	(2, 2),
	(2, 4),
	(1, 1),
	(3, 3);

-- user_cart_item ---
SELECT * FROM user_cart_item;
INSERT INTO user_cart_item (user_id, product_id, size, quantity)
VALUES
	(1, 1, 43, 4),
	(1, 1, 41, 6),
	(2, 2, 42, 1);
	
-- user_wishlist_item ---
SELECT * FROM user_wishlist_item;
INSERT INTO user_wishlist_item (user_id, product_id)
VALUES
	(1, 3),
	(1, 2),
	(2, 2);
	
-- review ---
SELECT * FROM review;
INSERT INTO review (user_id, product_id, rating, "text")
VALUES
	(1, 1, 5, 'Very cool!'),
	(1, 2, 3, 'So so!'),
	(2, 2, 4, 'Good, but not enough');

-- order_status ---
SELECT * FROM order_status;
INSERT INTO order_status ("name")
VALUES
	('PENDING'),
	('PROCESSING'),
	('DELIVERED');	
	
-- order ---
SELECT * FROM "order";
INSERT INTO "order" (user_id)
VALUES
	(1),
	(1),
	(2);	
	
-- order_item  ---
SELECT * FROM order_item;
INSERT INTO order_item (order_id, product_id, size, quantity, total_price)
VALUES
	(1, 2, 42, 2, 14999),
	(1, 1, 41, 1, 4999),
	(2, 3, 40, 2, 8999),
	(3, 3, 41, 1, 3999);


