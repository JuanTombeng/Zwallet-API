CREATE DATABASE zwallet;

CREATE TABLE users (id VARCHAR(64) NOT NULL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(100) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL);

CREATE TABLE accounts (id VARCHAR(64) NOT NULL PRIMARY KEY,
    id_user VARCHAR(64) NOT NULL, 
    account_number VARCHAR(64) NOT NULL, 
    balance INT(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (id_user) REFERENCES users(id));

CREATE TABLE transactions;