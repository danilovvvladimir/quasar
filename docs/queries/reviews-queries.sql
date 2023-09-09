-- Find User's reviews
SELECT 
	r.review_id, r.product_id, r.rating, r.text, r.created_at, r.updated_at
FROM "user" as u
INNER JOIN review as r
	ON u.user_id = r.user_id
WHERE u.user_id = 1;

-- Find Products's reviews
SELECT 
	r.user_id, r.review_id,r.rating, r.text, r.created_at, r.updated_at
FROM product as p
INNER JOIN review as r
	ON p.product_id = r.product_id
WHERE p.product_id = 2;