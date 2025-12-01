create table temporaily_post(
    idx int auto_increment primary key,
    id varchar(255) not null,
    title varchar(255) not null,
    content varchar(10000) not null,
    created_at datetime not null default current_timestamp
);

