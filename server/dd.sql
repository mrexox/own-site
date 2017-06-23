--use OWN_SITE_TEST;
create database OWN_SITE_TEST;
	use own_site_test;
drop table if exists section;
drop table if exists post;
drop table if exists message;
drop table if exists admin;

CREATE TABLE section (
	id INT PRIMARY KEY,
	name VARCHAR(10) NOT NULL,
	description VARCHAR(40)
);

CREATE TABLE post (
	id INT PRIMARY KEY,
	title VARCHAR(40) NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	visible BOOL DEFAULT FALSE,
	section_id INT,

	FOREIGN KEY (section_id)
		REFERENCES section (id)
);

CREATE TABLE message (
	id INT PRIMARY KEY,
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
