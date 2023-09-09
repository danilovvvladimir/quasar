-- Получение всех ролей у пользователя
-- SELECT
--     user.email,
--     string_agg(role.name, ', ') AS user_roles
-- FROM user
-- INNER JOIN user_has_role 
--     ON user_has_role.user_id = user.user_id
-- INNER JOIN roles 
--     ON role.role_id = user_has_role.role_id
-- GROUP BY user.email;
	
SELECT * FROM "user";
SELECT * FROM user_has_role;
SELECT * FROM role;