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

CREATE TABLE biddings (
    id SERIAL PRIMARY KEY,
    bidder int8 NOT NULL,
    product_id BIGINT,
    bidding_price float NOT NULL,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
    CONSTRAINT fk_bidder_id FOREIGN KEY(bidder) REFERENCES users(id)
);