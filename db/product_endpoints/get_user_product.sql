SELECT users.username, product.product_name, product.info, product.img_url
FROM users
JOIN product ON product.user_id=users.id;