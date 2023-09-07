CREATE TABLE users(  
    id         VARCHAR(40) NOT NULL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    email      VARCHAR(40) NOT NULL UNIQUE,
    password   VARCHAR(20) NOT NULL,
    role       VARCHAR(20) NOT NULL, 
    created_at VARCHAR(20) NOT NULL  
);

CREATE TABLE posts(
    id              VARCHAR(40) PRIMARY KEY NOT NULL,
    creator_id      VARCHAR(40) NOT NULL,
    content         TEXT NOT NULL,
    likes           INTEGER NOT NULL,
    dislikes        INTEGER NOT NULL,
    created_at      VARCHAR(20) NOT NULL,
    updated_at      VARCHAR(20) NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES users(id)
    ON DELETE CASCADE  
);

CREATE TABLE likes_dislikes(
    user_id VARCHAR(40),
    post_id VARCHAR(40),    
    like    INTEGER(1),
    FOREIGN KEY(user_id) REFERENCES users(id)
    FOREIGN KEY(post_id) REFERENCES posts(id)
    ON DELETE CASCADE
);

