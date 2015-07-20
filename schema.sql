DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS views CASCADE;
DROP TABLE IF EXISTS votes CASCADE;


CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	username VARCHAR(255),
	password VARCHAR(255)


);


CREATE TABLE topics(
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	user_id INTEGER REFERENCES users,
	date_made TIMESTAMP default current_timestamp,
	votes INTEGER
);



CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	date_posted TIMESTAMP default current_timestamp,
	user_id INTEGER REFERENCES users,
	topic_id INTEGER REFERENCES topics,
	post TEXT,
	location VARCHAR(255)
);	
CREATE TABLE views(
	id SERIAL PRIMARY KEY,
	topic_id INTEGER REFERENCES topics,
	views INTEGER
	
);	
