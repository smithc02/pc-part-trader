SELECT users.username, product.product_name, product.info, product.img_url, product.users_id
FROM users
JOIN product ON product.users_id=users.id
ORDER BY id DESC