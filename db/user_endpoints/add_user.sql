INSERT INTO users (username, hash, email, img_url, role)
VALUES ($1,$2,$3,$4,$5)
RETURNING * ;
