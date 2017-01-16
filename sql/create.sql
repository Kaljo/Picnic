
CREATE TABLE users (
  id int(11) AUTO_INCREMENT,
  email varchar(100) DEFAULT NULL,
  password varchar(100) DEFAULT '123456',
  name varchar(100) DEFAULT NULL,
  city varchar(60) DEFAULT NULL,
  country varchar(60) DEFAULT NULL,
  pic varchar(60) DEFAULT NULL,
  PRIMARY KEY(id)
) 

CREATE TABLE groups (
  name varchar(100) NOT NULL,
  password varchar(30) NOT NULL,
  location varchar(50) NOT NULL,
  date date NOT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(id)
) ;

CREATE TABLE memberships (
  userid int(11) NOT NULL,
  groupid int(11) NOT NULL,
  admin char(1) NOT NULL DEFAULT '0',
  PRIMARY KEY(userid, groupid),
  FOREIGN KEY (userid) REFERENCES users(id),
  FOREIGN KEY (groupid) REFERENCES groups(id)
); 

CREATE TABLE notifications (
  id int(11) NOT NULL AUTO_INCREMENT,
  type varchar(80) DEFAULT NULL,
  money_amount int(11) DEFAULT '0',
  sender_id int(11) DEFAULT NULL,
  receiver_id int(11) DEFAULT NULL,
  group_id int(11) DEFAULT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(sender_id) REFERENCES users(id),
  FOREIGN KEY(receiver_id) REFERENCES users(id),
  FOREIGN KEY(group_id) REFERENCES groups(id)
); 

CREATE TABLE products (
productID int(11) AUTO_INCREMENT,
productName varchar (30),
productPrice DECIMAL(15,2),
buyer_userID int(11),
groupID int(11),
PRIMARY KEY(productID),
FOREIGN KEY(buyer_userID) REFERENCES users(id),
FOREIGN KEY(groupID) REFERENCES groups(id));


CREATE VIEW notify AS(
SELECT n.id AS notification_id,receiver_id, type, money_amount, g.name AS group_name, u1.email AS sender_email, u2.email AS receiver_email
FROM notifications n 
INNER JOIN users u1 ON n.sender_id=u1.id
INNER JOIN groups g ON n.group_id=g.id
INNER JOIN users u2 ON n.receiver_id=u2.id);


CREATE VIEW members AS(
SELECT userid, groupid, admin, g.name AS group_name,g.date, u.email AS user_email
FROM memberships m 
INNER JOIN users u ON m.userid=u.id
INNER JOIN groups g ON m.groupid=g.id);
