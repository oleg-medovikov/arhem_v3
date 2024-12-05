CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    declension VARCHAR(255) NOT NULL UNIQUE,
    date_update TIMESTAMP
);
