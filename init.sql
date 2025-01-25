CREATE DATABASE hacker_news;

USE hacker_news;

CREATE TABLE stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    url VARCHAR(255),
    author VARCHAR(100),
    score INT,
    time_published DATETIME,
    UNIQUE(url)
);