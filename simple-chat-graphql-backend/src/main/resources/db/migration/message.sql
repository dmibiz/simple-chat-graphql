CREATE TABLE message (
    id SERIAL NOT NULL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES chat_user(id)
);