

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255),
  user_phone VARCHAR(255),
  total INTEGER,
  status VARCHAR(32),
  pickup_time TIMESTAMP
);
