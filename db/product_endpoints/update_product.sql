UPDATE product
SET product_name = $2, info = $3, product_type=$4, user_id=$5
WHERE id=$1