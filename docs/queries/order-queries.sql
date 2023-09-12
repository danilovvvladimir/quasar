-- Find Order with order_status by Id
SELECT
	o.order_id, o.user_id, os.name as order_status_name, 
	o.created_at, SUM(oi.quantity * oi.total_price) AS total_price
FROM "order" as o
INNER JOIN order_status as os
	ON o.order_status_id = os.order_status_id
INNER JOIN order_item AS oi
    ON o.order_id = oi.order_id
GROUP BY o.order_id, o.user_id, os.name, o.created_at;


-- Find Order with order_status by Id
SELECT
	o.order_id, o.user_id, os.name as order_status_name, o.created_at
FROM "order" as o
INNER JOIN order_status as os
	ON o.order_status_id = os.order_status_id
WHERE o.order_id = 1;

-- Find All order items by Id
SELECT
	o.order_id, o.user_id, oi.product_id, oi.quantity, oi.size, oi.total_price
FROM "order" as o
INNER JOIN order_item as oi
	ON o.order_id = oi.order_id
WHERE o.order_id = 1;

-- Find Total Order Price
SELECT
    SUM(oi.quantity * oi.total_price) AS total_price
FROM "order" AS o
INNER JOIN order_item AS oi
    ON o.order_id = oi.order_id
WHERE o.order_id = 1
GROUP BY o.order_id, o.user_id;

-- Update Order's status
UPDATE "order" as o
SET 
	order_status_id = 2
WHERE o.order_id = 1;

-- Create Order With N items???
-- Транзакция мб