INSERT INTO product (product_name, info, product_type, user_id)
VALUES ($1,$2,$3,$4)
RETURNING *