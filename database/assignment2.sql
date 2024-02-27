-- Insert the following new record to the account table

insert into account  (account_firstname, account_lastname, account_email, account_type) values ('Tony','Stark','tony@starkent.com','Iam1ronM@n');

-- Modify the Tony Stark record to change the account_type to "Admin".

INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'password', 'Admin');

-- Delete the Tony Stark record from the database.

delete from account where account_firstname = 'Tony';

-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors" using a single query. 


UPDATE inventory SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior');


-- Use an inner join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category.

SELECT inv_model, classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id;



-- Update all records in the inventory table to add "/vehicles" When done the path for both inv_image and inv_thumbnail should resemble this example: /images/vehicles/a-car-name.jpg

UPDATE inventory SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');