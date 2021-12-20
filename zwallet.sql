CREATE DATABASE zwallet;

CREATE TABLE users (id VARCHAR(64) NOT NULL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(100) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL);

CREATE TABLE profiles (id_user VARCHAR(64) NOT NULL, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id)
    ON DELETE CASCADE);

CREATE TABLE accounts (id VARCHAR(64) NOT NULL PRIMARY KEY,
    id_user VARCHAR(64) NOT NULL, 
    account_number VARCHAR(64) NOT NULL, 
    balance INT(10) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (id_user) REFERENCES users(id)
    ON DELETE CASCADE);

CREATE TABLE transactions (id VARCHAR(64) NOT NULL PRIMARY KEY, 
    from_account_id VARCHAR(64) NOT NULL, 
    to_account_id VARCHAR(64) NOT NULL,
    amount INT(10) NOT NULL DEFAULT 0, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (from_account_id) REFERENCES accounts(id)
    ON DELETE CASCADE, 
    FOREIGN KEY (to_account_id) REFERENCES accounts(id)
    ON DELETE CASCADE);


-- SELECT accounts.id, accounts.id_user, users.username, accounts.account_number, contact_holder.id_user_holder 
--     FROM accounts INNER JOIN users ON accounts.id_user = users.id 
--     INNER JOIN contact_holder ON accounts.id_user = contact_holder.id_user_holder;


-- search user with name
SELECT users.id, accounts.id AS id_accounts, users.email, profiles.first_name, profiles.last_name 
    FROM users INNER JOIN profiles ON users.id = profiles.id_user 
    INNER JOIN accounts ON users.id = accounts.id_user WHERE profiles.first_name LIKE '%ua%';

-- sort transactions by created_at
SELECT users.username, transactions.from_account_id, transactions.to_account_id, transactions.amount, transactions.created_at 
    FROM users INNER JOIN accounts ON users.id = accounts.id_user 
    INNER JOIN transactions ON accounts.id = transactions.from_account_id 
    ORDER BY created_at DESC;