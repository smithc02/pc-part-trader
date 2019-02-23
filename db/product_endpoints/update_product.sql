UPDATE product
SET product_name = $2, info = $3, product_type=$4, users_id=$6, img_url=$5
WHERE id=$1