--use OWN_SITE_TEST;
--use own_site_test;

drop table if exists post;
drop table if exists section;
drop table if exists message;
drop table if exists admin;

CREATE TABLE section (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(10) NOT NULL,
	description VARCHAR(100)
);

CREATE TABLE post (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(40) NOT NULL,
	description VARCHAR(200),
	content TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	visible INTEGER DEFAULT FALSE,
	section_id INTEGER,

	FOREIGN KEY (section_id)
		REFERENCES section (id)
);

CREATE TABLE message (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	theme VARCHAR(40) NOT NULL,
	telephone VARCHAR(15),
	email VARCHAR(20),
	content TEXT,
	name VARCHAR(20),
	company_name VARCHAR(30),
	order_type INTEGER NOT NULL,
	ceated_at TIMESTAMP
);

CREATE TABLE admin (
	login VARCHAR(10) PRIMARY KEY,
	password_hash INT NOT NULL
);

INSERT INTO section (name, description) VALUES
('OOP', 'Just something about object oriented style in programming'),
('Func', 'Something about functional programming');

INSERT INTO post (title, description, content, visible, created_at, updated_at, section_id) VALUES
('OOP in Go', 'How to build oop design in golang','Lorem ipsum.', 0, date(), date(), 1),
('Lisp for the web', 'Writing website in Common Lisp','Lorem ipsum.', 1, date(), date(), 2);
