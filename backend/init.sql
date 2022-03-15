CREATE DATABASE bidsys;

\c bidsys;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    display_name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

INSERT INTO users (display_name, username, password) VALUES ('Alice Wonderland', 'alice', '$2a$10$F2K.H5e0OBugzP2Ichtu8utM3Ns4ekrmHwbEHsg4TESd7MOrYyHAC');

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    original_owner int8 NOT NULL,
    owner int8 NOT NULL,
    image text NOT NULL,
    price_determinant int NOT NULL,
    name varchar(255) NOT NULL, 
    description text NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);

INSERT INTO products (name, description, image, price_determinant, owner, original_owner, start_time, end_time) VALUES ('Test product', 'Lorem ipsum dolor sit amet.', 'https://static.wikia.nocookie.net/youtube/images/c/ce/RickRollButWithADifferentLink.jpg/revision/latest?cb=20201023192005', 5, 1, 1, '2022-03-16 00:00:00', '2022-03-16 23:59:59');

CREATE TABLE biddings (
    id SERIAL PRIMARY KEY,
    bidder int8 NOT NULL,
    product_id BIGINT,
    bidding_price float NOT NULL,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
    CONSTRAINT fk_bidder_id FOREIGN KEY(bidder) REFERENCES users(id)
);