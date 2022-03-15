CREATE DATABASE bidsys;
\c bidsys;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    display_name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);
INSERT INTO users (display_name, username, password) VALUES ('Alice Wonderland', 'alice', '$2a$10$F2K.H5e0OBugzP2Ichtu8utM3Ns4ekrmHwbEHsg4TESd7MOrYyHAC');