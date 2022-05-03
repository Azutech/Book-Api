CREATE TABLE storeback ( id SERIAL PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    name VARCHAR(278) NOT NULL,
    amount integer NOT NULL,
    type VARCHAR(50) NOT NULL,
    vendor text
)
   