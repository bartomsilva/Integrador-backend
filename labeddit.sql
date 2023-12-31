-- Active: 1696006865998@@127.0.0.1@3306
CREATE TABLE users(  
    id         VARCHAR(40) NOT NULL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    email      VARCHAR(40) NOT NULL UNIQUE,
    password   VARCHAR(20) NOT NULL,
    role       VARCHAR(20) NOT NULL, 
    created_at VARCHAR(20) NOT NULL,
    news_letter VARCHAR(1),
    reset_password VARCHAR(1)  
);

CREATE TABLE posts(
    id              VARCHAR(40) PRIMARY KEY NOT NULL,
    creator_id      VARCHAR(40) NOT NULL,
    content         TEXT NOT NULL,
    likes           INTEGER NOT NULL,
    dislikes        INTEGER NOT NULL,
    comments        INTEGER NOT NULL,
    created_at      VARCHAR(20) NOT NULL,
    updated_at      VARCHAR(20) NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES users(id)
);

CREATE TABLE comments(
    id              VARCHAR(40) PRIMARY KEY NOT NULL,
    creator_id      VARCHAR(40) NOT NULL,
    post_id         VARCHAR(40) NOT NULL,
    parental_post_id  VARCHAR(40), 
    content         TEXT NOT NULL,
    likes           INTEGER NOT NULL,
    dislikes        INTEGER NOT NULL,
    comments        INTEGER NOT NULL,
    created_at      VARCHAR(20) NOT NULL,
    updated_at      VARCHAR(20) NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES users(id)
    FOREIGN KEY(post_id) REFERENCES posts(id)
);
CREATE TABLE likes_dislikes(
    user_id VARCHAR(40),
    action_id VARCHAR(40),    
    like    INTEGER(1)
);

