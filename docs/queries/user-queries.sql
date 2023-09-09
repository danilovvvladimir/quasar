-- Find User by Email
SELECT 
	user_id, email, firstname, created_at, updated_at 
FROM "user"
WHERE email = 'user1@gmail.com';

-- Find User by Id
SELECT user_id, email, firstname, created_at, updated_at 
FROM "user"
WHERE user_id = 1;

-- Find User's roles
SELECT
    u.email,
    string_agg(r.name, ', ') AS user_roles
FROM "user" as u
INNER JOIN user_role as ur
    ON ur.user_id = u.user_id
INNER JOIN role as r 
    ON r.role_id = ur.role_id
WHERE u.user_id = 1
GROUP BY u.email;

-- Find User's wishlist items
SELECT 
	u.user_id, p.product_id, p.name as product_name, p.slug as product_slug, 
	p.price as product_price, p.discount_percentage as product_discount 
FROM "user" as u
INNER JOIN user_wishlist_item as uwi 
	ON u.user_id = uwi.user_id
INNER JOIN product as p 
	ON uwi.product_id = p.product_id
WHERE u.user_id = 1;

-- Find User's cart items
SELECT 
	u.user_id, p.product_id, p.name as product_name, p.slug as product_slug, 
	p.price as product_price, p.discount_percentage as product_discount,
	uci.size as product_size, uci.quantity as product_quantity
FROM "user" as u
INNER JOIN user_cart_item as uci 
	ON u.user_id = uci.user_id
INNER JOIN product as p 
	ON uci.product_id = p.product_id
WHERE u.user_id = 1;

-- Find User's orders
SELECT 
	u.user_id, o.order_id, o.order_status_id, o.created_at, os.name as order_status_message
FROM "user" as u
INNER JOIN "order" as o 
	ON u.user_id = o.user_id
INNER JOIN order_status as os 
	ON o.order_status_id = os.order_status_id
WHERE u.user_id = 1;

-- Add Product to wishlist
SELECT * FROM user_wishlist_item;
INSERT INTO user_wishlist_item (user_id, product_id)
VALUES
	(1, 3)
	
-- Delete Product from wishlist
DELETE FROM user_wishlist_item as uwi
WHERE uwi.product_id = 1;

-- Add Product to cart
INSERT INTO user_cart_item (user_id, product_id, size, quantity)
VALUES
	(1, 1, 43, 4);
	
-- Increment Product's quantity in cart
UPDATE user_cart_item as uci
SET 
	quantity = quantity + 1
WHERE uci.user_cart_item_id = 1;

-- Decrement Product's quantity in cart
UPDATE user_cart_item as uci
SET 
	quantity = quantity - 1
WHERE uci.user_cart_item_id = 1;
	
-- Delete Product to cart
DELETE FROM user_cart_item as uci
WHERE uci.user_cart_item_id = 1;

-- Update User's profile
UPDATE "user" as u
SET 
	firstname = 'your_firstname',
	"password" = 'your_hashed_password',
	email = 'your_new_email'
WHERE u.user_id = 1;







