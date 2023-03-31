create database todolist_app;

create table activities (
	activity_id int primary key auto_increment,
	title varchar(255),
	email varchar(255),
	createdAt timestamp,
	updatedAt timestamp
);

create table todos (
	todo_id int primary key auto_increment,
	activity_group_id int,
	title varchar(255),
	priority varchar(20),
	is_active bool,
	createdAt timestamp,
	updatedAt timestamp
);

create table logs (
	ip_addr varchar(50),
	user_agent text,
	path varchar(50),
	method varchar(10),
	payload text,
	createdAt timestamp,
	updatedAt timestamp
);