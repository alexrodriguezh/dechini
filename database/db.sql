CREATE DATABASE dechini;

USE dechini;

CREATE TABLE users (
    id INT(11) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    username VARCHAR(40) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    empresa VARCHAR(150),
    cargo VARCHAR(50),
    oficina VARCHAR(100),
    anexo VARCHAR(20),
    celular INT(13),
    telefono INT(15)
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

CREATE TABLE ticket (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255),
    description TEXT,
    categoria VARCHAR(30) NOT NULL,
    imagen mediumblob,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE ticket
    ADD PRIMARY KEY (id);

ALTER TABLE ticket
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE ticket;