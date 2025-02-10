CREATE TABLE IF NOT EXISTS event_cache (
    event_id VARCHAR(25) PRIMARY KEY,
    checksum VARCHAR(64) NOT NULL
);
