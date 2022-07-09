CREATE TABLE schools (
	id serial primary key,
	name varchar (45) not null,
	email varchar (45) not null unique,
	password varchar (150) not null
);

CREATE TABLE orders (
	id serial primary key,
	date date not null,
	is_rectified boolean default false,
	observations text,
	school_id integer references schools(id),
	vegetarian integer default 0,
	vegetarian_real integer default 0,
	celiac integer default 0,
	celiac_real integer default 0,
	standard integer default 0,
	standard_real integer default 0,
	caloric integer default 0,
	caloric_real integer default 0,
	ethnic integer default 0,
	ethnic_real integer default 0
);

CREATE TABLE news (
	id serial primary key,
	content text not null,
	date timestamp default now()
);