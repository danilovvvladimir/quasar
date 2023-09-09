-- Авто-обновление поля updated_at у User
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Авто-обновление поля updated_at у Product
CREATE TRIGGER product_updated_at
BEFORE UPDATE ON product
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Авто-обновление поля updated_at у Category
CREATE TRIGGER category_updated_at
BEFORE UPDATE ON category
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Авто-обновление поля updated_at у Review
CREATE TRIGGER review_updated_at
BEFORE UPDATE ON review
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Авто-добавление роли при создании user
CREATE OR REPLACE FUNCTION add_user_to_user_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_role (user_id, role_id) 
  VALUES 
  	(NEW.user_id, (SELECT role_id FROM role WHERE name = 'user'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_user_to_user_role_trigger
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION add_user_to_user_role();