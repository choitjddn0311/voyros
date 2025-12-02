const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get("/:id" , async (req,res) => {
    const {id} = req.params;

    try {
        const [userRows] = await db.query('select idx, id, name from user where id = ?' , [id]);
        if(userRows.length === 0) {
            return res.json({success: false, message: "값이 안넘어왔어요"});
        }

        const user = userRows[0];
        const userIdx = user.idx;

        // userIdx를 팔로우하고있는 사람 수
        const [followerRows] = await db.query('select count(*) as followerCount from follow where following_idx = ?' , [userIdx]);
        // userIdx가 팔로우하고 있는 사람 수
        const [followingRows] = await db.query('select count(*) as followingCount from follow where follower_idx = ?' , [userIdx]);
        const [followerListRows] = await db.query('select follower_idx from follow where following_idx = ?', [userIdx]);

        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                follower: followerRows[0].followerCount,
                following: followingRows[0].followingCount,
                followerList: followerListRows
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({success: false, message: "오류발생"})
    }
});

module.exports = router;