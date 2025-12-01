const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/info' , async (req,res) => {
    // localstorge에 있는 id를 받아옴
    const {id} = req.body;

    try {
        // db에 query날려서 받아온 user의 id로 조건문
        // id, name, email, birthday, gender를 가져오고
        const [rows] = await db.query('select id,name,email,birthday,gender,created_at from user where id = ?' , [id]);
        // 값이 안넘어오면
        if(rows.length === 0) {
            return res.status(404).json({success: false, message: '유저정보없음'});
        }
        
        res.json({success: true, user: rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: '서버 오류'})
    }
})

module.exports = router;