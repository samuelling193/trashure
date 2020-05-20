-- USERS

insert into users (username, name, email, encrypted_password, lat, long, avatar_url) values ('ben', 'ben johnson', 'ben@home.com', '$2b$10$r8zXFvR6OacAyaU8uEeQIe/pjZwCiKc4MoasuUfXhXrqXk4zgiB/2', -37.8140692, 144.9487768, 'https://qph.fs.quoracdn.net/main-qimg-8d945bbaf167b063040eca16b0c59cd8.webp');

insert into users (username, name, email, encrypted_password, lat, long, avatar_url) values ('sugarlover', 'Jess Smith', 'jess@home.com', '$2b$10$r8zXFvR6OacAyaU8uEeQIe/pjZwCiKc4MoasuUfXhXrqXk4zgiB/2', -37.8107004, 144.9570023, 'https://pickaface.net/gallery/avatar/unr_example_161122_0416_qss004g.png');

insert into users (username, name, email, encrypted_password, lat, long, avatar_url) values ('furniturelover', 'Jane Doe', 'emma@home.com', '$2b$10$r8zXFvR6OacAyaU8uEeQIe/pjZwCiKc4MoasuUfXhXrqXk4zgiB/2', -37.8149745, 144.9552722, 'avatar_url');


-- TRASHURE ITEMS

insert into trashure_items (owner_id, name, lat, long, address, image_url
) values (1, 'Chocolate Brownie', -37.8140692, 144.9487768, '{"addressLine":"4 Flinders St", "adminDistrict": "VIC", "countryRegion": "Australia", "formattedAddress": "4 Flinders St, Melbourne VIC, 3000, Australia", "locality": "Melbourne", "postalCode": "3000"}','https://img.delicious.com.au/hNHNN2Ck/w759-h506-cfill/del/2017/04/chocolate-brownies-44943-3.jpg');

insert into trashure_items (owner_id, name, lat, long, address, image_url
) values (1, 'Concert Tickets', -37.8140692, 144.9487768, '{"addressLine":"4 Flinders St", "adminDistrict": "VIC", "countryRegion": "Australia", "formattedAddress": "4 Flinders St, Melbourne VIC, 3000, Australia", "locality": "Melbourne", "postalCode": "3000"}','https://theindustryobserver.thebrag.com/wp-content/uploads/2017/10/o-concert-tickets-facebook.jpg');


insert into trashure_items (owner_id, name, lat, long, address, image_url
) values (2, 'Pallets', -37.8107004, 144.9570023, '{"addressLine":"4 Flinders St", "adminDistrict": "VIC", "countryRegion": "Australia", "formattedAddress": "4 Flinders St, Melbourne VIC, 3000, Australia", "locality": "Melbourne", "postalCode": "3000"}','https://www.palletwest.com.au/wp-content/uploads/2018/05/ST-2400-NH25.jpg');

insert into trashure_items (owner_id, name, lat, long, address, image_url
) values (3, 'Coffee Table', -37.8149745, 144.9552722, '{"addressLine":"4 Flinders St", "adminDistrict": "VIC", "countryRegion": "Australia", "formattedAddress": "4 Flinders St, Melbourne VIC, 3000, Australia", "locality": "Melbourne", "postalCode": "3000"}','https://www.mocka.com.au/media/product/09/jesse-coffee-table-94.jpg?12-03-2020-03-49-25');



-- RESERVATIONS

 insert into reservations (owner_id, requester_id, item_id) values (1, 2, 1);
 update trashure_items set status = 'reserved' where id = 1;

 insert into reservations (owner_id, requester_id, item_id) values (1, 2, 2);
 update trashure_items set status = 'reserved' where id = 2;

 insert into reservations (owner_id, requester_id, item_id) values (3, 2, 4);
 update trashure_items set status = 'reserved' where id = 4;


-- COMMENTS

 insert into comments (poster_id, item_id, content) values (2, 1, 'Chocolate brownie is my favourite');

 insert into comments (poster_id, item_id, content) values (2, 1, 'I love this band. Cannot beleive you have extra tickets. See you at 4pm');

 insert into comments (poster_id, item_id, content) values (1, 3, 'I am going to build a bed out of these pallets!');

 insert into comments (poster_id, item_id, content) values (1, 4, 'I love this coffee table. I will take it!');
