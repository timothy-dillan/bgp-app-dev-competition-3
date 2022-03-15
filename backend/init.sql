CREATE DATABASE bidsys;
\c bidsys;
CREATE TABLE users (
    id bigint NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO users (id, username, password) VALUES 
(1, 'alice', '$2a$10$F2K.H5e0OBugzP2Ichtu8utM3Ns4ekrmHwbEHsg4TESd7MOrYyHAC');