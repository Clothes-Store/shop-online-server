drop database if exists clothesstore;
create database clothesstore CHARACTER SET utf8
  COLLATE utf8_general_ci;
use clothesstore;
create table cities(
    id int auto_increment primary key ,
    name varchar(150),
    type varchar(50)
);

create table provinces(
    id int auto_increment primary key ,
    name varchar(100),
    type varchar(50),
    city_id int,
    foreign key (city_id) references cities(id)
);

create table users(
    id int auto_increment primary key ,
    img text,
    phone varchar(20),
    email varchar(50),
    name varchar(300),
    password text,
    role smallint,
    province_id int,
    city_id int,
    address text,
    created datetime default CURRENT_TIMESTAMP,
    foreign key (province_id) references provinces(id),
    foreign key (city_id) references cities(id)
);

create table notices(
    id int auto_increment primary key ,
    content text,
    is_read bool,
    created datetime default CURRENT_TIMESTAMP
);

create table categories(
    id int auto_increment primary key ,
    name varchar(150)
);

create table collections(
    id int auto_increment primary key ,
    banner text,
    name varchar(150),
    created datetime default CURRENT_TIMESTAMP
);

create table products(
    id int auto_increment primary key ,
    name varchar(150),
    type varchar(100),
    current_price double,
    sale double,
    category_id int,
    collection_id int,
    created datetime default CURRENT_TIMESTAMP,
    foreign key (category_id) references categories(id),
    foreign key (collection_id) references collections(id)
);

create table product_imgs(
    id int auto_increment primary key ,
    product_id int,
    img text,
    foreign key (product_id) references products(id)
);

create table orders(
    id int auto_increment primary key ,
    user_id int,
    payment_method smallint,
    order_date datetime default CURRENT_TIMESTAMP,
    foreign key (user_id) references users(id)
);

create table order_details(
    id int auto_increment primary key ,
    order_id int,
    product_id int,
    number int,
    price_each double,
    foreign key (order_id) references orders(id),
    foreign key (product_id) references products(id)
);

create table sessions(
    id int auto_increment primary key ,
    token text
);