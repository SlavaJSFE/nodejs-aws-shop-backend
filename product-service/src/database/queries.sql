create extension if not exists "uuid-ossp";

create table if not exists products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer
)

create table if not exists stocks (
	product_id uuid,
	count integer,
	foreign key ("product_id") references "products" ("id")
)

insert into products (title, description, price) values
	('Product 2', 'Short Product Description 2', 8)
  ('Product 3', 'Short Product Description 3', 15)
  ('Product 4', 'Short Product Description 4', 25)
  ('Product 5', 'Short Product Description 5', 5)
  ('Product 6', 'Short Product Description 6', 28)
  ('Product 7', 'Short Product Description 7', 7)
  ('Product 8', 'Short Product Description 8', 10)
  ('Product 9', 'Short Product Description 9', 13)
  ('Product 10', 'Short Product Description 10', 55)

  insert into stocks (product_id, count) values
	('36fae36a-e9e3-41e1-935d-6d228bbde022', 8),
  ('59a885b7-7910-44eb-b088-bc02d8cdba09', 3),
  ('9cd05a52-47b1-498e-bb0b-fd9ddb9df081', 21),
  ('247de662-66fd-4f96-b57b-52ad0fe36123', 6),
  ('c036275e-46c9-4ddf-ab6d-ce7a50ddf380', 4),
  ('35e2ace9-b2e5-4640-a8da-5eefb3b44d1c', 14),
  ('e405670c-7a13-42c0-80c8-1bf743fc3334', 10),
  ('67a69b66-d074-436e-b263-890a851a2ede', 12),
  ('e05b5b3a-0d84-4acf-a44a-4b9837625888', 8),
