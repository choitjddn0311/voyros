create table post (
    idx int auto_increment primary key,
    id varchar(255) not null,
    title varchar(396) not null,
    content varchar(10000) not null,
    post_text varchar(500) not null,
    created_at datetime not null default current_timestamp
);