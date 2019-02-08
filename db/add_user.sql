INSERT INTO users (username, hash, email, img_url, role)
VALUES ($1,$2,$3,$4,$5)
RETURNING * ;
-- SELECT *
-- FROM user
-- WHERE username=$1 hash=$2 email=$3 img_url=$4 role=$5