create table rank(
	id serial not null primary key,
	destination text,
	queue int,
	departedTaxis int,
	taxiFare decimal(10,2),
	availableTaxis int
);