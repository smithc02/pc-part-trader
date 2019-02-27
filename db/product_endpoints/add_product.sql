INSERT INTO product (product_name, info, product_type, users_id, img_url, price)
VALUES ($1,$2,$3,$4,$5,$6)
RETURNING *