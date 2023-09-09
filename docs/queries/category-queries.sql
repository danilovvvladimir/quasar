-- category:
-- - все products в этой категории
-- - изменить
-- - создать
-- - удалить

-- Find Category by Id
SELECT 
	*
FROM category
WHERE category_id = 1;

-- Find Category by Slug
SELECT 
	*
FROM category
WHERE slug = 'sneakers';

-- Update Category
UPDATE category
SET 
	"name" = 'your_name',
	slug = 'your_slug',
WHERE category_id = 1;

-- Delete Category
DELETE FROM category
WHERE category_id = 1;








