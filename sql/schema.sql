drop database trashure;

create database trashure;

\c trashure

create table users (
    id serial primary key,
    username text,
    name text,
    email text,
    encrypted_password text,
    lat decimal,
    long decimal,
    avatar_url text
);

create table trashure_items (
    id serial primary key,
    owner_id integer references users(id),
    name text,
    item_type text,
    quantity text,
    lat decimal,
    long decimal,
    address text,
    expiration_date date not null default current_date,
    status text default 'available',
    image_url text,
    pickup_date date not null default current_date,
    pickup_start_time time with time zone not null default current_time,
    pickup_end_time time with time zone not null default current_time
);

create table comments (
    id serial primary key,
    poster_id integer references users(id),
    item_id integer references trashure_items(id),
    content text, 
    deletion_status boolean not null default false
);


create table reservations (
     id serial primary key,
     owner_id integer references users(id),
     requester_id integer references users(id),
     item_id integer references trashure_items(id),
     request_date date not null default current_date,
     request_time time with time zone not null default current_time
);





