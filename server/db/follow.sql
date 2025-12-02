CREATE TABLE follow (
    follower_idx INT NOT NULL,
    following_idx INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_idx, following_idx),
    FOREIGN KEY (follower_idx) REFERENCES user (idx) ON DELETE CASCADE,
    FOREIGN KEY (following_idx) REFERENCES user (idx) ON DELETE CASCADE
);

-- 팔로우 또는 팔로잉 하기
INSERT INTO follow (follower_idx, following_idx) VALUES (?, ?);

-- 언팔로우 또는 언팔로잉 하기
DELETE FROM follow WHERE follower_idx = ? AND following_idx = ?;

-- 팔로잉 리스트
SELECT U.*
FROM follow F
JOIN user U ON F.following_idx = U.idx
WHERE F.follower_idx = ?;

SELECT U.*
FROM follow F, user U
WHERE F.following_idx = U.idx
  AND F.follower_idx = ?;

-- 팔로우 리스트
SELECT U.*
FROM follow F
JOIN user U ON F.follower_idx = U.idx
WHERE F.following_idx = ?;

SELECT U.*
FROM follow F, user U   
WHERE F.follower_idx = U.idx
AND F.following_idx = ?;