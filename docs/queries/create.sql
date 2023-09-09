DROP TABLE IF EXISTS 
	user_cart_item, category,"order", 
	order_item, order_status, product, product_category, product_image, product_size,
	review, "role", "user", user_role, user_wishlist_item;

CREATE TABLE role (
	role_id SERIAL PRIMARY KEY,
	name VARCHAR (30) NOT NULL
);

CREATE TABLE "user" (
	user_id SERIAL PRIMARY KEY,
	email VARCHAR (255) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL,
	firstname VARCHAR (50) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP
);

CREATE TABLE user_role (
  	user_role_id SERIAL PRIMARY KEY,
  	user_id INT NOT NULL,
  	role_id INT NOT NULL,
  	CONSTRAINT fk_role
  		FOREIGN KEY (role_id)
    		REFERENCES role (role_id)
			ON DELETE CASCADE,
  	CONSTRAINT fk_user
  		FOREIGN KEY (user_id)
      		REFERENCES "user" (user_id)
			ON DELETE CASCADE
);

CREATE TABLE product (
	product_id SERIAL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	slug VARCHAR (50) NOT NULL,
	description VARCHAR (255) NOT NULL,
	price INT NOT NULL,
	discount_percentage SMALLINT DEFAULT 0 NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP
);

CREATE TABLE product_image (
	product_image_id SERIAL PRIMARY KEY,
	product_id INT NOT NULL,
	image_path VARCHAR (255) NOT NULL,
  	CONSTRAINT fk_product
  	FOREIGN KEY (product_id)
    	REFERENCES product (product_id)
		ON DELETE CASCADE
);

CREATE TABLE product_size (
	product_size_id SERIAL PRIMARY KEY,
	product_id INT NOT NULL,
	quantity SMALLINT  NOT NULL,
	size SMALLINT  NOT NULL,
  	CONSTRAINT fk_product
  	FOREIGN KEY (product_id)
    	REFERENCES product (product_id)
		ON DELETE CASCADE
);

CREATE TABLE category (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	slug VARCHAR (50) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP
);

CREATE TABLE product_category (
  	product_category_id SERIAL PRIMARY KEY,
  	category_id INT NOT NULL,
  	product_id INT NOT NULL,
  	CONSTRAINT fk_product
  		FOREIGN KEY (product_id)
    		REFERENCES product (product_id)
			ON DELETE CASCADE,
  	CONSTRAINT fk_category
  		FOREIGN KEY (category_id)
      		REFERENCES category (category_id)
			ON DELETE CASCADE
);

CREATE TABLE review (
  	review_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
  	product_id INT NOT NULL,
	rating SMALLINT NOT NULL,
	text VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
  	CONSTRAINT fk_user
  		FOREIGN KEY (user_id)
    		REFERENCES "user" (user_id)
			ON DELETE CASCADE,
  	CONSTRAINT fk_product
  		FOREIGN KEY (product_id)
      		REFERENCES product (product_id)
			ON DELETE CASCADE
);

CREATE TABLE user_cart_item (
  	user_cart_item_id SERIAL PRIMARY KEY,
  	user_id INT NOT NULL,
  	product_id INT NOT NULL,
	quantity INT DEFAULT 1 NOT NULL,
	size INT NOT NULL,
	CONSTRAINT fk_user
  		FOREIGN KEY (user_id)
    		REFERENCES "user" (user_id)
			ON DELETE CASCADE,
  	CONSTRAINT fk_product
  		FOREIGN KEY (product_id)
    		REFERENCES product (product_id)
			ON DELETE CASCADE
);

CREATE TABLE user_wishlist_item (
  	user_wishlist_item_id SERIAL PRIMARY KEY,
  	user_id INT NOT NULL,
  	product_id INT NOT NULL,
	CONSTRAINT fk_user
  		FOREIGN KEY (user_id)
    		REFERENCES "user" (user_id)
			ON DELETE CASCADE,
  	CONSTRAINT fk_product
  		FOREIGN KEY (product_id)
    		REFERENCES product (product_id)
			ON DELETE CASCADE
);

CREATE TABLE order_status (
	order_status_id SERIAL PRIMARY KEY,
	name VARCHAR (30) NOT NULL
);

CREATE TABLE "order" (
  	order_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
  	order_status_id INT DEFAULT 1 NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  	CONSTRAINT fk_user
  		FOREIGN KEY (user_id)
    		REFERENCES "user" (user_id)
			ON DELETE CASCADE,
  	CONSTRAINT fk_order_status
  		FOREIGN KEY (order_status_id)
      		REFERENCES order_status (order_status_id)
			ON DELETE CASCADE
);

CREATE TABLE order_item (
  	order_item_id SERIAL PRIMARY KEY,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	size INT NOT NULL,
	total_price INT NOT NULL,
  	CONSTRAINT fk_order
  		FOREIGN KEY (order_id)
    		REFERENCES "order" (order_id)
			ON DELETE CASCADE,
  	CONSTRAINT fk_product
  		FOREIGN KEY (product_id)
      		REFERENCES product (product_id)
			ON DELETE CASCADE
);