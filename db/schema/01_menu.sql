

DROP TABLE IF EXISTS menu CASCADE;
CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  price INTEGER, -- in cents :(
  description TEXT,
  image_url VARCHAR(255)
);

