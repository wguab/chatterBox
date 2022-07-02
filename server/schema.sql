DROP DATABASE IF EXISTS chat;


CREATE DATABASE chat;

USE chat;



CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  userName varchar(30),
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT,
  roomName varchar(30),
  PRIMARY KEY (id)
);


CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  content text NOT NULL,
  createTime DATETIME NOT NULL,
  userId int NOT NULL,
  roomName varchar(30) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- CREATE TABLE messages (
--   id int NOT NULL AUTO_INCREMENT,
--   content text NOT NULL,
--   createTime DATETIME NOT NULL,
--   id_User int NOT NULL,
--   id_Room int NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (id_User) REFERENCES users(id),
--   FOREIGN KEY (id_Room) REFERENCES rooms(id)
-- );

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

