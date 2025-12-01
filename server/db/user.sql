-- db 접속
-- \connect --mysql root@localhost:3306 
-- 또는
-- c -> program file -> mysql -> mysql server 8.0 -> bin = cmd ->
-- mysql -u root -p -> pw입력후 진입입

CREATE TABLE user (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthday DATE,
    gender VARCHAR(10),
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);